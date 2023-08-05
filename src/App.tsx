// import Accounts from './components/accounts';
// import AccountView from './components/accounts/account_view';
// import DepositPage from "./components/deposit"
// import SendTransaction from "./components/send"
// import Vendors from "./components/vendor"
import { BrowserRouter } from "react-router-dom"
// import SignupPage from "./components/authentication/signup"
import AppRouter from "./routes"
// import WalletPage from "./components/wallet"
// import ReportsPage from "./components/reports"
// import TeamPage from "./components/team"
// import NewVendor from "./components/vendor/body/new_vendor"

function App() {

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  )
}

export default App
