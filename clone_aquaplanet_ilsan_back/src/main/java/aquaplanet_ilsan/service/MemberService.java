package aquaplanet_ilsan.service;

import aquaplanet_ilsan.dto.Member;

public interface MemberService {

	void signup(Member member);
	
	int duplicateCheck(String email);
}
