import React, { useContext, useEffect, useRef, useState } from "react";
import { namePattern, birthPattern, phonePattern, emailPattern } from "../../../../common_data/validation_pattern";
import LoginContext from "../../../../../../LoginContext";
import { useNavigate } from "react-router-dom";
import cityData from "../../../../common_data/city_district.json";
import { msg } from "../data/msg";
import axiosInstance from "../../../../../../_axiosIntercepting/axiosIntercepting";
import useProfileValidation from "../../../hooks/useProfileValidation";
import ProfileInput from "./sub_components/profile_input";

const UpdateProfile = () => {
    const { loginMember, setLoginMember } = useContext(LoginContext);
    const {validateProfile} = useProfileValidation();
    const navigate = useNavigate();

    const [modifyProfile, setModifyProfile] = useState({
        memberNo: loginMember.memberNo,
        memberName: loginMember.memberName || "",
        memberPhone: loginMember.memberPhone || "",
        memberBirth: loginMember.memberBirth || "",
        memberSubEmail: loginMember.memberSubEmail || "",
        memberRegionCity: loginMember.memberRegionCity || "",
        memberRegionDistrict: loginMember.memberRegionDistrict || "",
    });

    const [citySelectorOpen, setCitySelectorOpen] = useState(false);
    const [districtSelectorOpen, setDistrictSelectorOpen] = useState(false);
    const [selectedCityIndex, setSelectedCityIndex] = useState(null);
    const [selectedDistrictIndex, setSelectedDistrictIndex] = useState(null);
    const [cityLabel, setCityLabel] = useState(loginMember?.memberRegionCity || "광역시/도");
    const [districtLabel, setDistrictLabel] = useState(loginMember?.memberRegionDistrict || "시/군/구");
    const [availableDistrict, setAvailableDistrict] = useState([]);

    const [modifyStep, setModifyStep] = useState(null);
    
    const cityRef = useRef(null);
    const districtRef = useRef(null);

    useEffect(() => {
        setModifyProfile({
            memberNo: loginMember.memberNo,
            memberName: loginMember.memberName || "",
            memberPhone: loginMember.memberPhone || "",
            memberBirth: loginMember.memberBirth || "",
            memberSubEmail: loginMember.memberSubEmail || "",
            memberRegionCity: loginMember.memberRegionCity || "",
            memberRegionDistrict: loginMember.memberRegionDistrict || "",
        })
    },[])




    useEffect(() => {
        const selectedCity = cityData.find(
            (data) => data.city === modifyProfile.memberRegionCity
        );
        if (selectedCity) {
            setAvailableDistrict(selectedCity.district);
        } else {
            setAvailableDistrict([]);
        }

        setModifyProfile((prevSelection) => ({
            ...prevSelection,
            memberRegionDistrict: "",
        }));
    }, [modifyProfile.memberRegionCity]);

    useEffect(() => {
        const clickOutside = (e) => {
        if (cityRef.current && !cityRef.current.contains(e.target)) {
            setCitySelectorOpen(false);
        }
        if (districtRef.current && !districtRef.current.contains(e.target)) {
            setDistrictSelectorOpen(false);
        }
        };

        document.addEventListener("mousedown", clickOutside);
        return () => {
        document.removeEventListener("mousedown", clickOutside);
        };
    }, []);

    const handleProfile = (e) => {
        const { name, value } = e.target;

        setModifyProfile((before) => ({
        ...before,
        [name]: value,
        }));
    };

    const openBtn = (number) => {
        switch (number) {
        case 1:
            setCitySelectorOpen(!citySelectorOpen);
            break;
        case 2:
            setDistrictSelectorOpen(!districtSelectorOpen);
            break;
        default:
            break;
        }
    };

    const selection = (e) => {
        const value = e.target.getAttribute("data-value");
        const field = e.target.getAttribute("datatype");

        setModifyProfile((userData) => ({
        ...userData,
        [field]: value,
        }));
    };

    const updateSelectedLabel = (index, type) => {
        if (type === "city") {
        setSelectedCityIndex(index);
        setCityLabel(cityData[index].city);
        setCitySelectorOpen(!citySelectorOpen);
        // 시/군/구 박스 초기화
        setSelectedDistrictIndex(null);
        setDistrictLabel("시/군/구");
        } else if (type === "district") {
        setSelectedDistrictIndex(index);
        setDistrictLabel(availableDistrict[index]);
        setDistrictSelectorOpen(!districtSelectorOpen);
        }
    };

    const resetRegionSelection = (e) => {
        setModifyProfile((userData) => ({
        ...userData,
        memberRegionCity: "",
        memberRegionDistrict: "",
        }));
        setCityLabel("광역시/도");
        setDistrictLabel("시/군/구");
        setSelectedCityIndex(null);
        setSelectedDistrictIndex(null);
        setCitySelectorOpen(false);
        setDistrictSelectorOpen(false);
        setAvailableDistrict([]);
    }

    const completeModifyProfile = (e) => {
        setModifyStep(null);
        onCancel();
    }

    const submitModifyProfile = async (e) => {
        e.preventDefault();


        
        try {
        const response = await axiosInstance.post("/aquaplanet/mypage/modifyProfile", modifyProfile);
        if(response.status === 200){
            setLoginMember({
            ...loginMember,
            memberName: modifyProfile.memberName,
            memberPhone: modifyProfile.memberPhone,
            memberBirth: modifyProfile.memberBirth,
            memberSubEmail: modifyProfile.memberSubEmail,
            memberRegionCity: modifyProfile.memberRegionCity,
            memberRegionDistrict: modifyProfile.memberRegionDistrict
            })
            setModifyStep("complete");
        }
        } catch {
        alert(msg.GENERIC_ERROR);
        }
    };

    const onCancel = () => {
        navigate("/member/mypage/updateUserInfo");
    }

    return (
        <div className="member-mypage-box">
          <div className="member-mypage-title">
            <p>내 정보 수정</p>
            <p style={{ margin: 0 }}></p>
          </div>
          <div className="member-mypage-content member-update-profile">
            <form onSubmit={submitModifyProfile}>
              <div className="profile-form-wrapper">
                <ProfileInput
                    label={"이름"}
                    name={"memberName"}
                    value={modifyProfile.memberName}
                    onChange={handleProfile}
                    required={true}
                    placeholder={"이름을 입력해주세요."}
                />
                <ProfileInput
                    label={"연락처"}
                    name={"memberPhone"}
                    value={modifyProfile.memberPhone}
                    onChange={handleProfile}
                    required={true}
                    placeholder={"'-'빼고 입력"}
                />
                <ProfileInput
                    label={"생년월일"}
                    name={"memberBirth"}
                    value={modifyProfile.memberBirth}
                    onChange={handleProfile}
                    required={false}
                    placeholder={"yyyy.mm.dd"}
                />
                <ProfileInput
                    label={"이메일"}
                    name={"memberSubEmail"}
                    value={modifyProfile.memberSubEmail}
                    onChange={handleProfile}
                    required={false}
                    placeholder={""}
                />
                </div>
                <div className="modify-form-content">
                  <label>거주지역</label>
                  <div className="region-selector">
                    <div ref={cityRef} className="select-city-box">
                      <span
                        className="select-city"
                        ref={cityRef}
                        onClick={() => openBtn(1)}
                      >
                        <span>{cityLabel}</span>
                        <span
                          className={`ico ${citySelectorOpen ? "on" : ""}`}
                        ></span>
                      </span>
                      <ul
                        style={
                          citySelectorOpen
                            ? { display: "block" }
                            : { display: "none" }
                        }
                      >
                        <li className="city-item" onClick={resetRegionSelection}>광역시/도</li>
                        {cityData.map((data, index) => (
                          <li
                            className={`city-item ${selectedCityIndex === index ? "on" : ""}`}
                            key={index}
                            data-value={data.city}
                            datatype="memberRegionCity"
                            onClick={(e) => {
                              selection(e);
                              updateSelectedLabel(index, "city");
                            }}
                          >
                            {data.city}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div ref={districtRef} className="select-district-box">
                      <span
                        className="select-district"
                        ref={districtRef}
                        onClick={() => openBtn(2)}
                      >
                        <span>{districtLabel}</span>
                        <span
                          className={`ico ${districtSelectorOpen ? "on" : ""}`}
                        ></span>
                      </span>
                      <ul
                        style={
                          districtSelectorOpen
                            ? { display: "block" }
                            : { display: "none" }
                        }
                      >
                        <li className="district-item">시/군/구</li>
                        {availableDistrict.map((district, index) => (
                          <li
                            className={`district-item ${selectedDistrictIndex === index ? "on" : ""}`}
                            key={index}
                            data-value={district}
                            datatype="memberRegionDistrict"
                            onClick={(e) => {
                              selection(e);
                              updateSelectedLabel(index, "district");
                            }}
                          >
                            {district}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mypage-modify-btn-area">
                <button>변경내용 저장</button>
                <button type="button" onClick={onCancel}>
                  취소
                </button>
              </div>
            </form>
            {modifyStep === "complete" && (
            <div className="modal-wrapper">
              <div className="modal-container">
                <button
                  className="modal-close-btn"
                  type="button"
                  onClick={completeModifyProfile}
                ></button>
                  <div className="result-form">
                    <div className="form-content">
                      <span className="form-title">
                        내 정보가 정상적으로 <br/>
                        수정되었습니다.
                        </span>
                      <p>
                        아래 확인 버튼을 눌러주세요!
                      </p>
                    </div>
                    <div className="modal-button-list">
                      <button type="button" 
                      onClick={completeModifyProfile} 
                      style={{backgroundColor: "#2771f1", color: "#fff", width: "100%"}}>
                        확인
                      </button>
                    </div>
                  </div>
              </div>
            </div>
            )}
          </div>
        </div>
    )
}
export default UpdateProfile;