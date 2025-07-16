import { useEffect, useRef, useState } from "react";
import axiosInstance from "../../../../_axiosIntercepting/axiosIntercepting";
import { branches } from "../../data/constants";

const usePreferredBranchFilter = ({loginMember, setSelectedPreferredBranch}) => {
  const [branchSelectorOpen, setBranchSelectorOpen] = useState(false);
  const [branchSelectionState, setBranchSelectionState] = useState({
    여수: true,
    제주: true,
    일산: true,
    광교: true,
  });
  const selectorRef = useRef(null);

  useEffect(() => {
    const clickOutside = (e) => {
      if (selectorRef.current && !selectorRef.current.contains(e.target)) {
        setBranchSelectorOpen(false);
        setBranchSelectionState((prev) => ({ ...prev }));
      }
    };

    document.addEventListener("mousedown", clickOutside);
    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  }, []);

  useEffect(() => {
    const getPreferredBranches = async () => {
      try {
        const response = await axiosInstance.get(
          `/aquaplanet/mypage/getPreferredBranch/${loginMember.memberEmail}`
        );
        setSelectedPreferredBranch(response.data);
        setBranchSelectionState(response.data);
      } catch {
        const defaultBranch = {
          여수: true,
          제주: true,
          일산: true,
          광교: true,
        };
        setSelectedPreferredBranch(defaultBranch);
        setBranchSelectionState(defaultBranch);
      }
    };

    if (loginMember) {
      getPreferredBranches();
    }
  }, [loginMember, setSelectedPreferredBranch]);

  const openBranchSelector = () => {
    setBranchSelectorOpen(true);
  };

  const handleFilter = (branch) => {
    setBranchSelectionState((before) => ({
      ...before,
      [branch]: !before[branch],
    }));
  };

  const applyFilter = () => {
    //객체의 값들만 모아 배열로 만든 수 every로 검사. 모든 값들이 false면 true, 아니면 false 반환
    const whenAllUnselected = Object.values(branchSelectionState).every((False) => !False);

    if (whenAllUnselected) {
      //reduce = 객체, 문자열, 배열 등을 압축하는 것. 여기선 하나의 가상 객체 생성을 위해 사용
      const returnToAllSelected = branches.reduce((newVar, branch) => {
        newVar[branch] = true;
        return newVar;
      }, {});

      setSelectedPreferredBranch(returnToAllSelected);
      setBranchSelectionState(returnToAllSelected);
    } else {
      setSelectedPreferredBranch(branchSelectionState);
    }

    setBranchSelectorOpen(false);
  };
  return {
    branchSelectorOpen,
    branchSelectionState,
    openBranchSelector,
    handleFilter,
    applyFilter,
    selectorRef,
  };
};
export default usePreferredBranchFilter;
