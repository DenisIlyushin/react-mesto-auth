import Auth from './Auth.jsx';
import useValidate from '../hooks/useValidate.jsx';

export default function Login(
  {
    onLogin,
    title,
    buttonTitle,
    isLoading
  }
) {
  const {values, handleChange, errors, isValid, resetForm} = useValidate()

  function handleSubmit() {
    onLogin(values.email, values.password)
    resetForm()
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
          id="loginEmail"
          type="email"
          name="email"
          placeholder="Email"
          value={values.email || ''}
          required={true}
          onChange={handleChange}
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
          type="loginPassword"
          name="password"
          placeholder="Пароль"
          value={values.password || ''}
          required={true}
          onChange={handleChange}
        />
        <span
          className={`form__input-error ${isValid ? '' : 'form__input-error_active'}`}
        >
          {errors.password}
        </span>
      </label>
    </Auth>
  )
}