import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useState } from "react";
import { HashRouter, Routes, Route } from 'react-router-dom';
import { User } from "./context/use-user";
import Authorization from './components/Authorization';
import Tasks from './components/Tasks';
import NotFoundPage from './components/NotFoundPage';
import Layout from './components/Layout';
import "./App.scss";
import { TaskList } from "./context/use-tasks";
import { ModalActive } from "./context/use-modal";
import Preloader from "./components/Preloader";

function App() {
  const [userName, setUserName] = useState('');

  const [taskList, setTaskList] = useState([]);//набір задач, до якого додається новоутворена задача

  const[modalActive, setModalActive] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [isLoaded, setIsLoaded] = useState(true);

  return (
    <>
      <User.Provider value={{userName, setUserName}}>
        <TaskList.Provider value={{ taskList, setTaskList }}>
          <ModalActive.Provider 
            value={{modalActive, setModalActive, showLoginForm, setShowLoginForm, showRegistrationForm, setShowRegistrationForm, isLoaded, setIsLoaded}}>
          <HashRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Authorization />} />
                <Route path="tasks" element={<Tasks />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </HashRouter>
          </ModalActive.Provider>
        </TaskList.Provider>
      </User.Provider>
      {!isLoaded
        ? <Preloader />
        : null
      }
    </>
  );
}

export default App;
