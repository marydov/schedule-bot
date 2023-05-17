import { useContext } from 'react';
import { User } from '../context/use-user';

export default function Tasks() {
    const { userName } = useContext(User);

    return (
     <>
      <p>
       Це сторінка задач
      </p>
      <p>Привіт, {userName}</p>
     </>
    );
   }