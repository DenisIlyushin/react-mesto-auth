import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Main from './Main.jsx';
import {useEffect, useState} from 'react';
import {Route, Switch} from 'react-router-dom'
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

function App() {
  //обработка попапов
  const [isUpdateAvatarPopupOpen, setIsUpdateAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddMestoPopupOpen, setIsAddMestoPopupOpen] = useState(false);
  const [isDeleteMestoPopupOpen, setIsDeleteMestoPopupOpen] = useState(false);
  //обработка данных
  const [selectedCard, setSelectedCard] = useState(null);
  const [initialCards, setInitialCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cardToDelete, setCardToDelete] = useState(null);
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


  // обработка попапов
  function closeAllPopups() {
    setIsUpdateAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddMestoPopupOpen(false);
    setIsDeleteMestoPopupOpen(false);
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
  function handleRegistration() {
    console.log('тык')
  }

  function handleLogin() {
    console.log('пык')
  }

  return (
    <CurrentUserContext.Provider value={user}>
      <Header/>
      <Switch>
        <Route
          path='/sign-in'
        >
          {console.log('тут APP')}
          <Login
            onLogin={handleLogin}
            title={'Вход'}
          />
        </Route>
        <Route
          path='/sign-up'
        >
          <Register
            onRegistration={handleRegistration}
            title={'Регистрация'}
            // tip={<></>}
          />
        </Route>
        <Route
          path='/'
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
    </ CurrentUserContext.Provider>);
}

export default App;
