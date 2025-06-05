package aquaplanet_ilsan.service;

import java.util.Map;

import aquaplanet_ilsan.dto.Member;

public interface MemberService {

	void signup(Member member);
	
	int duplicateCheck(String email);
	
	Map<String, Object> login(Member member);
	
	String findId(Member member);
	
	boolean updatePw(String email, String newPw);
	
	boolean usedPwCheck(String email, String password);
}
