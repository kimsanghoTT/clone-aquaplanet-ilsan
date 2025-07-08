import { useEffect, useState } from "react";
import axiosInstance from "../../../../_axiosIntercepting/axiosIntercepting";

const usePreferredBranch = (memberEmail) => {
  const [selectedPreferredBranch, setSelectedPreferredBranch] = useState({
    63: false,
    여수: false,
    제주: false,
    일산: false,
    광교: false,
  });

    useEffect(() => {
        const getPreferredBranches = async () => {
            if(!memberEmail){
                return;
            }

            try{
                const response = await axiosInstance.get(`/aquaplanet/mypage/getPreferredBranch/${memberEmail}`);
                setSelectedPreferredBranch(response.data);
            }
            catch{
                console.log("선호지점 가져오기 오류");
            }
        }

        getPreferredBranches();
    },[memberEmail])

    const preferredBranchSelection = async (e) => {
        const value = e.target.value;
        const checked = e.target.checked;

        if(!checked){
            const count = Object.values(selectedPreferredBranch).filter(value => value).length; //지점 중 true인 것만 골라 그것들의 개수 = 길이 반환
            if(count <= 1){
            alert("최소 하나 이상의 선호 지점을 선택해주세요");
            return;
            }
        }

        const updatedPreferredBranch = {
            ...selectedPreferredBranch,
            [value]:checked
        }
        setSelectedPreferredBranch(updatedPreferredBranch);

        const sortSelected = Object.keys(updatedPreferredBranch).filter(key => updatedPreferredBranch[key]);
        const selectedBranchString = sortSelected.join(",");

        try{
            await axiosInstance.post("/aquaplanet/mypage/updatePreferredBranch",{
            memberEmail: memberEmail,
            preferredBranch: selectedBranchString
            })
        }
        catch{
            alert("에러발생");
        }
    };

    return {selectedPreferredBranch, preferredBranchSelection}
}
export default usePreferredBranch;