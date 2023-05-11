import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { HashRouter, Routes, Route } from 'react-router-dom';
import Authorization from './components/Authorization';
import Tasks from './components/Tasks';
import NotFoundPage from './components/NotFoundPage';
import Layout from './components/Layout';
import "./App.scss";

function App() {
 return (
  <>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Authorization />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </HashRouter>
  </>
 );
}

export default App;
