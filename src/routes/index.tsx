import { Route, Routes } from 'react-router-dom'
import SignupPage from '../components/authentication/signup'
import EmailSent from '../components/authentication/signup/forms/emal_sent'

const AppRouter = () => {
    return (
      <Routes>
        <Route path="/" Component={EmailSent} />
      </Routes>
    )
}

export default AppRouter