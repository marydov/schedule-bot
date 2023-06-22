// import { ModalActive } from "../context/use-modal";
// import { useContext } from "react";//на сторінках фетч-запитів
import "./preloader.scss";

export default function Preloader() {

    // const { isLoaded, setIsLoaded } = useContext(ModalActive);//на сторінках фетч-запитів
  
      return (
        <>
          <div className="preloader">
            <div className="loader"></div>
          </div>
        </>
      );
    }