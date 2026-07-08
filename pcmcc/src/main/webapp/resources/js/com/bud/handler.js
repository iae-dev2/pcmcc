/**
 * ui handling
 */
$(document).ready(function() {
   //UI초기화 코드
   formInit();

   //event handler 등록
   $('#ok').on('click', function() {
      var selectedrowindex = $('#detailGrid').jqxGrid('selectedrowindex');
      var data = $('#detailGrid').jqxGrid('getrowdata', selectedrowindex);
      commonDialog.returnData = data;
      commonDialog.callback();
      commonDialog.close();
   });
   $('#cancel').on('click', function() {
      commonDialog.close();
   });
   $("#masterGrid").on('rowselect', function(event) {
      var args = event.args;
      setDetailGrid(args.row.vBudgetCode);
      $("#detailGrid").jqxGrid("refresh");
   });

   $('#detailGrid').on('rowdoubleclick', function(event) {
      var selectedrowindex = $('#detailGrid').jqxGrid('selectedrowindex');
      var data = $('#detailGrid').jqxGrid('getrowdata', selectedrowindex);
      commonDialog.returnData = data;
      commonDialog.callback();
      commonDialog.close();
   });
});
var formInit = function() {
   setMasterGrid();
   setDetailGrid("");

   $("#ok").jqxButton({
      width: '65px',
      template: "success"
   });
   $("#cancel").jqxButton({
      width: '65px',
      template: "warning"
   });

}

//세목 코드 - master
function setMasterGrid() {

   var paramData = {
      "vProjectCode": vProjectCode
   };

   var center_source = {
      datatype: "json",
      datafields: [ 
         { name: 'vBudgetCode' }, 
         { name: 'vBudgetName' } 
      ],
      url: "/com/getBudgetMaster",
      data: paramData
   };

   var center_Adapter = new $.jqx.dataAdapter(center_source);

   $("#masterGrid").jqxGrid({
      width: 260,
      height: 300,
      source: center_Adapter,
      editable: true,
      autoheight: false,
      theme: 'custom',
      columnsresize: true,
      columns:[{
         text: '세목코드',
         editable: false,
         datafield: 'vBudgetCode',
         width: '25%',
         align: 'center',
         cellsalign: 'center'
      }, {
         text: '세목코드명',
         editable: false,
         datafield: 'vBudgetName',
         width: '75%',
         align: 'center'
      }]
   });

}

//세세목 코드 - detail
function setDetailGrid(param) {
   var localizationobj = {
      emptydatastring: "검색 결과가 없습니다."
   };

   var paramData = {
      "vParentBudgetCode": param
   };

   var source = {
      datatype: "json",
      datafields: [
         { name: 'vBudgetCode'},
         { name: 'vBudgetName'}
      ],
      url: "/com/getBudgetDetail",
      data: paramData
   };

   var dataAdapter = new $.jqx.dataAdapter(source);

   $("#detailGrid").jqxGrid({
      width: 400,
      height: 300,
      source: dataAdapter,
      editable: true,
      autoheight: false,
      theme: 'custom',
      columnsresize: true,
      localization: localizationobj,
      columns: [{
         text: '세세목코드',
         editable: false,
         datafield: 'vBudgetCode',
         width: '25%'
      }, {
         text: '세세목코드명',
         editable: false,
         datafield: 'vBudgetName',
         width: '75%'
      }]
   })

}
