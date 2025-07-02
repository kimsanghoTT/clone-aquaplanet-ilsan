package aquaplanet_ilsan.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import aquaplanet_ilsan.dto.OrderDetail;
import aquaplanet_ilsan.dto.Orders;

@Mapper
public interface OrderMapper {

	int orderTicket(Orders orders);
	
	int orderTicketDetail(@Param("orderDetails") List<OrderDetail> orderDetails);
	
	List<Orders> getOrderedAvailableTickets(@Param("memberNo") int memberNo);
	
	List<OrderDetail> getOrderedAvailableTicketDetails(@Param("orderNo") int orderNo);
}
