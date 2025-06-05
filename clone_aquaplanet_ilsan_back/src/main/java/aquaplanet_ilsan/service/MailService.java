package aquaplanet_ilsan.service;

import jakarta.mail.internet.MimeMessage;

public interface MailService {

	MimeMessage createAuthCodeMail(String mail, String authCode);
	
	String sendAuthCodeMail(String mail);
	
	boolean verifyAuthCode(String email, String code);
}
