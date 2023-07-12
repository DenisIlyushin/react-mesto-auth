import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Main from './Main.jsx';
import {useEffect, useState} from 'react';
import {Route, Routes, useNavigate} from 'react-router-dom';
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
import successImage from '../images/tooltip-success.svg';
import failImage from '../images/tooltip-fail.svg'

function App() {
  //обработка попапов
  const [isUpdateAvatarPopupOpen, setIsUpdateAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddMestoPopupOpen, setIsAddMestoPopupOpen] = useState(false);
  const [isDeleteMestoPopupOpen, setIsDeleteMestoPopupOpen] = useState(false);
  //обработка данных
  const [selectedCard, setSelectedCard] = useState(null);
  const [initialCards, setInitialCards] = useState([]);
  const [cardToDelete, setCardToDelete] = useState(null);
  //обработка состояния загрузки
  const [isDeleteMestoLoading, setIsDeleteMestoLoading] = useState(false)
  const [isProfileUpdateLoading, setIsProfileUpdateLoading] = useState(false)
  const [isAvatarUpdateLoading, setIsAvatarUpdateLoading] = useState(false)
  const [isMestoAddLoading, setIsMestoAddLoading] = useState(false)
  const [isRegistrationLoading, setIsRegistrationLoading] = useState(false)
  const [isLoginLoading, setIsLoginLoading] = useState(false)
  // обработка модальных окон InfoToolTip
  const [tooltipInfo, setTooltipInfo] = useState({
    isOpen: false,
    image: null,
    alt: '',
    title: ''
  })
  // обработка авторизации
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('')
  const navigate = useNavigate();
  // контекст пользователя
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (!isLoggedIn) {
      return
    }
    Promise.all([api.getUserInfo(), api.getCards()])
      .then(([userInfo, cards]) => {
        setUser(userInfo);
        setInitialCards(cards);
      })
      .catch(console.log)
  }, [isLoggedIn])

  // обработка попапов
  function closeAllPopups() {
    setIsUpdateAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddMestoPopupOpen(false);
    setIsDeleteMestoPopupOpen(false);
    // setIsInfoTooltipOpen(false);
    setTooltipInfo({
      isOpen: false,
      image: '',
      title: ''
    })
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
    setIsDeleteMestoLoading(true)
    api.deleteCard(card._id)
      .then(() => {
        setInitialCards((state) => state.filter(c => c._id !== (card._id)));
        closeAllPopups()
      })
      .catch(console.log)
      .finally(() => setIsDeleteMestoLoading(false))
  }

  function handleProfileUpdate(info) {
    setIsProfileUpdateLoading(true)
    api.setUserInfo(info)
      .then(userInfo => {
        setUser(userInfo);
        closeAllPopups()
      })
      .catch(console.log)
      .finally(() => setIsProfileUpdateLoading(false))
  }

  function handleAvatarUpdate(info) {
    setIsAvatarUpdateLoading(true)
    api.setUserAvatar(info)
      .then(userInfo => {
        setUser(userInfo);
        closeAllPopups()
      })
      .catch(console.log)
      .finally(() => setIsAvatarUpdateLoading(false))
  }

  function handleMestoAdd(data) {
    setIsMestoAddLoading(true)
    api.createMesto(data)
      .then((card) => {
        setInitialCards([card, ...initialCards]);
        closeAllPopups()
      })
      .catch(console.log)
      .finally(() => setIsMestoAddLoading(false))
  }

  // обработка авторизации и деавторизации пользователя
  function handleRegistration(email, password) {
    setIsRegistrationLoading(true);
    auth.signUp(email, password)
      .then(() => {
        setTooltipInfo({
          isOpen: true,
          image: successImage,
          title: 'Вы успешно зарегистрировались!'
        })
        navigate('/sign-in')
      })
      .catch((error) => {
        setTooltipInfo({
          isOpen: true,
          image: failImage,
          title: 'Что-то пошло не так! Попробуйте ещё раз.'
        })
        console.log(error)
      })
      .finally(() => setIsRegistrationLoading(false))
  }

  function handleLogin(email, password) {
    setIsLoginLoading(true);
    auth.signIn(email, password)
      .then(({token}) => {
        if (token) {
          localStorage.setItem('token', token);
          setIsLoggedIn(true);
          setUserEmail(email);
          navigate('/')
        }
      })
      .catch((error) => {
        setTooltipInfo({
          isOpen: true,
          image: failImage,
          title: 'Что-то пошло не так! Попробуйте ещё раз.'
        })
        console.log(error)
      })
      .finally(() => setIsLoginLoading(false))
  }

  function handleSignOut() {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/sign-in')
  }

  // проверка токена
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      auth.me(token)
        .then((response) => {
          setIsLoggedIn(true);
          setUserEmail(response.data.email);
          navigate('/')
        })
        .catch(console.log)
    }
  }, []);

  return (
    <CurrentUserContext.Provider value={user}>
      <div
        className="page"
      >
        <Header
          profileEmail={userEmail}
          onSignOut={handleSignOut}
        />
        <Routes>
          <Route
            path="/sign-in"
            element={
              <Login
                onLogin={handleLogin}
                title={'Вход'}
                buttonTitle={'Войти'}
                isLoading={isLoginLoading}
              />
            }
          />
          <Route
            path="/sign-up"
            element={
              <Register
                onRegistration={handleRegistration}
                title={'Регистрация'}
                buttonTitle={'Зарегистрироваться'}
                isLoading={isRegistrationLoading}
              />
            }
          />
          <Route
            path="/*"
            element={
              <ProtectedRoute
                component={Main}
                isLoggedIn={isLoggedIn}
                onUserAvatarEdit={handleUpdateAvatarPopup}
                onUserProfileEdit={handleEditProfilePopup}
                onMestoAdd={handleAddMestoPopup}
                onMestoDelete={handleDeleteConfirm}
                onMestoShow={setSelectedCard}
                onMestoLike={handleLikeClick}
                onMestoDislike={handleDislikeClick}
                cards={initialCards}
              />
            }
          />
        </Routes>
        <Footer/>
        <EditAvatarPopup
          isOpen={isUpdateAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdate={handleAvatarUpdate}
          processStatus={isAvatarUpdateLoading}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdate={handleProfileUpdate}
          processStatus={isProfileUpdateLoading}
        />
        <AddMestoPopup
          isOpen={isAddMestoPopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleMestoAdd}
          processStatus={isMestoAddLoading}
        />
        <ConfirmMestoDeletePopup
          isOpen={isDeleteMestoPopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleDeleteMesto}
          card={cardToDelete}
          processStatus={isDeleteMestoLoading}
        />
        <ImagePopup
          popupType={'show-mesto'}
          card={selectedCard}
          onClose={closeAllPopups}
        />
        <InfoTooltipOpen
          info={tooltipInfo}
          onClose={closeAllPopups}
          popupType="infoTooltip"
        />
      </div>
    </ CurrentUserContext.Provider>);
}

export default App;
