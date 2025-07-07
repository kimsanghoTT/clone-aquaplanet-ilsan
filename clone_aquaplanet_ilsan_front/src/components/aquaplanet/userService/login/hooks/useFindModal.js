import { useState } from "react";

const useFindModal = () => {
  const [openModal, setOpenModal] = useState({
    findIdModal: false,
    findPwModal: false,
  });

  const handleModal = (type) => {
    setOpenModal((modal) => ({
      ...modal,
      [type]: !modal[type],
    }));
  };

  const closeModal = (type) => {
    setOpenModal((modal) => ({
      ...modal,
      [type]: false,
    }));
  };

  const switchToPwModal = () => {
    closeModal("findIdModal");
    setOpenModal((modal) => ({
      ...modal,
      findPwModal: true,
    }));
  };

  return {
    openModal,
    handleModal,
    closeModal,
    switchToPwModal,
  };
};
export default useFindModal;
