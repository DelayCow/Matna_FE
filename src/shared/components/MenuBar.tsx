import { NavLink } from 'react-router-dom';
import "../styles/menuBar.css";

function menuBar() {
  return (
    <nav className="navbar fixed-bottom bg-white bottom-nav p-0">
      <div className="container-fluid p-0">
        <ul className="nav w-100 justify-content-between py-2 px-5">
          <li className="nav-item">
            <NavLink to="/" className={({ isActive }) => isActive ? "nav-link p-1 active" : "nav-link p-1"}>
              <i className="bi bi-house-door-fill"></i>
              홈
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/recipe" className={({ isActive }) => isActive ? "nav-link p-1 active" : "nav-link p-1"}>
              <i className="bi bi-book"></i>
              레시피
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/groupBuy" className={({ isActive }) => isActive ? "nav-link p-1 active" : "nav-link p-1"}>
              <i className="bi bi-basket"></i>
              공동 구매
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/mypage" className={({ isActive }) => isActive ? "nav-link p-1 active" : "nav-link p-1"}>
              <i className="bi bi-person"></i>
              MY
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default menuBar;