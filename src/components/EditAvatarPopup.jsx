import PopupWithForm from './PopupWithForm.jsx';
import {useEffect, useRef} from 'react';

export default function EditAvatarPopup({ isOpen, onClose, onUpdate, processStatus }) {
  const avatar = useRef('#');

  useEffect(() => {
    avatar.current.value = ''
  }, [isOpen])

  function handleSubmit(event) {
    event.preventDefault();
    onUpdate({
      avatar: avatar.current.value
    })
  }

  return (
    <PopupWithForm
      popupType={'update-avatar'}
      popupTitle={'Обновить аватар'}
      submitText={processStatus ? 'Обновление' : 'Обновить'}
      isOpen={isOpen}
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
          ref={avatar}
        />
        <span className="form__input-error userAvatar-error"></span>
      </label>
    </PopupWithForm>
  )
}