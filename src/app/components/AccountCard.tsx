import Link from "next/link";
import React from "react";


interface AccountCardProps {
    id: number;
    balance: number;
    email: string;
    createdAt: string;
}

const AccountCard: React.FC<AccountCardProps> = ({id, balance, email, createdAt}) => {
    console.log(createdAt, typeof(createdAt))

    return(
        <Link href={"/accounts/" + id}>
            <div className="border-2 flex flex-col justify-left items-center mb-3 p-3">
                <span>Account ID: {id} </span>
                <span>Balance: {balance} </span>
                <span>Email: {email} </span>
                <span>Created At: {createdAt} </span>
            </div>
        </Link>
    )
}

export default AccountCard