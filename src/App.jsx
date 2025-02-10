import { Routes, Route,} from "react-router-dom";

import Home from "./Home";
import User from "./User";
import Admin from "./Admin";
import PrivateRoute from "./routes/PrivateRoute";
import Nav from "./Nav";
import Projects from "./user/Projects";
import Dashboard from "./user/Dashboard";
import AddTask from "./admin/AddTask";
import UserDone from "./user/UserDone";
import Profile from "./user/UserProfile";
import UserExcel from "./user/UserExcel";
import DashboardM from "./admin/DashboardM";
import UserTasks from "./admin/components/UserTasks";

function App() {

  return (
    <div className="min-h-screen h-full w-screen flex bg-light-bg dark:bg-dark-bg text-black dark:text-white dark:shadow-slate-950 relative" >
      <Nav />
      <main className="overflow-hidden ml-[80px] w-full z-0 relative h-screen overflow-y-auto">
        <Routes>
          <Route path="/projects" element={<Projects />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-task" element={<AddTask />} />
          <Route path="/" element={<Home />} />
          <Route path="/user" element={<User />} />
          <Route path="/admin" element={<PrivateRoute><Admin /></PrivateRoute>} />
          <Route path="/adminDashboard" element={<PrivateRoute><DashboardM /></PrivateRoute>} />
          <Route path="/userdone" element={<UserDone />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/userexcel" element={<UserExcel />} />
          <Route path="/usertasks" element={<UserTasks />} />
        </Routes>
      </main>

    </div>
  );
}

export default App;
