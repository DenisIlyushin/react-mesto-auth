import PopupWithForm from './PopupWithForm.jsx';
import {useEffect} from 'react';
import useValidate from '../hooks/useValidate.jsx';

export default function AddMestoPopup({ isOpen, onClose, onSubmit, processStatus }) {
  const {values, errors, isValid, setValues, handleChange, resetForm} = useValidate()

  useEffect(() => {
    setValues({
      name: '',
      link: ''
    })
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen])

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit({
      name: values.name,
      link: values.link
    });
    resetForm()
  }

  return (
    <PopupWithForm
      popupType={'add-mesto'}
      popupTitle={'Новое место'}
      submitText={processStatus ? 'Сохранение' : 'Создать'}
      isOpen={isOpen}
      isValid={isValid}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="form__input-label">
        <input
          className="form__input form__input_type_mesto-heading"
          id="mestoName"
          name="name"
          type="text"
          placeholder="Название"
          required
          minLength="2"
          maxLength="30"
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
          className="form__input form__input_type_mesto-url"
          id="mestoUrl"
          name="link"
          type="url"
          placeholder="Ссылка на картинку"
          required
          value={values.link || ''}
          onChange={handleChange}
        />
        <span
          className={`form__input-error ${isValid ? '' : 'form__input-error_active'}`}
        >
          {errors.link}
        </span>
      </label>
    </PopupWithForm>
  )
}