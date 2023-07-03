import {useState} from 'react';

export default function Auth(
  {
    onSubmit,
    title,
    // tip,
    // children,
  }
) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
          {/*{children}*/}
          <input
            className='auth__input'
            id='email'
            type='text'
            name='email'
            placeholder='email'
            value={email}
            onChange={event => setEmail(event.target.value)}
          />
          <input
            className='auth__input'
            type='text'
            name='password'
            placeholder='password'
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
          <button className='auth__submit-button'></button>
          {/*{tip}*/}
          <p className={'auth__tip'}>
            Уже зарегистированы? <a className='auth__link'>Войти</a>
          </p>
        </form>
      </div>
    </div>
  )
}