import axios from "axios";
import ticketData from "../aquaplanet/main/common_data/main_mall_item.json";
import mockOrders from "./mock_orders.json";
import mockOrderDetails from "./mock_orders_detail.json";

// 시연용 백엔드 우회 코드, 백엔드 활성화 시 .env에서 DEMO_MODE 주석처리 할 것
const axiosIntercepting = {
  get: (url, config) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const baseUrl = process.env.REACT_APP_API_BASE_URL || "";
        const fullUrl = `${baseUrl}${url}`;

        if (fullUrl === `${baseUrl}/aquaplanet/duplicate`) {
          const { memberEmail } = config.params;
          const existedEmails = ["test@test.com", "ksh11@naver.com"];

          if (existedEmails.includes(memberEmail)) {
            resolve({ data: 1 });
          } else {
            resolve({ data: 0 });
          }
        } else if (fullUrl.startsWith(`${baseUrl}/aquaplanet/mypage/getPreferredBranch/`)) {
          const initBranches = {
            63: false,
            여수: false,
            제주: false,
            일산: false,
            광교: false,
          };

          const preferredBranch = "일산,광교";
          const responseData = { ...initBranches };
          const branchList = preferredBranch.split(",");

          for (const branch of branchList) {
            const formattedBranchString = branch.trim();
            if (responseData.hasOwnProperty(formattedBranchString)) {
              responseData[formattedBranchString] = true;
            }
          }

          resolve({ data: responseData });
        } else if(fullUrl.startsWith(`${baseUrl}/aquaplanet/member/myTicket/`)){
          const memberNo = fullUrl.split('/').pop();

          if(memberNo && parseInt(memberNo) > 0){

            const userAvailableOrders = mockOrders.filter(
              order => order.orderStatus === "사용가능"
            );
            resolve({data:{result:"SUCCESS", orderData:userAvailableOrders}});
          }
          else{
            resolve({data:{result:"FAILED", orderData:[]}});
          }
          return;
        } else if(fullUrl.startsWith(`${baseUrl}/aquaplanet/member/myTicketDetail/`)){
            const orderNo = parseInt(fullUrl.split("/").pop());
            const order = mockOrders.find(o => o.orderNo === orderNo); 

            let mockOrderDetailDataList = [];

            if (order) {
                const ticket = ticketData.find(t => t.id === order.ticketId);
                if (ticket) {
                  mockOrderDetailDataList = ticket.details.map(detail => {
                    let barcodeNumber = '';

                    for (let i = 0; i < 16; i++) {
                      barcodeNumber += Math.floor(Math.random() * 10); // 0부터 9까지의 숫자
                    }

                    return {
                      orderNo: order.orderNo,
                      optionId: detail.id,
                      optionName: detail.name,
                      quantity: order.ticketId === "ilsan-01" ? 2 : 1, 
                      totalPricePerOption: parseFloat(detail.price.replace(/,/g, '')),
                      optionStatus: "사용대기",
                      usedDate: null,
                      barcodeNumber: barcodeNumber, 
                      delay: detail.delay || ticket.delay || "none",
                    }
                    });
                }
            }

          if (mockOrderDetailDataList.length > 0) {
            resolve({ data: { result: "SUCCESS", orderDetailDataList: mockOrderDetailDataList } });
          } else {
            resolve({ data: { result: "SUCCESS", orderDetailDataList: [] } });
          }
          return;
        } else if(fullUrl.startsWith(`${baseUrl}/aquaplanet/member/myOrderedTickets/`)) {
          const memberNo = fullUrl.split("/").pop();
          
          if(memberNo && memberNo > 0){
            resolve({data:{result:"SUCCESS", allOrderData:mockOrders}});
          }
          else{
            resolve({data:{result:"FAILED", allOrderData:[]}})
          }
        } else if(fullUrl.startsWith(`${baseUrl}/aquaplanet/member/myOrderedTicketDetails/`)){
            const orderNoStr = fullUrl.split("/").pop();
            const orderNo = parseInt(orderNoStr); 
            const mockOrderDetailDataList = mockOrderDetails.filter(detail => detail.orderNo === orderNo);

            if (mockOrderDetailDataList.length > 0) {
                resolve({ data: { result: "SUCCESS", allOrderDetailDataList: mockOrderDetailDataList } });
            } else {
                resolve({ data: { result: "SUCCESS", allOrderDetailDataList: [] } });
            }
        } else {
          reject(new Error(`처리되지 않은 요청 ${fullUrl}`));
        }
      }, 0);
    });
  },

  post: (url, data) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const baseUrl = process.env.REACT_APP_API_BASE_URL || "";
        const fullUrl = `${baseUrl}${url}`;
        const orderUrlPattern = new RegExp(`${baseUrl}/aquaplanet/mall/[a-z0-9-]+/order/\\d+$`);
        const refundUrlPattern = new RegExp(`${baseUrl}/aquaplanet/member/remove/(\\d+)/order/(\\d+)`);

        if (fullUrl === `${baseUrl}/aquaplanet/signup`) {
          resolve({ status: 200 });
        } else if (fullUrl === `${baseUrl}/aquaplanet/login`) {
          if (
            data.memberEmail === "demo@demo.com" &&
            data.memberPw === "demotest123"
          ) {
            resolve({
              data: {
                result: true,
                loginMember: {
                  memberNo: 1,
                  memberName: "데모쨩",
                  memberBirth: null,
                  memberPhone: "01012345678",
                  memberEmail: data.memberEmail,
                  memberPw: null,
                  memberSubEmail: null,
                  memberRegionCity: null,
                  memberRegionDistrict: null,
                  preferredBranch: "일산,광교",
                },
              },
            });
          } else {
            resolve({ data: { result: false, loginMember: null } });
          }
        } else if (fullUrl === `${baseUrl}/aquaplanet/login/find/requestCode`) {
          if (data.memberEmail === "demo@demo.com") {
            resolve({ data: { result: "SUCCESS" } });
          } else if (data.memberEmail === "test@test.com") {
            resolve({ data: { result: "NOT_FOUND" } });
          } else {
            resolve({ data: { result: "UNKNOWN_ERR" } });
          }
        } else if (fullUrl === `${baseUrl}/aquaplanet/login/find/verifyCode`) {
          if (
            data.memberEmail === "demo@demo.com" &&
            data.authCode === "123456"
          ) {
            resolve({ data: { result: "SUCCESS" } });
          } else if (
            data.memberEmail === "demo@demo.com" &&
            data.authCode !== "123456"
          ) {
            resolve({ data: { result: "INVALID" } });
          } else {
            resolve({ data: { result: "UNKNOWN_ERR" } });
          }
        } else if (fullUrl === `${baseUrl}/aquaplanet/login/find/updatePw`) {
          if (
            data.memberEmail === "demo@demo.com" &&
            data.memberPw === "demotest456"
          ) {
            resolve({ data: { result: "SUCCESS" } });
          } else if (
            data.memberEmail === "demo@demo.com" &&
            data.memberPw === "demotest123"
          ) {
            resolve({ data: { result: "USED_PW" } });
          } else {
            resolve({ data: { result: "UNKNOWN_ERR" } });
          }
        } else if (fullUrl === `${baseUrl}/aquaplanet/login/find/id`) {
          if (
            data.memberName === "데모쨩" &&
            data.memberPhone === "01012345678"
          ) {
            resolve({
              data: { result: "FOUND", memberEmail: "demo@demo.com" },
            });
          } else {
            resolve({ data: { result: "NOT_FOUND", memberEmail: null } });
          }
        } else if (fullUrl === `${baseUrl}/aquaplanet/mypage/updatePreferredBranch`) {
          if (data.memberEmail && data.preferredBranch !== undefined) {
            resolve({ status: 200 });
          } else {
            resolve({ status: 400 });
          }
        } else if (fullUrl === `${baseUrl}/aquaplanet/mypage/checkPassword`) {
          if (data.memberNo === 1 && data.inputPw === "demotest123") {
            resolve({ data: { result: "validated" } });
          } else {
            resolve({ data: { result: "invalidated" } });
          }
        } else if (fullUrl === `${baseUrl}/aquaplanet/mypage/modifyProfile`) {
          resolve({ status: 200 });
        } else if(orderUrlPattern.test(fullUrl)){
          const generateOrderNo = Math.floor(Math.random() * 100);
          const generateBarcode = () => {
            let barcode = '';
            for(let i = 0; i < 16; i++){
              barcode += Math.floor(Math.random() * 10);
            }
            return barcode;
          }

          const generateOrderData = {
            ...data.orderData,
            orderNo:generateOrderNo
          }
          const generateOrderDetailDataList = data.orderDetailDataList.map(item => ({
            ...item,
            orderNo:generateOrderNo,
            barcodeNumber:generateBarcode()
          }))
          resolve({data: {result:"SUCCESS", orderData:generateOrderData, orderDetailDataList:generateOrderDetailDataList}})
        } else if(refundUrlPattern.test(fullUrl)){
            const match = fullUrl.match(refundUrlPattern);

            if(match){
              /*
              const orderNo = match[1];
              const memberNo = match[2];

              const requestBody = data;
              console.log(requestBody);

              const refundOrderData = {
                ...requestBody.orderData,
                orderStatus:"환불완료"
              }

              const refundOrderDetailDataList = {
                ...requestBody.orderDetailDataList,
                optionStatus:"환불완료"
              }
              */

              resolve({data:{result:"SUCCESS"}})
            }
        } else {
          reject(new Error(`처리되지 않은 요청 ${fullUrl}`));
        }
      }, 500);
    });
  },

  delete: (url) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const baseUrl = process.env.REACT_APP_API_BASE_URL || "";
        const fullUrl = `${baseUrl}${url}`;

        if (fullUrl.startsWith(`${baseUrl}/aquaplanet/mypage/deleteAccount/`)) {
          const memberNoString = fullUrl.split("/").pop();
          const memberNo = parseInt(memberNoString, 10);

          if (memberNo === 1) {
            resolve({ status: 200 });
          } else {
            reject({ status: 500 });
          }
        } else {
          reject(new Error(`처리되지 않은 요청 ${fullUrl}`));
        }
      }, 500);
    });
  },
};

const useDemoMode = process.env.REACT_APP_DEMO_MODE === "true";
const axiosInstance = useDemoMode ? axiosIntercepting : axios;

export default axiosInstance;
