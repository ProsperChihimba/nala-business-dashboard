import { Route, Routes } from 'react-router-dom'
import SignupPage from '../components/authentication/signup'
import EmailSent from '../components/authentication/signup/forms/emal_sent'
import Accounts from '../components/accounts';
import AccountView from '../components/accounts/account_view';
import DepositPage from "../components/deposit"
import SendTransaction from "../components/send"
import Vendors from "../components/vendor"
import WalletPage from "../components/wallet"
import ReportsPage from "../components/reports"
import TeamPage from "../components/team"
import NewVendor from "../components/vendor/body/new_vendor"

const AppRouter = () => {
    return (
      <Routes>
        <Route path="/" Component={SignupPage} /> 
        <Route path="/accounts" Component={Accounts} />
        <Route path="/email-sent" Component={Accounts} />
        <Route path="/account-view" Component={AccountView} />
        <Route path="/deposit" Component={DepositPage} />
        <Route path="/send" Component={SendTransaction} />
        <Route path="/vendors" Component={Vendors} />
        <Route path="/new-vendor" Component={NewVendor} />
        <Route path="/wallet" Component={WalletPage} />
        <Route path="/reports" Component={ReportsPage} />
        <Route path="/team" Component={TeamPage} />
      </Routes>
    )
}

export default AppRouter