import Barcode from "react-barcode";

const PurchaseTicketDetailItem = ({
    item, orderedTicketData, branchColor
}) => {
    const isDelay = item.delay !== "none" ? item.delay : "none";
    const delayTime = isDelay === "1hour" ? "1 시간" : "24 시간";

    if(!orderedTicketData){
        return null;
    }

    return (
        <div key={item.optionId} className="ticket-shape">
            <div className={`ticket-delay-film ${isDelay !== "none" ? "on" : ""}`}>
                <div className="delay-notice-text-box">
                    <p>
                        이 상품은<br />
                        구매 {delayTime} 후 <br />
                        사용이 가능합니다.
                    </p>
                    <p>사용 가능 시간 : 구매 {delayTime} 이후</p>
                </div>
            </div>
            <div className="confirm-ticket-type">
                <span style={{ backgroundColor: branchColor[orderedTicketData.branch] }}>
                    {orderedTicketData.branch}
                </span>
                <span>{orderedTicketData.ticketTitle}</span>
            </div>
            <div className="confirm-ticket-info">
                <figure className="ticket-info-image">
                    <img src={orderedTicketData.detailImages.banner} alt="bannerImage" />
                </figure>
                <div className="ticket-info-description">
                    <span>{item.optionName}</span>
                </div>
            </div>
            <div className="barcode">
                <span className="line">
                    <Barcode value={item.barcodeNumber} format="CODE128" width={3.5} displayValue={false} />
                </span>
                <span className="number">{item.barcodeNumber}</span>
            </div>
        </div>
    )
}
export default PurchaseTicketDetailItem;