import { useEffect, useRef, useState } from "react";
import { branches, branchColor } from "./data/branch";
import ticketData from "../../main_mall/main_mall_item.json";
import moment from "moment";

const TicketOrderList = ({orderedTicketList, onOrderSelect}) => {
    const [activeTab, setActiveTab] = useState("general");
    const [branchFilterLabel, setBranchFilterLabel] = useState("지역");
    const [branchFilterOpen, setBranchFilterOpen] = useState(false);
    const [branchFilterIndex, setBranchFilterIndex] = useState(null);
    const [filteredTicketList, setFilteredTicketList] = useState([]);
    const branchFilterRef = useRef();

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
    },[activeTab, branchFilterIndex, orderedTicketList])

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

    const selectFilterOption = (index) => {
        setBranchFilterIndex(index);
        setBranchFilterLabel(branches[index]);
        setBranchFilterOpen(false);
    };
    
    const getBaseTicketInfo = (id) => {
        const baseData = ticketData.find(item => item.id === id);
        return baseData;
    }

    return(
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
                                    <div className="ticket-item" key={order.orderNo} onClick={() => onOrderSelect(order.orderNo)}>
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
    )
}
export default TicketOrderList;