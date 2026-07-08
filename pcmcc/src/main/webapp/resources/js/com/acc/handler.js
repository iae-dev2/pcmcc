/**
 * ui handling
 */
$(document).ready(function() {
   //UI초기화 모드
   formInit();
   //event handler 등록
   $('#ok').on('click', function() {
      var selectedrowindex = $('#accGrid').jqxGrid('selectedrowindex'); 
      var data = $('#accGrid').jqxGrid('getrowdata', selectedrowindex);
      commonDialog.returnData = data;
      commonDialog.callback();
      commonDialog.close();
   });
   $('#cancel').on('click', function() {
      commonDialog.close();
   });

   $('#accGrid').on('rowdoubleclick', function(event) {
      var selectedrowindex = $('#accGrid').jqxGrid('selectedrowindex'); 
      var data = $('#accGrid').jqxGrid('getrowdata', selectedrowindex);
      commonDialog.returnData = data;
      commonDialog.callback();
      commonDialog.close();
   });

});

var formInit = function() {
   var selectedData;

   var accData = {
      "accountBalance": accountBalance
   };

   var center_source = {
      datatype: "json",
      datafields: [
         { name: 'vAccountCode'    },
         { name: 'vAccountName'    },
         { name: 'vAccountOffset'  },
         { name: 'vAccountBalance' }
      ],
      url: "/com/getAccount",
      data: accData
   };

   var center_Adapter = new $.jqx.dataAdapter(center_source);

   $("#accGrid").jqxGrid({
      width: 500,
      height: 300,
      source: center_Adapter,
      scrollmode: 'deferred',
      showfilterrow: true,
      filterable: true,
      theme: 'custom',
      columns: [{
         text: '계정코드',
         editable: false,
         datafield: 'vAccountCode',
         width: '50%',
         cellsalign: 'center',
         align: 'center'
      }, {
         text: '계정코드명',
         editable: false,
         datafield: 'vAccountName',
         width: '50%',
         cellsalign: 'center',
         align: 'center'
      }, {
         datafield: 'vAccountOffset',
         hidden: true
      }, {
         datafield: 'vAccountBalance',
         hidden: true
      }]
   });

   $("#ok").jqxButton({ width: '65px',template: "success" });
   $("#cancel").jqxButton({ width: '65px', template: "warning" });
}
