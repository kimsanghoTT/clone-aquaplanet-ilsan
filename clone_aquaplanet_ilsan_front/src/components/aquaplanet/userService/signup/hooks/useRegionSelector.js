import { useEffect, useRef, useState } from "react";
import cityData from "../data/city_district.json";

const useRegionSelector = ({ memberRegionCity, memberRegionDistrict, setMember }) => {
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

    useEffect(() => {
        const selectedCity = cityData.find((data) => data.city === memberRegionCity);
        if (selectedCity) {
            setAvailableDistrict(selectedCity.district);
        } else {
            setAvailableDistrict([]);
        }
      }, [memberRegionCity]);

    const openRegionSelector = (number) => {
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

    const RegionSelection = (e) => {
        const value = e.target.getAttribute("data-value");
        const field = e.target.getAttribute("datatype");

        setMember((userData) => ({
        ...userData,
        [field]: value,
        }));
    };

    const resetRegionSelection = () => {
        setMember((userData) => ({
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

    const updateSelectedLabel = (index, type) => {
    if (type === "city") {
        setSelectedCityIndex(index);
        setCityLabel(cityData[index].city);
        setCitySelectorOpen(!citySelectorOpen);
        // 시/군/구 박스 초기화
        setSelectedDistrictIndex(null);
        setDistrictLabel("시/군/구");
    } 
    else if (type === "district") {
        setSelectedDistrictIndex(index);
        setDistrictLabel(availableDistrict[index]);
        setDistrictSelectorOpen(!districtSelectorOpen);
    }
    };
}
export default useRegionSelector;