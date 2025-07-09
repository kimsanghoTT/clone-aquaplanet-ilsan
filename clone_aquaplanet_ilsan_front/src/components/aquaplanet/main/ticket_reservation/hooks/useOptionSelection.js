import { useCallback, useEffect, useState } from "react";

const useOptionSelection = ({finalItem}) => {
  const [selectedItemOption, setSelectedItemOption] = useState([]);
  const [openOptionList, setOpenOptionList] = useState(false);
  const [quantityExceedMsg, setQuantityExceedMsg] = useState(false);
  const [totalPrice, setTotalPrice] = useState("");

  useEffect(() => {
    let price = 0;
    selectedItemOption.forEach(item => {
      const itemPrice = parseInt(item.option.price.replace(/,/g, ""));
      price += itemPrice * item.quantity;
    })
    
    const formattedPrice = price.toLocaleString();
    setTotalPrice(formattedPrice);
  },[selectedItemOption])

  const handleOpenOptionList = () => {
    setOpenOptionList(!openOptionList);
  };

  const calcTotalTicketQuantity = useCallback((selectedOptions) => {
    return selectedOptions.reduce((total, option) => total + option.quantity, 0); 
  },[]);

  const handleOption = useCallback((option) => {
    const isAlreadySelected = selectedItemOption.some(
      (detail) => detail.option.name === option.name
    );

    if (isAlreadySelected) {
      setOpenOptionList(false);
      return;
    }

    const totalQuantity = calcTotalTicketQuantity(selectedItemOption);
    const potentialTotalQuantity = totalQuantity + 1

    if(potentialTotalQuantity > finalItem?.maxQuantity){
      setQuantityExceedMsg(true);
      return;
    }

    setQuantityExceedMsg(false);
    setSelectedItemOption((prevOption) => [
      ...prevOption,
      { option, quantity: 1 },
    ]);
    setOpenOptionList(false);
  },[calcTotalTicketQuantity, finalItem?.maxQuantity, selectedItemOption]);

  const handleQuantity = useCallback((btnType, item) => {
    if (btnType === "minus") {
      setSelectedItemOption(prevOption => {
        const subtractOptionQuantity = prevOption.map(detail => {
          if(detail.option.name === item.option.name){
            const newQuantity = detail.quantity > 1 ? detail.quantity - 1 : 1;
            return {...detail, quantity: newQuantity};
          }
          return detail
        })

        const totalQuantity = calcTotalTicketQuantity(subtractOptionQuantity);
        if(totalQuantity >= finalItem?.maxQuantity){
          setQuantityExceedMsg(true);
        }
        else{
          setQuantityExceedMsg(false);
        }
        return subtractOptionQuantity;
      })
    
    }
    else if (btnType === "plus") {
      setSelectedItemOption(prevOption =>{
        const totalQuantity = calcTotalTicketQuantity(prevOption);
        
        if(totalQuantity >= finalItem?.maxQuantity){
          setQuantityExceedMsg(true);
          return prevOption;
        }
        return prevOption.map(detail =>
          detail.option.name === item.option.name ?
          {...detail, quantity: detail.quantity + 1} :
          detail
        )
      })
    }
    else if (btnType === "cancel") {
      setSelectedItemOption(prevOption => prevOption.filter(detail => detail.option.name !== item.option.name));
      setQuantityExceedMsg(false);
    }
    else if(btnType === "init"){
      setSelectedItemOption([]);
      setQuantityExceedMsg(false);
    }
  },[calcTotalTicketQuantity, finalItem?.maxQuantity]);

  return {
    selectedItemOption,
    openOptionList,
    setOpenOptionList, 
    quantityExceedMsg,
    totalPrice,
    handleOpenOptionList,
    handleOption,
    handleQuantity,
  }
}
export default useOptionSelection;