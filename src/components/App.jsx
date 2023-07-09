import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Main from './Main.jsx';
import {useEffect, useState} from 'react';
import {Link, Route, Switch, useHistory} from 'react-router-dom'
import {CurrentUserContext} from '../context/CurrentUserContext';
import ImagePopup from './ImagePopup.jsx';
import api from '../utils/api.js';
import EditProfilePopup from './EditProfilePopup.jsx';
import EditAvatarPopup from './EditAvatarPopup.jsx';
import AddMestoPopup from './AddMestoPopup.jsx';
import ConfirmMestoDeletePopup from './ConfirmMestoDeletePopup.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import Register from './Register.jsx';
import Login from './Login.jsx';
import InfoTooltipOpen from './InfoTooltipOpen.jsx';
import auth from '../utils/auth.js';

function App() {
  //обработка попапов
  const [isUpdateAvatarPopupOpen, setIsUpdateAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddMestoPopupOpen, setIsAddMestoPopupOpen] = useState(false);
  const [isDeleteMestoPopupOpen, setIsDeleteMestoPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  //обработка данных
  const [selectedCard, setSelectedCard] = useState(null);
  const [initialCards, setInitialCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [isAuthSuccessful, setIsAuthSuccessful] = useState(false)
  // контекст пользователя
  const [user, setUser] = useState(null);
  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCards()])
      .then(([userInfo, cards]) => {
        setUser(userInfo);
        setInitialCards(cards);
      })
      .catch(console.log)
  }, [])
  // обработка авторизации
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState(null)
  const history = useHistory();

  // обработка попапов
  function closeAllPopups() {
    setIsUpdateAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddMestoPopupOpen(false);
    setIsDeleteMestoPopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard(null)
  }

  function handleUpdateAvatarPopup() {
    setIsUpdateAvatarPopupOpen(true)
  }

  function handleEditProfilePopup() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddMestoPopup() {
    setIsAddMestoPopupOpen(true)
  }

  // логика
  function handleLikeClick(card) {
    api.likeCard(card._id)
      .then((newCard) => {
        setInitialCards((state) => state.map((c) => c._id === card._id ? newCard : c))
      })
      .catch(console.log)
  }

  function handleDislikeClick(card) {
    api.dislikeCard(card._id)
      .then((newCard) => {
        setInitialCards((state) => state.map(c => c._id === card._id ? newCard : c))
      })
      .catch(console.log)
  }

  function handleDeleteConfirm(card) {
    setCardToDelete(card);
    setIsDeleteMestoPopupOpen(true)
  }

  function handleDeleteMesto(card) {
    setIsLoading(true)
    api.deleteCard(card._id)
      .then(() => {
        setInitialCards((state) => state.filter(c => c._id !== (card._id)));
        closeAllPopups()
      })
      .catch(console.log)
      .finally(() => setIsLoading(false))
  }

  function handleProfileUpdate(info) {
    setIsLoading(true)
    api.setUserInfo(info)
      .then(userInfo => {
        setUser(userInfo);
        closeAllPopups()
      })
      .catch(console.log)
      .finally(() => setIsLoading(false))
  }

  function handleAvatarUpdate(info) {
    setIsLoading(true)
    api.setUserAvatar(info)
      .then(avatar => {
        setUser(avatar);
        closeAllPopups()
      })
      .catch(console.log)
      .finally(() => setIsLoading(false))
  }

  function handleMestoAdd(data) {
    setIsLoading(true)
    api.createMesto(data)
      .then((card) => {
        setInitialCards([card, ...initialCards]);
        closeAllPopups()
      })
      .catch(console.log)
      .finally(() => setIsLoading(false))
  }

  // обработка авторизации и деавторизации пользователя
  function handleRegistration(email, password) {
    setIsLoading(true);
    auth.signup(email, password)
      .then((response) => {
        setIsAuthSuccessful(true);
        setIsInfoTooltipOpen(true);
        history.push('/sign-in');
      })
      .catch((error) => {
        setIsAuthSuccessful(false);
        setIsInfoTooltipOpen(true);
        console.log(error)
      })
      .finally(() => setIsLoading(false))
  }

  function handleLogin(email, password) {
    setIsLoading(true);
    auth.signin(email, password)
      .then(({token}) => {
        if (token) {
          localStorage.setItem('token', token);
          setIsLoggedIn(true);
          history.push('/');
        }
      })
      .catch((error) => {
        setIsAuthSuccessful(false);
        setIsInfoTooltipOpen(true);
        console.log(error)
      })
      .finally(() => setIsLoading(false))
  }

  function handleSignOut() {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    history.push('/sign-in')
  }

  // проверка токена
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      auth.me(token)
        .then((response) => {
          setIsLoggedIn(true);
          setUserEmail(response.data.email);
          history.push('/');
        })
        .catch(console.log)
    }
  });

  return (
    <CurrentUserContext.Provider value={user}>
      <div
        className="page"
      >
        <Header
          profileEmail={userEmail}
          onSignOut={handleSignOut}
        />
        <Switch>
          <Route
            path='/sign-in'
          >
            <Login
              onLogin={handleLogin}
              title={'Вход'}
              buttonTitle={'Войти'}
              isLoading={isLoading}
            />
          </Route>
          <Route
            path="/sign-up"
          >
            <Register
              onRegistration={handleRegistration}
              title={'Регистрация'}
              buttonTitle={'Зарегистрироваться'}
              isLoading={isLoading}
              tip={
                <p className={'auth__tip'}>
                  Уже зарегистрированы?&nbsp;
                  <Link
                    className='auth__link'
                    to='/sign-in'
                  >
                    Войти
                  </Link>
                </p>
              }
            />
          </Route>
          <Route
            path="/"
          >
            <ProtectedRoute
              component={Main}
              isloggedIn={isLoggedIn}
              onUserAvatarEdit={handleUpdateAvatarPopup}
              onUserProfileEdit={handleEditProfilePopup}
              onMestoAdd={handleAddMestoPopup}
              onMestoDelete={handleDeleteConfirm}
              onMestoShow={setSelectedCard}
              onMestoLike={handleLikeClick}
              onMestoDislike={handleDislikeClick}
              cards={initialCards}
            />
          </Route>
        </Switch>
        <Footer/>
        <EditAvatarPopup
          isOpen={isUpdateAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdate={handleAvatarUpdate}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdate={handleProfileUpdate}
        />
        <AddMestoPopup
          isOpen={isAddMestoPopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleMestoAdd}
          processStatus={isLoading}
        />
        <ConfirmMestoDeletePopup
          isOpen={isDeleteMestoPopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleDeleteMesto}
          card={cardToDelete}
          processStatus={isLoading}
        />
        <ImagePopup
          popupType={'show-mesto'}
          card={selectedCard}
          onClose={closeAllPopups}
        />
        <InfoTooltipOpen
          onClose={closeAllPopups}
          popupType='infoTooltip'
          isOpen={isInfoTooltipOpen}
          isSuccess={isAuthSuccessful}
        />
      </div>
    </ CurrentUserContext.Provider>);
}

export default App;
