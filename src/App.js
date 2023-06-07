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

const lsData = localStorage.getItem('user');
const person = JSON.parse(lsData);

function App() {
  const [userName, setUserName] = useState(person.name);

  const [taskList, setTaskList] = useState([]);//набір задач, до якого додається новоутворена задача

  function updateUserName(value) {
    setUserName(value);
  }

  return (
    <>
      <User.Provider value={{userName, updateUserName}}>
        <TaskList.Provider value={{ taskList, setTaskList }}>
          <HashRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Authorization />} />
                <Route path="tasks" element={<Tasks />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </HashRouter>
        </TaskList.Provider>
      </User.Provider>
    </>
  );
}

export default App;
