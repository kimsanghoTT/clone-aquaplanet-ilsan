import React, { useContext } from "react";
import "../../../../css/aquaplanet/aquaplanet_user_dashboard.css"
import LoginContext from "../../../LoginContext";
import useTicket from "./hooks/useticket";
import TicketOrderList from "./sub_components/my_ticket_order_list";
import TicketOrderDetailList from "./sub_components/my_ticket_order_detail_list";


const MyTicketList = () => {
    const {loginMember} = useContext(LoginContext);
    const {orderedTicketList, orderedTicketDetailList, selectedOrderNo, setSelectedOrderNo} = useTicket(loginMember?.memberNo);

    const handleOrderClick = (orderNo) => {
        setSelectedOrderNo(orderNo);
    }



    return (
        <section className="aquaplanet-user-dashboard-wrapper">
            <TicketOrderList onOrderSelect={handleOrderClick} orderedTicketList={orderedTicketList}/>
            <TicketOrderDetailList 
            orderedTicketList={orderedTicketList} 
            orderedTicketDetailList={orderedTicketDetailList} 
            selectedOrderNo={selectedOrderNo}
            />
        </section>
    )
}
export default MyTicketList;