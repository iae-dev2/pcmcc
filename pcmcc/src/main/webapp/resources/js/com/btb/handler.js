/**
 * ui handling
 */
$(document).ready(function() {
   //UI초기화 코드
   var formInit_result = formInit();

   //event handler 등록
   $('#ok').on('click', function() {
      var selectedrowindex = $('#btbGrid').jqxGrid('selectedrowindex');
      var data = $('#btbGrid').jqxGrid('getrowdata', selectedrowindex);
      commonDialog.returnData = data;
      commonDialog.callback();
      commonDialog.close();
   });
   $('#cancel').on('click', function() {
      commonDialog.close();
   });    
   $('#btbGrid').on('rowdoubleclick', function(event) {
      var selectedrowindex = $('#btbGrid').jqxGrid('selectedrowindex'); 
      var data = $('#btbGrid').jqxGrid('getrowdata', selectedrowindex);
      commonDialog.returnData = data;
      commonDialog.callback();
      commonDialog.close();
   });
});

var formInit = function() {

   param = {
      "vProjectCode": vProjectCode
   }

   //공통팝업 - 예산코드조회
   var center_source = {
      datatype: "json",
      type: "GET",
      data: param,
      datafields: [ 
         { name: 'vBudgetCode' , type: 'string' },
         { name: 'vBudgetName' , type: 'string' },
         { name: 'vProjectCode', type: 'string' }
      ],
      url: "/com/getBudgetTypeB"
   };

   var center_Adapter = new $.jqx.dataAdapter(center_source);

   $("#btbGrid").jqxGrid({
      width: 250,
      height: 255, 
      source: center_Adapter,
      scrollmode: 'deferred',
      deferreddatafields: ['vBudgetCode', 'vBudgetName'],
      showfilterrow: true,
      filterable: true,
      theme: 'custom',
      columns: [{
         text: '예산코드',
         editable: false,
         datafield: 'vBudgetCode',
         width: '25%',
         cellsalign: 'center',
         align: 'center'
      }, {
         text: '예산코드명',
         editable: false,
         datafield: 'vBudgetName',
         width: '75%',
         cellsalign: 'center',
         align: 'center'
      }]
   });

   //버튼 생성
   $("#ok").jqxButton({ width: '65px',template: "success" });
   $("#cancel").jqxButton({ width: '65px', template: "warning" });

   $("#btbGrid").on("bindingcomplete", function(event) {
      setParamFilter();
   }); 
}

var setParamFilter = function() {
   $("#btbGrid").jqxGrid('clearfilters');

   //필터 설정 - vBudgetCode
   var filtergroup1 = new $.jqx.filter();
   var filtervalue1 = vBudgetCode;
   var filter1 = filtergroup1.createfilter("stringfilter", filtervalue1, "contains");
   filtergroup1.addfilter(1, filter1);
   $("#btbGrid").jqxGrid('addfilter', "vBudgetCode", filtergroup1);

   //필터 설정 - vBudgetName
   var filtergroup2 = new $.jqx.filter();
   var filtervalue2 = vBudgetName;
   var filter2 = filtergroup2.createfilter("stringfilter", filtervalue2, "contains");
   filtergroup2.addfilter(1, filter2);
   $("#btbGrid").jqxGrid('addfilter', "vBudgetName", filtergroup2);

   // apply the filters. 필터 실행
   $("#btbGrid").jqxGrid('applyfilters');
}
