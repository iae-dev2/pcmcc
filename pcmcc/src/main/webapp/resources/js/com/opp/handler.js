/**
 * ui handling
 */
$(document).ready(function() {
   //UI초기화 코드
   var formInit_result = formInit();

   //event handler 등록
   $('#ok').on('click', function() {
      var selectedrowindex = $('#oppGrid').jqxGrid('selectedrowindex'); 
      var data = $('#oppGrid').jqxGrid('getrowdata', selectedrowindex);
      commonDialog.returnData = data;
      commonDialog.callback();
      commonDialog.close();
   });
   $('#cancel').on('click', function() {
      commonDialog.close();
   });
   $('#oppGrid').on('rowdoubleclick', function(event) {
      var selectedrowindex = $('#oppGrid').jqxGrid('selectedrowindex'); 
      var data = $('#oppGrid').jqxGrid('getrowdata', selectedrowindex);
      commonDialog.returnData = data;
      commonDialog.callback();
      commonDialog.close();
   });
});

var formInit = function() {

   param = {
      "aOppAccount" : aOppAccount,
      "aOppVno" : aOppVno,
      "aOppCustNm" : aOppCustNm
   }

   //공통팝업 - 사원목록조회
   var center_source = {
      datatype: "json",
      type: "GET",
      data: param,
      datafields: [ 
         { name: 'aOppVno'      , type: 'string' },
         { name: 'aOppSno'      , type: 'string' },
         { name: 'aOppDno'      , type: 'string' },
         { name: 'aOppEmpNo'    , type: 'string' },
         { name: 'aOppPart'     , type: 'string' },
         { name: 'aOppProj'     , type: 'string' },
         { name: 'aOppBudget'   , type: 'string' },
         { name: 'aOppCustNm'   , type: 'string' },
         { name: 'aOppAmount'   , type: 'string' },
         { name: 'aOppOppAmount', type: 'string' },
         { name: 'aOppCont'     , type: 'string' }
      ],
      url: "/com/getOppVou"
   };

   var center_Adapter = new $.jqx.dataAdapter(center_source);

   $("#oppGrid").jqxGrid({
      width: 900,
      height: 400, 
      source: center_Adapter,
      scrollmode: 'deferred',
      deferreddatafields: ['aOppVno', 'aOppCustNm'],
      showfilterrow: true,
      filterable: true,
      theme: 'custom',
      columns: [{
         text: '전표번호',
         editable: false,
         datafield: 'aOppVno',
         width: 100,
         align: 'center',
         cellsalign: 'center'
      }, {
         text: '상계sno',
         datafield: 'aOppSno',
         hidden: true
      }, {
         text: '상계dno',
         datafield: 'aOppDno',
         hidden: true
      }, {
         text: '사용자',
         editable: false,
         datafield: 'aOppEmpNo',
         width: 90,
         align: 'center',
         cellsalign: 'center'
      }, {
         text: '부서',
         editable: false,
         datafield: 'aOppPart',
         width: 70,
         align: 'center',
         cellsalign: 'center'
      }, {
         text: '과제코드',
         editable: false,
         datafield: 'aOppProj',
         width: 80,
         align: 'center',
         cellsalign: 'center'
      }, {
         text: '예산',
         editable: false,
         datafield: 'aOppBudget',
         width: 60,
         align: 'center',
         cellsalign: 'center'
      }, {
         text: '거래처',
         editable: false,
         datafield: 'aOppCustNm',
         width: 120,
         align: 'center',
         cellsalign: 'center'
      }, {
         text: '공급가액',
         editable: false,
         datafield: 'aOppAmount',
         width: 120,
         align: 'center',
         cellsalign: 'right'
      }, {
         text: '잔액',
         editable: false,
         datafield: 'aOppOppAmount',
         width: 120,
         align: 'center',
         cellsalign: 'right'
      }, {
         text: '적요',
         editable: false,
         datafield: 'aOppCont',
         align: 'center',
         cellsalign: 'center'
      }]
   });

   //버튼 생성
   $("#ok").jqxButton({ width: '65px', template: "success" });
   $("#cancel").jqxButton({ width: '65px', template: "warning" });

   $("#oppGrid").on("bindingcomplete", function(event) {
      setParamFilter();
   }); 
}

var setParamFilter = function() {
   $("#oppGrid").jqxGrid('clearfilters');

   //필터 설정 - aOppVno
   var filtergroup1 = new $.jqx.filter();
   var filtervalue1 = aOppVno;
   var filter1 = filtergroup1.createfilter("stringfilter", filtervalue1, "contains");
   filtergroup1.addfilter(1, filter1);
   $("#oppGrid").jqxGrid('addfilter', "aOppVno", filtergroup1);

   //필터 설정 - vName
   var filtergroup2 = new $.jqx.filter();
   var filtervalue2 = aOppCustNm;
   var filter2 = filtergroup2.createfilter("stringfilter", filtervalue2, "contains");
   filtergroup2.addfilter(1, filter2);
   $("#oppGrid").jqxGrid('addfilter', "aOppCustNm", filtergroup2);

   //apply the filters. 필터 실행
   $("#oppGrid").jqxGrid('applyfilters');

}
