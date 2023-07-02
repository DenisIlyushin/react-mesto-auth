import PopupWithForm from './PopupWithForm.jsx';
import {useEffect, useState} from 'react';

export default function AddMestoPopup({ isOpen, onClose, onSubmit, processStatus }) {
  const [name, setName] = useState('')
  const [link, setLink] = useState('#')

  useEffect(() => {
    setName('');
    setLink('')
  }, [isOpen])

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit({
      name: name,
      link: link
    })
  }

  return (
    <PopupWithForm
      popupType={'add-mesto'}
      popupTitle={'Новое место'}
      submitText={processStatus ? 'Сохранение' : 'Создать'}
      isOpen={isOpen}
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
          value={name || ''}
          onChange={(event) => setName(event.target.value)}
        />
        <span className="form__input-error mestoName-error"></span>
      </label>
      <label className="form__input-label">
        <input
          className="form__input form__input_type_mesto-url"
          id="mestoUrl"
          name="link"
          type="url"
          placeholder="Ссылка на картинку"
          required
          value={link || ''}
          onChange={(event) => setLink(event.target.value)}
        />
        <span className="form__input-error mestoUrl-error"></span>
      </label>
    </PopupWithForm>
  )
}