// src/components/Login/FindIdForm.jsx
import React from 'react';

const FindIdForm = ({ member, insertData, searchId }) => {
    return (
        <div className="search-form">
            <form onSubmit={searchId}>
                <div className="form-content">
                    <span className="form-title">ID 찾기</span>
                    <div className="form-item">
                        <label htmlFor="memberName">이름</label>
                        <input
                            id="memberName"
                            name="memberName"
                            type="text"
                            value={member.memberName}
                            onChange={insertData}
                            required
                        />
                    </div>
                    <div className="form-item">
                        <label htmlFor="memberPhone">휴대폰번호</label>
                        <input
                            id="memberPhone"
                            name="memberPhone"
                            type="text"
                            value={member.memberPhone}
                            onChange={insertData}
                            required
                        />
                    </div>
                </div>
                <button type="submit">아이디 찾기</button>
            </form>
        </div>
    );
};

export default FindIdForm;