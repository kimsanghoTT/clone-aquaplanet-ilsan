package aquaplanet_ilsan.dto;

import java.time.LocalDateTime;
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
public class Order {
	private int OrderNo;
	private int MemberNo;
	private String ticketId;
	private String ticketTitle;
	private String ticketBranch;
	private List<OptionDetail> ticketOption;
	private int finalPaymentPrice;
	private String orderStatus;
	private LocalDateTime orderDate;
	private String paymentMethod;
}
