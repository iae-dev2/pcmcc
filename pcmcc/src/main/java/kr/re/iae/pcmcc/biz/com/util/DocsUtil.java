package kr.re.iae.pcmcc.biz.com.util;

import org.json.JSONObject;

import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;

public class DocsUtil {

   public DocsUtil() {

   }

   /**
    * 비동기 커맨드를 호출한다
    * 사용방법 :
    * <pre>
    *    String oid = requestCommand(taskName, inputUri, outputUri);
    * </pre>
    * @author epapyrus
    * @version 1.0
    * @param pdfGatewayBuildUri : 호출 Uri
    * @param taskName : 작업 아이디
    * @param inputUri : 원본 파일
    * @param outputUri : 결과 파일
    * @return oid : 작업 Object ID
    */
   @SuppressWarnings("unchecked")
   public static String requestCommand(String pdfGatewayBuildUri, String taskName, String inputUri, String outputUri) {
      HttpResponse<String> response;
      JSONObject jsonObject;
      String body = "";
      String oid = "";
      String jsonString = "";

      try {
         body = "{" +
                "    \"taskName\": \"" + taskName + "\"," +
                "    \"inputUri\": \"" + inputUri + "\"," +
                "    \"outputUri\": \"" + outputUri + "\"" +
                "}";

         response = Unirest.post(pdfGatewayBuildUri)
                     .header("Content-Type", "application/json")
                     .body(body)
                     .asString();
         jsonString = response.getBody().toString();
         jsonObject = new JSONObject(jsonString);

         //System.out.println(jsonObject);

         oid = jsonObject.getString("oid");
      }
      catch (UnirestException e) {
         e.printStackTrace();
      }

      return oid;
   }

   /**
    * 작업 요청으로 생성된 Object ID 를 이용하여 진행상태를 확인한다.
    * 사용방법 :
    * <pre>
    *    String status = statusCheck(oid);
    * </pre>
    * @author epapyrus
    * @version 1.0
    * @param pdfGatewayStatusUri : 호출 Uri
    * @param oid : 작업 Object ID
    * @return status : 진행상태 (AWAITING:대기, PROGRESSING:진행, SUCCESS:성공, FAILURE:실패)
    */
   @SuppressWarnings("unchecked")
   public static String statusCheck(String pdfGatewayStatusUri, String oid) {
      HttpResponse<String> response;
      JSONObject jsonObject;
      String body = "";
      String status = "";
      String jsonString = "";

      try {
         body = "{" +
                "    \"type\": \"OBJECT_ID\"," +
                "    \"id\": \"" + oid + "\"" +
                "}";

         response = Unirest.post(pdfGatewayStatusUri)
                     .header("Content-Type", "application/json")
                     .body(body)
                     .asString();
         jsonString = response.getBody().toString();
         jsonObject = new JSONObject(jsonString);

         //System.out.println(jsonObject);

         status = jsonObject.getString("status");
      }
      catch (UnirestException e) {
         e.printStackTrace();
      }

      return status;
   }

}
