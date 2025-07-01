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
public class OrderDetail {
    private int orderDetailNo;
    private int orderNo; 
	private String optionId;
	private String optionName;
	private int totalPricePerOption;
	private int quantity;
	private String optionStatus;
	private String barcodeNumber;
	private String usedDate;
}
