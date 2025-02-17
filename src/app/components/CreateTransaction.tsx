'use client'
import React, { useEffect, useState } from 'react'


interface Account{
    id: number,
    balance: number,
    createdAt: string,
    email: string
}

interface CreateTransactionProps{
    accountId: number
}



const CreateTransaction: React.FC<CreateTransactionProps> = ({accountId}) => {
    const [recipientId, setRecipientId] = useState<number | null> (null)
    const [amount, setAmount] = useState<number> (0)
    const [loading, setLoading] = useState<boolean>(false)
    const [message, setMessage] = useState<string>("")
    const [recipients, setRecipients] = useState<number[]>([])

    useEffect(()=>{
        const fetchData = async () => {
            const data = await fetch('/api/accounts')
            const json = await data.json()
            const id_array = json.data.map((item: Account) => item.id)
            setRecipients(id_array)
            
        }
        fetchData();
    }, [])


    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if(amount <= 0){
            setMessage("amount cannot be less than or equal to 0")
            throw new Error("amount cannot be less than or equal to 0")
        }
        if(! recipientId || ! recipients.includes(recipientId) || recipientId ===accountId){
            setMessage("invalid recipient")
            throw new Error("invalid recipient")
        }
        
        setLoading(true);
        setMessage("");

        try {
            const response = await fetch("/api/transactions", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                amount: amount,
                senderID: accountId,
                receiverID: recipientId,
              }),
            });
      
            if (!response.ok) {
              throw new Error("Failed to create account");
            }
      
            setMessage("Funds have been sent! 🎉");
            setRecipientId(null);
            setAmount(0);
          } catch (error : unknown) {
            setMessage("Error: " + error);
          } finally {
            setLoading(false);
          }
        };
      
    


    return(
        <div className="p-6 max-w-md mx-auto bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Send Money!</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                <label className="block text-sm font-medium text-gray-700">
                    Recipient Account Id
                </label>
                <input
                    type="number"
                    value={recipientId || ""}
                    onChange={(e) => setRecipientId(parseInt(e.target.value))}
                    required
                    className="mt-1 p-2 w-full border rounded-md"
                />
                </div>

                <div>
                <label className="block text-sm font-medium text-gray-700">
                    Amount to Send
                </label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(parseInt(e.target.value))}
                    required
                    className="mt-1 p-2 w-full border rounded-md"
                />
                </div>

                <button
                type="submit"
                disabled={loading}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
                >
                {loading ? "Sending..." : "Send Money"}
                </button>
            </form>

            {message && <p className="mt-4 text-center text-sm text-gray-600">{message}</p>}
        </div>
    )
}

export default CreateTransaction;