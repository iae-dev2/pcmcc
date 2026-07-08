var PbbViewHandler = function(model, transaction) {

   var model = model;
   var transaction = transaction;

   var setupSearchField = function() {
      //평가코드
      $("#pbb_code").jqxComboBox({
         selectedIndex: 0,
         source: transaction.getCommonEstiCodeList(),
         displayMember: 'vEstiCodeName',
         valueMember: 'vEstiCode',
         width: '280px',
         height: '25px',
         theme: 'custom',
         disabled: false,
         autoDropDownHeight: true
      });
   };

   var localizationobj = {
      emptydatastring: "검색 결과가 없습니다.",
      currencysymbol: " "
   };

   var setupMainGrid3 = function() {
      $("#pbb_grid3").jqxGrid({
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
            text: '사번',
            datafield: 'vEmplNo',
            /*width: '90px',*/
            width: '10%',
            align: 'center',
            cellsalign: 'center',
            sortable: true
         }, {
            text: '성명',
            datafield: 'vName',
            /*width: '90px',*/
            width: '10%',
            align: 'center',
            cellsalign: 'center',
            sortable: true
         }, {
            text: '직위명',
            datafield: 'vPosName',
            /*width: '100px',*/
            width: '10%',
            align: 'center',
            cellsalign: 'center',
            sortable: true
         }, {
            text: '과제건수',
            datafield: 'nProjectCnt',
            /*width: '90px',*/
            width: '10%',
            align: 'center',
            cellsalign: 'center',
            sortable: true
         }, {
            text: '기여율',
            datafield: 'nContribution',
            /*width: '90px',*/
            width: '10%',
            align: 'center',
            cellsalign: 'right'
         }, {
            text: '인건비 + 간접비',
            datafield: 'nLaborCost',
            /*width: '135px',*/
            width: '20%',
            cellsformat: 'c',
            align: 'center',
            cellsalign: 'right'
         }, {
            text: '반기분 급여 실적',
            datafield: 'nAmount',
            /*width: '135px',*/
            width: '20%',
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

   return {
      setupSearchField: setupSearchField,
      setupMainGrid3: setupMainGrid3
   }

}
