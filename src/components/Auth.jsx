export default function Auth(
  {
    onSubmit,
    title,
    buttonTitle,
    tip,
    children,
  }
) {

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit()
  }

  return (
    <div className='auth'>
      <div className='auth__container'>
        <form
          className='auth__form'
          onSubmit={handleSubmit}
        >
          <h2 className='auth__heading'>{title}</h2>
          {children}
          <button className='auth__submit-button'>{buttonTitle}</button>
          {tip}
        </form>
      </div>
    </div>
  )
}