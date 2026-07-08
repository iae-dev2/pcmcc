/**
 * ui handling
 */
$(document).ready(function() {
   //UI초기화 모드
   formInit();
   //event handler 등록
   $('#ok').on('click', function() {
      var selectedrowindex = $('#bnkGrid').jqxGrid('selectedrowindex'); 
      var data = $('#bnkGrid').jqxGrid('getrowdata', selectedrowindex);
      commonDialog.returnData = data;
      commonDialog.callback();
      commonDialog.close();
   });
   $('#cancel').on('click', function() {
      commonDialog.close();
   });

   $('#bnkGrid').on('rowdoubleclick', function(event) {
      var selectedrowindex = $('#bnkGrid').jqxGrid('selectedrowindex'); 
      var data = $('#bnkGrid').jqxGrid('getrowdata', selectedrowindex);
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
         { name: 'vBankCode' },
         { name: 'vBankName' }
      ],
      url: "/com/getBankInfo"
   };

   var center_Adapter = new $.jqx.dataAdapter(center_source);

   $("#bnkGrid").jqxGrid({
      width: 500,
      height: 300,
      source: center_Adapter,
      scrollmode: 'deferred',
      theme: 'custom',
      columns: [{
         text: '은행코드',
         editable: false,
         datafield: 'vBankCode',
         width: '50%',
         cellsalign: 'center',
         align: 'center'
      }, {
         text: '은행명',
         editable: false,
         datafield: 'vBankName',
         width: '50%',
         cellsalign: 'center',
         align: 'center'
      }]
   });

   $("#ok").jqxButton({ width: '65px',template: "success" });
   $("#cancel").jqxButton({ width: '65px', template: "warning" });
}
