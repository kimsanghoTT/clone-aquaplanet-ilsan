package aquaplanet_ilsan.service;

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
}
