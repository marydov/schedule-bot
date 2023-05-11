import { Link } from 'react-router-dom';

export default function LoginForm() {
    return (
     <form>
      <label>
       Username з Телеграму:
       <input type="text" />
      </label>
   
      <label>
       Пароль:
       <input type="password" />
      </label>
      <Link to={`/tasks`}>
      <button className="btn btn-light" type="submit">Send</button>
      </Link>
      
     </form>
    );
   }