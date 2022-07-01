import { Routes, Route } from "react-router-dom";
import Expenses from "../pages/Expenses";
import Report from "../pages/Report";
import Dashboard from "../pages/Budgets";
import ViewBudget from "../components/view-budget";
import ViewExpense from "../components/view-expense";

const RouterFiles = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/:budgetId" element={<ViewBudget />} />
      <Route path="/expenses" element={<Expenses />} />
      <Route path="/expenses/:expenseId" element={<ViewExpense />} />
      <Route path="/report" element={<Report />} />
    </Routes>
  );
};

export default RouterFiles;
