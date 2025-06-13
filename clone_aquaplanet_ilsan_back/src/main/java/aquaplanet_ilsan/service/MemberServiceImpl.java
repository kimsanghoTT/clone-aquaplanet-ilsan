package aquaplanet_ilsan.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import aquaplanet_ilsan.dto.Member;
import aquaplanet_ilsan.mapper.MemberMapper;

@Service
public class MemberServiceImpl implements MemberService{
	
	@Autowired
	MemberMapper memberMapper;
	
	//회원가입
	@Override
	public void signup(Member member) {	
		memberMapper.signup(member);
	}
	
	//아이디 중복체크
	@Override
	public int duplicateCheck(String email) {
		return memberMapper.duplicateCheck(email);
	}
	
	//로그인
	@Override
	public Map<String, Object> login(Member member) {
		Member loginMember = memberMapper.login(member);

		Map<String, Object> map = new HashMap<>();
        if(loginMember != null){
            map.put("result", true);
            map.put("loginMember", loginMember);
        } else {
            map.put("result", false);
        }

        return map;
	}
	
	//아이디 찾기
	@Override
	public String findId(String name, String phone) {
		Member isExistmember = memberMapper.findId(name, phone);
		if(isExistmember == null) {
			return "";
		}
		
		String memberEmail = isExistmember.getMemberEmail();
		return memberEmail;
	}
		
	//비밀번호 찾기
	@Override
	public boolean usedPwCheck(String email, String newPassword) {
		Member isExistMember = memberMapper.usedPwCheck(email);
		
		if(isExistMember == null) {
			return false;
		}
		return newPassword.equals(isExistMember.getMemberPw());
	}
	
	@Override
	public boolean updatePw(String email, String newPw) {
		return memberMapper.updatePw(email, newPw) > 0;
	}
	
	@Override
	public String getPreferredBranch(String memberEmail) {
		return memberMapper.getPreferredBranch(memberEmail);
	}
	
	@Override
	public boolean updatePreferredBranch(Member member) {
		int updatedRows = memberMapper.updatePreferredBranch(member);
        return updatedRows > 0;
	}
}
