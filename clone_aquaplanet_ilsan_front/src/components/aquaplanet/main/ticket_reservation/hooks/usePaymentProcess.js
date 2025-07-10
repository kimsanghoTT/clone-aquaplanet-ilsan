import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../../_axiosIntercepting/axiosIntercepting";
import moment from "moment";

const usePaymentProcess = (
  baseData,
  loginMember,
  finalTotalPrice,
  updatedFinalizedOptions
) => {
  const navigate = useNavigate();

  const finishPay = useCallback(async (payment) => {
      if (!loginMember) {
        alert("로그인 후 이용가능합니다.");
        navigate("/aquaplanet/member/login");
        return;
      }
      const orderData = {
        memberNo: loginMember.memberNo,
        ticketId: baseData.id,
        ticketTitle: baseData.ticketTitle,
        ticketBranch: baseData.branch,
        finalTotalPrice: finalTotalPrice,
        orderStatus: "사용가능",
        orderDate: moment().format("YYYY-MM-DD HH:mm:ss"),
        paymentMethod: payment,
        itemCategory: baseData.itemCategory,
        delay: baseData.delay,
      };
      const orderDetailDataList = updatedFinalizedOptions.map((item) => ({
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
          `/aquaplanet/mall/${baseData.id}/order/${loginMember.memberNo}`,
          requestBody
        );
        if (response.data.result === "SUCCESS") {
          const postedOrderData = response.data.orderData;
          const postedOrderDetailDataList = response.data.orderDetailDataList;
          alert("결제가 완료되었습니다.");
          navigate(
            `/aquaplanet/mall/item_detail/${baseData.id}/order/${loginMember.memberNo}/orderDone`,
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
            "결제 오류가 발생했습니다. 반복될 경우 관리자에게 문의해 주세요."
          );
        }
      } catch {
        alert(
          "결제 오류가 발생했습니다. 반복될 경우 관리자에게 문의해 주세요."
        );
      }
    },
    [baseData, loginMember, finalTotalPrice, updatedFinalizedOptions, navigate]
  );

  return {
    finishPay,
  };
};
export default usePaymentProcess;
