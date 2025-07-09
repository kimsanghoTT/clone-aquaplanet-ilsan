import React from "react";
import { Link } from "react-router-dom";
import { branchColor } from "../../common_data/branch_color";

const MainMallBoardItem = ({branchFilter}) => {

    return (
        <div className="aquaplanet-board-item-list">
            {branchFilter && branchFilter.map(cardData => (
            <div className="aquaplanet-board-item" key={cardData.id}>
                <Link to={`/aquaplanet/mall/item_detail/${cardData.id}`} state={{item:cardData}}>
                    <figure>
                        <span className="branch-tag" style={{backgroundColor: branchColor[cardData.branch]}}>{cardData.branch}</span>
                        <img src={cardData.image} alt={cardData.ticketTitle}/>
                    </figure>
                    <div className="aquaplanet-board-item-info">
                        <p className="title">{cardData.ticketTitle}</p>
                        <p className="description">{cardData.description}</p>
                        <p className="price"><em>{cardData.price}</em>원</p>
                        {cardData.canceledPrice && (
                        <p className="canceled-price"><em>{cardData.canceledPrice}</em>원</p>
                        )}
                        {cardData.discount && (
                        <span className="discount">{cardData.discount}</span>
                        )}
                    </div>     
                    {cardData.delay && (
                    <div className="available">
                        {cardData.delay === "1hour" ? (
                        <p>1시간 뒤 사용가능</p>
                        ) : (
                        <p>1일 뒤 사용가능</p>
                        )
                        }
                    </div>
                    )}   
                </Link>
            </div>
            ))}

        </div>

    )
}
export default MainMallBoardItem;