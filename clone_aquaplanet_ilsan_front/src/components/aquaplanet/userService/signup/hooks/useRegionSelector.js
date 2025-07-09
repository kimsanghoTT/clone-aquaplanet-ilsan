import { useEffect, useRef, useState } from "react";
import cityData from "../../common_data/city_district.json";

const useRegionSelector = ({member, setMember}) => {
  const [citySelectorOpen, setCitySelectorOpen] = useState(false);
  const [districtSelectorOpen, setDistrictSelectorOpen] = useState(false);

  const [selectedCityIndex, setSelectedCityIndex] = useState(null);
  const [selectedDistrictIndex, setSelectedDistrictIndex] = useState(null);

  const [cityLabel, setCityLabel] = useState("광역시/도");
  const [districtLabel, setDistrictLabel] = useState("시/군/구");

  const [availableDistrict, setAvailableDistrict] = useState([]);

  const cityRef = useRef(null);
  const districtRef = useRef(null);

  useEffect(() => {
    const selectedCity = cityData.find(
      (data) => data.city === member.memberRegionCity
    );
    if (selectedCity) {
      setAvailableDistrict(selectedCity.district);
    } else {
      setAvailableDistrict([]);
    }
  }, [member.memberRegionCity]);

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

  const openRegionSelectorBtn = (number) => {
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

  const selectCity = (index) => {
    setSelectedCityIndex(index);
    setCityLabel(cityData[index].city);
    setCitySelectorOpen(false);

    // 도시 선택 시 시/군/구 초기화
    setSelectedDistrictIndex(null);
    setDistrictLabel("시/군/구");
    setMember((prev) => ({
      ...prev,
      memberRegionCity: cityData[index].city,
      memberRegionDistrict: "",
    }));
  };

  const selectDistrict = (index) => {
    setSelectedDistrictIndex(index);
    setDistrictLabel(availableDistrict[index]);
    setDistrictSelectorOpen(false);
    setMember((prev) => ({
      ...prev,
      memberRegionDistrict: availableDistrict[index],
    }));
  };

  const resetCitySelection = () => {
    setSelectedCityIndex(null);
    setCityLabel("광역시/도");
    setCitySelectorOpen(false);

    setSelectedDistrictIndex(null);
    setDistrictLabel("시/군/구");
    setCitySelectorOpen(false);
    
    setMember((prev) => ({
      ...prev,
      memberRegionCity: "",
      memberRegionDistrict:""
    }));
  };

  const resetDistrictSelection = () => {
    setSelectedDistrictIndex(null);
    setDistrictLabel("시/군/구");
    setDistrictSelectorOpen(false);
    setMember((prev) => ({
      ...prev,
      memberRegionDistrict: "",
    }));
  };

  return {
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
  };
};
export default useRegionSelector;
