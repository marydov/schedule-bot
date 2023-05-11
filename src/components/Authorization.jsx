import { useState } from "react";
import Modal from './Modal';
import RegistrationForm from "./RegistrationForm";
import LoginForm from "./LoginForm";

export default function Authorization() {

    const[modalActive, setModalActive] = useState(false);

        const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  const handleLoginClick = () => {
    setShowLoginForm(true);
    setShowRegistrationForm(false);
    setModalActive(true)
  };

  const handleRegistrationClick = () => {
    setShowLoginForm(false);
    setShowRegistrationForm(true);
    setModalActive(true)
  };

 return (
  <>
    <div className="content">
      <p>Часто забуваєте про заплановані справи?</p>
      <p>Запізнюєтесь на зустрічі?</p>
      <p>Не вітаєте друзів з Днем Народження?</p>
      <p>Ми нагадаємо вам про всі важливі справи!</p>
      <p>Проходьте реєстрацію і заповнюйте свій розклад.</p>
      <div>
        <button className='open-btn' onClick={handleLoginClick}>Login</button>
        <button className='open-btn' onClick={handleRegistrationClick}>Register</button>
      </div>
    </div>
    <Modal active={modalActive} setActive={setModalActive}>
        {showLoginForm && <LoginForm />}
        {showRegistrationForm && <RegistrationForm />}
    </Modal>
  </>
 );



//     const [showLoginForm, setShowLoginForm] = useState(false);
//   const [showRegistrationForm, setShowRegistrationForm] = useState(false);

//   const handleLoginClick = () => {
//     setShowLoginForm(true);
//     setShowRegistrationForm(false);
//   };

//   const handleRegistrationClick = () => {
//     setShowLoginForm(false);
//     setShowRegistrationForm(true);
//   };

//   return (
//     <div>
//         <p>
//      Часто забуваєте про заплановані справи? Запізнюєтесь на зустрічі? Не вітаєте
//      друзів з Днем Народження? Проходьте реєстрацію і ми нагадаємо вам про всі
//      важливі справи!
//     </p>
//       <button onClick={handleLoginClick}>Login</button>
//       <button onClick={handleRegistrationClick}>Register</button>
//       {showLoginForm && <LoginForm />}
//       {showRegistrationForm && <RegistrationForm />}
//     </div>
//   );
}