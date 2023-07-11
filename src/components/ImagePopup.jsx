import useCloseOnEsc from '../hooks/useCloseOnEsc.jsx';

export default function ImagePopup(
  {
    popupType,
    card,
    onClose
  }
) {
  let isOpen = !!card

  useCloseOnEsc({isOpen, onClose})

  function handleClose(event) {
    if (event.target.classList.contains('popup_opened')
      || event.target.classList.contains('popup__close-button')) {
      return onClose()
    }
  }

  return (
    <div
      className={
        `popup popup_type_${popupType} 
      ${isOpen ? 'popup_opened' : ''}`
      } id="showMesto"
      onClick={handleClose}
    >
      <div className="popup__container-mesto">
        <button
          onClick={handleClose}
          className="popup__close-button"
          type="button"
        />
        <img
          src={isOpen ? card.link : '#'}
          alt={isOpen ? card.name : ' '}
          className="popup__image-popup"
        />
        <h2 className="popup__heading-popup">{isOpen ? card.name : ' '}</h2>
      </div>
    </div>
  )
}