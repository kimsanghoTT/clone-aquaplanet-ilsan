import useRegionSelector from "../../../../hooks/useRegionSelector";

const ProfileRegionSelector = ({initialCity, initialDistrict, onRegionChange}) => {
    const {
        citySelectorOpen,
        districtSelectorOpen,
        selectedCityIndex,
        selectedDistrictIndex,
        cityLabel,
        districtLabel,
        availableDistrict,
        cityRef,
        districtRef,
        openRegionSelectorBtn,
        selectCity,
        selectDistrict,
        resetCitySelection,
        resetDistrictSelection,
        cityData
    } = useRegionSelector({
        initialCity: initialCity,
        initialDistrict: initialDistrict,
        onRegionChange: onRegionChange
    });

    return (
        <div className="modify-form-content">
            <label>거주지역</label>
            <div className="region-selector">
            <div ref={cityRef} className="select-city-box">
                <span
                className="select-city"
                ref={cityRef}
                onClick={() => openRegionSelectorBtn(1)}
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
                <li className="city-item" onClick={resetCitySelection}>광역시/도</li>
                {cityData.map((data, index) => (
                    <li
                    className={`city-item ${selectedCityIndex === index ? "on" : ""}`}
                    key={index}
                    data-value={data.city}
                    datatype="memberRegionCity"
                    onClick={() => selectCity(index)}
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
                onClick={() => openRegionSelectorBtn(2)}
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
                <li className="district-item" onClick={resetDistrictSelection}>시/군/구</li>
                {availableDistrict.map((district, index) => (
                    <li
                    className={`district-item ${selectedDistrictIndex === index ? "on" : ""}`}
                    key={index}
                    data-value={district}
                    datatype="memberRegionDistrict"
                    onClick={() => selectDistrict(index)}
                    >
                    {district}
                    </li>
                ))}
                </ul>
            </div>
            </div>
        </div>
    )
}
export default ProfileRegionSelector;