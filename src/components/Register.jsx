import Auth from './Auth.jsx';
import useValidate from '../hooks/useValidate.jsx';
import {Link} from 'react-router-dom';

export default function Register(
  {
    onRegistration,
    title,
    buttonTitle,
    isLoading,
  }
) {
  const {values, errors, isValid,  handleChange} = useValidate()

  function handleSubmit() {
    onRegistration(values.email, values.password)
  }

  return (
    <Auth
      onSubmit={handleSubmit}
      title={title}
      buttonTitle={buttonTitle}
      isValid={isValid}
      isLoading={isLoading}
    >
      <label className="form__input-label">
        <input
          className="form__input form__input_type_auth"
          id="registerEmail"
          type="email"
          name="email"
          placeholder="Email"
          value={values.email || ''}
          onChange={handleChange}
          required={true}
        />
        <span
          className={`form__input-error ${isValid ? '' : 'form__input-error_active'}`}
        >
          {errors.email}
        </span>
      </label>
      <label className="form__input-label">
        <input
          className="form__input form__input_type_auth"
          id="registerPassword"
          type="password"
          name="password"
          placeholder="Пароль"
          value={values.password || ''}
          onChange={handleChange}
          required={true}
        />
        <span
          className={`form__input-error ${isValid ? '' : 'form__input-error_active'}`}
        >
          {errors.password}
        </span>
      </label>
      <p className={'auth__tip'}>
        Уже зарегистрированы?&nbsp;
        <Link
          className='auth__link'
          to='/sign-in'
        >
          Войти
        </Link>
      </p>
    </Auth>
  )
}