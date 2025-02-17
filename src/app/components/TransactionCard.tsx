
import React from "react";


interface TransactionCardProps {
    id: number;
    amount: number;
    senderId: number;
    receiverId: number;
    createdAt: string;
}

const TransactionCard: React.FC<TransactionCardProps> = ({id, amount, senderId, receiverId, createdAt}) => {
 

    return(
        
        <div className="border-2 flex flex-col justify-left items-center mb-3 p-3">
            <span>Transaction ID: {id} </span>
            <span>Amount: {amount} </span>
            <span>Sender ID: {senderId} </span>
            <span>receiver ID: {receiverId} </span>
            <span>Created At: {createdAt} </span>
        </div>
  
    )
}

export default TransactionCard