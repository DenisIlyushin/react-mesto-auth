import useCloseOnEsc from '../hooks/useCloseOnEsc.jsx';

export default function InfoTooltipOpen(
  {
    info: {isOpen, image, title},
    onClose,
    popupType,
  }
) {
  useCloseOnEsc({isOpen, onClose});

  function handleClose(event) {
    console.log('ns')
    if (event.target.classList.contains('popup_opened')
      || event.target.classList.contains('popup__close-button')) {
      return onClose()
    }
  }

  return (
    <div
      className={
        `popup popup_type_${popupType} 
      ${
          isOpen
            ? 'popup_opened'
            : ''
        }`
      } id="updateAvatar"
      onClick={handleClose}
    >
      <div className="popup__container">
        <button
          onClick={handleClose}
          className="popup__close-button"
          type="button"
        />
        <div
          className="popup__tooltip-content"
        >
          {image
            && <img
              className="popup__tooltip-image"
              src={image}
              alt={title}
            />
          }
          <h2
            className="popup__tooltip-header"
          >
            {title}
          </h2>
        </div>
      </div>
    </div>
  )
}