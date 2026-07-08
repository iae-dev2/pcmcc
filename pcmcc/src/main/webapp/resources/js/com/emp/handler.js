/**
 * ui handling
 */
$(document).ready(function() {
   //UI초기화 코드
   var formInit_result = formInit();

   //event handler 등록
   $('#ok').on('click', function() {
      var selectedrowindex = $('#empGrid').jqxGrid('selectedrowindex'); 
      var data = $('#empGrid').jqxGrid('getrowdata', selectedrowindex);
      commonDialog.returnData = data;
      commonDialog.callback();
      commonDialog.close();
   });
   $('#cancel').on('click', function() {
      commonDialog.close();
   });
   $('#empGrid').on('rowdoubleclick', function(event) {
      var selectedrowindex = $('#empGrid').jqxGrid('selectedrowindex'); 
      var data = $('#empGrid').jqxGrid('getrowdata', selectedrowindex);
      commonDialog.returnData = data;
      commonDialog.callback();
      commonDialog.close();
   });
});

var formInit = function() {

   param = {
      "vRetire": vRetire
   }

   //공통팝업 - 사원목록조회
   var center_source = {
      datatype: "json",
      type: "GET",
      data: param,
      datafields: [ 
         { name: 'vEmplNo'       , type: 'string' },
         { name: 'vName'         , type: 'string' },
         { name: 'vDeptCode'     , type: 'string' },
         { name: 'vDeptName'     , type: 'string' },
         { name: 'vTeamCode'     , type: 'string' },
         { name: 'vTeamName'     , type: 'string' },
         { name: 'vPosCode'      , type: 'string' },
         { name: 'vPosName'      , type: 'string' },
         { name: 'vGradeCode'    , type: 'string' },
         { name: 'vGradeName'    , type: 'string' },
         { name: 'vResiNo'       , type: 'string' },
         { name: 'vResidenceAddr', type: 'string' },
         { name: 'dBirth'        , type: 'string' },
         { name: 'dEnter'        , type: 'string' },
         { name: 'dRetire'       , type: 'string' },
         { name: 'vJobClass'     , type: 'string' }
      ],
      url : "/com/getHrInfo"
   };

   var center_Adapter = new $.jqx.dataAdapter(center_source);

   $("#empGrid").jqxGrid({
      width: 900,
      height: 400, 
      source: center_Adapter,
      scrollmode: 'deferred',
      deferreddatafields: ['vEmplNo', 'vName'],
      showfilterrow : true,
      filterable : true,
      theme: 'custom',
      columns: [{
         text: '사번',
         editable: false,
         datafield: 'vEmplNo',
         width: 90,
         cellsalign: 'center',
         align: 'center'
      }, {
         text: '성명',
         editable: false,
         datafield: 'vName',
         width: 100,
         cellsalign: 'center',
         align: 'center'
      }, {
         text: '센터코드',
         editable: false,
         datafield: 'vDeptCode',
         width: 100,
         cellsalign: 'center',
         align: 'center'
      }, {
         text: '센터명',
         editable: false,
         datafield: 'vDeptName',
         width: 200,
         cellsalign: 'center',
         align: 'center'
      }, {
         text: '팀코드',
         editable: false,
         datafield: 'vTeamCode',
         width: 100,
         cellsalign: 'center',
         align: 'center'
      }, {
         text: '팀명',
         editable: false,
         datafield: 'vTeamName',
         width: 200,
         cellsalign: 'center',
         align: 'center'
      }, {
         text: '직위명',
         editable: false,
         datafield: 'vPosName',
         cellsalign: 'center',
         align: 'center'
      }, {
         text: '직급코드',
         datafield: 'vGradeCode',
         hidden: true
      }, {
         text: '직책명',
         datafield: 'vGradeName',
         hidden: true
      }]
   });

   //버튼 생성
   $("#ok").jqxButton({ width: '65px',template: "success" });
   $("#cancel").jqxButton({ width: '65px', template: "warning" });

   $("#empGrid").on("bindingcomplete", function(event) {
      setParamFilter();
   }); 
}

var setParamFilter = function() {
   $("#empGrid").jqxGrid('clearfilters');

   //필터 설정 - vEmplNo
   var filtergroup1 = new $.jqx.filter();
   var filtervalue1 = vEmplNo;
   var filter1 = filtergroup1.createfilter("stringfilter", filtervalue1, "contains");
   filtergroup1.addfilter(1, filter1);
   $("#empGrid").jqxGrid('addfilter', "vEmplNo", filtergroup1);

   //필터 설정 - vName
   var filtergroup2 = new $.jqx.filter();
   var filtervalue2 = vName;
   var filter2 = filtergroup2.createfilter("stringfilter", filtervalue2, "contains");
   filtergroup2.addfilter(1, filter2);
   $("#empGrid").jqxGrid('addfilter', "vName", filtergroup2);

   //apply the filters. 필터 실행
   $("#empGrid").jqxGrid('applyfilters');
}
