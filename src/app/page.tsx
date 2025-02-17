import AccountsViewContainer from "./components/AccountsViewContainer";
import CreateAccount from "./components/CreateAccount"


export default function Home() {
  return (
    <div>
      <main className="flex flex-col items-center justify-center gap-10">
        <h1 className="text-2xl">
          Welcome to Catpital One Bank Admin Console!
        </h1>

        <p>
          Here you can view all accounts and transactions associated with the accounts
        </p>

        <h2>
          Create an Account
        </h2>
        <CreateAccount />

        <h2>
          View Accounts
        </h2>
        <AccountsViewContainer />

      </main>
    </div>
  );
}
