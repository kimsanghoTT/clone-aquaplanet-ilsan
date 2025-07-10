import React from "react";
import PurchaseOrderList from "./left_side/my_purchase_order_list.jsx";
import PurchaseOrderDetailList from "./right_side/my_purchase_order_detail_list.jsx";
import usePurchaseList from "./hooks/usePurchaseList";
import { branchColor, branches, statuses } from "./data/constrants";

const MyPurchaseList = () => {
    const {
        loginMember,
        branchFilterRef,
        statusFilterRef,
        branchFilterLabel,
        branchFilterOpen,
        statusFilterLabel,
        statusFilterOpen,
        branchFilterIndex,
        statusFilterIndex,
        orderedTicketDetailList,
        filteredTicketList,
        selectedOrderInfo,
        orderedTicketData,
        showTicketList,
        handleFilterBtns,
        selectFilterOption,
        handleOrderClick,
        refundOrder,
        getBaseTicketInfo,
        handleShowTicketListBtn
    } = usePurchaseList();
    return (
        <section className="aquaplanet-user-dashboard-wrapper">
            <PurchaseOrderList
                branchFilterRef={branchFilterRef}
                branchFilterOpen={branchFilterOpen}
                branchFilterLabel={branchFilterLabel}
                handleFilterBtns={handleFilterBtns}
                selectFilterOption={selectFilterOption}
                branches={branches}
                branchFilterIndex={branchFilterIndex}
                statusFilterRef={statusFilterRef}
                statusFilterOpen={statusFilterOpen}
                statusFilterLabel={statusFilterLabel}
                statuses={statuses}
                statusFilterIndex={statusFilterIndex}
                filteredTicketList={filteredTicketList}
                getBaseTicketInfo={getBaseTicketInfo}
                handleOrderClick={handleOrderClick}
                branchColor={branchColor}
            />
            <PurchaseOrderDetailList
                showTicketList={showTicketList}
                orderedTicketDetailList={orderedTicketDetailList}
                orderedTicketData={orderedTicketData}
                selectedOrderInfo={selectedOrderInfo}
                handleShowTicketListBtn={handleShowTicketListBtn}
                refundOrder={refundOrder}
                loginMember={loginMember}
                branchColor={branchColor}
            />

        </section>
    )
}
export default MyPurchaseList;