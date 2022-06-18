import { Routes, Route } from "react-router-dom";
import Expenses from "../pages/Expenses";
import Report from "../pages/Report";
import Dashboard from "../pages/Budgets";

const RouterFiles = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/expenses" element={<Expenses />} />
      <Route path="/report" element={<Report />} />
    </Routes>
  );
};

export default RouterFiles;
