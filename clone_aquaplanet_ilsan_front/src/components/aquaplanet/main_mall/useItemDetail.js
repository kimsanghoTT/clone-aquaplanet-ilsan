import { useLocation, useParams } from "react-router-dom";
import itemData from "./main_mall_item.json";

const useItemDetail = () => {

const { state } = useLocation();
  const { id } = useParams();
  const item = state?.item;
  const spareItem = itemData.find((item) => item.id === id);
  const finalItem = item || spareItem;

  return finalItem;
}
export default useItemDetail;