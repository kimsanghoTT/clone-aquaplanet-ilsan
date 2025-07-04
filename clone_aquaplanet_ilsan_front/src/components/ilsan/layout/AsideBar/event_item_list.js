import React from 'react';

const EventListItem = ({ item }) => {
    return (
        <li className="item">
            <span className="event-img-area">
                <img
                    className="event-img"
                    src={item.imgSrc}
                    alt="eventImage"
                />
                <div className="overlay-film02"></div>
                <button className="more">자세히 보기</button>
            </span>
            <span className="event-text-area">
                <span>
                    <span className="event-title">{item.type}</span>
                    <span className="highlight-line"></span>
                </span>
                <span className="event-intro">{item.intro}</span>
            </span>
        </li>
    );
};

export default EventListItem;