import { useState } from "react";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Content from "./ui/Content";
import Main from "./ui/Main";
import Profile from "./components/Profile/Profile";
import Stats from "./components/Stats/Stats";
import Team from "./components/Team/Team";
import Event from "./components/Event/Event";

const App = () =>{
  const[darkMode, setDarkMode] = useState(false);
  const[isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`${darkMode && "dark"} font-quickSand`}>
      <Header toggLeDarkMode={toggleDarkMode} darkMode=
      {darkMode}
      toggLeSidebar={toggleSidebar}
      />

      <Sidebar isSidebarOpen={isSidebarOpen}/>

      <Main>
        <Content>
          <Stats darkMode={darkMode}/>

          <div className="flex flex-col gap-3 lg:flex-row">
            <Team />
            <Event />
          </div>
        </Content>
        <Profile />
      </Main>
    </div>
  );
};

export default App;