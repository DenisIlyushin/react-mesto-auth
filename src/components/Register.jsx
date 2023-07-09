import Auth from './Auth.jsx';
import useValidate from '../hooks/useValidate.jsx';

export default function Register(
  {
    onRegistration,
    title,
    buttonTitle,
    isLoading,
    tip
  }
) {
  const {values, handleChange, errors, isValid, resetForm} = useValidate()

  function handleSubmit() {
    onRegistration(values.email, values.password)
    resetForm()
  }

  return (
    <Auth
      onSubmit={handleSubmit}
      title={title}
      buttonTitle={buttonTitle}
      isValid={isValid}
      isLoading={isLoading}
      tip={tip}
    >
      <label className="form__input-label">
        <input
          className="form__input form__input_type_auth"
          id="email"
          type="email"
          name="email"
          placeholder="Email"
          value={values.email || ''}
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
          type="password"
          name="password"
          placeholder="Пароль"
          value={values.password || ''}
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