import { Route, Routes } from "react-router-dom";
import SignupPage from "../components/authentication/signup";
import EmailSent from "../components/authentication/signup/forms/emal_sent";
import Accounts from "../components/accounts";
import AccountView from "../components/accounts/account_view";
import DepositPage from "../components/deposit";
import SendTransaction from "../components/send";
import Vendors from "../components/vendor";
import ReportsPage from "../components/reports";
import TeamPage from "../components/team";
import NewVendor from "../components/vendor/body/new_vendor";
import ExpensesPage from "../components/expenses";
import Login from "../components/login";
import Consultation from "../components/consultation";
import PatientDetailsPage from "../components/consultation/client_details/[id]";
import AddClerkSheet from "../components/consultation/add_clerksheet";
import Learn from "../components/learn";
import ProtectedRoute from "../components/ProtectedRoute";

const AppRouter = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" Component={SignupPage} />
      <Route path="/email-sent" Component={EmailSent} />
      <Route path="/login" Component={Login} />
      
      {/* Protected routes - require authentication */}
      <Route path="/accounts-page" element={
        <ProtectedRoute>
          <Accounts />
        </ProtectedRoute>
      } />
      <Route path="/patient-details/:id" element={
        <ProtectedRoute>
          <PatientDetailsPage />
        </ProtectedRoute>
      } />
      <Route path="/account-view" element={
        <ProtectedRoute>
          <AccountView />
        </ProtectedRoute>
      } />
      <Route path="/add-clerksheet" element={
        <ProtectedRoute>
          <AddClerkSheet />
        </ProtectedRoute>
      } />
      <Route path="/deposit" element={
        <ProtectedRoute>
          <DepositPage />
        </ProtectedRoute>
      } />
      <Route path="/send" element={
        <ProtectedRoute>
          <SendTransaction />
        </ProtectedRoute>
      } />
      <Route path="/vendors" element={
        <ProtectedRoute>
          <Vendors />
        </ProtectedRoute>
      } />
      <Route path="/consultation" element={
        <ProtectedRoute>
          <Consultation />
        </ProtectedRoute>
      } />
      <Route path="/learn" element={
        <ProtectedRoute>
          <Learn />
        </ProtectedRoute>
      } />
      <Route path="/vendors/new-vendor" element={
        <ProtectedRoute>
          <NewVendor />
        </ProtectedRoute>
      } />
      <Route path="/reports" element={
        <ProtectedRoute>
          <ReportsPage />
        </ProtectedRoute>
      } />
      <Route path="/team" element={
        <ProtectedRoute>
          <TeamPage />
        </ProtectedRoute>
      } />
      <Route path="/expenses" element={
        <ProtectedRoute>
          <ExpensesPage />
        </ProtectedRoute>
      } />
    </Routes>
  );
};

export default AppRouter;
