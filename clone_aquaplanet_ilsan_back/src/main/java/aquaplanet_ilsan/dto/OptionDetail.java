package aquaplanet_ilsan.dto;

import java.time.LocalDateTime;

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
public class OptionDetail {
	private String optionId;
	private String optionName;
	private int totalPricePerOption;
	private int quantity;
	private String optionStatus;
	private LocalDateTime usedDate;
}
