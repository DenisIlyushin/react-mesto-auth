import Auth from './Auth.jsx';
import {useState} from 'react';

export default function Register(
  {
    onRegistration,
    title,
    buttonTitle,
    tip
  }
) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit() {
    onRegistration()
  }

  return (
    <Auth
      onSubmit={handleSubmit}
      title={title}
      buttonTitle={buttonTitle}
      tip={tip}
    >
      <input
        className='auth__input'
        id='email'
        type='text'
        name='email'
        placeholder='Email'
        value={email}
        onChange={event => setEmail(event.target.value)}
      />
      <input
        className='auth__input'
        type='text'
        name='password'
        placeholder='Пароль'
        value={password}
        onChange={event => setPassword(event.target.value)}
      />
    </Auth>
  )
}