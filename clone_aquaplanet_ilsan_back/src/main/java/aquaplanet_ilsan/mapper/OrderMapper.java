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
	
	List<Orders> getAvailableOrderedTickets(@Param("memberNo") int memberNo);
	
	List<OrderDetail> getAvailableOrderedTicketDetails(@Param("orderNo") int orderNo);
	
	List<Orders> getAllOrderedTickets(@Param("memberNo") int memberNo);
	
	List<OrderDetail> getAllOrderedTicketDetails(@Param("orderNo") int orderNo);
	
	int refundTicket(@Param("memberNo") int memberNo, @Param("orderNo") int orderNo);
	
	int refundTicketDetail(@Param("orderNo") int orderNo, @Param("orderDetailNo") int OrderDetailNo);
}
