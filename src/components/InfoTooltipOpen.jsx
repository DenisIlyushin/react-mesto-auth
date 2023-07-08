import useCloseOnEsc from '../utils/useCloseOnEsc.jsx';
import successImage from '../images/tooltip-success.svg';
import failImage from '../images/tooltip-fail.svg'

export default function InfoTooltipOpen(
  {
    isOpen,
    onClose,
    popupType,
    isSuccess
  }
) {

  useCloseOnEsc({ isOpen, onClose })

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
      ${isOpen && 'popup_opened'}`
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
          className='popup__tooltip-content'
        >
          <img
            className='popup__tooltip-image'
            src={
              isSuccess
                ? successImage
                : failImage
            }
            alt={
              isSuccess
                ? 'Успешная регистрация, знак галочка'
                : 'Регистрация прошла не успешно, знак крестика'
            }
          />
          <h2
            className='popup__tooltip-header'
          >
            {
              isSuccess
                ? 'Вы успешно зарегистрировались!'
                : 'Что-то пошло не так! Попробуйте ещё раз.'
            }
          </h2>
        </div>

      </div>
    </div>
  )
}