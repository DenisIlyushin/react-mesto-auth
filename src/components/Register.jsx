import Auth from './Auth.jsx';

export default function Register(
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
    <></>
  )
}