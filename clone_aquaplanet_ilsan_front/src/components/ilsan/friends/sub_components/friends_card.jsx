import React from "react";

const FriendsCard = ({flippedCardId, friend, handleFlipCard}) => {
  return (
    <div
      className={`card-inner ${flippedCardId.includes(friend.id) ? "flipped" : ""}`}
    >
      <div className="front-side" onClick={() => handleFlipCard(friend.id)}>
        <p className="where">
          <span className="floor">{friend.location}</span>
          <span>{friend.location_detail}</span>
        </p>
        <figure className="img-box">
          <img src={friend.image} alt={friend.image} loading="lazy" />
        </figure>
        <div className="name">
          <p className="kr">{friend.kr_name}</p>
          <p className="en">{friend.en_name}</p>
        </div>
      </div>
      <div
        className="back-side"
        style={{ backgroundImage: `url(${friend.image})` }}
      >
        <p className="where">
          <span className="floor">{friend.location}</span>
          <span>{friend.location_detail}</span>
        </p>
        <div className="name-title">
          <p className="kr">{friend.kr_name}</p>
          <p className="en">{friend.en_name}</p>
        </div>
        <div className="category">
          <p>분류</p>
          <p>{friend.category}</p>
        </div>
        <div className="description-box">
          <p className="description">{friend.description}</p>
        </div>
        <button
          className="return-to-front"
          onClick={() => handleFlipCard(friend.id)}
        >
          <span className="blind">닫기</span>
        </button>
      </div>
    </div>
  );
};
export default FriendsCard;
