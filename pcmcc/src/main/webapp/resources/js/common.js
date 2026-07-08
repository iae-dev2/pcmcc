$(document).ready(function() {
   $("#side-menu").css('height', $(document).height() + 'px');
   $(window).resize(function () {
      $("#side-menu").css('height', $(document).height() + 'px');
   });
 
   $(document).on("click",".tabs-inner",function() {
      var _tab = $(this).parent();
      tabs.selectTab(_tab);
   });
   $(document).on("click",".tabs-close",function() {
      var _tab = $(this).parent();
      tabs.closeTab(_tab);
   });

   sideMenuFoldFunc();

});

var jqxGridExport = (function(gridId,title) {

   function typeHtml(gridId) {
      var targetGrid = $(gridId);
      return 
         "<table>" +
         "   <colgroup>" +
         "       <col style='width:10px'>"  +
         "   </colgroup>"  +
         "   <thead></thead>"  +
         "   <tbody>" +
         "       <tr><td>aaa</td></tr>" +  
         "   </tbody>" +
         "</table>";
   };

   function typeExcel(gridId, title) {

      var targetGrid = $(gridId);

      var form = document.createElement("form");
      form.setAttribute("charset", "UTF-8");
      form.setAttribute("accept-charset", "UTF-8");
      form.setAttribute("method", "post");
      form.setAttribute("action", "/com/exportExcel");

      var getColumninfo = function() {
         var state = targetGrid.jqxGrid('getstate');
         var columns = state.columns;
         return columns;
      }

      let rows = targetGrid.jqxGrid('getrows');
      
      if (gridId === '#pid_mainGrid') {
         rows.forEach(row => {
            const e1Labor = (row.e1_nLaborCost != null) ? row.e1_nLaborCost : 0;
            const e2Labor = (row.e2_nLaborCost != null) ? row.e2_nLaborCost : 0;
            const e1Amt   = (row.e1_nAmount != null) ? row.e1_nAmount : 0;
            const e2Amt   = (row.e2_nAmount != null) ? row.e2_nAmount : 0;

            const labor = e1Labor + e2Labor;
            const amount = e1Amt + e2Amt;

            row.nSecureRate = amount ? ((labor / amount) * 100).toFixed(1) : "0";
          });
      } 

      if (gridId === '#pie_mainGrid') {
         rows.forEach(row => {
            const e1Labor = (row.e1_nLaborCost != null) ? row.e1_nLaborCost : 0;
            const e2Labor = (row.e2_nLaborCost != null) ? row.e2_nLaborCost : 0;
            const e1Amt   = (row.e1_nAmount != null) ? row.e1_nAmount : 0;
            const e2Amt   = (row.e2_nAmount != null) ? row.e2_nAmount : 0;

            const labor = e1Labor + e2Labor;
            const amount = e1Amt + e2Amt;

            row.nLaborCost = labor;
            row.nAmount = amount;
            row.nSecureRate = amount ? ((labor / amount) * 100).toFixed(1) : "0";
          });
      }
      var hiddenValue = {
         "title" : title,
         "columninfo" : getColumninfo(),
         "datalist" : rows
      };

      console.log(hiddenValue);
      var hiddenField = document.createElement("input");
      hiddenField.setAttribute("type", "hidden");
      hiddenField.setAttribute("name", "jqxGridInfo");
      hiddenField.setAttribute("value", JSON.stringify(hiddenValue));
      form.appendChild(hiddenField);

      document.body.appendChild(form);
      form.submit();
   };

   return {
      typeHtml: typeHtml,
      typeExcel: typeExcel
   };

})();

var commonDialog = (function() {

   var returnData = {};

   var popupInfo = {
      title: '',
      url: '',
      width: 500,
      height: 500,
      resize: false,
      popupParam: ''
   };

   var commonDialogCallback;

   var getPopupContent = function() {
      $.ajax({
         type: 'get',
         url: popupInfo.url,
         data: popupInfo.popupParam,
         dataType: 'html',
         success: function(data) {
            $("#commonDialogBody").html(data);
         }
      });
   }

   function setPopupInfo(contents, paramData) {
      switch (contents) {

      case 'dep':
         popupInfo.title = '부서조회';
         popupInfo.url = '/com/' + contents + '/popup';
         popupInfo.width = 260;
         popupInfo.height = 370;
         popupInfo.popupParam = paramData;
         break;

      case 'tem':
         popupInfo.title = '팀조회';
         popupInfo.url = '/com/' + contents + '/popup';
         popupInfo.width = 700;
         popupInfo.height = 420;
         popupInfo.popupParam = paramData;
         break;

      case 'emp':
         popupInfo.title = '직원조회';
         popupInfo.url = '/com/' + contents + '/popup';
         popupInfo.width = 910;
         popupInfo.height = 520;
         popupInfo.popupParam = paramData;
         break;

      case 'pos':
         popupInfo.title = '직위조회';
         popupInfo.url = '/com/' + contents + '/popup';
         popupInfo.width = 510;
         popupInfo.height = 424;
         popupInfo.popupParam = paramData;
         break;

      case 'kpm':
         popupInfo.title = '총괄과제조회';
         popupInfo.url = '/com/' + contents + '/popup';
         popupInfo.width = 700;
         popupInfo.height = 420;
         popupInfo.popupParam = paramData;
         break;

      case 'spm':
         popupInfo.title = '차수과제조회';
         popupInfo.url = '/com/' + contents + '/popup';
         popupInfo.width = 700;
         popupInfo.height = 420;
         popupInfo.popupParam = paramData;
         break;

      case 'cus':
         popupInfo.title = '거래처조회';
         popupInfo.url = '/com/' + contents + '/popup';
         popupInfo.width = 510;
         popupInfo.height = 420;
         popupInfo.popupParam = paramData;
         break;

      case 'bnk':
         popupInfo.title = '은행조회';
         popupInfo.url = '/com/' + contents + '/popup';
         popupInfo.width = 510;
         popupInfo.height = 420;
         popupInfo.popupParam = paramData;
         break;

      case 'bud':
         popupInfo.title = '예산코드조회';
         popupInfo.url = '/com/' + contents + '/popup';
         popupInfo.width = 700;
         popupInfo.height = 426;
         popupInfo.popupParam = paramData;
         break;   //그리드가 2개(세목 + 세세목)

      case 'btb':
         popupInfo.title = '예산코드조회';
         popupInfo.url = '/com/' + contents + '/popup';
         popupInfo.width = 260;
         popupInfo.height = 370;
         popupInfo.popupParam = paramData;
         break;   //그리드가 1개
 
      case 'fup':
         popupInfo.title = '파일업로드';
         popupInfo.url = '/com/' + contents + '/popup';
         popupInfo.width = 450;
         popupInfo.height = 162;
         popupInfo.resize = true;
         popupInfo.popupParam = paramData;
         break;

      case 'pho':
         popupInfo.title = '사진업로드';
         popupInfo.url = '/com/' + contents + '/popup';
         popupInfo.width = 450;
         popupInfo.height = 162;
         popupInfo.resize = true;
         popupInfo.popupParam = paramData;
         break;

      case 'xls':
         popupInfo.title = '엑셀데이터업로드';
         popupInfo.url = '/com/' + contents + '/popup';
         popupInfo.width = 450;
         popupInfo.height = 162;
         popupInfo.resize = true;
         popupInfo.popupParam = paramData;
         break;

      case 'txt':
         popupInfo.title = '내용';
         popupInfo.url = '/com/' + contents + '/popup';
         popupInfo.width = 450;
         popupInfo.height = 320;
         popupInfo.resize = true;
         popupInfo.popupParam = paramData;
         break;

      case 'lnk':
         popupInfo.title = '연계과제조회';
         popupInfo.url = '/com/' + contents + '/popup';
         popupInfo.width = 1040;
         popupInfo.height = 526;
         popupInfo.popupParam = paramData;
         break;

      case 'acc':
         popupInfo.title = '계정과목 조회';
         popupInfo.url = '/com/' + contents + '/popup';
         popupInfo.width = 510;
         popupInfo.height = 420;
         popupInfo.popupParam = paramData;
         break;

      case 'opp':
        	popupInfo.title = '상계전표';
         popupInfo.url = '/com/' + contents + '/popup';
         popupInfo.width = 910;
         popupInfo.height = 520;
         popupInfo.popupParam = paramData;
         break;

      case 'pay':
         popupInfo.title = '급여코드';
         popupInfo.url = '/com/' + contents + '/popup';
         popupInfo.width = 510;
         popupInfo.height = 420;
         popupInfo.popupParam = paramData;
         break;

      default:
         break;
      }
   }

   function setDialogTag() {
      if ($("#commonDialog").length > 0) {
//        console.log('$commonDialog존재 O');
      }
      else {
//        console.log('$commonDialog존재 X');
         var $commonDialog = $('<div id="commonDialog"><div class="pop-header"></div><div id="commonDialogBody" style="overflow:hidden !important"></div></div>');
         $commonDialog.appendTo('body');
      }
   }

   function createDialog(contents, paramData, callback) {

      //init returnData
      returnData = {};

      //사용자 정의 콜백 함수 등록
      if (typeof callback == 'function') {
         //once 옵션을 사용해서 등록한 callback함수를 한번만 쓰고 큐를 비운다.
         commonDialogCallback = $.Callbacks("once");
         commonDialogCallback.add(callback);
      }
      else {
         return false;
      }

      //공통 팝업 유형에 따른 변수들 설정
      if (contents) {
         setPopupInfo(contents,paramData);
      }
      else {
         return false;
      }

      //팝업으로 사용할 html tag 생성
      setDialogTag();

      //팝업에서 사용할 컨텐츠 로딩
      getPopupContent();

      //팝업 위치 계산
      var top = Math.max(0, (($(window).height() - popupInfo.height) / 2)
                     + $(document).scrollTop());
      var left = Math.max(0, (($(window).width() - popupInfo.width) / 2)
                     + $(document).scrollLeft());

      //jqxWindow를 통한 팝업 객체 생성
      $('#commonDialog').jqxWindow({
         width: popupInfo.width,
         height: popupInfo.height,
         resizable: popupInfo.resize,
         position: {
            x: left,
            y: top
         },
         isModal: true,
         modalOpacity: 0.3,
         showCloseButton: false,
         showCollapseButton: false,
         title: popupInfo.title,
         theme: 'custom'
      });

      return true;
   }

   return {
      open: function(contents, paramData, callback) {
         if (createDialog(contents, paramData, callback)) {
            $('#commonDialog').jqxWindow('open');
         }
      },
      close: function() {
         $('#commonDialog').jqxWindow('close');
      },
      callback: function() {
         commonDialogCallback.fire();
      },
      resize: function(newHeight) {
         $('#commonDialog').jqxWindow({height: newHeight});
      },
      returnData: returnData
   };

}());

var tabs = (function() {

   var tabId = "";
   var tabPanelId = "";
   var tabPageUrl = "";

   var tabTitle = "";

   var addTab = function(title, pageUrl, option) {
      //파라미터 내부 변수 설정
      if (typeof option === 'undefined' || option === null) {
         tabId = pageUrl.replace(/\//g,'_');
         tabPanelId = "panel" + tabId;
         tabPageUrl = pageUrl;
         tabTitle = title;
      }
      else {
         tabId = pageUrl.replace(/\//g,'_') + "_" +option;
         tabPanelId = "panel" + tabId;
         tabPageUrl = pageUrl;
         tabTitle = title;
      }

      if ($("#"+tabId).length > 0) {
         selectTab($("#"+tabId));
      }
      else {
         createTab();
         selectTab($("#"+tabId));
      } 
   }

   var createTab = function() {
      var tabTag = "<li class='current' id='"+tabId+"'><a href='javascript:;' class='tabs-inner current'>" + tabTitle + "</a><a href='javascript:;' class='tabs-close'></a></li>";
      var $tab = $(tabTag);
      $tab.appendTo("div.tabs>ul");

      var panelTag = "<div id='"+tabPanelId+"' class='tabs-panel-body'></div>";
      var $panel = $(panelTag);
      $panel.appendTo("#contents-box");

      pageLoad(tabId);
   }

   var selectTab = function(tab) {
      var _tabId = $(tab).prop('id');
      var _panelId = "panel" + _tabId;
      var _splitTabId = _tabId.split("_");

      if (_splitTabId.length == 3) {
         $("div.tabs>ul>li").removeClass('current');
         $("div.tabs>ul>li>a").removeClass('current');
         $("div#contents-box>div").removeClass('current');
         $("div#side-menu ul li a").removeClass('active');
         $("div#side-menu ul li div a").removeClass('active2');

         $("div.tabs>ul>li#" + _tabId).addClass('current');
         $("div.tabs>ul>li#" + _tabId+">a").addClass('current');
         $("div#contents-box>div#" + _panelId).addClass('current');
         $("div#side-menu ul li a#menu" + _tabId).addClass('active');
      }
      else if (_splitTabId.length == 4) {
         var _depth2_id = "_"+_splitTabId[1]+"_"+_splitTabId[2];
         var _depth3_id = _tabId; 

         $("div.tabs>ul>li").removeClass('current');
         $("div.tabs>ul>li>a").removeClass('current');
         $("div#contents-box>div").removeClass('current');
         $("div#side-menu ul li a").removeClass('active');
         $("div#side-menu ul li div a").removeClass('active2');

         $("div.tabs>ul>li#" + _tabId).addClass('current');
         $("div.tabs>ul>li#" + _tabId+">a").addClass('current');
         $("div#contents-box>div#" + _panelId).addClass('current');
         $("div#side-menu ul li a#menu" + _depth2_id).addClass('active');
         $("div#side-menu ul li div a#menu" + _depth3_id).addClass('active2');

      }
      
      //****
      pce_refresh();
      
   }

   var closeTab = function(tab) {
      var _tabId = $(tab).prop('id');
      var _panelId = "panel" + _tabId;

      $("#"+_tabId).remove();
      $("#"+_panelId).remove();

      if ($("div.tabs>ul>li.current").length == 0) {
         selectTab($("div.tabs>ul>li:first"));
      }       
   }

   var pageLoad = function(tabId) {
      $.ajax({
         type: 'get',
         url: tabPageUrl+"/content",
         data: {
            appId: tabId
         },
         dataType: 'html',

         success: function(data) {
            $("#"+tabPanelId).html(data);
         }
      });
   }

   return {
      addTab: function(title, pageUrl, option) {
         addTab(title, pageUrl, option);
      },
      selectTab: function(tab) {
         selectTab(tab);
      },
      closeTab: function(tab) {
         closeTab(tab);
      }
   };

}());

//그리드 refresh
var pce_refresh = function() {

   if ($("#pcf_bbsGrid").length > 0) {
      $("#pcf_bbsGrid").jqxGrid("refresh");        //게시판관리
   }
   if ($("#pga_grid").length > 0) {
      $("#pga_grid").jqxGrid("refresh");           //평가코드관리
   }
   if ($("#pgb_grid").length > 0) {
      $("#pgb_grid").jqxGrid("refresh");           //과제코드관리
   }
   if ($("#pgc_grid").length > 0) {
      $("#pgc_grid").jqxGrid("refresh");           //인원관리
   }
   if ($("#pha_prjGrid").length > 0) {
      $("#pha_prjGrid").jqxGrid("refresh");        //과제별 기여율관리 - 과제코드 목록
   }
   if ($("#pha_contGrid").length > 0) {
      $("#pha_contGrid").jqxGrid("refresh");       //과제별 기여율관리 - 과제별 기여율
   }
   if ($("#phb_empGrid").length > 0) {
      $("#phb_empGrid").jqxGrid("refresh");        //개인별 기여율관리 - 참여연구원 목록
   }
   if ($("#phb_contGrid").length > 0) {
      $("#phb_contGrid").jqxGrid("refresh");       //개인별 기여율관리 - 개인별 기여율
   }
   if ($("#phc_prjGrid").length > 0) {
      $("#phc_prjGrid").jqxGrid("refresh");        //과제별 인원관리 - 과제코드 목록
   }
   if ($("#phc_empGrid").length > 0) {
      $("#phc_empGrid").jqxGrid("refresh");        //과제별 인원관리 - 과제 참여연구원
   }
   if ($("#pia_mainGrid").length > 0) {
      $("#pia_mainGrid").jqxGrid("refresh");       //내부인건비/간접비관리 - 월별 내부인건비/간접비 목록
   }
   if ($("#pia_halfYearGrid").length > 0) {
      $("#pia_halfYearGrid").jqxGrid("refresh");   //내부인건비/간접비관리 - 반기별 내부인건비/간접비 목록
   }
   if ($("#pib_mainGrid").length > 0) {
      $("#pib_mainGrid").jqxGrid("refresh");       //개인별인건비
   }
   if ($("#pic_grid1").length > 0) {
      $("#pic_grid1").jqxGrid("refresh");          //인건비확보율관리 - 직접비/간접비 목록
   }
   if ($("#pic_grid2").length > 0) {
      $("#pic_grid2").jqxGrid("refresh");          //인건비확보율관리 - 참여율 목록
   }
   if ($("#pic_grid3").length > 0) {
      $("#pic_grid3").jqxGrid("refresh");          //인건비확보율관리 - 인건비 확보율 목록
   }
};

//사이드 메뉴 접기 펴기 기능   2021-03-16
var sideMenuFoldFunc = function() {
   /* 접기 */
   $("#menu_fold").on("click", function() {

      $("#side-menu").attr("class", "hide");

      $("#menu_pce_pcf").removeClass("visi-visi").addClass("visi-hide");
      $("#menu_pce_pcg").removeClass("visi-visi").addClass("visi-hide");
      $("#menu_pce_pcg_pga").removeClass("visi-visi").addClass("visi-hide");
      $("#menu_pce_pcg_pgb").removeClass("visi-visi").addClass("visi-hide");
      $("#menu_pce_pcg_pgc").removeClass("visi-visi").addClass("visi-hide");
      $("#menu_pce_pch").removeClass("visi-visi").addClass("visi-hide");
      $("#menu_pce_pch_pha").removeClass("visi-visi").addClass("visi-hide");
      $("#menu_pce_pch_phb").removeClass("visi-visi").addClass("visi-hide");
      $("#menu_pce_pch_phc").removeClass("visi-visi").addClass("visi-hide");
      $("#menu_pce_pci").removeClass("visi-visi").addClass("visi-hide");
      $("#menu_pce_pci_pia").removeClass("visi-visi").addClass("visi-hide");
      $("#menu_pce_pci_pib").removeClass("visi-visi").addClass("visi-hide");
      $("#menu_pce_pci_pic").removeClass("visi-visi").addClass("visi-hide");

      $("#cnts-wrapper").attr("class", "hide");

      $("#menu_fold").css("display", "none");
      $("#menu_open").css("display", "block");

      $("#side-menu-layout").css("margin-left", "0px");

      setTimeout(pce_refresh, 400);
      $("#pcf_table").css("width", "100%");

   });

   /* 펴기 */
   $("#menu_open").on("click", function() {

      $("#side-menu").attr("class", "visi");

      $("#menu_pce_pcf").removeClass("visi-hide").addClass("visi-visi");
      $("#menu_pce_pcg").removeClass("visi-hide").addClass("visi-visi");
      $("#menu_pce_pcg_pga").removeClass("visi-hide").addClass("visi-visi");
      $("#menu_pce_pcg_pgb").removeClass("visi-hide").addClass("visi-visi");
      $("#menu_pce_pcg_pgc").removeClass("visi-hide").addClass("visi-visi");
      $("#menu_pce_pch").removeClass("visi-hide").addClass("visi-visi");
      $("#menu_pce_pch_pha").removeClass("visi-hide").addClass("visi-visi");
      $("#menu_pce_pch_phb").removeClass("visi-hide").addClass("visi-visi");
      $("#menu_pce_pch_phc").removeClass("visi-hide").addClass("visi-visi");
      $("#menu_pce_pci").removeClass("visi-hide").addClass("visi-visi");
      $("#menu_pce_pci_pia").removeClass("visi-hide").addClass("visi-visi");
      $("#menu_pce_pci_pib").removeClass("visi-hide").addClass("visi-visi");
      $("#menu_pce_pci_pic").removeClass("visi-hide").addClass("visi-visi");

      $("#cnts-wrapper").attr("class", "visi");

      $("#menu_fold").css("display", "block");
      $("#menu_open").css("display", "none");

      $("#side-menu-layout").css("margin-left", "182px");

      setTimeout(pce_refresh, 400);
      $("#pcf_table").css("width", "1250px");

   });
};
