package aquaplanet_ilsan.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@ToString
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OrderRequest {

	private Orders orderData;
	private List<OrderDetail> orderDetailDataList;
}
