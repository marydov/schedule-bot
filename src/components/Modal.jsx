import "./modal.scss";

export default function Modal({active, setActive, children}) {
  
  const handleClick = () => {
    setActive(false);
  }

    return (
      <div className={active ? "active modal" : "modal"} onClick={handleClick}>
        {/* при кліку на затемнену область модальне вікно повинно закритися */}
        <div className={active ? "active modal__content" : "modal__content"} onClick={e => e.stopPropagation()}>{children}</div>
    {/* при кліку на область контенту модальне вікно не повинно закритися */}
      </div>
    );
  }