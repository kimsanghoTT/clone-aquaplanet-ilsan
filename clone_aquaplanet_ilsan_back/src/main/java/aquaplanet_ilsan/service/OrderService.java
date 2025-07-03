package aquaplanet_ilsan.service;

import java.util.List;

import aquaplanet_ilsan.dto.OrderDetail;
import aquaplanet_ilsan.dto.OrderRequest;
import aquaplanet_ilsan.dto.Orders;

public interface OrderService {

	void insertOrderList(OrderRequest request);
	
	List<Orders> getAvailableOrderedTickets(int memberNo);
	
	List<OrderDetail> getAvailableOrderedTicketDetails(int orderNo);
	
	List<Orders> getAllOrderedTickets(int memberNo);
	
	List<OrderDetail> getAllOrderedTicketDetails(int orderNo);
}
