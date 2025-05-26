package aquaplanet_ilsan.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import aquaplanet_ilsan.dto.Member;
import aquaplanet_ilsan.service.MemberService;

@RestController
@RequestMapping("/aquaplanet")
public class MemberContoller {

	@Autowired
	MemberService memberService;
	
	@PostMapping("/signup")
	public void signup(@RequestBody Member member) {
		memberService.signup(member);
	}
}
