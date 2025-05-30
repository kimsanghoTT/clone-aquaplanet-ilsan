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
            // loginMember가 null이 아니라면, SQL 쿼리가 조건을 만족하는 row를 찾았다는 의미
            map.put("success", true);
            map.put("message", "로그인 성공");
            // 세션 처리 등을 여기서 할 수 있습니다.
        } else {
            // loginMember가 null이라면, SQL 쿼리가 조건을 만족하는 row를 찾지 못했다는 의미
            map.put("success", false);
            map.put("message", "아이디 또는 비밀번호가 일치하지 않습니다.");
        }

        return map;
	}
}
