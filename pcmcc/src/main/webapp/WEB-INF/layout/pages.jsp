<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<c:set var="menucode_out" value="${menucode}" />
<!DOCTYPE HTML>
<html lang="ko-KR">
<head>
<tiles:insertAttribute name="htmlHead" />
</head>
<body>
   <!-- header -->
   <div style="display: inline-block; min-width: 100%;">
      <div id="header">
         <tiles:insertAttribute name="header" />
      </div>
   </div>
   <!-- e: header -->
   <!-- SideMenu (LNB) -->
   <c:choose>
      <c:when test="${menucode_out eq 'pcb'}"><!-- Add Margin -->
         <div id="side-menu">
            <tiles:insertAttribute name="sideMenu" />
         </div>
      </c:when>
      <c:when test="${menucode_out eq 'pce'}"><!-- Add Margin -->
         <div id="side-menu">
            <tiles:insertAttribute name="sideMenu" />
         </div>
         <div id="side-menu-layout">
            <div id="side-menu-circle">
               <div id="menu_fold"><div id="arrow_left"></div></div>
               <div id="menu_open"><div id="arrow_right"></div></div>
            </div>
         </div>
      </c:when>
   </c:choose>
   <!-- id="side-menu" -->
   <!-- cnts-wrapper -->
   <c:choose>
      <c:when test="${menucode_out eq 'pcb'}"><!-- Add Margin -->
         <div id="cnts-wrapper-pcb">
            <!-- tabs -->
            <div class="tabs">
               <ul>
                  <li class="current" id='${tabcode}'><a href="javascript:;" class="tabs-inner current">${tabtitle}</a><a href="javascript:;" class="tabs-close first"></a></li>
               </ul>
            </div>
            <!-- s:contents -->
            <div id="contents-box">
               <div id="${tabpanel}" class="tabs-panel-body current">
                  <tiles:insertAttribute name="body" />
               </div>
            </div>
            <!-- e:contents -->
         </div>
         <!-- cnts-wrapper -->
      </c:when>
      <c:when test="${menucode_out eq 'pce'}"><!-- Add Margin -->
         <div id="cnts-wrapper">
            <!-- tabs -->
            <div class="tabs">
               <ul>
                  <li class="current" id='${tabcode}'><a href="javascript:;" class="tabs-inner current">${tabtitle}</a><a href="javascript:;" class="tabs-close first"></a></li>
               </ul>
            </div>
            <!-- s:contents -->
            <div id="contents-box">
               <div id="${tabpanel}" class="tabs-panel-body current">
                  <tiles:insertAttribute name="body" />
               </div>
            </div>
            <!-- e:contents -->
         </div>
         <!-- cnts-wrapper -->
      </c:when>
      <c:otherwise><!-- No Margin -->
         <div id="cnts-wrapper-nomargin">
            <!-- tabs -->
            <div class="tabs">
               <ul>
                  <li class="current" id='${tabcode}'><a href="javascript:;" class="tabs-inner current">${tabtitle}</a><a href="javascript:;" class="tabs-close first"></a></li>
               </ul>
            </div>
            <!-- s:contents -->
            <div id="contents-box">
               <div id="${tabpanel}" class="tabs-panel-body current">
                  <tiles:insertAttribute name="body" />
               </div>
            </div>
            <!-- e:contents -->
         </div>
         <!-- cnts-wrapper -->
      </c:otherwise>
   </c:choose>
</body>
<script>
var login_session = "<%=session.getAttribute("login")%>";
var login_emplno = "";
var login_vname = "";
var login_vposname = "";
var login_team = "";

var login_session2 = login_session.split(",");
for(var i=0; i<login_session2.length; i++) {
   if (login_session2[i].indexOf("vEmplNo") > -1) {
      login_emplno = login_session2[i].replace("{", "").replace("}", "").replace("vEmplNo=", "").replace(/^\s+|\s+$/g,"");
   }
   else if (login_session2[i].indexOf("vName") > -1) {
      login_vname = login_session2[i].replace("{", "").replace("}", "").replace("vName=", "").replace(/^\s+|\s+$/g,"");
   }
   else if (login_session2[i].indexOf("vPosName") > -1) {
      login_vposname = login_session2[i].replace("{", "").replace("}", "").replace("vPosName=", "").replace(/^\s+|\s+$/g,"");
      login_vposname = "(" + login_vposname + ")";
   }
   else if (login_session2[i].indexOf("vTeamCode") > -1) {
      login_team = login_session2[i].replace("{", "").replace("}", "").replace("vTeamCode=", "").replace(/^\s+|\s+$/g,"");
   }
}

$("#com_top_emplno").val(login_emplno);
$("#com_top_name").text(login_vname);
$("#com_top_posname").text(login_vposname);
$("#com_top_team").val(login_team);

</script>
</html>

