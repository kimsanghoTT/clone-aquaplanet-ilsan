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
	
	@Override
	public void signup(Member member) {	
		memberMapper.signup(member);
	}
	
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
        } else {
            map.put("result", false);
        }

        return map;
	}
	
	//아이디 찾기
	@Override
	public String findId(Member member) {
		return memberMapper.findId(member.getMemberName(), member.getMemberPhone());
	}
	
	@Override
	public boolean updatePw(String email, String newPw) {
		return memberMapper.updatePw(email, newPw) > 0;
	}
	
	@Override
	public boolean usedPwCheck(String email, String newPassword) {
		Member isExistMember = memberMapper.usedPwCheck(email);
		
		if(isExistMember == null) {
			return false;
		}
		
		return newPassword.equals(isExistMember.getMemberPw());
	}
}
