import React from "react";
import BranchFilter from "./sub_components/filter_branch";
import StatusFilter from "./sub_components/filter_status";
import PurchaseTicketListBoard from "./sub_components/purchase_ticket_list_board";

const PurchaseOrderList = ({
    branchFilterRef,
    branchFilterOpen,
    branchFilterLabel,
    handleFilterBtns,
    selectFilterOption,
    branches,
    branchFilterIndex,
    statusFilterRef,
    statusFilterOpen,
    statusFilterLabel,
    statuses,
    statusFilterIndex,
    filteredTicketList,
    getBaseTicketInfo,
    handleOrderClick,
    branchColor,
}) => {
    return (
            <div className="user-dashboard-default-grid-left">
                <div className="user-dashboard-container">
                    <div className="user-dashboard-content">
                        <h2>구매내역</h2>
                        <div className="my-ticket-list-tab left-purchase-list">
                            <BranchFilter
                                branchFilterRef={branchFilterRef}
                                branchFilterOpen={branchFilterOpen}
                                branchFilterLabel={branchFilterLabel}
                                handleFilterBtns={handleFilterBtns}
                                selectFilterOption={selectFilterOption}
                                branches={branches}
                                branchFilterIndex={branchFilterIndex}
                            />
                            <StatusFilter
                                statusFilterRef={statusFilterRef}
                                statusFilterOpen={statusFilterOpen}
                                statusFilterLabel={statusFilterLabel}
                                handleFilterBtns={handleFilterBtns}
                                selectFilterOption={selectFilterOption}
                                statuses={statuses}
                                statusFilterIndex={statusFilterIndex}
                            />
                        </div>
                        <PurchaseTicketListBoard
                            filteredTicketList={filteredTicketList}
                            getBaseTicketInfo={getBaseTicketInfo}
                            handleOrderClick={handleOrderClick}
                            branchColor={branchColor}
                        />
                    </div>
                </div>
            </div>
    )
}
export default PurchaseOrderList;