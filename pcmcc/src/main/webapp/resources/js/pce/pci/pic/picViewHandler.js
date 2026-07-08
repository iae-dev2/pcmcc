var PicViewHandler = function(model, transaction) {

   var model = model;
   var transaction = transaction;

   var setupSearchField = function() {
      //평가코드
      $("#pic_code").jqxComboBox({
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
      $("#pic_BtnSearch").jqxButton({
         width: '75px',
         height: '35px'
      });
   };

   var localizationobj = {
      emptydatastring: "검색 결과가 없습니다.",
      currencysymbol: " "
   };

   var setupMainGrid1 = function() {

      $("#pic_grid1").jqxGrid({
         width: '100%',
         height: '300px',
         localization: localizationobj,
         theme: 'custom',
         autoheight: false,
         columnsheight: 35,
         columnsresize: true,
         enabletooltips: true,
         rowsheight: 35,
         selectionmode: 'singlerow',
         editable: false,
         columns: [{
            text: '평가코드',
            datafield: 'vEstiCode',
            /*width: '70px',*/
            width: '20%',
            align: 'center',
            cellsalign: 'center'
         }, {
            text: '과제코드',
            datafield: 'vProjectCode',
            /*width: '80px',*/
            width: '20%',
            align: 'center',
            cellsalign: 'center'
         }, {
            text: '인건비',
            datafield: 'nDirectAmount',
            /*width: '100px',*/
            width: '20%',
            cellsformat: 'c',
            align: 'center',
            cellsalign: 'right'
         }, {
            text: '간접비',
            datafield: 'nIndirectAmount',
            /*width: '100px',*/
            width: '20%',
            cellsformat: 'c',
            align: 'center',
            cellsalign: 'right'
         }, {
            text: '합계',
            datafield: 'nAmount',
            /*width: '100px',*/
            width: '20%',
            cellsformat: 'c',
            align: 'center',
            cellsalign: 'right'
         }]
      });

   };

   var setupMainGrid2 = function() {

      $("#pic_grid2").jqxGrid({
         width: '100%',
         height: '300px',
         localization: localizationobj,
         theme: 'custom',
         autoheight: false,
         columnsheight: 35,
         columnsresize: true,
         enabletooltips: true,
         rowsheight: 35,
         selectionmode: 'singlerow',
         editable: false,
         sortable: true,
         showsortmenuitems: false,
         columns: [{
            text: '평가코드',
            datafield: 'vEstiCode',
            /*width: '60px',*/
            width: '10%',
            align: 'center',
            cellsalign: 'center'
         }, {
            text: '과제코드',
            datafield: 'vProjectCode',
            /*width: '80px',*/
            width: '10%',
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
            /*width: '80px',*/
            width: '10%',
            align: 'center',
            cellsalign: 'center',
            sortable: true
         }, {
            text: '성명',
            datafield: 'vName',
            /*width: '70px',*/
            width: '8%',
            align: 'center',
            cellsalign: 'center',
            sortable: true
         }, {
            text: '센터명',
            datafield: 'vDeptName',
            /*width: '120px',*/
            width: '10%',
            align: 'center',
            cellsalign: 'center',
            sortable: true
         }, {
            text: '팀명',
            datafield: 'vTeamName',
            /*width: '120px',*/
            width: '10%',
            align: 'center',
            cellsalign: 'center',
            sortable: true
         }, {
            text: '직위명',
            datafield: 'vPosName',
            /*width: '100px',*/
            width: '8%',
            align: 'center',
            cellsalign: 'center',
            sortable: true
         }, {
            text: '참여율',
            datafield: 'nContribution',
            /*width: '80px',*/
            width: '8%',
            align: 'center',
            cellsalign: 'center'
         }]
      });

   };

   var setupMainGrid3 = function() {

      $("#pic_grid3").jqxGrid({
         width: '100%',
         height: '300px',
         localization: localizationobj,
         theme: 'custom',
         autoheight: false,
         columnsheight: 35,
         columnsresize: true,
         enabletooltips: true,
         rowsheight: 35,
         selectionmode: 'singlerow',
         editable: false,
         sortable: true,
         showsortmenuitems: false,
         columns: [{
            text: '센터명',
            datafield: 'vDeptName',
            /*width: '180px',*/
            align: 'center',
            cellsalign: 'center',
            sortable: true
         }, {
            text: '팀명',
            datafield: 'vTeamName',
            /*width: '180px',*/
            width: '16%',
            align: 'center',
            cellsalign: 'center',
            sortable: true
         }, {
            text: '사번',
            datafield: 'vEmplNo',
            /*width: '90px',*/
            width: '8%',
            align: 'center',
            cellsalign: 'center',
            sortable: true
         }, {
            text: '성명',
            datafield: 'vName',
            /*width: '90px',*/
            width: '8%',
            align: 'center',
            cellsalign: 'center',
            sortable: true
         }, {
            text: '직위명',
            datafield: 'vPosName',
            /*width: '100px',*/
            width: '8%',
            align: 'center',
            cellsalign: 'center',
            sortable: true
         }, {
            text: '과제건수',
            datafield: 'nProjectCnt',
            /*width: '90px',*/
            width: '8%',
            align: 'center',
            cellsalign: 'center',
            sortable: true
         }, {
            text: '기여율',
            datafield: 'nContribution',
            /*width: '90px',*/
            width: '8%',
            align: 'center',
            cellsalign: 'right'
         }, {
            text: '인건비 + 간접비',
            datafield: 'nLaborCost',
            /*width: '135px',*/
            width: '10%',
            cellsformat: 'c',
            align: 'center',
            cellsalign: 'right'
         }, {
            text: '분기분 급여 실적',
            datafield: 'nAmount',
            /*width: '135px',*/
            width: '10%',
            cellsformat: 'c',
            align: 'center',
            cellsalign: 'right'
         }, {
            text: '확보율',
            datafield: 'nSecureRate',
            /*width: '135px',*/
            width: '10%',
            align: 'center',
            cellsalign: 'right'
         }]
      });

   };

   var setupActionButton = function() {
      $("#pic_BtnCal").jqxButton({ width: '200px', height: '35px' });
      $("#pic_BtnSecureSearch").jqxButton({ width: '200px', height: '35px' });
      $("#pic_BtnExcel").jqxButton({ width: '100px', height: '35px' });
   };

   return {
      setupSearchField: setupSearchField,
      setupMainGrid1: setupMainGrid1,
      setupMainGrid2: setupMainGrid2,
      setupMainGrid3: setupMainGrid3,
      setupActionButton: setupActionButton
   }

}
