import { NextResponse, NextRequest } from 'next/server'
import prisma from '@/lib/db';

interface PostBody {
    amount: number;
    senderID: number;
    receiverID: number;
}

interface Transaction {
    amount: number;
    id: number;
    senderId: number;
    receiverId: number;
    createdAt: Date;
}

async function getTransactions(accountId: string | null, type: string) {
    if (accountId) {
        const account_id = parseInt(accountId)
        switch (type) {
            case "sent": {
                const transactions = await prisma.transactions.findMany({
                    where: {
                        senderId: account_id
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }
                })
                return transactions
            }
     
            case "received": {
                const transactions = await prisma.transactions.findMany({
                    where: {
                        receiverId: account_id
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }
                  })
                return transactions
            }

            default:{
                const sent_transactions = await prisma.transactions.findMany({
                    where: {
                        senderId: account_id
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }
                })
                const received_transactions = await prisma.transactions.findMany({
                    where: {
                        receiverId: account_id
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }
                })

                let p_sent = 0
                let p_received = 0

                const ls = sent_transactions.length
                const lr = received_transactions.length

                const maxDate = new Date(8640000000000000);

                const transactions: Transaction[] = []

                while (p_sent < ls || p_received < lr) {
                    const sent: Transaction = sent_transactions[p_sent] || {createdAt: maxDate}
                    const received: Transaction = received_transactions[p_received] || {createdAt: maxDate}

                    if (sent.createdAt.getTime() < received.createdAt.getTime()){
                        transactions.push(sent)
                        p_sent ++
                    }
                    else {
                        transactions.push(received)
                        p_received ++
                    }
                }
                return transactions
            }
          }
    }
    else{
        const transactions = prisma.transactions.findMany(
            {
                orderBy: {
                    createdAt: 'desc' 
                }
            }
        )
        return transactions
    }
}

async function createTransaction(amount: number, senderId: number, receiverId: number){
    // note: negative balances are allowed. Catpital one account holder just needs to refill funds in given grace period
    // use prisma transaction feature for atomicity and consistency
    await prisma.$transaction([
        // update sender account
        prisma.accounts.update({
            where: {
                id: senderId
            },
            data: {
                balance: {
                    decrement: amount
                }
            }
        }),
        // update receiver account
        prisma.accounts.update({
            where: {
                id: receiverId
            },
            data: {
                balance: {
                    increment: amount
                }
            }
        }),
        // create transaction
        prisma.transactions.create({
            data:{
                senderId: senderId,
                receiverId: receiverId,
                amount: amount
            }
        })
      ])
}



 
export async function GET(request: NextRequest) {
    const search_body = request.nextUrl.searchParams
    const accountId = (search_body.get('id') || null)
    const type = (search_body.get('type') || 'all')

    try{
        const transactions = await getTransactions(accountId, type)
        return NextResponse.json({ data: transactions }, { status: 200 })
    }
    catch(e){
        console.error(e)
        return NextResponse.json({ error: e }, { status: 500 })
    }

}

export async function POST(request: NextRequest) {
    const body = await request.json() as PostBody

    try{
        await createTransaction(body.amount, body.senderID, body.receiverID)
    }
    catch(e){
        console.error(e)
        return NextResponse.json({ error: e }, { status: 500 })
    }

    return NextResponse.json({})
}