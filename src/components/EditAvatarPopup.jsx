import PopupWithForm from './PopupWithForm.jsx';
import {useEffect} from 'react';
import useValidate from '../hooks/useValidate.jsx';

export default function EditAvatarPopup({ isOpen, onClose, onUpdate, processStatus }) {
  const {values, handleChange, errors, isValid, resetForm, setValues} = useValidate()

  useEffect(() => {
    setValues({
      avatar: ''
    })
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen])

  function handleSubmit(event) {
    event.preventDefault();
    onUpdate({
      avatar: values.avatar
    });
    resetForm()
  }

  return (
    <PopupWithForm
      popupType={'update-avatar'}
      popupTitle={'Обновить аватар'}
      submitText={processStatus ? 'Обновление' : 'Обновить'}
      isOpen={isOpen}
      isValid={isValid}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="form__input-label">
        <input
          className="form__input form__input_type_source"
          id="userAvatar"
          name="avatar"
          type="url"
          placeholder="Ссылка на изображение"
          required minLength="2"
          value={values.avatar || ''}
          onChange={handleChange}
        />
        <span
          className={`form__input-error ${isValid ? '' : 'form__input-error_active'}`}
        >
          {errors.avatar}
        </span>
      </label>
    </PopupWithForm>
  )
}