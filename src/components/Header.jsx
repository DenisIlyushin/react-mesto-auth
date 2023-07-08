import logo from '../images/logo-white.svg';
import {Link, useLocation} from 'react-router-dom';

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
      {
        location.pathname === '/sign-in'
        && <Link
          to="/sign-up"
          className="header__auth"
        >
          Регистрация
        </Link>
      }
      {
        location.pathname === '/sign-up'
        && <Link
          to="/sign-in"
          className="header__auth"
        >
          Вход
        </Link>
      }
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