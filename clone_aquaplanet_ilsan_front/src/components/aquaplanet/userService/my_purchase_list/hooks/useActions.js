import { useCallback, useEffect, useState } from "react";
import ticketData from "../../../main_mall/main_mall_item.json";
import axiosInstance from "../../../../_axiosIntercepting/axiosIntercepting";

const useActions = ({
  orderedTicketList,
  filteredTicketList,
}) => {
    const [selectedOrderNo, setSelectedOrderNo] = useState(null);
    const [selectedOrderInfo, setSelectedOrderInfo] = useState(null);
    const [orderedTicketData, setOrderedTicketData] = useState(null);
    const [showTicketList, setShowTicketList] = useState(false);
    const [orderedTicketDetailList, setOrderedTicketDetailList] = useState([]);

    const getBaseTicketInfo = useCallback((id) => {
        const baseData = ticketData.find(item => item.id === id);
        return baseData;
    },[]);

    //필터 적용 시 자동으로 필터로 걸러진 목록 중 맨 첫번째 요소 지정
    useEffect(() => {
        if (!Array.isArray(filteredTicketList) || filteredTicketList.length === 0) {
            setSelectedOrderNo(null);
            return;
        }

        //따로 선택한 게 없으면 자동으로 첫 번째 요소로 지정
        if (selectedOrderNo === null || !filteredTicketList.some(order => order.orderNo === selectedOrderNo)) {
            if(filteredTicketList.length > 0){
                setSelectedOrderNo(filteredTicketList[0].orderNo);
            }
            else{
                setSelectedOrderNo(null);
            }
        }
    }, [filteredTicketList, selectedOrderNo]);

    //티켓 선택 시 상세정보 업데이트
    useEffect(() => {
        if (!filteredTicketList || filteredTicketList.length === 0 || !selectedOrderNo) {
            setSelectedOrderInfo(null);
            setOrderedTicketData(null);
            return;
        }
        
        const sliceOrder = filteredTicketList.find(ticket => ticket.orderNo === selectedOrderNo);

        if (sliceOrder) {
            const selectedTicketData = getBaseTicketInfo(sliceOrder.ticketId); 
            setSelectedOrderInfo(sliceOrder);
            setOrderedTicketData(selectedTicketData);
        } else {
             setSelectedOrderInfo(null);
             setOrderedTicketData(null);
        }
    }, [filteredTicketList, selectedOrderNo, getBaseTicketInfo]);

    useEffect(() => {
        const getMemberOrderDetailList = async () => {
            if (selectedOrderNo === null) {
                setOrderedTicketDetailList([]); 
                return;
            }

            try{
                const response = await axiosInstance.get(`/aquaplanet/member/myOrderedTicketDetails/${selectedOrderNo}`);
                if(response.data.result === "SUCCESS"){
                    const orderDetail = response.data.allOrderDetailDataList;
                    setOrderedTicketDetailList(orderDetail);
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

    const handleShowTicketListBtn = () => {
        setShowTicketList(!showTicketList);
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
        const setOrderData = orderedTicketList.find(item => item.orderNo === orderNo);
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
    return{
        selectedOrderNo,
        selectedOrderInfo,
        orderedTicketData,
        showTicketList,
        handleOrderClick,
        refundOrder,
        handleShowTicketListBtn,
        getBaseTicketInfo,
        orderedTicketDetailList
    }
};
export default useActions;