import { useCallback, useEffect, useState } from "react";

const useQuantityControl = ({initialSelectedOption, maxQuantity}) => {
    const [finalizedOptions, setFinalizedOptions] = useState(initialSelectedOption || []);
    const [quantityExceedMsg, setQuantityExceedMsg] = useState(false);

    useEffect(() => {
        setFinalizedOptions(Array.isArray(initialSelectedOption) ? initialSelectedOption : []);
        setQuantityExceedMsg(false);
    },[initialSelectedOption])

    const calcTotalTicketQuantity = (options) => {
        return (Array.isArray(options) ? options : []).reduce((total, option) => total + (option?.quantity || 0), 0);
    };

    const handleQuantity = useCallback((btnType, itemOption) => {
        setFinalizedOptions(prevOptions => {
            let newOptions;
            if(btnType === "minus"){
                newOptions = prevOptions.map(detail => {
                    if(detail.option.name === itemOption.option.name){
                        const newQuantity = Math.max(1, detail.quantity - 1);
                        return { ...detail, quantity: newQuantity };
                    }
                    return detail;
                })
            } 
            else if(btnType === "plus"){
                const currentTotalQuantity = calcTotalTicketQuantity(prevOptions);
                if(currentTotalQuantity >= maxQuantity){
                    setQuantityExceedMsg(true);
                    return prevOptions;
                }

                newOptions = prevOptions.map((detail) =>
                    itemOption.option.name === detail.option.name
                    ? { ...detail, quantity: detail.quantity + 1 }
                    : detail
                );
            }
            else{
                newOptions = prevOptions;
            }

            const totalQuantityAfterChange = calcTotalTicketQuantity(newOptions);
            if(totalQuantityAfterChange >= maxQuantity){
                setQuantityExceedMsg(true);
            }
            else{
                setQuantityExceedMsg(false);
            }

            return newOptions;
        })
    },[maxQuantity]);

    return {
        finalizedOptions,
        handleQuantity,
        quantityExceedMsg,
    }
}
export default useQuantityControl;