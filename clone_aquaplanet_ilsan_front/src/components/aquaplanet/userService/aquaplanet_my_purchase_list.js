import moment from "moment";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import LoginContext from "../../LoginContext";
import axiosInstance from "../../axiosIntercepting/axiosIntercepting";
import ticketData from "../main_mall/main_mall_item.json";
import Barcode from "react-barcode";

const MyPurchaseList = () => {
    const {loginMember} = useContext(LoginContext);
    const branchFilterRef = useRef();
    const statusFilterRef = useRef();
    const [branchFilterLabel, setBranchFilterLabel] = useState("전체지역");
    const [branchFilterOpen, setBranchFilterOpen] = useState(false);
    const [branchFilterIndex, setBranchFilterIndex] = useState(null);
    const [statusFilterLabel, setStatusFilterLabel] = useState("전체");
    const [statusFilterOpen, setStatusFilterOpen] = useState(false);
    const [statusFilterIndex, setStatusFilterIndex] = useState(null);
    const [orderedTicketList, setOrderedTicketList] = useState([]);
    const [orderedTicketDetailList, setOrderedTicketDetailList] = useState([]);
    const [filteredTicketList, setFilteredTicketList] = useState([]);
    const [selectedOrderNo, setSelectedOrderNo] = useState(null);
    const [selectedOrderInfo, setSelectedOrderInfo] = useState(null);
    const [orderedTicketData, setOrderedTicketData] = useState(null);
    const [showTicketList, setShowTicketList] = useState(false);
    const branches = useMemo(() => ["63", "여수", "제주", "일산", "광교"], []) ;
    const statuses = useMemo(() => ["사용가능", "사용완료", "환불완료"],[]);
    const branchColor = {
    일산: "#5400FF",
    제주: "#34A5FC",
    여수: "#76E479",
    광교: "#f8a139",
    };

    useEffect(() => {
        const clickOutside = (e) => {
            if (branchFilterRef.current && !branchFilterRef.current.contains(e.target)) {
                setBranchFilterOpen(false);
            }
            if (statusFilterRef.current && !statusFilterRef.current.contains(e.target)) {
                setStatusFilterOpen(false);
            }
            
        };

        document.addEventListener("mousedown", clickOutside);
        return () => {
            document.removeEventListener("mousedown", clickOutside);
        };
    }, []);

    useEffect(() => {
        const getMemberOrderList = async () => {
            if (!loginMember) {
                return;
            }

            try{
                const response = await axiosInstance.get(`/aquaplanet/member/myOrderedTickets/${loginMember.memberNo}`);
                if(response.data.result === "SUCCESS"){
                    const orders = response.data.allOrderData;
                    setOrderedTicketList(orders);
                    
                    if(orders.length > 0){
                        setSelectedOrderNo(orders[0].orderNo);
                    }
                    else{
                        setSelectedOrderNo(null);
                    }
                }
                else{
                    alert("연결 오류가 발생했습니다. 계속될 경우 관리자에게 문의해주세요.");
                    setOrderedTicketList([]);
                    setOrderedTicketDetailList([]);
                }
            }
            catch(error){
                alert("연결 오류가 발생했습니다. 계속될 경우 관리자에게 문의해주세요.");
                setOrderedTicketList([]);
                setOrderedTicketDetailList([]);
            }
        }
        getMemberOrderList();
    },[loginMember])

    useEffect(() => {
        const getMemberOrderDetailList = async () => {
            if (selectedOrderNo === null) {
                setOrderedTicketDetailList([]); 
                return;
            }

            try{
                const response = await axiosInstance.get(`/aquaplanet/member/myOrderedTicketDetails/${selectedOrderNo}`);
                if(response.data.result === "SUCCESS"){
                    setOrderedTicketDetailList(response.data.allOrderDetailDataList);
                }
                else{
                    alert("연결 오류가 발생했습니다. 계속될 경우 관리자에게 문의해주세요.");
                    setOrderedTicketDetailList([]);
                }
            }
            catch(error){
                alert("연결 오류가 발생했습니다. 계속될 경우 관리자에게 문의해주세요.");
                setOrderedTicketDetailList([]);
            }
        }
        getMemberOrderDetailList();
    }, [selectedOrderNo])

    useEffect(() => {
        if(!Array.isArray(orderedTicketList) || orderedTicketList.length === 0){
            setFilteredTicketList([]);
            return;
        }

        const filteredByBranch = orderedTicketList.filter(ticket => {
            if(branchFilterIndex === null){
                return true;
            }
            return ticket.ticketBranch === branches[branchFilterIndex];
        })

        const filteredByStatus = filteredByBranch.filter(ticket => {
            if(statusFilterIndex === null){
                return true;
            }
            return ticket.orderStatus === statuses[statusFilterIndex];
        });

        setFilteredTicketList(filteredByStatus);

    },[branchFilterIndex, orderedTicketList, branches, statusFilterIndex ,statuses])


    const handleBtns = (type) => {
        if(type === "filter_branch"){
            setBranchFilterOpen(!branchFilterOpen)
        }
        else if(type === "filter_status"){
            setStatusFilterOpen(!statusFilterOpen);
        }
        else if(type === "reset_branch"){
            setBranchFilterLabel("전체지역");
            setBranchFilterIndex(null);
            setBranchFilterOpen(false);
        }
        else if(type === "reset_status"){
            setStatusFilterLabel("전체");
            setStatusFilterIndex(null);
            setStatusFilterOpen(false);
        }
        else if(type === "showTicketList"){
            setShowTicketList(!showTicketList);
        }
    }

    const selectFilterOption = (type, index) => {
        if(type === "branch"){
            setBranchFilterLabel(branches[index]);
            setBranchFilterIndex(index);
            setBranchFilterOpen(false);
        }
        else if(type === "status"){
            setStatusFilterLabel(statuses[index]);
            setStatusFilterIndex(index);
            setStatusFilterOpen(false);
        }
    };

    const getBaseTicketInfo = (id) => {
        const baseData = ticketData.find(item => item.id === id);
        return baseData;
    }

    const handleOrderClick = (orderNo) => {
        setSelectedOrderNo(orderNo);
        setShowTicketList(false);
    }

    const refundOrder = async (orderNo, memberNo) => {
        const confirmRefund = window.confirm("환불을 요청하시겠습니까?")
        if(!confirmRefund){
            return;
        }
        const setOrderData = filteredTicketList.find(item => item.orderNo === orderNo);
        const setOrderDetailDataList = orderedTicketDetailList;

        const orderData = {
            ...setOrderData,
            orderStatus:"환불완료"
        }
        const orderDetailDataList = setOrderDetailDataList.map(prev => ({
            ...prev,
            optionStatus:"환불완료"
        }))

        const requestBody = {
            orderData: orderData,
            orderDetailDataList: orderDetailDataList
        }
        const response = await axiosInstance.post(`/aquaplanet/member/remove/${orderNo}/order/${memberNo}`, requestBody);

        if(response.data.result === "SUCCESS"){
            alert("취소가 완료되었습니다.");
            document.location.reload();
        }
        else{
            console.log(response.data.error);
        }
    }

    useEffect(() => {

    if(filteredTicketList.length === 0 || !selectedOrderNo){
        return;
    }
        const sliceOrder = filteredTicketList.find(ticket => ticket.orderNo === selectedOrderNo);

        if(sliceOrder){
            const selectedTicketData = getBaseTicketInfo(sliceOrder.ticketId);
            setSelectedOrderInfo(sliceOrder);
            setOrderedTicketData(selectedTicketData);
        }

    },[filteredTicketList, selectedOrderNo])
    

    return (
        <section className="aquaplanet-user-dashboard-wrapper">
            <div className="user-dashboard-default-grid-left">
                <div className="user-dashboard-container">
                    <div className="user-dashboard-content">
                        <h2>구매내역</h2>
                        <div className="my-ticket-list-tab left-purchase-list">
                            <div className="ticket-branch-filter" ref={branchFilterRef}>
                                <span
                                className={`branch-select-display ${branchFilterOpen ? "on" : ""}`}
                                onClick={() => handleBtns("filter_branch")}
                                >
                                    <span>{branchFilterLabel}</span>
                                </span>
                                <ul className={`branch-option-list ${branchFilterOpen ? "on" : ""}`}>
                                    <li className={`branch-option ${branchFilterIndex === null ? "selected" : ""}`} 
                                    onClick={() => handleBtns("reset_branch")}>
                                        전체지역
                                    </li>
                                    {branches.map((branch, index) => (
                                    <li
                                    className={`branch-option ${branchFilterIndex === index ? "selected" : ""}`}
                                    key={index}
                                    onClick={() => selectFilterOption("branch", index)}
                                    >
                                    {branch}
                                    </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="ticket-status-filter" ref={statusFilterRef}>
                                <span
                                className={`status-select-display ${statusFilterOpen ? "on" : ""}`}
                                onClick={() => handleBtns("filter_status")}
                                >
                                    <span>{statusFilterLabel}</span>
                                </span>
                                <ul className={`status-option-list ${statusFilterOpen ? "on" : ""}`}>
                                    <li className={`status-option ${statusFilterIndex === null ? "selected" : ""}`} 
                                    onClick={() => handleBtns("reset_status")}>
                                        전체
                                    </li>
                                    {statuses.map((status, index) => (
                                    <li
                                    className={`status-option ${statusFilterIndex === index ? "selected" : ""}`}
                                    key={index}
                                    onClick={() => selectFilterOption("status", index)}
                                    >
                                    {status}
                                    </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        {filteredTicketList.length > 0 ? 
                        (
                            <div className="my-ticket-list-board">
                                {filteredTicketList.map(order =>{
                                    const getBaseTicketData = getBaseTicketInfo(order.ticketId);

                                    return(
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
                                })}
                            </div>
                        ) : 
                        (
                            <div className="my-ticket-list-no-data-board">
                                <div className="no-data">
                                    <span>구매내역이 없습니다.</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="user-dashboard-default-grid-right">
                <div className="user-dashboard-container right-side">
                    {showTicketList ? (
                        orderedTicketDetailList.length > 0 &&
                            <>
                            <div className="ticket-detail-list">
                                {orderedTicketDetailList.map(item => {
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
                                                <span style={{backgroundColor:branchColor[orderedTicketData.branch]}}>{orderedTicketData.branch}</span>
                                                <span>{orderedTicketData.ticketTitle}</span>
                                            </div>
                                            <div className="confirm-ticket-info">
                                                <figure className="ticket-info-image">
                                                    <img src={orderedTicketData.detailImages.banner} alt="bannerImage"/>
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
                            <div className="purchase-detail-btn-area">
                                <button onClick={() => handleBtns("showTicketList")}>구매내역보기</button>
                                <button onClick={() => refundOrder(selectedOrderInfo.orderNo, loginMember.memberNo)}>환불요청하기</button>
                            </div>
                            </>
                    ) : 
                    (
                        orderedTicketDetailList.length > 0 && selectedOrderInfo && orderedTicketData ? (
                                <>
                                <div className="my-purchase-detail-info">
                                    <div className="purchase-detail-title">
                                        <h2>결제 금액 정보</h2>
                                        <span>주문번호 : <em>{selectedOrderInfo.orderNo}</em></span>
                                    </div>
                                    <div className="purchase-detail-content">
                                        <figure className="ticket-banner-image">
                                            <img src={orderedTicketData.detailImages.banner} alt="ticketImage"/>
                                        </figure>
                                        <div className="purchase-option-list">
                                            {orderedTicketDetailList.map(item => (
                                            <div key={item.orderDetailNo} className="purchase-option">
                                                <span className="branch" style={{backgroundColor: branchColor[orderedTicketData.branch]}}>{orderedTicketData.branch}</span>
                                                <span className="option-name">{item.optionName}</span>
                                                <span className="option-status">{item.optionStatus}</span>
                                                <span className="option-quantity">{item.quantity}</span>
                                                <span className="option-total-price">{item.totalPricePerOption.toLocaleString()}원</span>
                                            </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="purchase-detail-total">
                                        <span>최종 결제금액</span>
                                        <span><em>{selectedOrderInfo.finalTotalPrice.toLocaleString()}</em>원</span>
                                    </div>                            
                                    <div className="purchase-detail-recipient">
                                        <div className="order-box">
                                            <div className="title"><span>주문자</span></div>
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
                                        <button onClick={() => handleBtns("showTicketList")}>티켓보기</button>
                                        <button onClick={() => refundOrder(selectedOrderInfo.orderNo, loginMember.memberNo)}>환불요청하기</button>
                                    </div>
                                )}                    
                                </>
                            ) : (
                            <div className="ticket-detail-list no-data">
                                <div className="ticket-shape no-data">
                                    <span>아직 구매한 상품이 없습니다.</span>
                                    <span>티켓을 구매하면 상세 내역을 확인할 수 있습니다.</span>
                                    <a href="/aquaplanet/mall">티켓 구매하기</a>
                                </div>
                            </div>
                        )
                    )}



                </div>
            </div>
        </section>
    )
}
export default MyPurchaseList;