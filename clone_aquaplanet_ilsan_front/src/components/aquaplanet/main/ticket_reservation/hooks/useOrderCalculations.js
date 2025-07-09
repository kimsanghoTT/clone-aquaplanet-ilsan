import { useEffect, useState } from "react";

const useOrderCalculations = ({currentOptions, selectedCoupon}) => {
    const [totalSumPrice, setTotalSumPrice] = useState(0);
    const [totalDiscountPrice, setTotalDiscountPrice] = useState(0);
    const [finalTotalPrice, setFinalTotalPrice] = useState(0);
    const [totalDiscountableOptionPrice, setTotalDiscountableOptionPrice] = useState(0);
    const [calculatedFinalizedOptions, setCalculatedFinalizedOptions] = useState([]);

    useEffect(() => {
        if(!Array.isArray(currentOptions) || currentOptions.length === 0){
            setTotalSumPrice(0);
            setTotalDiscountPrice(0);
            setFinalTotalPrice(0);
            setTotalDiscountableOptionPrice(0);
            setCalculatedFinalizedOptions([]);
            return;
        }
        
        // 기본 합계 및 할인 가능한 옵션들의 원가 합계
        let originTotalPrice = 0; 
        let discountableOptionTotalPrice = 0;

        // 각 옵션의 원가 합산, 할인 가능한 옵션일 경우 따로 합산, 임시 객체 생성
        const originSumOptions = currentOptions.map((item) => {
            const itemPrice = parseInt(item.option.price.replace(/,/g, ""));
            const originOptionTotal = itemPrice * item.quantity;
            originTotalPrice += originOptionTotal; 

            if (item.option.discountable) {
                discountableOptionTotalPrice += originOptionTotal; 
            }
            return { ...item, originOptionTotal: originOptionTotal };
        });

        // 총 할인 금액 계산
        let calculatedTotalDiscountPrice = 0; 
                                            
        if (selectedCoupon) {
            if (selectedCoupon.discountAmount !== undefined) {
                calculatedTotalDiscountPrice = selectedCoupon.discountAmount;
            } 
            else if (selectedCoupon.discountRate !== undefined) {
                calculatedTotalDiscountPrice = selectedCoupon.discountRate * discountableOptionTotalPrice;
            }
        }
        calculatedTotalDiscountPrice = Math.min(calculatedTotalDiscountPrice, discountableOptionTotalPrice);
        calculatedTotalDiscountPrice = Math.round(calculatedTotalDiscountPrice / 10) * 10;
        calculatedTotalDiscountPrice = Math.max(calculatedTotalDiscountPrice, 0);

        //각 옵션별 최종 가격을 포함한 객체 생성
        const insertTotalPricePerOption = originSumOptions.map(item => {
            let totalPricePerOption = item.originOptionTotal; 
            return {...item, totalPricePerOption: totalPricePerOption};
        });

        //할인 가능 품목이 있는지 확인,
        const discountableItemIndex = insertTotalPricePerOption.findIndex(item => item.option.discountable);

        //할인 가능 품목이 있다면 할인 가격 적용
        if (discountableItemIndex !== -1 && calculatedTotalDiscountPrice > 0) {
            insertTotalPricePerOption[discountableItemIndex].totalPricePerOption -= calculatedTotalDiscountPrice;
        }

        //최종 총합 계산, 원가 총합 - 할인가 총합
        let finalPrice = originTotalPrice - calculatedTotalDiscountPrice;
        finalPrice = Math.max(finalPrice, 0);

        setTotalSumPrice(originTotalPrice);
        setTotalDiscountPrice(calculatedTotalDiscountPrice);
        setFinalTotalPrice(finalPrice); 
        setTotalDiscountableOptionPrice(discountableOptionTotalPrice);
        setCalculatedFinalizedOptions(insertTotalPricePerOption);

    }, [selectedCoupon, currentOptions]);

    return {
        totalSumPrice,
        totalDiscountPrice,
        finalTotalPrice,
        totalDiscountableOptionPrice,
        calculatedFinalizedOptions
    }
}
export default useOrderCalculations