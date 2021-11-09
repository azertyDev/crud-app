import { Link } from "react-router-dom";
import "./Header.css";

export const Header = () => {
  return (
    <header className="header">
      <Link to={"/"}>Main page</Link>
      <Link to={"/products/create"}>Create Product</Link>
    </header>
  );
};
