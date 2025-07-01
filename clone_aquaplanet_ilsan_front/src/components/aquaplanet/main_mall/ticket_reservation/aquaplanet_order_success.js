import moment from "moment";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../../../css/aquaplanet/aquaplanet_order_success.css";
import Barcode from "react-barcode";

const SuccessOrder = () => {
    const navigate = useNavigate();
    const {state} = useLocation();
    const orderData = state.orderData;
    const orderDetailDataList = state.orderDetailDataList;
    const baseData = state.baseData;
    const formattedTime = moment(orderData.orderDate).format("YYYY.MM.DD");

    const handleBtns = (btnType) => {
        if(btnType === "myTicket"){
            navigate("/aquaplanet/member/myTicket");
        }
        else if(btnType === "mainMall"){
            navigate("/aquaplanet/mall");
        }
    }

    if(!orderData || !orderDetailDataList || !baseData){
        return (
            <div className="order-error-wrapper">
                <div className="error-get-info">
                    <h2>이런!</h2>
                    <p>주문 정보를 불러올 수 없습니다.</p>
                    <button onClick={() => handleBtns("mainMall")}>메인으로 돌아가기</button>
                </div>
            </div>
        )
    }

    return(
        <div className="order-success-wrapper">
            <div className="order-success-container">
                <h2>
                    감사합니다! <br/>
                    결제가 완료되었습니다.
                </h2>
                <div className="order-success-content">
                    {orderDetailDataList.map(item => (
                    <div key={item.optionId} className="confirm-ticket-list">
                        <div className="confirm-ticket-type">
                            <span>{orderData.ticketBranch}</span>
                            <span>{orderData.ticketTitle}</span>
                        </div>
                        <div className="confirm-ticket-info">
                            <figure className="ticket-info-image">
                                <img src={baseData.detailImages.banner} alt="bannerImage"/>
                            </figure>
                            <div className="ticket-info-description">
                                <span>{item.optionName}</span>
                                <span>예약일 {formattedTime}</span>
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
                    ))}
                    <div className="order-success-btn-area">
                        <button onClick={() => handleBtns("myTicket")}>나의 티켓 보기</button>
                        <button onClick={() => handleBtns("mainMall")}>메인으로 돌아가기</button>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default SuccessOrder;