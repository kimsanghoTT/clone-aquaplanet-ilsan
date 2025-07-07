import React from 'react';

const OrderDetailForm = ({
    orderedTicketDetailList,
    orderedTicketData,
    selectedOrderInfo,
    handleShowTicketListBtn,
    refundOrder,
    loginMember,
    branchColor,
    showTicketList 
}) => {
    return (
        <>
            <div className="my-purchase-detail-info">
                <div className="purchase-detail-title">
                    <h2>결제 금액 정보</h2>
                    <span>
                        주문번호 : <em>{selectedOrderInfo.orderNo}</em>
                    </span>
                </div>
                <div className="purchase-detail-content">
                    <figure className="ticket-banner-image">
                        <img src={orderedTicketData.detailImages.banner} alt="ticketImage" />
                    </figure>
                    <div className="purchase-option-list">
                        {orderedTicketDetailList.map(item => (
                            <div key={item.orderDetailNo} className="purchase-option">
                                <span className="branch" style={{ backgroundColor: branchColor[orderedTicketData.branch] }}>
                                    {orderedTicketData.branch}
                                </span>
                                <span className="option-name">{item.optionName}</span>
                                <span className="option-status">{item.optionStatus}</span>
                                <span className="option-quantity">{item.quantity}</span>
                                <span className="option-total-price">
                                    {item.totalPricePerOption.toLocaleString()}원
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="purchase-detail-total">
                    <span>최종 결제금액</span>
                    <span>
                        <em>{selectedOrderInfo.finalTotalPrice.toLocaleString()}</em>원
                    </span>
                </div>
                <div className="purchase-detail-recipient">
                    <div className="order-box">
                        <div className="title">
                            <span>주문자</span>
                        </div>
                        <dl>
                            <dt>성명</dt>
                            <dd>{loginMember.memberName}</dd>
                        </dl>
                        <dl>
                            <dt>휴대폰번호</dt>
                            <dd>{loginMember.memberPhone}</dd>
                        </dl>
                    </div>
                </div>
                <div className="purchase-detail-payment">
                    <span>결제수단</span>
                    <span>{selectedOrderInfo.paymentMethod}</span>
                </div>
            </div>
            {selectedOrderInfo.orderStatus === "사용가능" && (
                <div className="purchase-detail-btn-area">
                    <button onClick={handleShowTicketListBtn}>
                        {showTicketList ? "구매내역보기" : "티켓보기"}
                    </button>
                    <button onClick={() => refundOrder(selectedOrderInfo.orderNo, loginMember.memberNo)}>
                        환불요청하기
                    </button>
                </div>
            )}
        </>
    );
};

export default OrderDetailForm;