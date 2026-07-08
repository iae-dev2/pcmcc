<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<c:set var="menucode" value="${menucode}" />
<div class="bg-side-menu"></div>
<c:choose>
   <c:when test="${menucode eq 'pcb'}">
      <!-- 개인 기여도 -->
      <ul>
         <li><a href="javascript:;" id="menu_pcb_pba" class="active first" onclick="tabs.addTab('개인 기여도','/pcb/pba')">개인 기여도</a></li>
         <li><a href="javascript:;" id="menu_pcb_pbb" class="" onclick="tabs.addTab('인건비 확보율','/pcb/pbb')">인건비 확보율</a></li>
      </ul>
   </c:when>
   <c:when test="${menucode eq 'pcc'}">
      <!-- 기여도 평가 -->
      <ul>
         <li><a href="javascript:;" id="menu_pcc_pca" class="active first" onclick="tabs.addTab('기여도 평가','/pcc/pca')">기여도 평가</a></li>
      </ul>
   </c:when>
   <c:when test="${menucode eq 'pcd'}">
      <!-- 기여도 확인 -->
      <ul>
         <li><a href="javascript:;" id="menu_pcd_pda" class="active first" onclick="tabs.addTab('기여도 확인','/pcd/pda')">기여도 확인</a></li>
      </ul>
   </c:when>
   <c:when test="${menucode eq 'pce'}">
      <!-- 관리자 -->
      <ul>
         <li><a href="javascript:;" id="menu_pce_pcf" class="active first" onclick="tabs.addTab('조직코드','/pce/pcf')">게시판관리</a></li>
         <li><a href="javascript:;" class="" id="menu_pce_pcg">코드관리</a>
            <div style="border-top:1px solid #e5e5e5;"><a href="javascript:;" id="menu_pce_pcg_pga" class="" onclick="tabs.addTab('평가코드관리','/pce/pcg/pga')">평가코드관리</a></div>
            <div><a href="javascript:;" id="menu_pce_pcg_pgb" class="" onclick="tabs.addTab('과제코드관리','/pce/pcg/pgb')">과제코드관리</a></div>
            <div><a href="javascript:;" id="menu_pce_pcg_pgc" class="" onclick="tabs.addTab('인원관리','/pce/pcg/pgc')">인원관리</a></div>
         </li>
         <li><a href="javascript:;" class="" id="menu_pce_pch">기여율평가</a>
            <div style="border-top:1px solid #e5e5e5;"><a href="javascript:;" id="menu_pce_pch_pha" class="" onclick="tabs.addTab('과제별 기여율관리','/pce/pch/pha')">과제별 기여율관리</a></div>
            <div><a href="javascript:;" id="menu_pce_pch_phb" class="" onclick="tabs.addTab('개인별 기여율관리','/pce/pch/phb')">개인별 기여율관리</a></div>
            <div><a href="javascript:;" id="menu_pce_pch_phc" class="" onclick="tabs.addTab('과제별 인원관리','/pce/pch/phc')">과제별 인원관리</a></div>
         </li>
         <li><a href="javascript:;" class="" id="menu_pce_pci">인건비 확보</a>
            <div style="border-top:1px solid #e5e5e5;"><a href="javascript:;" id="menu_pce_pci_pia" class="" onclick="tabs.addTab('내부인건비/간접비관리','/pce/pci/pia')">내부인건비/간접비관리</a></div>
            <div><a href="javascript:;" id="menu_pce_pci_pib" class="" onclick="tabs.addTab('개인별인건비','/pce/pci/pib')">개인별인건비</a></div>
            <div><a href="javascript:;" id="menu_pce_pci_pif" class="" onclick="tabs.addTab('인건비 조정','/pce/pci/pif')">인건비 조정</a></div>
            <div><a href="javascript:;" id="menu_pce_pci_pic" class="" onclick="tabs.addTab('인건비확보율관리','/pce/pci/pic')">인건비확보율관리</a></div>
            <div><a href="javascript:;" id="menu_pce_pci_pid" class="" onclick="tabs.addTab('반기인건비확보율','/pce/pci/pid')">반기인건비확보율</a></div>
            <div><a href="javascript:;" id="menu_pce_pci_pie" class="" onclick="tabs.addTab('연간인건비확보율','/pce/pci/pie')">연간인건비확보율</a></div>
         </li>
      </ul>
   </c:when>

</c:choose>
