/**
 * ui handling
 */
$(document).ready(function() {
   //UI초기화 모드

   formInit();

   //event handler 등록
   $('#ok').on('click', function() {
      var selectedrowindex = $('#cusGrid').jqxGrid('selectedrowindex');
      var data = $('#cusGrid').jqxGrid('getrowdata', selectedrowindex);
      commonDialog.returnData = data;
      commonDialog.callback();
      commonDialog.close();
   });
   $('#cancel').on('click', function() {
      commonDialog.close();
   });

   $('#cusGrid').on('rowdoubleclick', function(event) {
      var selectedrowindex = $('#cusGrid').jqxGrid('selectedrowindex');
      var data = $('#cusGrid').jqxGrid('getrowdata', selectedrowindex);
      commonDialog.returnData = data;
      commonDialog.callback();
      commonDialog.close();
   });

   $("#cusGrid").on("filter", function(event) {
      var filterinfo = $("#cusGrid").jqxGrid('getfilterinformation');
   });

});

var formInit = function() {

   var selectedData;

   var datasource = {
      datatype: "json",
      datafields: [ 
         { name: 'vCusResidentNo', type: 'string' },
         { name: 'vCusName'      , type: 'string' }, 
         { name: 'vCusTel'       , type: 'string' },
         { name: 'vCusDirector'  , type: 'string' },
         { name: 'vCusAddr'      , type: 'string' } 
      ],
      url: "/com/getCustomer"
   };

   var dataAdapter = new $.jqx.dataAdapter(datasource);
   var com_cus_cusnum = "";

   $("#cusGrid").jqxGrid({
      width: 500,
      height: 300,
      source: dataAdapter,
//      scrollmode: 'deferred',
//      deferreddatafields: ['vCusResidentNo', 'vCusName'],
      theme: 'custom',
      showfilterrow: true,
      showfiltermenuitems: false,
      filterable: true,
      columns: [{
         text: '사업자번호',
         editable: false,
         datafield: 'vCusResidentNo',
         width: '30%',
         cellsalign: 'center',
         align: 'center',
         cellsrenderer: function(row, column, value) {
            if (value.length == 10) {
               com_cus_cusnum = value.substring(0, 3);
               com_cus_cusnum += "-";
               com_cus_cusnum += value.substring(3, 5);
               com_cus_cusnum += "-";
               com_cus_cusnum += value.substring(5, 10);
            }
            else {
               com_cus_cusnum = value;
            }
            return '<div style="text-align: left; margin-top: 10px; padding-left:24px;"> ' + com_cus_cusnum + '</div>';
         }
      }, {
         text: '사업자명',
         editable: false,
         datafield: 'vCusName',
         width: '40%',
         cellsalign: 'center',
         align: 'center'
      }, {
         text: '전화번호',
         editable: false,
         datafield: 'vCusTel',
         width: '30%',
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

   $("#cusGrid").on("bindingcomplete", function(event) {
//     setParamFilter();
   });

}

var setParamFilter = function() {

   $("#cusGrid").jqxGrid('clearfilters');

   //필터 설정 - vCusResidentNo
   var filtergroup1 = new $.jqx.filter();
   var filtervalue1 = vCusResidentNo;
   var filter1 = filtergroup1.createfilter("stringfilter", filtervalue1, "contains");
   filtergroup1.addfilter(1, filter1);

   //add the filters.
   $("#cusGrid").jqxGrid('addfilter', "vCusResidentNo", filtergroup1);

   //필터 설정 - vCusName
   var filtergroup2 = new $.jqx.filter();
   var filtervalue2 = vCusName;
   var filter2 = filtergroup2.createfilter("stringfilter", filtervalue2, "contains");
   filtergroup2.addfilter(1, filter2);

   //add the filters.
   $("#cusGrid").jqxGrid('addfilter', "vCusName", filtergroup2);

   //필터 설정 - vCusTel
   var filtergroup3 = new $.jqx.filter();
   var filtervalue3 = vCusTel;
   var filter3 = filtergroup3.createfilter("stringfilter", filtervalue3, "contains");
   filtergroup3.addfilter(1, filter3);

   //add the filters.
   $("#cusGrid").jqxGrid('addfilter', "vCusTel", filtergroup3);

   //apply the filters. 필터 실행
   $("#cusGrid").jqxGrid('applyfilters');

}
