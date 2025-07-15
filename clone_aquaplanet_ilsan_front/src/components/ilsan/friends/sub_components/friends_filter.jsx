import { useEffect, useRef, useState } from "react";
import { floor, category } from "../data/data";

const FriendsFilter = () => {
    const [isOpenFilter, setIsOpenFilter] = useState({
        first: false,
        second: false
    })
    const [filterConditions, setFilterConditions] = useState({
        first: "",
        second: "",
        search: ""
    })
    const filters = [
        {key:"first", label:"전체", items:floor},
        {key:"second", label:"전체", items:category}
    ];
    const firstFilterRef = useRef(null);
    const secondFilterRef = useRef(null);

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
        setFilterConditions(prev => ({
            ...prev,
            [type]:data
        }))
        setIsOpenFilter(prev => ({
            ...prev,
            [type]:!prev[type]
        }))
    }

    return (
        <>
            {filters.map(({key, label, items}) => {
                const ref = key === "first" ? firstFilterRef : secondFilterRef;
                
                return (
                    <div key={key} className={`${key}-filter`}>
                        <button onClick={() => filterOpenHandler(key)}>
                            {filterConditions[key] || label}
                            <em></em>
                        </button>
                        <ul className={isOpenFilter[key] ? "active" : ""} ref={ref}>
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
                    <input placeholder="찾고 싶은 전시생물을 검색해보세요" />
                    <button>
                        <span className="blind">검색</span>
                    </button>
                </div>
        </>
    );
};
export default FriendsFilter;
