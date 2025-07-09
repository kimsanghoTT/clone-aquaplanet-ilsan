import { useCallback, useState } from "react";

const useQuantityControl = ({initialOptions, maxQuantity}) => {
    const [quantityExceedMsg, setQuantityExceedMsg] = useState(false);
    const [finalizedOptions, setFinalizedOptions] = useState(initialOptions);

    const calcTotalTicketQuantity = useCallback((selectedOptions) => {
        return selectedOptions.reduce((total, option) => total + option.quantity, 0);
    },[]);

    const handleQuantity = useCallback((btnType, itemOption) => {
        if (btnType === "minus") {
            setFinalizedOptions((prevOption) => {
                const subtractOptionQuantity = prevOption.map((detail) => {
                    if (itemOption.option.name === detail.option.name) {
                        setQuantityExceedMsg(false);
                        const newQuantity = detail.quantity > 1 ? detail.quantity - 1 : 1;
                        return { ...detail, quantity: newQuantity };
                    }
                    return detail;
                });

                const totalQuantity = calcTotalTicketQuantity(subtractOptionQuantity);
                if (totalQuantity >= maxQuantity) {
                    setQuantityExceedMsg(true);
                } else {
                    setQuantityExceedMsg(false);
                }
                return subtractOptionQuantity;
            });
        } 
        else if (btnType === "plus") {
            setFinalizedOptions((prevOption) => {
            const currentTotalQuantity = calcTotalTicketQuantity(prevOption);

            if (currentTotalQuantity >= maxQuantity) {
                setQuantityExceedMsg(true);
                return prevOption;
            }

            return prevOption.map((detail) =>
                itemOption.option.name === detail.option.name
                ? { ...detail, quantity: detail.quantity + 1 }
                : detail
            );
            });
        }
    },[calcTotalTicketQuantity, maxQuantity]);

    return{
        quantityExceedMsg,
        finalizedOptions,
        handleQuantity
    }
}
export default useQuantityControl;