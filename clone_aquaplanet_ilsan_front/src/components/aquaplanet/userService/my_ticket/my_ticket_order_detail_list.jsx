import React from "react";
import Barcode from "react-barcode";
import { branchColor } from "./data/branch";
import ticketData from "../../main_mall/main_mall_item.json";

const TicketOrderDetailList = ({orderedTicketDetailList, orderedTicketList, selectedOrderNo}) => {

    const getBaseTicketInfo = (id) => {
        const baseData = ticketData.find(item => item.id === id);
        return baseData;
    }

    const getBaseTicketDetailInfo = () => {
        const detailData = orderedTicketList.find(order => order.orderNo === selectedOrderNo);
        return detailData;
    }

    return (
        <div className="user-dashboard-default-grid-right">
            <div className="user-dashboard-container right-side">
                {orderedTicketDetailList.length > 0 ? (
                <div className="ticket-detail-list">
                    {orderedTicketDetailList.map(item => {

                        //서버에서 넘어온 주문 배열 중 주문번호가 일치하는 객체 하나 찾기
                        const getTicketId = getBaseTicketDetailInfo();

                        // getTicketId로 찾은 객체의 ticketId를 통해 json 파일 속 일치하는 티켓 정보 가져옴
                        const detailData = getBaseTicketInfo(getTicketId.ticketId);
                        const isDelay = item.delay !== "none" ? item.delay : "none";
                        const delayTime = isDelay === "1hour" ? "1 시간" : "24 시간"

                        return (
                            <div key={item.optionId} className="ticket-shape">
                                <div className={`ticket-delay-film ${isDelay !== "none" ? "on": ""}`}>
                                    <div className="delay-notice-text-box">
                                        <p>
                                            이 상품은<br/>
                                            구매 {delayTime} 후 <br/>
                                            사용이 가능합니다.
                                        </p>
                                        <p>사용 가능 시간 : 구매 {delayTime} 이후</p>
                                    </div>
                                </div>
                                <div className="confirm-ticket-type">
                                    <span style={{backgroundColor:branchColor[detailData.branch]}}>{detailData.branch}</span>
                                    <span>{detailData.ticketTitle}</span>
                                </div>
                                <div className="confirm-ticket-info">
                                    <figure className="ticket-info-image">
                                        <img src={detailData.detailImages.banner} alt="bannerImage"/>
                                    </figure>
                                    <div className="ticket-info-description">
                                        <span>{item.optionName}</span>
                                    </div>
                                </div>
                                <div className="barcode">
                                    <span className="line">
                                        <Barcode value={item.barcodeNumber} 
                                        format="CODE128" width={3.5} displayValue={false}/>
                                    </span>
                                    <span className="number">{item.barcodeNumber}</span>
                                </div>
                            </div>
                        )
                    })}
                </div>
                ) : (
                <div className="ticket-detail-list no-data">
                    <div className="ticket-shape no-data">
                        <span>아직 구매한 상품이 없습니다.</span>
                        <span>티켓을 구매하면 상세 내역을 확인할 수 있습니다.</span>
                        <a href="/aquaplanet/mall">티켓 구매하기</a>
                    </div>
                </div>
                )}

            </div>
        </div>
    )
}
export default TicketOrderDetailList;