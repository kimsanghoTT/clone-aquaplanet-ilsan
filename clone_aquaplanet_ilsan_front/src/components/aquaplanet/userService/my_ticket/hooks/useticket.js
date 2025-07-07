import { useEffect, useState } from "react";
import axiosInstance from "../../../../_axiosIntercepting/axiosIntercepting";

const useTicket = (memberNo) => {
    const [orderedTicketList, setOrderedTicketList] = useState([]);
    const [orderedTicketDetailList, setOrderedTicketDetailList] = useState([]);
    const [selectedOrderNo, setSelectedOrderNo] = useState(null);

    useEffect(() => {
        const getMemberOrderList = async () => {
            if (!memberNo) {
                return;
            }

            try{
                const response = await axiosInstance.get(`/aquaplanet/member/myTicket/${memberNo}`);
                if(response.data.result === "SUCCESS"){
                    const orders = response.data.orderData;
                    setOrderedTicketList(orders);

                    //불러온 정보가 있으면 자동으로 첫 번째 요소 선택
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
    },[memberNo])
    
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

    return{
        orderedTicketList,
        orderedTicketDetailList,
        selectedOrderNo,
        setSelectedOrderNo
    }
    
}
export default useTicket;