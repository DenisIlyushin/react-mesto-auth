import Auth from './Auth.jsx';

export default function Login(
  {
    onRegistration,
    title,
    // tip
  }
) {

  function handleSubmit(event) {
    event.preventDefault();
    onRegistration()
  }

  return (
    <Auth
      onSubmit={handleSubmit}
      title={title}
    >

    </Auth>
  )
}