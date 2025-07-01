import axios from "axios";

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
        } else if (
          fullUrl.startsWith(`${baseUrl}/aquaplanet/mypage/getPreferredBranch/`)
        ) {
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
        } else {
          reject(new Error(`처리되지 않은 요청 ${fullUrl}`));
        }
      }, 500);
    });
  },

  post: (url, data) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const baseUrl = process.env.REACT_APP_API_BASE_URL || "";
        const fullUrl = `${baseUrl}${url}`;

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
                  memberName: "데모",
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
          } else if (data.memberEmail === "text@text.com") {
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
            data.memberName === "데모" &&
            data.memberPhone === "01012345678"
          ) {
            resolve({
              data: { result: "FOUND", memberEmail: "demo@demo.com" },
            });
          } else {
            resolve({ data: { result: "NOT_FOUND", memberEmail: null } });
          }
        } else if (
          fullUrl === `${baseUrl}/aquaplanet/mypage/updatePreferredBranch`
        ) {
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
