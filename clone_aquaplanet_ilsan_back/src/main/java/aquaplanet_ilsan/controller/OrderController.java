package aquaplanet_ilsan.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import aquaplanet_ilsan.dto.OrderDetail;
import aquaplanet_ilsan.dto.OrderRequest;
import aquaplanet_ilsan.dto.Orders;
import aquaplanet_ilsan.service.OrderService;

@RestController
@RequestMapping("/aquaplanet")
public class OrderController {

	@Autowired
	OrderService orderService;
	
	@PostMapping("/mall/{id}/order/{memberNo}")
	public ResponseEntity<Map<String, Object>> recepitOrder(
			@PathVariable("id") String id,
			@PathVariable("memberNo") int memberNo,
			@RequestBody OrderRequest request
	) {
		
		Map<String, Object> response = new HashMap<>();
		try {
			orderService.insertOrderList(request);
			response.put("result", "SUCCESS");
			response.put("orderData", request.getOrderData());
			response.put("orderDetailDataList", request.getOrderDetailDataList());
			return ResponseEntity.ok(response);
		}
		catch (IllegalArgumentException e){
			response.put("result", "FAILED");
			return ResponseEntity.ok(response);
		}
		catch(Exception e){
			response.put("result", "ERROR");
			return ResponseEntity.ok(response);
		}
	}
	
	@GetMapping("/member/myTicket/{memberNo}")
	public ResponseEntity<Map<String, Object>> getOrderedAvailableTickets(@PathVariable("memberNo") int memberNo){
		List<Orders> orderedTickets = orderService.getOrderedAvailableTickets(memberNo);
		
		Map<String, Object> response = new HashMap<>();
		try {
			response.put("result", "SUCCESS");
			response.put("orderData", orderedTickets);
			return ResponseEntity.ok(response);
		}
		catch(Exception e){
			response.put("result", "ERROR");
			response.put("orderData", null);
			return ResponseEntity.ok(response);
		}

	}
	
	@GetMapping("/member/myTicketDetail/{orderNo}")
	public ResponseEntity<Map<String, Object>> getOrderedAvailableTicketDetails(@PathVariable("orderNo") int orderNo){
		List<OrderDetail> orderDetailDataList =orderService.getOrderedAvailableTicketDetails(orderNo);
		
		Map<String, Object> response = new HashMap<>();
		try {

			response.put("result", "SUCCESS");
			response.put("orderDetailDataList", orderDetailDataList);
			return ResponseEntity.ok(response);
		}
		catch(Exception e) {
			response.put("result", "ERROR");
			response.put("orderDetailDataList", null);
			return ResponseEntity.ok(response);
		}
	}
}
