package kr.re.iae.pcmcc.biz.com.util;

import javax.crypto.Cipher;
import javax.crypto.spec.*;

public class AESHelper {
   public static String decrypt(byte key[], String message) throws Exception {
      SecretKeySpec skeySpec = new SecretKeySpec(key, "AES");
      Cipher cipher = Cipher.getInstance("AES/ECB/NoPadding");
      cipher.init(2, skeySpec);
      byte original[] = cipher.doFinal(Base64Util.decode2(message));
      return new String(original, "UTF-8");
   }

   public static String encrypt(byte key[], String message) throws Exception {
      SecretKeySpec skeySpec = new SecretKeySpec(key, "AES");
      Cipher cipher = Cipher.getInstance("AES/ECB/NoPadding");
      cipher.init(1, skeySpec);
      StringBuffer sb = new StringBuffer();
      sb.append(message);
      byte input[] = sb.toString().getBytes("UTF-8");
      if (input.length < 16) {
         for (int i = 0; i < 16 - input.length; i++) {
            sb.append('\0');
         }
      }
      else {
         int share = input.length / 16;
         int mod = input.length % 16;
         if (mod > 0) {
            share++;
         }
         for (int i = 0; i < share * 16 - input.length; i++) {
            sb.append('\0');
         }
      }
      byte encrypted[] = cipher.doFinal(sb.toString().getBytes("UTF-8"));
      return new String(Base64Util.encode(encrypted));
   }

}
