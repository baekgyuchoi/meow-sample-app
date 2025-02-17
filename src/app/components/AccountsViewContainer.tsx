'use client'
import React, { useEffect, useState } from "react";
import AccountCard from "./AccountCard";

interface Account{
    id: number,
    balance: number,
    createdAt: string,
    email: string
}

interface AccountsViewContainerProps {
    accountId?: number | null
}


const AccountsViewContainer: React.FC<AccountsViewContainerProps> = ({accountId}) => {
    const [accounts, setAccounts] = useState<Account[]>([])

    useEffect(()=>{
        const fetchData = async () => {
            if (accountId){
                const data = await fetch("/api/accounts?id=" + accountId)
                const json = await data.json()
                setAccounts(json.data as Account[])
            }
            else{
                const data = await fetch("/api/accounts")
                const json = await data.json()
                setAccounts(json.data as Account[])
            }
          
        }
        fetchData();
    }, [accountId])




    return(
        <div className="flex flex-col border-2 px-4 py-3">
            {(accounts) ? (accounts.map((account, index) => {
                return(
                    <AccountCard key={index} balance={account.balance} id={account.id} email={account.email} createdAt={account.createdAt}/>
                )
            })) : (<></>)
            
            }

        </div>
    )
}

export default AccountsViewContainer