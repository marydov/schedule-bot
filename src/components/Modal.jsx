import "./modal.scss";
import { ModalActive } from "../context/use-modal";
import { useContext } from "react";

export default function Modal({children}) {

  const { modalActive, setModalActive } = useContext(ModalActive);
  
  const handleClick = () => {
    setModalActive(false);
  }

    return (
      <div className={modalActive ? "active modal" : "modal"} onClick={handleClick}>
        {/* при кліку на затемнену область модальне вікно повинно закритися */}
        <div className={modalActive ? "active modal__content" : "modal__content"} onClick={e => e.stopPropagation()}>{children}</div>
    {/* при кліку на область контенту модальне вікно не повинно закритися */}
      </div>
    );
  }