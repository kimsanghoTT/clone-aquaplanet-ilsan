import React from 'react';
import PurchaseOrderItem from './purchase_ticket_item';

const PurchaseTicketListBoard = ({ filteredTicketList, getBaseTicketInfo, handleOrderClick, branchColor }) => {
    if (filteredTicketList.length === 0) {
        return (
            <div className="my-ticket-list-no-data-board">
                <div className="no-data">
                    <span>구매내역이 없습니다.</span>
                </div>
            </div>
        );
    }

    return (
        <div className="my-ticket-list-board">
            {filteredTicketList.map(order => (
                <PurchaseOrderItem
                    key={order.orderNo}
                    order={order}
                    getBaseTicketInfo={getBaseTicketInfo}
                    handleOrderClick={handleOrderClick}
                    branchColor={branchColor}
                />
            ))}
        </div>
    );
};

export default PurchaseTicketListBoard;