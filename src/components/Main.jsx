import Card from './Card.jsx';
import {CurrentUserContext} from '../context/CurrentUserContext.jsx';
import {useContext} from 'react';


export default function Main(
  {
    onUserAvatarEdit,
    onUserProfileEdit,
    onMestoAdd,
    onMestoDelete,
    onMestoShow,
    onMestoLike,
    onMestoDislike,
    cards
  }
) {

  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section
        className="profile"
        id="profile"
      >
        <div className="profile__avatar-container">
          <img
            src={currentUser ? currentUser.avatar : '#'}
            className="profile__avatar"
            alt="Аватар пользователя"
          />
          <button
            onClick={onUserAvatarEdit}
            className="profile__avatar-edit-button"
            type="button"
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__user-name">
            {currentUser ? currentUser.name : 'Ден Илюшин'}
          </h1>
          <p className="profile__user-job">
            {currentUser ? currentUser.about : 'Студент Я.Практикума'}
          </p>
          <button
            onClick={onUserProfileEdit}
            className=" profile__edit-button"
            type="button"
          />
        </div>
        <button
          onClick={onMestoAdd}
          className="profile__add-button"
          type="button"
        />
      </section>
      <section
        className="places"
        id="places"
      >
        <ul className="places__list">
          {cards.map((mesto) => (
            <li
              key={mesto._id}
              className="mesto"
            >
              <Card
                card={mesto}
                onShow={onMestoShow}
                onDelete={onMestoDelete}
                onLike={onMestoLike}
                onDislike={onMestoDislike}
              />
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}