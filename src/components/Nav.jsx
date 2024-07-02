import { Link } from "react-router-dom";
import MenuBar from "./MenuBar";
import ZaunaWhite from "../assets/ZaunaWhite.png"

function Nav() {
    return (
      <>
      <nav>
        <Link to ={"/"} className = "zaunahomelogo">
        <img src={ZaunaWhite} />
        </Link>
        <MenuBar />
      </nav>
      </>
    );
  }
  
  export default Nav;
  