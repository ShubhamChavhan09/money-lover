import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Expenses from "../pages/Expenses";
import Report from "../pages/Report";
import Dashboard from "../components/dashboard";
import Lists from "../pages/Lists";

const RouterFiles = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/expenses" element={<Expenses />}>
        <Route path=":id" element={<Lists />} />
      </Route>
      <Route path="/report" element={<Report />} />
    </Routes>
  );
};

export default RouterFiles;
