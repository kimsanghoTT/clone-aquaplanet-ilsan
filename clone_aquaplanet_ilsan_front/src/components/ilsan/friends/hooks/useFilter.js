import { useCallback, useEffect, useRef, useState } from 'react';

const useFilter = (friends) => {
    const [filteredResult, setFilteredResult] = useState([]);
    const [tempFilteredResult, setTempFilteredResult] = useState([]);
    const [filterConditions, setFilterConditions] = useState({
        first: "",
        second: "",
        search: ""
    })
    const searchRef = useRef(filterConditions.search);

    useEffect(() => {
        searchRef.current = filterConditions.search;
    }, [filterConditions.search]);

    const updateFilterConditions = (type, data) => {
        setFilterConditions(prev => ({
            ...prev,
            [type]:data
        }))
    }
    useEffect(() => {
        let currentFilteredFriends = friends;

        if(filterConditions.first !== ""){
            currentFilteredFriends = currentFilteredFriends.filter(friend => friend.location === filterConditions.first);
        }

        if(filterConditions.second !== ""){
            currentFilteredFriends = currentFilteredFriends.filter(friend => friend.category === filterConditions.second);
        }

        setTempFilteredResult(currentFilteredFriends);
        setFilteredResult(currentFilteredFriends.filter(friends => friends.kr_name.includes(searchRef.current)))

    },[filterConditions.first, filterConditions.second, friends])

    const applySearchFilter = useCallback(() => {
        let currentFilteredFriends = tempFilteredResult;
        if(filterConditions.search !== ""){
            currentFilteredFriends = currentFilteredFriends.filter(friend => friend.kr_name.includes(filterConditions.search));
        }

        setFilteredResult(currentFilteredFriends);
    },[tempFilteredResult, filterConditions.search]);

    return{
        filteredResult,
        updateFilterConditions,
        applySearchFilter,
        filterConditions
    }
}
export default useFilter;