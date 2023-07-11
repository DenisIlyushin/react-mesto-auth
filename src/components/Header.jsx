import logo from '../images/logo-white.svg';
import {Link, Route, Routes, useLocation} from 'react-router-dom';

export default function Header(
  {
    profileEmail,
    onSignOut
  }
) {
  const location = useLocation()

  return (
    <header className="header">
      <img
        src={logo}
        alt="Логотип"
        className="header__logo"
      />
      <Routes>
        <Route
          path="/sign-in"
          element={
            <Link
              to="/sign-up"
              className="header__auth"
            >
              Регистрация
            </Link>
          }
        />
        <Route
          path="/sign-up"
          element={
            <Link
              to="/sign-in"
              className="header__auth"
            >
              Вход
            </Link>
          }
        />
      </Routes>
      {
        location.pathname === '/'
        && <nav
          className="header__menu">
          <span
            className="header__profile-info"
          >
            {profileEmail}
          </span>
          <button
            className="header__signout-button"
            onClick={() => onSignOut()}
          >
            Выйти
          </button>
        </nav>
      }
    </header>
  )
}