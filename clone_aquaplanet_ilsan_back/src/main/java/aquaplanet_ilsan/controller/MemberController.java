package aquaplanet_ilsan.controller;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
	public ResponseEntity<Map<String, String>> findId(@RequestBody Map<String, String> data){
		String memberName = data.get("memberName");
		String memberPhone = data.get("memberPhone");
		
		Map<String, String> response = new HashMap<>();
		
		String memberEmail = memberService.findId(memberName, memberPhone);
		
		
		if(!memberEmail.isEmpty()) {
			response.put("result", "FOUND");
			response.put("memberEmail", memberEmail);
			return ResponseEntity.ok(response);
		}
		else {
			response.put("result", "NOT_FOUND");
			return ResponseEntity.ok(response);
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
		
	    if (memberService.usedPwCheck(memberEmail, newPw)) {
	        response.put("result", "USED_PW");
	        return ResponseEntity.ok(response);
	    }
	    
		boolean result = memberService.updatePw(memberEmail, newPw);

	    if(result) {
	        response.put("result", "SUCCESS");
	        return ResponseEntity.ok(response);
	    } else {
	        response.put("result", "UNKNOWN_ERR");
	        return ResponseEntity.ok(response);
	    }
	}
	
	@GetMapping("/mypage/getPreferredBranch/{memberEmail}")
	public ResponseEntity<Map<String, Boolean>> getPreferredBranch(@PathVariable("memberEmail") String memberEmail){
		String preferredBranch = memberService.getPreferredBranch(memberEmail);
		
		Map<String, Boolean> map = new HashMap<>();
		List<String> allBranches = Arrays.asList("63", "여수", "제주", "일산", "광교");
		for(String branch : allBranches) {
			map.put(branch, false);
		}
		
		if(map != null && !map.isEmpty()) {
			String[] branchList = preferredBranch.split(",");
			
			for(String branch : branchList) {
				String formattedString = branch.trim();
				
				if(allBranches.contains(formattedString)) {
					map.put(formattedString, true);
				}
			}
		}
		return ResponseEntity.ok(map);
	}
	
	@PostMapping("/mypage/updatePreferredBranch")
	public ResponseEntity<Map<String, String>> updatePreferredBranch(@RequestBody Member member){

	    boolean updateData = memberService.updatePreferredBranch(member);

	    Map<String, String> response = new HashMap<>();

	    if(updateData) {
	        response.put("result", "SUCCESS");
	        return ResponseEntity.ok(response);
	    }
	    else {
	        response.put("result", "FAIL");
	        return ResponseEntity.ok(response);
	    }
	}
	
}