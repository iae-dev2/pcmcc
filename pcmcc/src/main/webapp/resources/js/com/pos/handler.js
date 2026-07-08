/**
 * ui handling
 */
$(document).ready(function() {
   // UI초기화 모드
   formInit();
   // event handler 등록
   $('#ok').on('click', function() {
      var selectedrowindex = $('#posGrid').jqxGrid('selectedrowindex'); 
      var data = $('#posGrid').jqxGrid('getrowdata', selectedrowindex);
      commonDialog.returnData = data;
      commonDialog.callback();
      commonDialog.close();
   });
   $('#cancel').on('click', function() {
      commonDialog.close();
   });
   $('#posGrid').on('rowdoubleclick', function(event) {
      var selectedrowindex = $('#posGrid').jqxGrid('selectedrowindex'); 
      var data = $('#posGrid').jqxGrid('getrowdata', selectedrowindex);
      commonDialog.returnData = data;
      commonDialog.callback();
      commonDialog.close();
   });
});

var formInit = function() {
   var selectedData;

   var center_source = {
      datatype: "json",
      datafields: [
         { name: 'vPosCode' },
         { name: 'vPosName' }
      ],
      url: "/com/getHrPosition"
   };

   var center_Adapter = new $.jqx.dataAdapter(center_source);

   $("#posGrid").jqxGrid({
      width: 500,
      height: 300,
      source: center_Adapter,
      scrollmode: 'deferred',
      theme: 'custom',
      columns: [{
         text: '직위코드',
         editable: false,
         datafield: 'vPosCode',
         width: '50%',
         cellsalign: 'center',
         align: 'center'
      }, {
         text: '직위명',
         editable: false,
         datafield: 'vPosName',
         width: '50%',
         cellsalign: 'center',
         align: 'center'
      }]
   });

   $("#ok").jqxButton({ width: '65px', template: "success" });
   $("#cancel").jqxButton({ width: '65px', template: "warning" });
}
