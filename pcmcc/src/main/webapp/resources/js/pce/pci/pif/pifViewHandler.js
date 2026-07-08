var PifViewHandler = function(model, transaction) {

   var model = model;
   var transaction = transaction;

   var setupSearchField = function() {
      //평가코드
      $("#pif_code").jqxComboBox({
         selectedIndex: 0,
         source: transaction.getEstiCodeList(),
         displayMember: 'vEstiCodeName',
         valueMember: 'vEstiCode',
         width: '280px',
         height: '25px',
         theme: 'custom',
         disabled: false,
         autoDropDownHeight: true
      });

      //조회 버튼
      $("#pif_BtnSearch").jqxButton({
         width: '75px',
         height: '35px'
      });
   };

   // 내부위탁과제 목록 그리드
   var setupEntrustGrid = function() {

      var localizationobj = {
         emptydatastring: "검색 결과가 없습니다.",
         currencysymbol: " "
      };

      $("#pif_entrustGrid").jqxGrid({
         width: '100%',
         height: '450px',
         localization: localizationobj,
         theme: 'custom',
         autoheight: false,
         columnsheight: 35,
         rowsheight: 35,
         selectionmode: 'checkbox',
         disabled: true,
         enabletooltips: false,
         columns: [{
            text: '과제코드',
            datafield: 'vProjectCode',
            width: '80px',
//            width: '10%',
            align: 'center',
            cellsalign: 'center',
            sortable: true
         }, {
            text: '과제명',
            datafield: 'vProjectName',
            /*width: '120px',*/
            /*width: '33%',*/
            align: 'center',
            cellsalign: 'left',
            sortable: true
         }, {
            text: '사번',
            datafield: 'vEmplNo',
            width: '80px',
//            width: '10%',
            align: 'center',
            cellsalign: 'center',
            sortable: true
         }, {
            text: 'PM명',
            datafield: 'vName',
            width: '70px',
//            width: '8%',
            align: 'center',
            cellsalign: 'center',
            sortable: true
         }]
      });
   };

   // 시험분석센터인원 목록 그리드
   var setupTestGrid = function() {

      var localizationobj = {
         emptydatastring: "검색 결과가 없습니다.",
         currencysymbol: " "
      };

      var imagerenderer = function(row, datafield, value) {
         if (value == 'new') {
            return '<img height="25" width="25" style="margin-top:4px;" src="/resources/images/blt_add.png"/>';
         }
         else if (value == 'mod') {
            return '<img height="25" width="25" style="margin-top:4px;" src="/resources/images/blt_edit.png"/>';
         }
         else if (value == 'del') {
            return '<img height="25" width="25" style="margin-top:4px;" src="/resources/images/blt_del.png"/>';
         }
         else {
            return '';
         }
      }

      var rowEdit = function(row) {
         var selectedrowindexrowedit = $("#pif_testGrid").jqxGrid('getselectedrowindex');
         var selectedrowdata = $("#pif_testGrid").jqxGrid('getrowdata', selectedrowindexrowedit);

         if (selectedrowdata) {
            if (selectedrowdata.editFlag == "new") {
               return true;
            }
            else {
               return false;
            }
         }

         return false;
      }

      var numberWithCommas = function(x) {
         if (x == 0) {
            return "0";
         }
         else {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
         }
      }

      $("#pif_testGrid").jqxGrid({
         width: '100%',
         height: '450px',
         localization: localizationobj,
         theme: 'custom',
         autoheight: false,
         columnsheight: 35,
         rowsheight: 35,
         selectionmode: 'singlerow',
         disabled: true,
         editable: true,
         editmode: 'click',   //클릭 시 수정 가능
         enabletooltips: false,
         showtoolbar: true,
//         rendertoolbar: function(statusbar) {
//            var container = $("<div style='overflow:hidden; position:relative; margin:5px;'></div>");
//            var saveButton = $("<button class='btn-frame btn-s-save' style='margin-right:5px; float:right; cursor:default;'>저장</button>");
//
//            container.append(saveButton);
//            statusbar.append(container);
//            saveButton.jqxButton({
//               width: 65,
//               height: 25
//            });
//
//            // save
//            saveButton.click(function(event) {
//               if (!$("#pif_testGrid").jqxGrid('disabled')) {
//                  var rows = $("#pif_testGrid").jqxGrid('getrows');
//
//                  transaction.savePifHalfYearGrid(rows).then(function(result) {
//                     if (result > -1) {
//                        alert("직접비/간접비 목록이 저장되었습니다.");
//
//                        $("#pif_testGrid").jqxGrid('clearselection');
//                        $("#pif_testGrid").jqxGrid({ source: transaction.getPifHalfYearList() });
//                     }
//                     else {
//                        alert("저장에 실패하였습니다 !");
//                     }
//                  }, function() {
//                     console.log("직접비/간접비 목록 저장 실패");
//                  });
//               }
//            });
//         },
         columns: [{
            text: '',
            editable: false,
            datafield: 'editFlag',
            /*width: '25px',*/
            width: '1%',
            align: 'center',
            cellsalign: 'center',
            cellsrenderer: imagerenderer
         }, {
            text: '사번',
            datafield: 'vEmplNo',
            width: '80px',
            align: 'center',
            cellsalign: 'center',
            sortable: true
         }, {
            text: '성명',
            datafield: 'vName',
            width: '70px',
            align: 'center',
            cellsalign: 'center',
            sortable: true
         }, {
            text: '센터명',
            datafield: 'vDeptName',
//            width: '120px',
            align: 'center',
            cellsalign: 'center',
            sortable: true
         }, {
            text: '팀명',
            datafield: 'vTeamName',
            width: '200px',
            align: 'center',
            cellsalign: 'center',
            sortable: true
         }]
      });

      //수정 시 이벤트
//      $("#pif_testGrid").on('cellvaluechanged',function(event) {
//         var args = event.args;
//
//         if (args.datafield != "editFlag") {
//            var selectedrowindex = args.rowindex;
//            var editFlag = $("#pif_testGrid").jqxGrid('getcellvalue', selectedrowindex, "editFlag");
//            var newvalue = args.newvalue;
//
//            if (typeof newvalue == "undefined" || newvalue == "undefined") {
//               newvalue = "";
//            }
//
//            var oldvalue = args.oldvalue;
//
//            if (typeof oldvalue == "undefined" || oldvalue == "undefined") {
//               oldvalue = "";
//            }
//
//            if (editFlag != "new" && newvalue != oldvalue) {
//               $("#pif_testGrid").jqxGrid('setcellvalue', selectedrowindex, "editFlag", "mod");
//            }
//         }
//      });

      //휴지통 버튼 클릭
//      $("#pif_testGrid").on('cellclick',function(event) {
//         var args = event.args;
//
//         if (args.datafield == "editFlag" && args.value=="del") {
//            $("#pif_testGrid").jqxGrid('setcellvalue', args.rowindex, "editFlag", "");
//         }
//      });
//
//      $("#toolbarpif_testGrid").removeClass("jqx-widget-header");
//      $("#toolbarpif_testGrid").removeClass("jqx-widget-header-custom");
   };

   var setupActionButton = function() {
//      $("#pif_BtnUpload").jqxButton({ width: '220px', height: '35px' });
      $("#pif_entrustAdjust").jqxButton({ width: '230px', height: '35px' });
//      $("#pif_BtnExcel").jqxButton({ width: '100px', height: '35px' });
//      $("#pif_testAdjust").jqxButton({ width: '230px', height: '35px' });
//      $("#pif_BtnHalfYearExcel").jqxButton({ width: '100px', height: '35px' });
   };

   return {
      setupSearchField: setupSearchField,
      setupEntrustGrid: setupEntrustGrid,
      setupTestGrid: setupTestGrid,
      setupActionButton: setupActionButton,
   }

}
