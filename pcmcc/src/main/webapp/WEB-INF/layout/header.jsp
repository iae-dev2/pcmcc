<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<c:set var="menucode" value="${menucode}"/>
<c:set var="vemplno" value="${vemplno}"/>
<c:set var="vteamcode" value="${vteamcode}"/>
<c:set var="vmenugrade" value="${vmenugrade}"/>
<%-- <input value="${vmenugrade}"> --%>
<div class="header-inner">
   <h1>
      <a href="/pca">
         <img src="/resources/images/top_logo.png" alt="IAE_기여도평가시스템">
      </a>
   </h1>
   <ul>

      <c:choose>
         <c:when test="${vmenugrade eq 'A' || vmenugrade eq 'C' || vmenugrade eq 'B' || vmenugrade eq 'E' || vmenugrade eq 'F'}">
            <c:choose>
               <c:when test="${menucode eq 'pcb'}">
                  <li><a href="/pcb" style="border-bottom: 4px solid #4380f3;">개인 기여도</a></li>
               </c:when>
               <c:otherwise>
                  <li><a href="/pcb">개인 기여도</a></li>
               </c:otherwise>
            </c:choose>
         </c:when>
      </c:choose>

      <c:choose>
         <c:when test="${vmenugrade eq 'A' || vmenugrade eq 'C' || vmenugrade eq 'B' || vmenugrade eq 'F'}">
            <c:choose>
               <c:when test="${menucode eq 'pcc'}">
                  <li><a href="/pcc" style="border-bottom: 4px solid #4380f3;">기여도 평가</a></li>
               </c:when>
               <c:otherwise>
                  <li><a href="/pcc">기여도 평가</a></li>
               </c:otherwise>
            </c:choose>
         </c:when>
      </c:choose>

      <c:choose>
         <c:when test="${vmenugrade eq 'A' || vmenugrade eq 'C' || vmenugrade eq 'F'}">
            <c:choose>
               <c:when test="${menucode eq 'pcd'}">
                  <li><a href="/pcd" style="border-bottom: 4px solid #4380f3;">기여도 확인</a></li>
               </c:when>
               <c:otherwise>
                  <li><a href="/pcd">기여도 확인</a></li>
               </c:otherwise>
            </c:choose>
         </c:when>
      </c:choose>

      <c:choose>
         <c:when test="${vmenugrade eq 'A' || vmenugrade eq 'F'}">
            <c:choose>
               <c:when test="${menucode eq 'pcj'}">
                  <li><a href="/pcj" style="border-bottom: 4px solid #4380f3;">기여도 확인(본부장)</a></li>
               </c:when>
               <c:otherwise>
                  <li><a href="/pcj">기여도 확인(본부장)</a></li>
               </c:otherwise>
            </c:choose>
         </c:when>
      </c:choose>

      <c:choose>
         <c:when test="${vmenugrade eq 'A'}">
            <c:choose>
               <c:when test="${menucode eq 'pce'}">
                  <li><a href="/pce" style="border-bottom: 4px solid #4380f3;">관리자</a></li>
               </c:when>
               <c:otherwise>
                  <li><a href="/pce">관리자</a></li>
               </c:otherwise>
            </c:choose>
         </c:when>
      </c:choose>
   </ul>
   <div class="box-user">
      <span id="logout" style="pointer-events:none;"><strong><label id="com_top_name"></label></strong><label id="com_top_posname"></label></span>
      <input id="com_top_emplno" type="hidden">
      <input id="com_top_duty" type="hidden">
      <input id="com_top_team" type="hidden">
   </div>
</div>
