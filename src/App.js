import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Content from './ui/Content';
import Main from './ui/Main';
import Profile from './components/Profile/Profile';
import Stats from './components/Stats/Stats';
import Team from './components/Team/Team';
import Event from './components/Event/Event';
import Dashboard from './pages/Dashboard';
import Inbox from './pages/inbox';
import Users from './pages/users';
import Products from './pages/products';
import Kanban from './pages/kanban';
import SignIn from './pages/signin';
import SignUp from './pages/signup';

const DashboardLayout = ({ darkMode, toggLeDarkMode, isSidebarOpen, toggLeSidebar, children }) => (
  <>
    <Header
      toggLeDarkMode={toggLeDarkMode}
      darkMode={darkMode}
      toggLeSidebar={toggLeSidebar}
    />
    <div className="flex">
      <Sidebar isSidebarOpen={isSidebarOpen} />
      <Main>
        {children}
        <Profile />
      </Main>
    </div>
  </>
);

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggLeDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggLeSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`${darkMode && 'dark'} font-quickSand`}>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="*"
          element={
            <DashboardLayout
              darkMode={darkMode}
              toggLeDarkMode={toggLeDarkMode}
              isSidebarOpen={isSidebarOpen}
              toggLeSidebar={toggLeSidebar}
            >
              <Routes>
                <Route path="/dashboard" element={<Dashboard darkMode={darkMode} />} />
                <Route path="/inbox" element={<Inbox />} />
                <Route path="/users" element={<Users />} />
                <Route path="/products" element={<Products />} />
                <Route path="/kanban" element={<Kanban />} />
                <Route path="*" element={<Dashboard darkMode={darkMode} />} />
              </Routes>
            </DashboardLayout>
          }
        />
      </Routes>
    </div>
  );
};

export default App;