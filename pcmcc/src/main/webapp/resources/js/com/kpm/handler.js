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

   $("#ctrGrid").on('rowselect', function(event) {
      var args = event.args;
      setProjectGrid(args.row.vTeamCode);
      $("#prjGrid").jqxGrid("refresh");
   });

   $('#prjGrid').on('rowdoubleclick', function(event) {
      var selectedrowindex = $('#prjGrid').jqxGrid('selectedrowindex'); 
      var data = $('#prjGrid').jqxGrid('getrowdata', selectedrowindex);
      commonDialog.returnData = data;
      commonDialog.callback();
      commonDialog.close();
   });
});

var formInit = function() {
   setProjectGrid();

   $("#ok").jqxButton({ width : '65px', template : "success" });
   $("#cancel").jqxButton({ width : '65px', template : "warning" });
}

//과제코드
function setProjectGrid() {

   var localizationobj = {
      emptydatastring: "검색 결과가 없습니다."
   };

   var source = {
      datatype: "json",
      datafields: [
         { name: 'vKeyProjectName' }, 
         { name: 'vKeyProjectCode' } 
      ],
      url: "/com/getKeyProjectList"
   };

   var dataAdapter = new $.jqx.dataAdapter(source);

   $("#prjGrid").jqxGrid({
      width: '100%',
      height: '300px',
      source: dataAdapter,
      showfilterrow: true,
      filterable: true,
      theme: 'custom',
      autoheight: false,
      altrows: true,
      rowsheight: 26,
      columnsresize: false,
      enabletooltips: true,
      localization: localizationobj,
      columns: [{
         text: '과제코드',
         datafield: 'vKeyProjectCode',
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
