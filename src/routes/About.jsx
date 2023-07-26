import { useEffect, useContext } from "react";
import { User } from "../context/use-user";

export default function About() {

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
        <p>Привіт! Мене звуть Орищук Марина, і це мій pet-project. Проект був спрямований на те, щоб втілити в життя ті знання і навички, 
            які я опановувала, проходячи курси з front-end розробки і розвиваючись самостійно, а також щоб приносити людям практичну користь. 
        </p>
        <div><u>Отже, коротко про мене:</u>
            <ol>
                <li>Пройшла декілька курсів, у тому числі:
                    <ul>
                        <li>Front-end. Повний курс для початківців від Ciklum — Ciklum, Prometheus (жовтень 2022 - лютий 2023) - сертифікат 
                            з відзнакою</li>
                        <li>Front-end розробка — Prometheus (липень 2022 - жовтень 2022) - сертифікат з відзнакою</li>
                    </ul>
                </li>
                <li>Під час навчання виконала навчальний проект Книжковий інтернет-магазин, подивитись його можна за &nbsp; 
                    <a href="https://marydov.github.io/x-course-task/" 
                    target="_blank"
                    rel="noopener noreferrer">посиланням</a> 
                </li>
                <li>Маю досвід роботи з Google Apps Script, платформою, що дозволяє швидко та легко розробляти бізнес-рішення, націлені на 
                    інтеграцію з Google Workspace, розширення його функціоналу та автоматизацію завдань</li>
                <li>Завдяки реалізації розроблених мною скриптів клієнти автоматизували свою роботу та збільшили швидкість обробки даних у
                    своїх проектах у кілька разів
                </li>
                <li>Своїм головним завданням я бачу допомогу клієнтам у вирішенні проблем в їхніх проектах</li>
            </ol>
        </div>
        <div><u>І коротко про мій пет-проект:</u>
            <ol>
                <li>Проект був повністю придуманий і реалізований мною</li>
                <li>Він націлений на те, щоб нагадувати людям про їхні щоденні задачі, плани, події</li>
                <li>Front-end був реалізований за допомогою наступного стеку технологій та бібліотек:
                    <ul>
                        <li>React js</li>
                        <li>SCSS</li>
                        <li>Bootstrap</li>
                        <li>Formik</li>
                        <li>Yup</li>
                        <li>Moment</li>
                    </ul>
                </li>
                <li>У якості back-end я використала можливості Google Apps Script (google sheets)</li>
                <li>У скрипті працювала з телеграм API, що дозволило використати у якості зручного інструмента телеграм-бот</li>
                <li>Проект розміщений на GitHub, розгорнутий на GitHub Pages</li>
            </ol>
        </div>
      </>
    );
}