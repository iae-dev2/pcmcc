var PidViewHandler = function(model, transaction) {

   var model = model;
   var transaction = transaction;

   var setupSearchField = function() {
      // 평가코드 1
      $("#pid_code1").jqxComboBox({
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

      // 평가코드 2
      $("#pid_code2").jqxComboBox({
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
      $("#pid_BtnSearch").jqxButton({
         width: '75px',
         height: '35px'
      });
   };

   var localizationobj = {
      emptydatastring: "검색 결과가 없습니다.",
      currencysymbol: " "
   };

   var setupMainGrid = function() {

      $("#pid_mainGrid").jqxGrid({
         width: '100%',
         height: '450px',
         localization: localizationobj,
         theme: 'custom',
         autoheight: false,
         columnsheight: 35,
         rowsheight: 35,
         selectionmode: 'singlerow',
//         editable: true,
//         editmode: 'click',   //클릭 시 수정 가능
         enabletooltips: false,
         filterable: true,
         showfilterrow: true,
         sortable: true,
         showsortmenuitems: false,
         columns: [{
            text: '센터명',
            editable: false,
            datafield: 'vDeptName',
            groupable: true,
            width: '230px',
            align: 'center',
            cellsalign: 'center'
         }, {
            text: '팀명',
            editable: false,
            datafield: 'vTeamName',
            width: '200px',
            align: 'center',
            cellsalign: 'center'
         }, {
            text: '사번',
            editable: false,
            datafield: 'vEmplNo',
            width: '80px',
            align: 'center',
            cellsalign: 'center'
         }, {
            text: '성명',
            aggregates: ["count"],
            editable: false,
            datafield: 'vName',
            width: '100px',
            align: 'center',
            cellsalign: 'center'
         }, {
            text: '직위명',
            editable: false,
            datafield: 'vPosName',
            width: '150px',
            align: 'center',
            cellsalign: 'center'
         }, {
            text: '과제건수(1)',
            datafield: 'e1_nProjectCnt',
            /*width: '90px',*/
            width: '8%',
            align: 'center',
            cellsalign: 'center',
            sortable: true
         }, {
            text: '기여율',
            datafield: 'e1_nContribution',
            /*width: '90px',*/
            width: '8%',
            align: 'center',
            cellsalign: 'right'
         }, {
            text: '인건비 + 간접비',
            datafield: 'e1_nLaborCost',
            /*width: '135px',*/
            width: '10%',
            cellsformat: 'c',
            align: 'center',
            cellsalign: 'right'
         }, {
            text: '분기분 급여 실적',
            datafield: 'e1_nAmount',
            /*width: '135px',*/
            width: '10%',
            cellsformat: 'c',
            align: 'center',
            cellsalign: 'right'
         }, {
            text: '과제건수(2)',
            datafield: 'e2_nProjectCnt',
            /*width: '90px',*/
            width: '8%',
            align: 'center',
            cellsalign: 'center',
            sortable: true
         }, {
            text: '기여율',
            datafield: 'e2_nContribution',
            /*width: '90px',*/
            width: '8%',
            align: 'center',
            cellsalign: 'right'
         }, {
            text: '인건비 + 간접비',
            datafield: 'e2_nLaborCost',
            /*width: '135px',*/
            width: '10%',
            cellsformat: 'c',
            align: 'center',
            cellsalign: 'right'
         }, {
            text: '분기분 급여 실적',
            datafield: 'e2_nAmount',
            /*width: '135px',*/
            width: '10%',
            cellsformat: 'c',
            align: 'center',
            cellsalign: 'right'
         }, {
            text: '반기 평가지표',
            datafield: 'nSecureRate',
            /*width: '135px',*/
            width: '10%',
            align: 'center',
            cellsalign: 'right',
            cellsrenderer: function(row, column, value) {
               let e1_nLaborCost = $('#pid_mainGrid').jqxGrid('getcellvalue', row, "e1_nLaborCost");
               let e1_nAmount = $('#pid_mainGrid').jqxGrid('getcellvalue', row, "e1_nAmount");
               let e2_nLaborCost = $('#pid_mainGrid').jqxGrid('getcellvalue', row, "e2_nLaborCost");
               let e2_nAmount = $('#pid_mainGrid').jqxGrid('getcellvalue', row, "e2_nAmount");
               let num = (e1_nLaborCost + e2_nLaborCost) / (e1_nAmount + e2_nAmount);

               return "<div class='jqx-grid-cell-right-align' style='margin-top: 10px;'>" + (num * 100).toFixed(1) + '%</div>';
            }
         }]
      });

      //수정 시 이벤트
//      $("#pid_mainGrid").on('cellvaluechanged',function(event) {
//         var args = event.args;
//
//         if (args.datafield != "editFlag") {
//            var selectedrowindex = args.rowindex;
//            var editFlag = $("#pid_mainGrid").jqxGrid('getcellvalue', selectedrowindex, "editFlag");
//
//            var newvalue = args.newvalue;
//            if (typeof newvalue == "undefined" || newvalue == "undefined") {
//               newvalue = "";
//            }
//
//            var oldvalue = args.oldvalue;
//            if (typeof oldvalue == "undefined" || oldvalue == "undefined") {
//               oldvalue = "";
//            }
//
//            if (editFlag != "new" && newvalue != oldvalue) {
//               $("#pid_mainGrid").jqxGrid('setcellvalue', selectedrowindex, "editFlag", "mod");
//            }
//         }
//      });

      //휴지통 버튼 클릭
//      $("#pid_mainGrid").on('cellclick',function(event) {
//         var args = event.args;
//         if (args.datafield == "editFlag" && args.value=="del") {
//            $("#pid_mainGrid").jqxGrid('setcellvalue', args.rowindex, "editFlag", "");
//         }
//      });
//
//      $("#toolbarpid_mainGrid").removeClass("jqx-widget-header");
//      $("#toolbarpid_mainGrid").removeClass("jqx-widget-header-custom");
   };

   var setupActionButton = function() {
//      $("#pid_BtnUpload").jqxButton({ width : '130px', height : '35px' });
      $("#pid_BtnExcel").jqxButton({ width : '100px', height : '35px' });
   };

   return {
      setupSearchField: setupSearchField,
      setupMainGrid: setupMainGrid,
      setupActionButton: setupActionButton
   }

}
