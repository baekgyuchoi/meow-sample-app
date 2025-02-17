'use client'
import React, {useState} from 'react'





const CreateAccount: React.FC = () => {
    const [email, setEmail] = useState<string> ("")
    const [balance, setBalance] = useState<number> (0)
    const [loading, setLoading] = useState<boolean>(false)
    const [message, setMessage] = useState<string>("")
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true);
        setMessage("");

        try {
            const response = await fetch("/api/accounts", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email,
                balance: Number(balance),
              }),
            });
      
            if (!response.ok) {
              throw new Error("Failed to create account");
            }
      
            setMessage("Account successfully created! 🎉");
            setEmail("");
            setBalance(0);
          } catch (error : unknown) {
            setMessage("Error: " + error);
          } finally {
            setLoading(false);
          }
        };
      
    


    return(
        <div className="p-6 max-w-md mx-auto bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Create Account</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                <label className="block text-sm font-medium text-gray-700">
                    Email
                </label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mt-1 p-2 w-full border rounded-md"
                />
                </div>

                <div>
                <label className="block text-sm font-medium text-gray-700">
                    Starting Balance
                </label>
                <input
                    type="number"
                    value={balance}
                    onChange={(e) => setBalance(parseInt(e.target.value))}
                    required
                    className="mt-1 p-2 w-full border rounded-md"
                />
                </div>

                <button
                type="submit"
                disabled={loading}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
                >
                {loading ? "Creating..." : "Create Account"}
                </button>
            </form>

            {message && <p className="mt-4 text-center text-sm text-gray-600">{message}</p>}
        </div>
    )
}

export default CreateAccount;