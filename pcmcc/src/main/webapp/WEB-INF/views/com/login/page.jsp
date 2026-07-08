<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page session="false"%>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<style>
table, th, td{
   border: none;/* 1px solid black; */
}
table {
   margin-top: 200px;
   margin-left: 600px;
}
</style>
<div>
   <table>
      <tr>
         <td>
            <h4><span>그룹웨어 홈페이지를 통해서 접속해 주십시오.</span></h4>
         </td>
      </tr>
      <tr>
         <td>
            <div id="dev"><a href="http://portal-dev.iae.re.kr">http://portal-dev.iae.re.kr</a></div>
            <div id="op"><a href="http://portal.iae.re.kr">http://portal.iae.re.kr</a></div>
         </td>
      </tr>
   </table>
   <br /><br /><br /><br />
</div>
<script>
   $(document).ready(function() {
      var _state = "${state}";

      if (_state == "d") {
         $("#dev").css("display", "block");
         $("#op").css("display", "none");
      }
      else {
         $("#dev").css("display", "none");
         $("#op").css("display", "block");
      }
   });
</script>
