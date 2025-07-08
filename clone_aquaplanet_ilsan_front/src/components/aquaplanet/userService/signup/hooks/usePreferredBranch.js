import { useState } from "react";

const usePreferredBranch = (setMember) => {
    const [selectedPreferredBranch, setSelectedPreferredBranch] = useState({
        여수: false,
        제주: false,
        일산: false,
        광교: false,
    });
    const preferredBranchSelection = (e) => {
        const value = e.target.value;
        const checked = e.target.checked;

        setSelectedPreferredBranch((branch) => ({
            ...branch,
            [value]: checked,
        }));

        setMember(member => {
            let branches;
            if(checked){
                branches = member.preferredBranch.includes(value) ? member.preferredBranch : [...member.preferredBranch, value];
            }
            else{
                branches = member.preferredBranch.filter(item => item !== value);
            }
            return {
                ...member,
                preferredBranch: branches
            }
        })
    };

    return {selectedPreferredBranch, preferredBranchSelection};
}
export default usePreferredBranch;