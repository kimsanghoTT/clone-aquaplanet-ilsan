import React from "react";

const SignupPreferredBranchForm = ({
    submitFinalMemberData,
    selectedPreferredBranch,
    preferredBranchSelection
}) => {
    return(
        <div className="member-signup-preferred-branch-box">
            <div className="member-signup-title">
                <p>
                아쿠아플라넷에 <br />
                오신 걸 환영해요!
                </p>
                <p>어디로 방문하실 계획이신가요?</p>
            </div>
            <form className="signup-form" onSubmit={submitFinalMemberData}>
                <label
                className={selectedPreferredBranch["여수"] ? "on" : ""}
                htmlFor="여수"
                >
                여수
                </label>
                <input
                checked={selectedPreferredBranch["여수"] || false}
                type="checkbox"
                id="여수"
                value={"여수"}
                onChange={preferredBranchSelection}
                />

                <label
                className={selectedPreferredBranch["제주"] ? "on" : ""}
                htmlFor="제주"
                >
                제주
                </label>
                <input
                checked={selectedPreferredBranch["제주"] || false}
                type="checkbox"
                id="제주"
                value={"제주"}
                onChange={preferredBranchSelection}
                />

                <label
                className={selectedPreferredBranch["일산"] ? "on" : ""}
                htmlFor="일산"
                >
                일산
                </label>
                <input
                checked={selectedPreferredBranch["일산"] || false}
                type="checkbox"
                id="일산"
                value={"일산"}
                onChange={preferredBranchSelection}
                />

                <label
                className={selectedPreferredBranch["광교"] ? "on" : ""}
                htmlFor="광교"
                >
                광교
                </label>
                <input
                checked={selectedPreferredBranch["광교"] || false}
                type="checkbox"
                id="광교"
                value={"광교"}
                onChange={preferredBranchSelection}
                />
                <button className="signup-submit-btn">선택하기</button>
            </form>
        </div>
    )
}
export default SignupPreferredBranchForm;