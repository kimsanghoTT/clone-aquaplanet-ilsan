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
public class Member {

	private String memberEmail;
	private String memberPw;
	private String memberSubEmail;
	private String memberRegionCity;
	private String memberRegionDistrict;
}
