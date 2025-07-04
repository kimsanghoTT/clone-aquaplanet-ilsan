import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import "../../../css/aquaplanet/aquaplanet_user_dashboard.css";
import ticketData from "../main_mall/main_mall_item.json";
import axiosInstance from "../../axiosIntercepting/axiosIntercepting";
import LoginContext from "../../LoginContext";
import Barcode from "react-barcode";
import moment from "moment";


const MyTicketList = () => {
    const {loginMember} = useContext(LoginContext);
    const [activeTab, setActiveTab] = useState("general");
    const [branchFilterLabel, setBranchFilterLabel] = useState("지역");
    const [branchFilterOpen, setBranchFilterOpen] = useState(false);
    const [branchFilterIndex, setBranchFilterIndex] = useState(null);
    const [orderedTicketList, setOrderedTicketList] = useState([]);
    const [orderedTicketDetailList, setOrderedTicketDetailList] = useState([]);
    const [filteredTicketList, setFilteredTicketList] = useState([]);
    const [selectedOrderNo, setSelectedOrderNo] = useState(null);
    const branchFilterRef = useRef();
    const branches = useMemo(() => ["63", "여수", "제주", "일산", "광교"], []) ;

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
                const response = await axiosInstance.get(`/aquaplanet/member/myTicket/${loginMember.memberNo}`);
                console.log(response.data);
                console.log(loginMember.memberNo);
                if(response.data.result === "SUCCESS"){
                    const orders = response.data.orderData;
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
            catch{
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
                const response = await axiosInstance.get(`/aquaplanet/member/myTicketDetail/${selectedOrderNo}`);
                if(response.data.result === "SUCCESS"){
                    setOrderedTicketDetailList(response.data.orderDetailDataList);
                }
                else{
                    alert("연결 오류가 발생했습니다. 계속될 경우 관리자에게 문의해주세요.");
                    setOrderedTicketDetailList([]);
                }
            }
            catch{
                alert("연결 오류가 발생했습니다. 계속될 경우 관리자에게 문의해주세요.");
                setOrderedTicketDetailList([]);
            }
        }
        getMemberOrderDetailList();
    }, [selectedOrderNo])

    //필터 로직
    useEffect(() => {
        if(!Array.isArray(orderedTicketList) || orderedTicketList.length === 0){
            setFilteredTicketList([]);
            return;
        }

        const filteredByTab = orderedTicketList.filter(ticket => ticket.itemCategory === activeTab);

        const filteredByBranch = filteredByTab.filter(ticket => {
            if(branchFilterIndex === null){
                return true;
            }
            return ticket.ticketBranch === branches[branchFilterIndex];
        })

        setFilteredTicketList(filteredByBranch);
    },[activeTab, branchFilterIndex, orderedTicketList, branches])
    
    const handleBtns = (type) => {
        if(type === "general"){
            setActiveTab("general");
        }
        else if(type === "premium"){
            setActiveTab("premium");
        }
        else if(type === "filter"){
            setBranchFilterOpen(!branchFilterOpen)
        }
        else if(type === "reset"){
            setBranchFilterLabel("지역");
            setBranchFilterIndex(null);
            setBranchFilterOpen(false);
        }
    }

    const handleOrderClick = (orderNo) => {
        setSelectedOrderNo(orderNo);
    }

    const selectFilterOption = (index) => {
        setBranchFilterIndex(index);
        setBranchFilterLabel(branches[index]);
        setBranchFilterOpen(false);
    };
    
    const getBaseTicketInfo = (id) => {
        const baseData = ticketData.find(item => item.id === id);
        return baseData;
    }

    const getBaseTicketDetailInfo = () => {
        const detailData = orderedTicketList.find(order => order.orderNo === selectedOrderNo);
        return detailData;
    }

    return (
        <section className="aquaplanet-user-dashboard-wrapper">
            <div className="user-dashboard-default-grid-left">
                <div className="user-dashboard-container">
                    <div className="user-dashboard-content">
                        <h2>나의 티켓 보기</h2>
                        <div className="my-ticket-list-tab left-ticket-list">
                            <div className="ticket-type-tab-list">
                                <span className={activeTab === "general" ? "active" : ""} onClick={() => handleBtns("general")}>일반티켓</span>
                                <span className={activeTab === "premium" ? "active" : ""} onClick={() => handleBtns("premium")}>프리미엄티켓</span>
                            </div>
                            <div className="ticket-branch-filter" ref={branchFilterRef}>
                                <span
                                className={`branch-select-display ${branchFilterOpen ? "on" : ""}`}
                                onClick={() => handleBtns("filter")}
                                >
                                    <span>{branchFilterLabel}</span>
                                </span>
                                <ul className={`branch-option-list ${branchFilterOpen ? "on" : ""}`}>
                                    <li className={`branch-option ${branchFilterIndex === null ? "selected" : ""}`} 
                                    onClick={() => handleBtns("reset")}>
                                        지역
                                    </li>
                                    {branches.map((branch, index) => (
                                    <li
                                    className={`branch-option ${branchFilterIndex === index ? "selected" : ""}`}
                                    key={index}
                                    onClick={() => selectFilterOption(index)}
                                    >
                                    {branch}
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
        </section>
    )
}
export default MyTicketList;