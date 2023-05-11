import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Styles } from './Styles';

export default function Layout(props) {
    return (
      <Styles className="App">
        <Header setUserName={props.setUserName} />
        <main>
          <Outlet />
        </main>
        <Footer />
      </Styles>
    );
  }