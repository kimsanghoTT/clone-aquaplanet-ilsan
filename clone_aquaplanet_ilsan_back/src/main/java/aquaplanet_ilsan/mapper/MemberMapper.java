package aquaplanet_ilsan.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import aquaplanet_ilsan.dto.Member;

@Mapper
public interface MemberMapper {

	//회원가입
	void signup(Member member);
	
	int duplicateCheck(String email);
	
	Member login(Member member);
	
	Member findId(@Param("memberName") String name, @Param("memberPhone") String phone);
	
	int updatePw(@Param("memberEmail")String email, @Param("memberPw") String newPw);
	
	Member usedPwCheck(@Param("memberEmail") String email);
}
