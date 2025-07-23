package aquaplanet_ilsan.service;

import java.util.List;
import java.util.Random;
import java.util.concurrent.ThreadLocalRandom;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import aquaplanet_ilsan.dto.OrderDetail;
import aquaplanet_ilsan.dto.OrderRequest;
import aquaplanet_ilsan.dto.Orders;
import aquaplanet_ilsan.mapper.OrderMapper;

@Service
public class OrderServiceImpl implements OrderService{

	@Autowired
	OrderMapper orderMapper;
	private final Random random = ThreadLocalRandom.current(); 
	
	@Override
	@Transactional // 주문 정보 삽입, 주문 세부 정보 삽입 -> 2가지 쿼리를 하나의 트랜잭션으로 묶어서 처리
	public void insertOrderList(OrderRequest request) {
		//들어온 데이터 분류
		Orders insertOrder = request.getOrderData();
		List<OrderDetail> insertOrderDetail = request.getOrderDetailDataList();
		
		//메인 주문 먼저 주입 
		orderMapper.orderTicket(insertOrder);
		
		//상세 주문에 메인 주문의 주문 번호 주입 + 각 옵션에 바코드 번호 주입
		for(OrderDetail detail : insertOrderDetail) {
			detail.setOrderNo(insertOrder.getOrderNo());
			
			StringBuilder sb = new StringBuilder(16);
			for (int i = 0; i < 16; i++) {
				sb.append(random.nextInt(10));
			}
			String barcodeNumber = sb.toString();
			detail.setBarcodeNumber(barcodeNumber);
		}
		
		//상세 주문 주입
		orderMapper.orderTicketDetail(insertOrderDetail);
	}
	
	//사용가능한 티켓 + 티켓 세부 옵션 불러오기
	@Override
	public List<Orders> getAvailableOrderedTickets(int memberNo) {
		return orderMapper.getAvailableOrderedTickets(memberNo);
	}
	
	@Override
	public List<OrderDetail> getAvailableOrderedTicketDetails(int orderNo) {
		return orderMapper.getAvailableOrderedTicketDetails(orderNo);
	}
	
	//구매했던 모든 티켓 + 티켓 세부 옵션 불러오기
	@Override
	public List<Orders> getAllOrderedTickets(int memberNo) {
		return orderMapper.getAllOrderedTickets(memberNo);
	}
	
	@Override
	public List<OrderDetail> getAllOrderedTicketDetails(int orderNo) {
		return orderMapper.getAllOrderedTicketDetails(orderNo);
	}
	
	//환불 기능
	@Override
	@Transactional // Orders, OrderDetail 각각의 테이블에 해당하는 두 가지 쿼리를 하나의 트랜잭션으로 처리
	public void refundOrder(OrderRequest request) {
		int memberNo = request.getOrderData().getMemberNo();
		int orderNo = request.getOrderData().getOrderNo();
		String orderStatus = request.getOrderData().getOrderStatus();
		String optionStatus = request.getOrderDetailDataList().get(0).getOptionStatus();
		
		orderMapper.refundOrder(memberNo, orderNo, orderStatus);
		orderMapper.refundOrderDetail(orderNo, optionStatus);
	}
}
