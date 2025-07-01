package aquaplanet_ilsan.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Param;

import aquaplanet_ilsan.dto.OrderDetail;
import aquaplanet_ilsan.dto.Orders;

@Mapper
public interface OrderMapper {

	@Options(useGeneratedKeys = true, keyProperty = "orderNo")
	int orderTicket(Orders orders);
	
	int orderTicketDetail(@Param("orderDetails") List<OrderDetail> orderDetails);
}
