'use client'
import React, { useState, useEffect } from 'react'
import TransactionCard from './TransactionCard';

interface TransactionListContainerProps {
    transactionType: "sent" | "received" | "all";
    accountId: number
}

interface Transaction {
    amount: number;
    id: number;
    senderId: number;
    receiverId: number;
    createdAt: string;
}

const TransactionListContainer : React.FC<TransactionListContainerProps> = ({transactionType, accountId}) => {
    const [transactions, setTransactions] = useState<Transaction[] | null> (null)

    useEffect(()=>{
        const fetchData = async () => {
            const data = await fetch('/api/transactions?id=' + accountId + "&type=" + transactionType)
            const json = await data.json()
            console.log(json)
            setTransactions(json.data)
        }

        fetchData();
    },[accountId, transactionType])
    

    return(
        <div className='flex flex-col p-5 gap-2'>
          
            {transactions?.map((transaction, index)=> {
                return(
                    <TransactionCard key={index} id={transaction.id} senderId={transaction.senderId} receiverId={transaction.receiverId} amount={transaction.amount} createdAt={transaction.createdAt}/>
                )
            })}
        </div>
    )
}

export default TransactionListContainer