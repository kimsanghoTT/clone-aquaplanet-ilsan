import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../../_axiosIntercepting/axiosIntercepting";
import { useCallback, useState } from "react";
import moment from "moment";

const usePaymentProcess = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const paymentProcess = useCallback(
    async ({
      paymentMethod,
      memberNo,
      baseData,
      finalizedOptions,
      finalTotalPrice,
    }) => {
      setIsLoading(true);

      const orderData = {
        memberNo: memberNo,
        ticketId: baseData.id,
        ticketTitle: baseData.ticketTitle,
        ticketBranch: baseData.branch,
        finalTotalPrice: finalTotalPrice,
        orderStatus: "사용가능",
        orderDate: moment().format("YYYY-MM-DD HH:mm:ss"),
        paymentMethod: paymentMethod,
        itemCategory: baseData.itemCategory,
        delay: baseData.delay,
      };
      const orderDetailDataList = finalizedOptions.map((item) => ({
        optionId: item.option.id,
        optionName: item.option.name,
        quantity: item.quantity,
        totalPricePerOption: item.totalPricePerOption,
        optionStatus: "사용대기",
        usedDate: null,
        delay: item.option.delay,
      }));
      const requestBody = {
        orderData: orderData,
        orderDetailDataList: orderDetailDataList,
      };
      try {
        const response = await axiosInstance.post(
          `/aquaplanet/mall/${baseData.id}/order/${memberNo}`,
          requestBody
        );
        if (response.data.result === "SUCCESS") {
          const postedOrderData = response.data.orderData;
          const postedOrderDetailDataList = response.data.orderDetailDataList;
          alert("결제가 완료되었습니다.");
          navigate(
            `/aquaplanet/mall/item_detail/${baseData.id}/order/${memberNo}/orderDone`,
            {
              state: {
                orderData: postedOrderData,
                orderDetailDataList: postedOrderDetailDataList,
                baseData: baseData,
              },
              replace: true,
            }
          );
        } else {
          alert(
            "결제 처리 중 예상치 못한 오류가 발생했습니다. 잠시 후 다시 시도해 주세요."
          );
        }
      } catch {
        alert(
          "결제에 실패했습니다. 네트워크 연결을 확인하거나 잠시 후 다시 시도해 주세요."
        );
      } finally {
        setIsLoading(false);
      }
    },[navigate]);

    return {isLoading, paymentProcess}
};
export default usePaymentProcess;
