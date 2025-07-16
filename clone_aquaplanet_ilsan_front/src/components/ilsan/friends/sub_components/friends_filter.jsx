import { useEffect, useRef, useState } from "react";
import { floor, category } from "../data/data";
import useFilter from "../hooks/useFilter";
import friends from "../data/friends.json";

const FriendsFilter = ({onFilter}) => {
    const [isOpenFilter, setIsOpenFilter] = useState({
        first: false,
        second: false
    })
    const filters = [
        {key:"first", label:"전체", items:floor},
        {key:"second", label:"전체", items:category}
    ];
    const firstFilterRef = useRef(null);
    const secondFilterRef = useRef(null);

    const {applySearchFilter, filterConditions, updateFilterConditions, filteredResult} = useFilter(friends);

    useEffect(() => {
        onFilter(filteredResult);
    },[filteredResult, onFilter])

    useEffect(() => {
        const clickOutside = (e) => {
            if (firstFilterRef.current && !firstFilterRef.current.contains(e.target)) {
                setIsOpenFilter(prev => ({...prev, first:false}));
            }
            if (secondFilterRef.current && !secondFilterRef.current.contains(e.target)) {
                setIsOpenFilter(prev => ({...prev, second:false}));
            }
        };

        document.addEventListener("mousedown", clickOutside);
        return () => {
            document.removeEventListener("mousedown", clickOutside);
        };
    }, []);

    const filterOpenHandler = (type) => {
        setIsOpenFilter(prev => ({
            ...prev,
            [type]:!prev[type]
        }))
    }

    const filterConditionsHandler = (type, data) => {
        updateFilterConditions(type, data);
        setIsOpenFilter(prev => ({
            ...prev,
            [type]:!prev[type]
        }))
    }

    const handleInputEnterKeydown = (e) => {
        if(e.key === "Enter"){
            e.preventDefault();
            applySearchFilter();
        }
    }

    return (
        <>
            {filters.map(({key, label, items}) => {
                const ref = key === "first" ? firstFilterRef : secondFilterRef;
                
                return (
                    <div key={key} className={`${key}-filter`} ref={ref}>
                        <button onClick={() => filterOpenHandler(key)}>
                            {filterConditions[key] || label}
                            <em></em>
                        </button>
                        <ul className={isOpenFilter[key] ? "active" : ""} >
                            <li onClick={() => filterConditionsHandler(key, "")}>전체</li>
                            {items.map(item => (
                                <li key={item}onClick={() => filterConditionsHandler(key, item)}>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                )

            })}
                <div className="search-input-box">
                    <input 
                    placeholder="찾고 싶은 전시생물을 검색해보세요" 
                    id="searchCondition" 
                    value={filterConditions.search} 
                    onChange={(e) => filterConditionsHandler("search", e.target.value)}
                    onKeyDown={handleInputEnterKeydown}
                    />
                    <button type="button" onClick={applySearchFilter}>
                        <span className="blind">검색</span>
                    </button>
                </div>
        </>
    );

};
export default FriendsFilter;
