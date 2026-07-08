/**
 * ui handling
 */
$(document).ready(function() {
   //UI초기화 코드
   formInit();

   //event handler 등록
   $('#ok').on('click', function() {
      var selectedrowindex = $('#prjGrid').jqxGrid('selectedrowindex');
      var data = $('#prjGrid').jqxGrid('getrowdata', selectedrowindex);
      commonDialog.returnData = data;
      commonDialog.callback();
      commonDialog.close();
   });
   $('#cancel').on('click', function() {
      commonDialog.close();
   });

   /*$("#prjGrid").on("bindingcomplete", function(event) {
      setParamFilter();
   });*/

   $('#prjGrid').on('rowdoubleclick', function(event) {
      var selectedrowindex = $('#prjGrid').jqxGrid('selectedrowindex'); 
      var data = $('#prjGrid').jqxGrid('getrowdata', selectedrowindex);
      commonDialog.returnData = data;
      commonDialog.callback();
      commonDialog.close();
   });
});

var formInit = function() {
   setProjectGrid({ "vEstiStep": vEstiStep });

   $("#ok").jqxButton({ width: '65px', template: "success" });
   $("#cancel").jqxButton({ width: '65px', template: "warning" });
}

//과제코드
function setProjectGrid(param) {

   var localizationobj = {
      emptydatastring: "검색 결과가 없습니다."
   };

   var source = {
      datatype: "json",
      data: param,
      datafields: [ 
         { name: 'vProjectCode'     },
         { name: 'vKeyProjectName'  },
         { name: 'vKeyProjectCode'  },
         { name: 'vDeptName'        },
         { name: 'vGovName'         },
         { name: 'vProjectDivision' },
         { name: 'vTotStartDate'    },
         { name: 'vTotEndDate'      },
         { name: 'vStartDate'       },
         { name: 'vEndDate'         },
         { name: 'vProjectPm'       },
         { name: 'vProjectPmName'   },
         { name: 'vProjectGoal'     }
      ],
      url: "/com/getProjectList"
   };

   var dataAdapter = new $.jqx.dataAdapter(source);

   $("#prjGrid").jqxGrid({
      width: '100%',
      height: '300px',
      source: dataAdapter,
      showfilterrow: true,
      filterable: true,
      theme: 'custom',
//        autorowheight: true,
//        autoheight: true,
      altrows: true,
      rowsheight: 26,
      columnsresize: false,
      enabletooltips: true,
      localization: localizationobj,
      columns: [{
         text: '과제코드',
         datafield: 'vProjectCode',
         width: '25%',
         cellsalign: 'center',
         align: 'center' 
      }, {
         text: '과제명',
         datafield: 'vKeyProjectName',
         width: '75%',
         align: 'center' 
      }],
      ready: function() {
         var firstFilterInputContainer = $('.jqx-grid-cell-filter-row')[0];
         var firstFilterInput = $(firstFilterInputContainer).find('input').first();
         firstFilterInput.select();
      }
   });

}

//파라미터를 받아서 처리 할 경우에만 사용 
var setParamFilter = function() {
   $("#prjGrid").jqxGrid('clearfilters');

   //필터 설정 - vProjectCode
   var filtergroup1 = new $.jqx.filter();
   var filtervalue1 = vProjectCode;
   var filter1 = filtergroup1.createfilter("stringfilter", filtervalue1, "contains");
   filtergroup1.addfilter(1, filter1);

   //add the filters.
   $("#prjGrid").jqxGrid('addfilter', "vProjectCode", filtergroup1);

   //필터 설정 - vKeyProjectName
   var filtergroup2 = new $.jqx.filter();

   var filtervalue2 = vKeyProjectName;
   var filter2 = filtergroup2.createfilter("stringfilter", filtervalue2, "contains");
   filtergroup2.addfilter(1, filter2);

   //add the filters.
   $("#prjGrid").jqxGrid('addfilter', "vKeyProjectName", filtergroup2);

   //apply the filters. 필터 실행
   $("#prjGrid").jqxGrid('applyfilters');
}
