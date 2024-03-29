/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import { MiddleBar } from "../components/MiddleBar";
import { TopBar } from "../components/TopBar";
import { User_comp } from "../components/User_comp";
import { useEffect, useState } from "react";
import { makeAuthenticatedGETRequest } from "../utils/serverHelpers";
import { useRecoilState, useRecoilValue } from "recoil";
import { balanceAtom, currentAtom, modalAtom, userfilterAtom, usersAtom , usermodalAtom} from "../atoms/payment";



export function Dashboard() {
    const [balance, setBalance] = useRecoilState(balanceAtom);
    const [filter, setFilter] = useRecoilState(userfilterAtom);
    const [users, setUsers] = useRecoilState(usersAtom);
    const [loading , setLoading] = useState(true);
    const [currentuser , setCurrentUser] = useRecoilState(currentAtom);

    useEffect(() => {
        const get_info = async () =>{
            try{
                const response = await makeAuthenticatedGETRequest("/api/v1/account/balance");
                const temp_balance = parseFloat(response.balance).toFixed(2);
                balance!=temp_balance?setBalance(balance => balance = temp_balance):null;
                const url =(filter ? "/api/v1/user/bulk?filter="+filter : "/api/v1/user/bulk");
                const response_2 = await makeAuthenticatedGETRequest(url);
                response_2.user!=users?setUsers(users => users = response_2.user):null;
            }finally{
                const current_user = users.filter( user => user.username === currentuser.username);
                if (current_user.length == 1){
                    setCurrentUser(current_user[0]);
                }
                setLoading(false);
            }
        }
        get_info();
    }, [balance, users]);
    return (
        <div className="w-full h-full">
            <div className="flex flex-col h-full w-full">
                {loading ? <p className="animate-pulse text-2xl justify-center items-center flex h-full"> Loading ....... </p> : 
                <>
                    <TopBar firstName={currentuser.firstName} lastName={currentuser.lastName}/>
                    <MiddleBar balance = {balance}/>
                    <div className="p-4">
                        {users.map(function (user) {
                            if (user.username != currentuser.username){
                                return <User_comp firstName={user.firstName} lastName={user.lastName} userId = {user._id}/>
                            }
                        })}
                    </div>
                </>
                }
            </div>
        </div>
    )
}