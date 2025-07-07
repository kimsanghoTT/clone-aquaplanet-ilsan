import { useEffect, useRef, useState } from "react";
import { branches, statuses } from "../data/constrants";

const useFilter = (orderedTicketList) => {
    const branchFilterRef = useRef();
    const statusFilterRef = useRef();

    const [branchFilterLabel, setBranchFilterLabel] = useState("전체지역");
    const [branchFilterOpen, setBranchFilterOpen] = useState(false);
    const [branchFilterIndex, setBranchFilterIndex] = useState(null);

    const [statusFilterLabel, setStatusFilterLabel] = useState("전체");
    const [statusFilterOpen, setStatusFilterOpen] = useState(false);
    const [statusFilterIndex, setStatusFilterIndex] = useState(null);

    const [filteredTicketList, setFilteredTicketList] = useState([]);

    useEffect(() => {
        const clickOutside = (e) => {
            if (branchFilterRef.current && !branchFilterRef.current.contains(e.target)) {
                setBranchFilterOpen(false);
            }
            if (statusFilterRef.current && !statusFilterRef.current.contains(e.target)) {
                setStatusFilterOpen(false);
            }
            
        };

        document.addEventListener("mousedown", clickOutside);
        return () => {
            document.removeEventListener("mousedown", clickOutside);
        };
    }, []);

    useEffect(() => {
        if(!Array.isArray(orderedTicketList) || orderedTicketList.length === 0){
            setFilteredTicketList([]);
            return;
        }

        const filteredByBranch = orderedTicketList.filter(ticket => {
            if(branchFilterIndex === null){
                return true;
            }
            return ticket.ticketBranch === branches[branchFilterIndex];
        })

        const filteredByStatus = filteredByBranch.filter(ticket => {
            if(statusFilterIndex === null){
                return true;
            }
            return ticket.orderStatus === statuses[statusFilterIndex];
        });

        setFilteredTicketList(filteredByStatus);
    },[branchFilterIndex, orderedTicketList, statusFilterIndex])

    const handleFilterBtns = (type) => {
        if(type === "filter_branch"){
            setBranchFilterOpen(!branchFilterOpen)
        }
        else if(type === "filter_status"){
            setStatusFilterOpen(!statusFilterOpen);
        }
        else if(type === "reset_branch"){
            setBranchFilterLabel("전체지역");
            setBranchFilterIndex(null);
            setBranchFilterOpen(false);
        }
        else if(type === "reset_status"){
            setStatusFilterLabel("전체");
            setStatusFilterIndex(null);
            setStatusFilterOpen(false);
        }
    }

    const selectFilterOption = (type, index) => {
        if(type === "branch"){
            setBranchFilterLabel(branches[index]);
            setBranchFilterIndex(index);
            setBranchFilterOpen(false);
        }
        else if(type === "status"){
            setStatusFilterLabel(statuses[index]);
            setStatusFilterIndex(index);
            setStatusFilterOpen(false);
        }
    };

    
    return {
        branchFilterRef,
        statusFilterRef,
        branchFilterLabel,
        branchFilterOpen,
        statusFilterLabel,
        statusFilterOpen,
        filteredTicketList,
        handleFilterBtns,
        selectFilterOption,
        branchFilterIndex,
        statusFilterIndex
    }
}
export default useFilter;