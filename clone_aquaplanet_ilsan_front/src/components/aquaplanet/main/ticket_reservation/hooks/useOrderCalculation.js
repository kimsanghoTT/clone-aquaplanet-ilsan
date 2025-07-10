import { useMemo } from "react";

const useOrderCalculation = (finalizedOptions, selectedCoupon) => {
    const {
        totalSumPrice,
        totalDiscountPrice,
        totalDiscountableOptionPrice,
        discountableItems,
        finalTotalPrice,
        updatedFinalizedOptions

        //useMemo는 불필요한 렌더링 반복을 안하게 해줌
        //useMemo는 여러 변수에 한꺼번에 적용이 가능, 한 번에 계산하기 유용
    } = useMemo(() => {

        // 기본 합계 및 할인 가능한 옵션들의 원가 합계
        let originTotalPrice = 0; 
        let currentDiscountableOptionTotalPrice = 0;

        // 각 옵션의 원가 합산, 할인 가능한 옵션일 경우 따로 합산, 임시 객체 생성
        const sumAllOptionsOriginPrice = finalizedOptions.map((item) => {
            const itemPrice = parseInt(item.option.price.replace(/,/g, ""));
            const originOptionsTotal = itemPrice * item.quantity;
            originTotalPrice += originOptionsTotal; 

            if (item.option.discountable) {
                currentDiscountableOptionTotalPrice += originOptionsTotal; 
            }
            return { ...item, originOptionTotal: originOptionsTotal };
        })

        // 총 할인 금액 계산
        let calculatedTotalDiscountPrice = 0; 
                                            
        if (selectedCoupon) {
            if (selectedCoupon.discountAmount !== undefined) {
                calculatedTotalDiscountPrice = selectedCoupon.discountAmount;
            } 
            else if (selectedCoupon.discountRate !== undefined) {
                calculatedTotalDiscountPrice = selectedCoupon.discountRate * currentDiscountableOptionTotalPrice;
            }
        }
        calculatedTotalDiscountPrice = Math.min(calculatedTotalDiscountPrice, currentDiscountableOptionTotalPrice);
        calculatedTotalDiscountPrice = Math.round(calculatedTotalDiscountPrice / 10) * 10;

        // 할인 가능한 금액에 할인가 적용 계산 (각 옵션별 최종 가격 및 할인 금액)
        let distributedDiscount = calculatedTotalDiscountPrice; // 배분할 총 할인 금액
        const newUpdateFinalizedOptions = sumAllOptionsOriginPrice.map(item => {
            let totalPricePerOption = item.originOptionTotal;

            if (item.option.discountable && currentDiscountableOptionTotalPrice > 0) {
                const ratio = item.originOptionTotal / currentDiscountableOptionTotalPrice;
                let discountForThisOption = Math.round((distributedDiscount * ratio) / 10) * 10;          
                discountForThisOption = Math.min(discountForThisOption, item.originOptionTotal);

                totalPricePerOption = item.originOptionTotal - discountForThisOption;
                totalPricePerOption = Math.max(totalPricePerOption, 0);
            }
            return { ...item, totalPricePerOption: totalPricePerOption };
        });

        //최종 총합 계산, 원가 총합 - 할인가 총합
        const finalPrice = Math.max(originTotalPrice - calculatedTotalDiscountPrice,0);
        
        //옵션들 중 할인 가능한 옵션 필터링
        const discountableItem = newUpdateFinalizedOptions.filter(item => item.option.discountable);

        return{
            totalSumPrice: originTotalPrice,
            totalDiscountPrice: calculatedTotalDiscountPrice,
            totalDiscountableOptionPrice: currentDiscountableOptionTotalPrice,
            finalTotalPrice: finalPrice,
            discountableItems: discountableItem,
            updatedFinalizedOptions: newUpdateFinalizedOptions,
        }
    },[finalizedOptions, selectedCoupon]);
    
    return {
        totalSumPrice,
        totalDiscountPrice,
        totalDiscountableOptionPrice,
        finalTotalPrice,
        discountableItems,
        updatedFinalizedOptions
    }
}
export default useOrderCalculation;