import React from "react";
// 필요한 하위 컴포넌트들을 임포트합니다.
import TicketList from "./sub_components/purchase_ticket_list";
import OrderDetailForm from "./sub_components/purchase_order_detail";
import NoData from "./sub_components/no_data_form";

const PurchaseTicketDetailList = ({
    showTicketList, 
    orderedTicketDetailList,
    orderedTicketData,
    selectedOrderInfo,
    handleShowTicketListBtn,
    refundOrder,
    loginMember,
    branchColor,
}) => {
    const data = orderedTicketDetailList.length > 0 && selectedOrderInfo && orderedTicketData;

    let content; 

    //기본으로 보여줄 주문 정보 화면
    if (!showTicketList && data) {
        content = (
            <OrderDetailForm
                orderedTicketDetailList={orderedTicketDetailList}
                orderedTicketData={orderedTicketData}
                selectedOrderInfo={selectedOrderInfo}
                handleShowTicketListBtn={handleShowTicketListBtn}
                refundOrder={refundOrder}
                loginMember={loginMember}
                branchColor={branchColor}
                showTicketList={showTicketList} 
            />
        );
    } 
    //티켓 보기 버튼을 눌렀을 때 보여줄 화면
    else if (showTicketList && data) {
        content = (
            <TicketList
                orderedTicketDetailList={orderedTicketDetailList}
                orderedTicketData={orderedTicketData}
                selectedOrderInfo={selectedOrderInfo}
                handleShowTicketListBtn={handleShowTicketListBtn}
                refundOrder={refundOrder}
                loginMember={loginMember}
                branchColor={branchColor}
                showTicketList={showTicketList} 
            />
        );
    } 
    //구매 내역이 없을 때 보여줄 화면
    else {
        content = <NoData />;
    }

    return (
        <div className="user-dashboard-default-grid-right">
            <div className="user-dashboard-container right-side">
                {content} 
            </div>
        </div>
    );
};

export default PurchaseTicketDetailList;