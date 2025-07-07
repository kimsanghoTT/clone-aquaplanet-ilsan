import React from 'react';
import TicketDetailItem from './purchase_ticket_detail_item';

const TicketList = ({
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
            <div className="ticket-detail-list">
                {orderedTicketDetailList.map(item => (
                    <TicketDetailItem
                        key={item.optionId} 
                        item={item}
                        orderedTicketData={orderedTicketData}
                        branchColor={branchColor}
                    />
                ))}
            </div>
            <div className="purchase-detail-btn-area">
                <button onClick={handleShowTicketListBtn}>
                    {showTicketList ? "구매내역보기" : "티켓보기"} 
                </button>
                <button onClick={() => refundOrder(selectedOrderInfo.orderNo, loginMember.memberNo)}>
                    환불요청하기
                </button>
            </div>
        </>
    );
};

export default TicketList;