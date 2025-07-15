import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Scrollbar } from "swiper/modules";
import friends from "../data/friends.json";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/pagination";

const FriendsSwiper = () => {
  const [flippedCardId, setFlippedCardId] = useState([]);
  const progressBarRef = useRef(null);

  const handleFlipCard = (id) => {
    setFlippedCardId((prev) => {
      if (prev.includes(id)) {
        return prev.filter((cardId) => cardId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  // 커스텀 프로그레스 바 업데이트
  const updateProgressBar = (swiper) => {
    if (progressBarRef.current) {
      // swiper.progress는 슬라이더의 전체 진행률을 0에서 1 사이의 값으로 주므로, 여기에 100을 곱해 % 형식으로 만들기
      const progressWidth = swiper.progress * 100;
      progressBarRef.current.style.width = `${progressWidth}%`;
    }
  };

  return (
    <Swiper
      modules={[Scrollbar, Pagination]}
      slidesPerView={"auto"}
      spaceBetween={"36"}
      scrollbar={{
        el: ".swiper-scrollbar",
        draggable: true,
        dragSize: 50
      }}
      onProgress={updateProgressBar} // progress 이벤트를 수신
      onInit={updateProgressBar} //새로고침 시 진행도 초기화
      className="swiper-friends-list"
    >
      {friends.map((friend) => (
        <SwiperSlide className="friend-card-item" key={friend.id}>
          <div
            className={`card-inner ${flippedCardId.includes(friend.id) ? "flipped" : ""}`}
          >
            <div
              className="front-side"
              onClick={() => handleFlipCard(friend.id)}
            >
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
        </SwiperSlide>
      ))}
      <div className="swiper-scrollbar">
        <div className="swiper-custom-progressbar" ref={progressBarRef}></div>
      </div>
    </Swiper>

  );
};
export default FriendsSwiper;
