/**
 * ui handling
 */
$(document).ready(function() {
   //UI초기화 코드
   formInit();

   //event handler 등록
   $('#ok').on('click', function() {
      var selectedrowindex = $('#depGrid').jqxGrid('selectedrowindex');
      var data = $('#depGrid').jqxGrid('getrowdata', selectedrowindex);
      commonDialog.returnData = data;
      commonDialog.callback();
      commonDialog.close();
   });
   $('#cancel').on('click', function() {
      commonDialog.close();
   });
   $('#depGrid').on('rowdoubleclick', function(event) {
      var selectedrowindex = $('#depGrid').jqxGrid('selectedrowindex'); 
      var data = $('#depGrid').jqxGrid('getrowdata', selectedrowindex);
      commonDialog.returnData = data;
      commonDialog.callback();
      commonDialog.close();
   });
});
var formInit = function() {
   setDepGrid();

   $("#ok").jqxButton({
      width: '65px',
      template: "success"
   });
   $("#cancel").jqxButton({
      width: '65px',
      template: "warning"
   });

}

//센터코드
function setDepGrid() {

   var center_source = {
      datatype: "json",
      datafields: [
         { name: 'vDeptCode' },
         { name: 'vDeptName' }
      ],
      url: "/com/getHrDept"
   };

   var center_Adapter = new $.jqx.dataAdapter(center_source);

   $("#depGrid").jqxGrid({
      width: 250,
      height: 255,
      source: center_Adapter,
      editable: false,
      autoheight: false,
      theme: 'custom',
      columnsresize: true,
      columns: [{
         text: '센터코드',
         editable: false,
         datafield: 'vDeptCode',
         width: '25%',
         align: 'center',
         cellsalign: 'center'
      }, {
         text: '센터명',
         editable: false,
         datafield: 'vDeptName',
         width: '75%',
         align: 'center'
      }]
   });

}
