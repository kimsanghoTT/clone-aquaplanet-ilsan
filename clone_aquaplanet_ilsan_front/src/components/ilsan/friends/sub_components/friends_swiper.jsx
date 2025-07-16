import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/pagination";
import FriendsCard from "./friends_card.jsx";

const FriendsSwiper = ({filteredFriends}) => {
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

  useEffect(() => {
    console.log(flippedCardId);
  },[flippedCardId])

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
      spaceBetween={36}
      scrollbar={{
        el: ".swiper-scrollbar",
        draggable: true,
        dragSize: 50
      }}
      onProgress={updateProgressBar} // progress 이벤트를 수신
      onInit={updateProgressBar} //새로고침 시 진행도 초기화
      className="swiper-friends-list"
    >
      {filteredFriends.length > 0 && filteredFriends.map((friend) => (
          <SwiperSlide className="friend-card-item" key={friend.id}>
            <FriendsCard flippedCardId={flippedCardId} friend={friend} handleFlipCard={handleFlipCard}/>
          </SwiperSlide>
        ))}
      <div className="swiper-scrollbar">
        <div className="swiper-custom-progressbar" ref={progressBarRef}></div>
      </div>
    </Swiper>

  );
};
export default FriendsSwiper;
