import moment from "moment";
import React from "react";

const PurchaseTicketItem = ({
    order,
    handleOrderClick,
    getBaseTicketInfo,
    branchColor
}) => {
    const getBaseTicketData = getBaseTicketInfo(order.ticketId);

    return (
        <div className="ticket-item" key={order.orderNo} onClick={() => handleOrderClick(order.orderNo)}>
            <figure>
                <img src={getBaseTicketData.detailImages.banner} alt="ticketBanner"/>
            </figure>
            <div className="ticket-order-info">
                <span className="branch" style={{backgroundColor:branchColor[order.ticketBranch]}}>{order.ticketBranch}</span>
                <span className="ticket-status" style={{color: order.orderStatus === "사용가능" ? "#222" : ""}}>{order.orderStatus}</span>
                <span className="ticket-title">{order.ticketTitle}</span>
                <div>
                    <span>{order.finalTotalPrice.toLocaleString()}원</span>
                    <span>{moment(order.orderDate).format("YYYY.MM.DD")}</span>
                </div>
            </div>
        </div>
    )
}
export default PurchaseTicketItem;