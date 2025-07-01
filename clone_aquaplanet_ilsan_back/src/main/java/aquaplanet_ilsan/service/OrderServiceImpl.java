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
	@Transactional
	public void insertOrderList(OrderRequest request) {
		//들어온 데이터 분류
		Orders insertOrder = request.getOrderData();
		List<OrderDetail> insertOrderDetail = request.getOrderDetailDataList();
		
		//메인 주문 먼저 주입 
		orderMapper.orderTicket(insertOrder);
		
		//상세 주문에 메인 주문의 주문 번호 주입
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
}
