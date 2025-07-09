import React from "react";

const ItemDetailSummery = ({item, branchColor}) => {
    if(!item){
        return null;
    }

    return (
        <>
            <div className="item-detail-badge" style={{backgroundColor: branchColor[item.branch]}}>
                <span>{item.branch}</span>
                </div>
                <div className="item-summery-info">
                    <p className="item-detail-title">{item.ticketTitle}</p>
                    <p className="item-detail-description">
                        {item.description}
                    </p>
                <br/>
                {item.discount && (
                    <span className="item-detail-discount">
                        {item.discount}
                    </span>
                )}
            </div>
        </>
    )
}
export default ItemDetailSummery;