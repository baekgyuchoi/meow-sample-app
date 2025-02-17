
'use client';
import CreateTransaction from '@/app/components/CreateTransaction';
import TransactionsViewContainer from '@/app/components/TransactionsViewContainer';
import { useParams } from 'next/navigation';



export default function AccountPage() {
    const {accountId} = useParams()
    const account_id = accountId ? parseInt(accountId as string) : NaN;

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <h2 className='text-2xl '>
                View Transactions for {accountId}
            </h2>
            <TransactionsViewContainer accountId={account_id} />

            <h2 className='text-2xl'>
                Send Money
            </h2>
            <CreateTransaction accountId={account_id} />

        </div>
    )
}