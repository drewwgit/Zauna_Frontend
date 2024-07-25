import { Link } from "react-router-dom";
import HamburgerMenu from "./HamburgerMenu";
import ZaunaWhite from "../assets/ZaunaWhite.png"
import "../index.css"

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
        <HamburgerMenu />
      </nav>
      </>
    );
  }
  
  export default Nav;
  