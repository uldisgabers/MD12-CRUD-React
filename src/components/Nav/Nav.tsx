import { NavLink } from "react-router-dom";
import style from "./Nav.module.css";

const Nav = () => {
  return (
    <section className={style.navSection}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <nav className={style.nav}>
              <NavLink to="/" className={({ isActive }) => {
                return `${style.navItem} ${isActive ? style.active : ''}`
              }}>
                HOME
              </NavLink>
              <div className={style.bar}></div>
              <NavLink to="/cars" className={({ isActive }) => {
                return `${style.navItem} ${isActive ? style.active : ''}`
              }}>
                CARS
              </NavLink>
              <div className={style.bar}></div>
              <NavLink to="/about" className={({ isActive }) => {
                return `${style.navItem} ${isActive ? style.active : ''}`
              }}>
                ABOUT
              </NavLink>
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Nav;