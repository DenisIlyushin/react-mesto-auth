import PopupWithForm from './PopupWithForm.jsx';
import {CurrentUserContext} from '../context/CurrentUserContext.jsx';
import {useContext, useEffect, useState} from 'react';

export default function EditProfilePopup({ isOpen, onClose, onUpdate, processStatus }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [job, setJob] = useState('');

  useEffect(() => {
    setName(currentUser ? currentUser.name : '');
    setJob(currentUser ? currentUser.about : '');
  }, [currentUser, isOpen]);

  function handleSubmit(event) {
    event.preventDefault();
    onUpdate({
      name: name,
      about: job
    })
  }

  return (
    <PopupWithForm
      popupType={'edit-profile'}
      popupTitle={'Редактировать профиль'}
      submitText={processStatus ? 'Сохранение' : 'Сохранить'}
      isOpen={isOpen}
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
          value={name || ''}
          onChange={(event) => setName(event.target.value)}
        />
        <span className="form__input-error userName-error"></span>
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
          value={job || ''}
          onChange={(event) => setJob(event.target.value)}
        />
        <span className="form__input-error userJob-error"></span>
      </label>
    </PopupWithForm>
  )
}