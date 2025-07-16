import { useEffect, useState } from "react";

const useSort = ({originalFilteredFriends, isSortChecked}) => {
    const [finalFilteredFriends, setFinalFilteredFriends] = useState([]);

    useEffect(() => {
        let sortedFriends = [...originalFilteredFriends];
        if(isSortChecked){
        sortedFriends.sort((a, b) => b.popular - a.popular);
        }

        setFinalFilteredFriends(sortedFriends);
    },[isSortChecked, originalFilteredFriends])

    return {finalFilteredFriends};
}
export default useSort;