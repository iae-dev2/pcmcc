/**
 * ui handling
 */
$(document).ready(function() {

   //UI초기화 모드
   formInit();
   //event handler 등록
   $('#ok').on('click', function() {
      var selectedrowindex = $('#payGrid').jqxGrid('selectedrowindex');
      var data = $('#payGrid').jqxGrid('getrowdata', selectedrowindex);
      commonDialog.returnData = data;
      commonDialog.callback();
      commonDialog.close();
   });
   $('#cancel').on('click', function() {
      commonDialog.close();
   });

   $('#payGrid').on('rowdoubleclick', function(event) {
      var selectedrowindex = $('#payGrid').jqxGrid('selectedrowindex');
      var data = $('#payGrid').jqxGrid('getrowdata', selectedrowindex);
      commonDialog.returnData = data;
      commonDialog.callback();
      commonDialog.close();
   });

});

var formInit = function() {
   var selectedData;

   /***
   var payData = {
      "accountBalance": accountBalance
   };
   ***/

   var param = {
      "vYear": vYear
   };

   var center_source = {
      datatype: "json",
      data: param,
      datafields: [
         { name: 'vPayCode'     },
         { name: 'vPayCodeName' }
      ],
      url: "/com/getPayCode"
   };

   var center_Adapter = new $.jqx.dataAdapter(center_source);

   $("#payGrid").jqxGrid({
      width: 500,
      height: 300,
      source: center_Adapter,
      scrollmode: 'deferred',
      showfilterrow: true,
      filterable: true,
      theme: 'custom',
      columns: [{
         text: '급여코드',
         editable: false,
         datafield: 'vPayCode',
         width: '50%',
         cellsalign: 'center',
         align: 'center'
      }, {
         text: '급여코드명',
         editable: false,
         datafield: 'vPayCodeName',
         width: '50%',
         cellsalign: 'center',
         align: 'center'
      }]
   });

   $("#ok").jqxButton({
      width: '65px',
      template: "success"
   });
   $("#cancel").jqxButton({
      width: '65px',
      template: "warning"
   });
}

var setParamFilter = function() {
   $("#payGrid").jqxGrid('clearfilters');

   //필터 설정 - vPayCode
   var filtergroup1 = new $.jqx.filter();
   var filtervalue1 = vPayCode;
   var filter1 = filtergroup1.createfilter("stringfilter", filtervalue1, "contains");
   filtergroup1.addfilter(1, filter1);
   $("#payGrid").jqxGrid('addfilter', "vPayCode", filtergroup1);

   //필터 설정 - vPayCodeName
   var filtergroup2 = new $.jqx.filter();
   var filtervalue2 = vPayCodeName;
   var filter2 = filtergroup2.createfilter("stringfilter", filtervalue2, "contains");
   filtergroup2.addfilter(1, filter2);
   $("#payGrid").jqxGrid('addfilter', "vPayCodeName", filtergroup2);

   //apply the filters. 필터 실행
   $("#payGrid").jqxGrid('applyfilters');
}
