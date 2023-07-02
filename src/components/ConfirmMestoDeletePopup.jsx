import PopupWithForm from './PopupWithForm.jsx';

export default function ConfirmMestoDeletePopup(
  { isOpen, onClose, onSubmit, card, processStatus }
) {
  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(card)
  }
  return (
    <PopupWithForm
      popupType={'delete-mesto'}
      popupTitle={'Вы уверены?'}
      submitText={processStatus ? 'Удаление' : 'Да'}
      card={card}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  )
}