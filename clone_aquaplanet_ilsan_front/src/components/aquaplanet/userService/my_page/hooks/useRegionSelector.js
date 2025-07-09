import { useEffect, useRef, useState } from "react";
import cityData from "../../common_data/city_district.json";

const useRegionSelector = ({initialCity, initialDistrict, onRegionChange}) => {
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
    setCityLabel(initialCity || "광역시/도");
    setDistrictLabel(initialDistrict || "시/군/구");
    
    const cityIndex = cityData.findIndex(data => data.city === initialCity);
    setSelectedCityIndex(cityIndex !== -1 ? cityIndex : null);

    if(cityIndex !== -1 && initialCity){
      const selectedCity = cityData[cityIndex];
      setAvailableDistrict(selectedCity.district);

      if(initialDistrict){
        const districtIndex = selectedCity.district.indexOf(initialDistrict);
        setSelectedDistrictIndex(districtIndex !== -1 ? districtIndex : null);
      }
      else{
        setSelectedDistrictIndex(null);
      }
    }
    else{
      setAvailableDistrict([]);
      setSelectedDistrictIndex(null);
    }
  }, [initialCity, initialDistrict]);

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
    const selectedCity = cityData[index].city;
    setSelectedCityIndex(index);
    setCityLabel(selectedCity);
    setCitySelectorOpen(false);

    // 도시 선택 시 시/군/구 초기화
    setSelectedDistrictIndex(null);
    setDistrictLabel("시/군/구");
    onRegionChange(selectedCity, "");
  };

  const selectDistrict = (index) => {
    const selectedDistrict = availableDistrict[index];
    setSelectedDistrictIndex(index);
    setDistrictLabel(selectedDistrict);
    setDistrictSelectorOpen(false);
    onRegionChange(cityLabel, selectedDistrict);
  };

  const resetCitySelection = () => {
    setSelectedCityIndex(null);
    setCityLabel("광역시/도");
    setCitySelectorOpen(false);

    setSelectedDistrictIndex(null);
    setDistrictLabel("시/군/구");
    setCitySelectorOpen(false);
    
    onRegionChange("", "");
  };

  const resetDistrictSelection = () => {
    setSelectedDistrictIndex(null);
    setDistrictLabel("시/군/구");
    setDistrictSelectorOpen(false);
    onRegionChange(cityLabel, "");
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
    cityData
  };
};
export default useRegionSelector;
