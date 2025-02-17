import { NextResponse, NextRequest } from 'next/server'
import prisma from '@/lib/db'

interface PostBody {
    balance: number;
    email: string;
}

interface PutBody {
    balance: number;
    accountId: number;
}

async function getAccounts(accountId: string | null) {
    
    if (accountId) {
        //Get specific account and return info
        const account_id = parseInt(accountId)
        const accounts = await prisma.accounts.findUnique(({
            where: {
              id: account_id
            },
          }))
        return [accounts]
    }
    else {
        //Get all accounts and return their info
        const accounts = await prisma.accounts.findMany()
        return accounts
    }
    
}

async function createAccount(balance: number, email: string){

    await prisma.accounts.create({
        data: {
            email: email,
            balance: balance
            },
    })
}

async function updateAccount(balance: number, accountId: number){
    await prisma.accounts.update({
        where: {
            id: accountId
        },
        data: {
            balance: balance
        }
    });
}
 
export async function GET(request: NextRequest) {
    const search_body = request.nextUrl.searchParams
    const accountId = (search_body.get('id') || null)
    try{
        const accounts = await getAccounts(accountId)
        return NextResponse.json({ data: accounts }, { status: 200 })
    }
    catch(e){
        return NextResponse.json({ error: e }, { status: 500 })
    }


}

export async function POST(request: NextRequest) {
    const body = await request.json() as PostBody
    if (body.email.length < 1 || body.balance <= 0) {
        return NextResponse.json({ message: "invalid input" }, { status: 400 })
      }

    try{
        await createAccount(body.balance, body.email)
        return NextResponse.json({ message: "successfully created" }, { status: 201 })
    }
    catch(e){
        return NextResponse.json({ error: e }, { status: 500 })
    }

}

export async function PUT(request: NextRequest) {
    const body = await request.json() as PutBody;

    try{
        await updateAccount(body.balance, body.accountId)
        return NextResponse.json({ message: "account successfully updated" }, { status: 200 })
    }
    catch(e){
        return NextResponse.json({ error: e }, { status: 500 })
    }
}