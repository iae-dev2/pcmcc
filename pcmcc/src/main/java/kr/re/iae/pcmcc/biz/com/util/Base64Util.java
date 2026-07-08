package kr.re.iae.pcmcc.biz.com.util;

import java.io.UnsupportedEncodingException;
import org.apache.commons.codec.binary.Base64;

public class Base64Util {

   public Base64Util() {
   }

   public static String encode(String string) {
      return encode(string, "UTF-8");
   }

   public static String encode(String string, String charset) {
      try {
         return new String(encode(string.getBytes(charset)));
      }
      catch (UnsupportedEncodingException e) {
         e.printStackTrace();
      }
      return "ERROR";
   }

   public static byte[] encode(byte is[]) {
      return Base64.encodeBase64(is);
   }

   public static byte[] encode2(String s) {
      try {
         return Base64.encodeBase64(s.getBytes("utf-8"));
      }
      catch (UnsupportedEncodingException e) {
         throw new RuntimeException(e);
      }
   }

   public static String encodeToString(byte s[]) {
      try {
         byte bytes[] = Base64.encodeBase64(s);
         return new String(bytes, "UTF-8");
      }
      catch (Exception e) {
         throw new RuntimeException(e);
      }
   }

   public static String encode2(byte is[]) {
      return new String(encode(is));
   }

   public static String decode(String string) {
      try {
         return new String(decode(string.getBytes("UTF-8")));
      }
      catch (UnsupportedEncodingException e) {
         e.printStackTrace();
      }
      return "ERROR";
   }

   public static byte[] decode2(String string) {
      try {
         return decode(string.getBytes("UTF-8"));
      }
      catch (UnsupportedEncodingException e) {
         e.printStackTrace();
         throw new RuntimeException(e);
      }
   }

   public static byte[] decode(byte is[]) {
      return Base64.decodeBase64(is);
   }

   public static String decode(String encStr, String charset) {
      String decodeStr = null;
      try {
         byte decodeBytes[] = decode(encStr.getBytes(charset));
         decodeStr = new String(decodeBytes, charset);
      }
      catch (UnsupportedEncodingException e) {
         e.printStackTrace();
      }
      return decodeStr;
   }

   public static String getString(byte is[]) {
      StringBuffer stringbuffer = new StringBuffer();
      for (int i = 0; i < is.length; i++) {
         stringbuffer.append((char)is[i]);
      }
      return stringbuffer.toString();
   }

   public static byte[] getBinaryBytes(String string) {
      byte is[] = new byte[string.length()];
      for(int i = 0; i < is.length; i++) {
         is[i] = (byte)string.charAt(i);
      }
      return is;
   }

}
