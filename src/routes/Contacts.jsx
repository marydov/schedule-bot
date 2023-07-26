import { useEffect, useContext } from "react";
import { User } from "../context/use-user";

export default function Contacts() {

  const { setUserName } = useContext(User);

  useEffect(() => {

    const user = localStorage.getItem('user');
    const person = JSON.parse(user);

    if (user) {
        setUserName(person.name);
    }

}, [setUserName]);
    
    return (
      <>
        <p>Орищук Марина</p>
        <p>+38(099) 017-13-03</p>
        <p>orishchukmarina@gmail.com</p>
        <p>
            <a href="https://www.linkedin.com/in/marina-orishchuk-6130b2267/" 
            target="_blank"
            rel="noopener noreferrer">LinkedIn</a>
        </p>
      </>
    );
}