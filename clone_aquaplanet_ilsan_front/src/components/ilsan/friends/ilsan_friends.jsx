import React from "react"
import { Swiper, SwiperSlide } from 'swiper/react';
import '../../../css/ilsan/ilsan_friends.css';
import 'swiper/css';
import friends from './data/friends.json';

const AquaplanetIlsanFriends = () => {

    return(
        <>
        
            
        <div className="aquaplanet-ilsan-content-wrapper">
            <div className="content-visual-top">
                <div className="text-box">
                    <p className="line">AQUA PLANET</p>
                    <p>
                        <strong>해양문화의 가치</strong>와 <strong>생태계 보존을</strong><br/>
                        대중에게 널리 알리는 <br/>
                        아쿠아플라넷 일산입니다
                    </p>
                    <p>아쿠아플라넷 일산의 다양한 정보를 확인해보세요.</p>
                </div>
            </div>
            <div className="ilsan-friends-container">
                <div className="center-content">
                    <div className="location-box">
                        <a href="/">HOME</a>
                        <a href="/">아쿠아플라넷</a>
                        <a href="/aquaplanet/ilsan/friends">아쿠아플라넷 친구들</a>
                    </div>
                    <div className="content-title">
                        <h2>아쿠아플라넷 친구들</h2>
                    </div>
                    <div className="filter-search-box">
                        <div className="first-filter">
                            <span>전체</span>
                            <ul>
                                <li>전체</li>
                                <li>2F</li>
                                <li>3F</li>
                                <li>5F</li>
                            </ul>
                        </div>
                        <div className="first-filter">
                            <span>전체</span>
                            <ul>
                                <li>전체</li>
                                <li>민물어류</li>
                                <li>양서파충류</li>
                                <li>자포동물</li>
                                <li>조류</li>
                                <li>포유류</li>
                                <li>해수경골어류</li>
                                <li>해수연골어류</li>
                            </ul>
                        </div>
                        <div className="search-input-box">
                            <input placeholder="찾고 싶은 전시생물을 검색해보세요"/>
                            <button><span className="blind">검색</span></button>
                        </div>
                    </div>
                    <div className="result-box">
                        <div className="result-head">
                            <p className="answer">총 <span className="highlight">30</span>마리의 친구들이 검색되었습니다. 카드를 클릭하면 세부 정보를 알 수 있어요.</p>
                            <div className="filter-popular">
                                <input type="checkbox" id="popularCheck"/>
                                <label>인기생물순정렬</label>
                            </div>
                        </div>
                        <Swiper>
                            {friends.map(friend => (
                            <SwiperSlide className="friend-card-item" key={friend.id}>
                                <div className="front-side">
                                    <p className="where">
                                        <span className="floor">{friend.location}</span>{friend.location_detail}
                                    </p>
                                    <figure className="img-box">
                                        <img src={friend.image} alt={friend.image} loading="lazy"/>
                                    </figure>
                                    <div className="name">
                                        <p className="kr">{friend.kr_name}</p>
                                        <p className="en">{friend.en_name}</p>
                                    </div>
                                </div>
                                <div className="back-side">
                                    <p className="where">
                                        <span className="floor">{friend.location}</span>{friend.location_detail}
                                    </p>
                                    <div className="name-title">
                                        <p className="ko">{friend.kr_name}</p>
                                        <p className="en">{friend.en_name}</p>
                                    </div>
                                    <div className="category">
                                        <p>분류</p>
                                        <p>{friend.category}</p>
                                    </div>
                                    <div className="description-box">
                                        <p className="description">
                                            {friend.description}
                                        </p>
                                    </div>
                                    <button className="return-to-front"><span className="blind">닫기</span></button>
                                </div>
                            </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default AquaplanetIlsanFriends