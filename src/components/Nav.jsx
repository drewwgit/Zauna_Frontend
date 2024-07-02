import { Link } from "react-router-dom";
import MenuBar from "./MenuBar";
import ZaunaWhite from "../assets/ZaunaWhite.png"

function Nav() {
    return (
      <>
      <nav>
        <div className="navlinks">
        <Link to={"/aboutus"} className="aboutus"> About Us </Link>
        </div>
        <Link to ={"/"} className = "zaunahomelogo">
        <img src={ZaunaWhite} />
        </Link>
        <MenuBar />
      </nav>
      </>
    );
  }
  
  export default Nav;
  