package aquaplanet_ilsan.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import aquaplanet_ilsan.dto.Member;
import aquaplanet_ilsan.service.MailService;
import aquaplanet_ilsan.service.MemberService;

@RestController
@RequestMapping("/aquaplanet")
public class MemberController {

	@Autowired
	MemberService memberService;
	
	@Autowired
	MailService mailService;
	
	@PostMapping("/signup")
	public void signup(@RequestBody Member member) {
		memberService.signup(member);
	}
	
	@GetMapping("/duplicate")
	public int duplicateCheck(@RequestParam("memberEmail") String email) {
		return memberService.duplicateCheck(email);
	}
	
	@PostMapping("/login")
	public Map<String, Object> login(@RequestBody Member member){
		return memberService.login(member);
	}
	
	@PostMapping("login/find/id")
	public ResponseEntity<String> findId(@RequestBody Member member){
		String foundEmail = memberService.findId(member);
		
		if(foundEmail != null) {
			return ResponseEntity.ok(foundEmail);
		}
		else {
			return null;
		}
	}
	
	@PostMapping("/login/find/requestCode")
	public ResponseEntity<Map<String, String>> requestAuthCode(@RequestBody Map<String, String> data){
		String memberEmail = data.get("memberEmail");
		Map<String, String> response = new HashMap<>();
		
		try {
			int isExistMember = memberService.duplicateCheck(memberEmail);
			
			if(isExistMember == 0) {
				response.put("result", "NOT_FOUND");
				return ResponseEntity.ok(response);
			}
			
			mailService.sendAuthCodeMail(memberEmail);
			response.put("result", "SUCCESS");
			return ResponseEntity.ok(response);
		}
		catch(Exception e){
			response.put("result", "UNKNOWN_ERR");
			return ResponseEntity.ok(response);
		}
	}
	
	@PostMapping("/login/find/verifyCode")
	public ResponseEntity<Map<String, String>> verifyAuthCode(@RequestBody Map<String, String> data){
		String memberEmail = data.get("memberEmail");
		String authCode = data.get("authCode");
		
		Map<String, String> response = new HashMap<>();
		
		try {
			boolean valid = mailService.verifyAuthCode(memberEmail, authCode);
			
			if(valid) {
				response.put("result", "SUCCESS");
				return ResponseEntity.ok(response);
			}
			else {
				response.put("result", "INVALID");
				return ResponseEntity.ok(response);
			}
			
		}
		catch (Exception e) {
			response.put("result", "UNKNOWN_ERR");
			return ResponseEntity.ok(response);
		}
	}

	@PostMapping("/login/find/updatePw")
	public ResponseEntity<Map<String, String>> updatePw(@RequestBody Map<String, String> data){
		String memberEmail = data.get("memberEmail");
		String newPw = data.get("memberPw");

		Map<String, String> response = new HashMap<>();
		boolean result = memberService.updatePw(memberEmail, newPw);
		
	    if (memberService.usedPwCheck(memberEmail, newPw)) {
	        response.put("result", "USED_PW");
	        return ResponseEntity.ok(response);
	    }

	    if(result) {
	        response.put("result", "SUCCESS");
	        return ResponseEntity.ok(response);
	    } else {
	        response.put("result", "UNKNOWN_ERR");
	        return ResponseEntity.ok(response);
	    }
	}
	
}