var PieViewHandler = function(model, transaction) {

   var model = model;
   var transaction = transaction;

   // Number with Comma
   Number.prototype.comma = function() {
      if (this == 0) {
         return 0;
      }
      return this.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
   };

   // String with Comma
   String.prototype.comma = function() {
      if (this == '0') {
         return 0;
      }
      return this.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
   };

   var setupSearchField = function() {
      // 평가코드
      $("#pie_year").jqxNumberInput({
         width: 210,
         height: 25,
         inputMode: 'simple',
         spinButtons: true,
         min: 1970,
         decimalDigits: 0,
         theme: 'custom'
      });
      $("#pie_year").jqxNumberInput('val', moment().year()-1);

      // 조회 버튼
      $("#pie_BtnSearch").jqxButton({
         width: '75px',
         height: '35px'
      });
   };

   var localizationobj = {
      emptydatastring: "검색 결과가 없습니다.",
      currencysymbol: " "
   };

   var setupMainGrid = function() {

      $("#pie_mainGrid").jqxGrid({
         width: '100%',
         height: '450px',
         localization: localizationobj,
         theme: 'custom',
         autoheight: false,
         columnsheight: 35,
         rowsheight: 35,
         selectionmode: 'singlerow',
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
            text: '과제건수',
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
            text: '상반기 급여 실적',
            datafield: 'e1_nAmount',
            /*width: '135px',*/
            width: '10%',
            cellsformat: 'c',
            align: 'center',
            cellsalign: 'right'
         }, {
            text: '과제건수',
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
            text: '하반기 급여 실적',
            datafield: 'e2_nAmount',
            /*width: '135px',*/
            width: '10%',
            cellsformat: 'c',
            align: 'center',
            cellsalign: 'right'
         }, {
            text: '인건비 + 간접비(연간)',
            datafield: 'nLaborCost',
            /*width: '135px',*/
            width: '13%',
            align: 'center',
            cellsalign: 'right',
            cellsrenderer: function(row, column, value) {
               let e1_nLaborCost = $('#pie_mainGrid').jqxGrid('getcellvalue', row, "e1_nLaborCost");
               let e2_nLaborCost = $('#pie_mainGrid').jqxGrid('getcellvalue', row, "e2_nLaborCost");
               let num = e1_nLaborCost + e2_nLaborCost;
               
               return "<div class='jqx-grid-cell-right-align' style='margin-top: 10px;'>" + num.comma() + '</div>';
            }
         }, {
            text: '급여 실적(연간)',
            datafield: 'nAmount',
            /*width: '135px',*/
            width: '10%',
            align: 'center',
            cellsalign: 'right',
            cellsrenderer: function(row, column, value) {
               let e1_nAmount = $('#pie_mainGrid').jqxGrid('getcellvalue', row, "e1_nAmount");
               let e2_nAmount = $('#pie_mainGrid').jqxGrid('getcellvalue', row, "e2_nAmount");
               let num = e1_nAmount + e2_nAmount;
               
               return "<div class='jqx-grid-cell-right-align' style='margin-top: 10px;'>" + num.comma() + '</div>';
            }
         }, {
            text: '연간 평가지표',
            datafield: 'nSecureRate',
            /*width: '135px',*/
            width: '10%',
            align: 'center',
            cellsalign: 'right',
            cellsrenderer: function(row, column, value) {
               let e1_nLaborCost = $('#pie_mainGrid').jqxGrid('getcellvalue', row, "e1_nLaborCost");
               let e1_nAmount = $('#pie_mainGrid').jqxGrid('getcellvalue', row, "e1_nAmount");
               let e2_nLaborCost = $('#pie_mainGrid').jqxGrid('getcellvalue', row, "e2_nLaborCost");
               let e2_nAmount = $('#pie_mainGrid').jqxGrid('getcellvalue', row, "e2_nAmount");
               let num = (e1_nLaborCost + e2_nLaborCost) / (e1_nAmount + e2_nAmount);

               return "<div class='jqx-grid-cell-right-align' style='margin-top: 10px;'>" + (num * 100).toFixed(1) + '%</div>';
            }
         }]
      });

   };

   var setupActionButton = function() {
      $("#pie_BtnExcel").jqxButton({ width : '100px', height : '35px' });
   };

   return {
      setupSearchField: setupSearchField,
      setupMainGrid: setupMainGrid,
      setupActionButton: setupActionButton
   }

}
