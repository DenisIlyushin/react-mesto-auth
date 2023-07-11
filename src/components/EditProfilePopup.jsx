import PopupWithForm from './PopupWithForm.jsx';
import {CurrentUserContext} from '../context/CurrentUserContext.jsx';
import {useContext, useEffect} from 'react';
import useValidate from '../hooks/useValidate.jsx';

export default function EditProfilePopup(
  {
    isOpen,
    onClose,
    onUpdate,
    processStatus
  }
) {
  const currentUser = useContext(CurrentUserContext);
  const {values, errors, isValid, setValues, handleChange, resetForm} = useValidate()

  useEffect(() => {
    setValues(
      currentUser
        ? {name: currentUser.name, job: currentUser.about}
        : {name: '', job: ''}
    );
    if (!isOpen) {
      resetForm();
    }
  }, [currentUser, isOpen]);

  function handleSubmit(event) {
    event.preventDefault();
    onUpdate({
      name: values.name,
      about: values.job
    });
  }

  return (
    <PopupWithForm
      popupType={'edit-profile'}
      popupTitle={'Редактировать профиль'}
      submitText={processStatus ? 'Сохранение' : 'Сохранить'}
      isOpen={isOpen}
      isValid={isValid}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="form__input-label">
        <input
          className="form__input form__input_type_username"
          id="userName"
          name="name"
          type="text"
          placeholder="Ваше имя?"
          required
          minLength="2"
          maxLength="40"
          value={values.name || ''}
          onChange={handleChange}
        />
        <span
          className={`form__input-error ${isValid ? '' : 'form__input-error_active'}`}
        >
          {errors.name}
        </span>
      </label>
      <label className="form__input-label">
        <input
          className="form__input form__input_type_user-job"
          id="userJob"
          name="job"
          type="text"
          placeholder="Чем занимаетесь?"
          required
          minLength="2"
          maxLength="200"
          value={values.job || ''}
          onChange={handleChange}
        />
        <span
          className={`form__input-error ${isValid ? '' : 'form__input-error_active'}`}
        >
          {errors.job}
        </span>
      </label>
    </PopupWithForm>
  )
}