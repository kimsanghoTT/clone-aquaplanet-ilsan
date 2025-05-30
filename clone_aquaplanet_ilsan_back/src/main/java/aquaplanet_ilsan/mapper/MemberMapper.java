package aquaplanet_ilsan.mapper;

import org.apache.ibatis.annotations.Mapper;

import aquaplanet_ilsan.dto.Member;

@Mapper
public interface MemberMapper {

	//회원가입
	void signup(Member member);
	
	int duplicateCheck(String email);
	
	Member login(Member member);
}
