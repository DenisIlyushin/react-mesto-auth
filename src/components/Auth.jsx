import React from 'react';

export default function Auth(
  {
    onSubmit,
    title,
    buttonTitle,
    isValid,
    isLoading,
    children,
  }
) {
  function handleSubmit(event) {
    event.preventDefault();
    onSubmit()
  }

  function getFormFieldsByType(type) {
    return React.Children.map(children, (child => {
      if (child.type === type) return child;
      return null;
    }));
  }

  return (
    <div className="auth">
      <div className="auth__container">
        <form
          className="form form_type_auth"
          onSubmit={handleSubmit}
        >
          <h2 className="form__title form__title_type_auth">{title}</h2>
          {
            getFormFieldsByType('label')
          }
          <button
            className={
              `form__submit-button 
              form__submit-button_type_auth
               ${isValid ? '' : 'form__submit-button_inactive'}`
            }
            disabled={!isValid}
          >
            {
              isLoading
                ? 'Подождите...'
                : buttonTitle
            }
          </button>
          {
            getFormFieldsByType('p')
          }
        </form>
      </div>
    </div>
  )
}