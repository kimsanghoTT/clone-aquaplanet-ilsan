import { useContext, useEffect, useState } from "react";
import LoginContext from "../../../../LoginContext";
import axiosInstance from "../../../../_axiosIntercepting/axiosIntercepting";

const useGetPurchaseData = () => {
    const {loginMember} = useContext(LoginContext);
    const [orderedTicketList, setOrderedTicketList] = useState([]);

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
                    
                }
                else{
                    alert("연결 오류가 발생했습니다. 계속될 경우 관리자에게 문의해주세요.");
                    setOrderedTicketList([]);
                }
            }
            catch(error){
                alert("연결 오류가 발생했습니다. 계속될 경우 관리자에게 문의해주세요.");
                setOrderedTicketList([]);
            }
        }
        getMemberOrderList();
    },[loginMember])

    return {orderedTicketList};
}
export default useGetPurchaseData;