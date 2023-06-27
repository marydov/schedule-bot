import { useContext } from "react";
import Modal from '../components/modal/Modal';
import RegistrationForm from "../components/RegistrationForm";
import LoginForm from "../components/LoginForm";
import { ModalActive } from "../context/use-modal";

export default function Authorization() {

  const { showLoginForm, showRegistrationForm, setShowLoginForm, setShowRegistrationForm, setModalActive } = useContext(ModalActive);

  const handleLoginClick = () => {
    setShowLoginForm(true);
    setShowRegistrationForm(false);
    setModalActive(true);
  };

  const handleRegistrationClick = () => {
    setShowLoginForm(false);
    setShowRegistrationForm(true);
    setModalActive(true);
  };

 return (
  <>
    <div className="content">
      <p>Часто забуваєте про заплановані справи?</p>
      <p>Запізнюєтесь на зустрічі?</p>
      <p>Не вітаєте друзів з Днем Народження?</p>
      <p>Ми нагадаємо вам про всі важливі справи!</p>
      <p>Проходьте реєстрацію, переходьте в телеграм чат-бот
        за <a href='https://t.me/mydailytodolist_bot' target="_blank" rel="noopener noreferrer">посиланням</a> і натискайте <b>/start</b>. 
        Потім заповнюйте свій розклад.</p>
      <p><strong>*Важливо!</strong> В якості name використовуйте виключно username, під яким ви зареєстровані в Телеграмі (без знака @).</p>
      <div>
        <button className='open-btn' onClick={handleLoginClick}>Login</button>
        <button className='open-btn' onClick={handleRegistrationClick}>Register</button>
      </div>
    </div>
    <Modal>
        {showLoginForm && <LoginForm />}
        {showRegistrationForm && <RegistrationForm />}
    </Modal>
  </>
 );
}