package aquaplanet_ilsan.dto;

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
public class Orders {
	private int orderNo;
	private int memberNo;
	private String ticketId;
	private String ticketTitle;
	private String ticketBranch;
	private int finalTotalPrice;
	private String orderStatus;
	private String orderDate;
	private String paymentMethod;
	private String itemCategory;
	private String delay;
}
