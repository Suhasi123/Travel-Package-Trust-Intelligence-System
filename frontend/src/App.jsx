// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App


import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Packages from "./pages/Packages";
import Company from "./pages/Company";
import Compare from "./pages/Compare";
import Admin from "./pages/Admin";
import RegisterUser from "./pages/RegisterUser";
import RegisterCompany from "./pages/RegisterCompany";
import CompanyDashboard from "./pages/CompanyDashboard";
import CompanyLayout from "./pages/CompanyLayout";
import CompanyProfile from "./pages/CompanyProfile";
import CompanyDocuments from "./pages/CompanyDocuments";
import CompanyPackages from "./pages/CompanyPackages";
import CompanyBookings from "./pages/CompanyBookings";
import MyBookings from "./pages/MyBookings";
import AdminLogs from "./pages/AdminLogs";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/companies/:id" element={<Company />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/audit-logs" element={<AdminLogs />} />
        <Route path="/register-user" element={<RegisterUser />} />
        <Route path="/register-company" element={<RegisterCompany />} />
        <Route path="/company-dashboard" element={<CompanyDashboard />} />
        <Route path="/company" element={<CompanyLayout />}>
          <Route path="profile" element={<CompanyProfile />} />
          <Route path="documents" element={<CompanyDocuments />} />
          <Route path="packages" element={<CompanyPackages />} />
          <Route path="bookings" element={<CompanyBookings />} />
        </Route>
        <Route path="/my-bookings" element={<MyBookings />} />
      </Routes>
    </BrowserRouter>
  );
}
