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
	
	@Override
	public Map<String, Object> login(Member member) {
		Member loginMember = memberMapper.login(member);
		
		Map<String, Object> map = new HashMap<>();
        if(loginMember != null){
            map.put("success", true);
        } else {
            map.put("success", false);
        }

        return map;
	}
	
	@Override
	public String findId(Member member) {
		return memberMapper.findId(member.getMemberName(), member.getMemberPhone());
	}
}
