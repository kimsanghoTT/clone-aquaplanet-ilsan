package aquaplanet_ilsan.service;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MailServiceImpl implements MailService{

	private final JavaMailSender javaMailSender; 
	private static final String SENDER_EMAIL = "qwert850528@gmail.com"; 
	private static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	private static final int CODE_LENGTH = 6;
	
	private Map<String, String> codeStore = new HashMap<>();
	
	@Override
	public MimeMessage createAuthCodeMail(String mail, String authCode) {
		MimeMessage message = javaMailSender.createMimeMessage();
		
		try {
			message.setFrom(SENDER_EMAIL);
			message.setRecipients(MimeMessage.RecipientType.TO, mail);
			message.setSubject("Aquaplanet 이메일 인증 코드");
			
			String msg = "";
	        msg += "<div style='margin:100px; font-family: NotoSans KR;'>";
	        msg += "<h1> AquaPlanet 인증 코드</h1>";
	        msg += "<p>아래 인증코드를 이메일 인증 입력 칸에 입력해주세요<p>"; 
	        msg += "<br/>";
	        msg += "<div style='border:1px solid black; text-align: center;'>"; 
	        msg += "<div style='font-size:150%; padding: 40px 0'>";
	        msg += "<strong style='color:blue; letter-spacing: 10px;'>" + authCode + "</strong>"; 
	        msg += "</div>";
	        msg += "</div>"; 
			
			message.setText(msg, "utf-8", "html");
		}
		catch(MessagingException e){
			e.printStackTrace();
		}
		return message;
	}
	
	public String RandomCode() {
		Random ran = new Random();
		StringBuilder code = new StringBuilder(CODE_LENGTH);
		
		for(int i = 0; i<CODE_LENGTH; i++) {
			int pickCharacter = ran.nextInt(CHARACTERS.length());
			code.append(CHARACTERS.charAt(pickCharacter));
		}
		return code.toString();
	}
	
	@Override
	public String sendAuthCodeMail(String mail) {
		String authCode = RandomCode();
		MimeMessage message = createAuthCodeMail(mail, authCode);
		javaMailSender.send(message);
		codeStore.put(mail, authCode);
		return authCode;
	}
	
	@Override
	public boolean verifyAuthCode(String email, String code) {
		String storedCode = codeStore.get(email);
		
		if(storedCode == null) {
			return false;
		}
		
		if(storedCode.equals(code)) {
			codeStore.remove(email);
			return true;
		}
		return false;
	}
}
