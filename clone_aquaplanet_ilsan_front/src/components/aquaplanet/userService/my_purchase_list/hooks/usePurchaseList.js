import { useContext } from "react";
import { branchColor, branches, statuses } from "../data/constrants";
import useActions from "./useActions";
import useFilter from "./useFilter";
import useGetPurchaseData from "./useGetPurchaseData";
import LoginContext from "../../../../LoginContext";

const usePurchaseList = () => {
  const { loginMember } = useContext(LoginContext);
  const { orderedTicketList } = useGetPurchaseData();

  const {
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
  } = useFilter(orderedTicketList);

  const {
    selectedOrderNo,
    selectedOrderInfo,
    orderedTicketData,
    showTicketList,
    orderedTicketDetailList,
    handleOrderClick,
    refundOrder,
    handleShowTicketListBtn,
    getBaseTicketInfo,
  } = useActions({orderedTicketList, filteredTicketList});

  return {
    loginMember,
    branchFilterRef,
    statusFilterRef,
    branchFilterLabel,
    branchFilterOpen,
    statusFilterLabel,
    statusFilterOpen,
    orderedTicketList,
    orderedTicketDetailList,
    filteredTicketList,
    selectedOrderNo,
    selectedOrderInfo,
    orderedTicketData,
    showTicketList,
    branchColor: branchColor,
    statuses: statuses,
    branches: branches,
    handleFilterBtns,
    selectFilterOption,
    handleOrderClick,
    refundOrder,
    handleShowTicketListBtn,
    getBaseTicketInfo,
    branchFilterIndex,
    statusFilterIndex,
  };
};
export default usePurchaseList;
