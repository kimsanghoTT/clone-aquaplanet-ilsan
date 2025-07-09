import { useCallback, useState } from "react";

const useCouponSelection = ({
  availableCoupons,
  totalDiscountableOptionPrice,
  onSelectCoupon,
}) => {
  const [couponModal, setCouponModal] = useState(false);
  const [openCouponList, setOpenCouponList] = useState(false);
  const [selectedCouponName, setSelectedCouponName] =
    useState("쿠폰을 선택해 주세요.");
  const [activeBestDiscount, setActiveBestDiscount] = useState(false);

  const handleCouponChange = useCallback(
    (coupon) => {
      if (coupon === null) {
        setSelectedCouponName("쿠폰을 선택해 주세요.");
        onSelectCoupon(null);
      } else {
        setSelectedCouponName(coupon.name);
        onSelectCoupon(coupon);
      }
      setOpenCouponList(false);
      setActiveBestDiscount(false);
    },
    [onSelectCoupon]
  );

  const autoApplyBestCoupon = useCallback(
    (trigger = false) => {
      if (!availableCoupons || availableCoupons.length === 0) {
        handleCouponChange(null);
        return;
      }

      let potentialDiscount = 0;
      let bestCoupon = null;

      availableCoupons.forEach((element) => {
        let realDiscountedPrice = 0;
        if (element.discountAmount !== undefined) {
          //만약 고정할인액이 티켓 가격보다 높을 경우 티켓 가격에 맞춰 줌
          realDiscountedPrice = Math.min(
            element.discountAmount,
            totalDiscountableOptionPrice
          );
        } else if (element.discountRate !== undefined) {
          realDiscountedPrice =
            element.discountRate * totalDiscountableOptionPrice;
          realDiscountedPrice = Math.min(
            realDiscountedPrice,
            totalDiscountableOptionPrice
          );
        }
        realDiscountedPrice = Math.round(realDiscountedPrice / 10) * 10;
        realDiscountedPrice = Math.max(realDiscountedPrice, 0);

        if (realDiscountedPrice > potentialDiscount) {
          potentialDiscount = realDiscountedPrice;
          bestCoupon = element;
        }
      });

      if (bestCoupon) {
        handleCouponChange(bestCoupon);
      } else {
        handleCouponChange(null);
      }

      if (trigger) {
        setActiveBestDiscount(true);
      }
    },
    [availableCoupons, handleCouponChange, totalDiscountableOptionPrice, setActiveBestDiscount]
  );

  const handleButtons = useCallback(
    (type) => {
      switch (type) {
        case "modal":
          setCouponModal((prev) => {
            const newState = !prev;
            if (!newState) setOpenCouponList(false);
            return newState;
          });
          break;
        case "couponList":
          setOpenCouponList(prev => !prev);
          break;
        case "bestDiscount":
          setActiveBestDiscount((prev) => {
            const bestDiscountState = !prev;
            if (bestDiscountState) {
              autoApplyBestCoupon(true);
            } else {
              handleCouponChange(null);
            }
          });
          break;
        default:
          break;
      }
    },
    [autoApplyBestCoupon, handleCouponChange]);

  return {
    couponModal,
    openCouponList,
    selectedCouponName,
    activeBestDiscount,
    handleButtons,
    handleCouponChange,
    autoApplyBestCoupon,
  };
};
export default useCouponSelection;
