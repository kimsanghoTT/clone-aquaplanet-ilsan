import React from "react";

const FilterHead = ({finalFilteredFriends, isSortChecked, CheckboxHandler}) => {

    return(
        <div className="result-head">
            <p className="answer">
                총 <span className="highlight">{finalFilteredFriends.length}</span>마리의 친구들이
                검색되었습니다. 카드를 클릭하면 세부 정보를 알 수 있어요.
            </p>
            <div className="filter-popular">
                <input checked={isSortChecked} type="checkbox" id="popularCheck" onChange={CheckboxHandler}/>
                <label htmlFor="popularCheck" className={isSortChecked ? "checked" : ""}>인기생물순정렬</label>
            </div>
        </div>
    )
}
export default FilterHead;