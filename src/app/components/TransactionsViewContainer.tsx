
'use client'
import React, {useState} from 'react'
import TransactionListContainer from './TransactionListContainer';

interface TransactionsViewContainerProps {
    accountId: number
}


const TransactionsViewContainer: React.FC<TransactionsViewContainerProps> = ({accountId}) => {
    const [transactionType, setTransactionType] = useState<'sent' | 'received' | 'all'> ("all")

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTransactionType(e.target.value as 'sent' | 'received' | 'all');
    };


    return(
        <div className='p-5'>
            <div className='flex flex-col justify-center items-center gap-3'>
                <label htmlFor="state">Select Transaction Type: </label>
                <select className='border-2' id="state" value={transactionType} onChange={handleChange}>
                    <option value="all">All</option>
                    <option value="sent">Sent</option>
                    <option value="received">Received</option>
                </select>
                <p>Selected: <span className='font-bold text-blue-800'>{transactionType}</span></p>
            </div>
            <TransactionListContainer accountId={accountId} transactionType={transactionType} />
        </div>
    )
}

export default TransactionsViewContainer