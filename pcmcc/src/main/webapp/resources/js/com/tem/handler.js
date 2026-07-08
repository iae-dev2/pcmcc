/**
 * ui handling
 */
$(document).ready(function() {
   //UI초기화 코드
   formInit();

   //event handler 등록
   $('#ok').on('click', function() {
      var selectedrowindex = $('#temGrid').jqxGrid('selectedrowindex');
      var data = $('#temGrid').jqxGrid('getrowdata', selectedrowindex);
      commonDialog.returnData = data;
      commonDialog.callback();
      commonDialog.close();
   });
   $('#cancel').on('click', function() {
      commonDialog.close();
   });
   $("#ctrGrid").on('rowselect', function(event) {
      var args = event.args;
      setTeamGrid(args.row.vDeptCode);
      $("#temGrid").jqxGrid("refresh");
   });

   $('#temGrid').on('rowdoubleclick', function(event) {
      var selectedrowindex = $('#temGrid').jqxGrid('selectedrowindex'); 
      var data = $('#temGrid').jqxGrid('getrowdata', selectedrowindex);
      commonDialog.returnData = data;
      commonDialog.callback();
      commonDialog.close();
   });
});
var formInit = function() {
   setCtrGrid();
   setTeamGrid("");

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
function setCtrGrid() {

   var center_source = {
      datatype: "json",
      datafields: [
         { name: 'vDeptCode' },
         { name: 'vDeptName' }
      ],
      url: "/com/getHrDept"
   };

   var center_Adapter = new $.jqx.dataAdapter(center_source);

   $("#ctrGrid").jqxGrid({
      width: 250,
      height: 300,
      source: center_Adapter,
      editable: true,
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

//팀코드
function setTeamGrid(param) {
   var localizationobj = {
      emptydatastring: "검색 결과가 없습니다."
   };

   var allData = {
      "vHighTeam": param
   };

   var source = {
      datatype: "json",
      datafields: [
         { name: 'vTeamCode' },
         { name: 'vTeamName' }
      ],
      url: "/com/getHrTeam",
      data: allData
   };

   var dataAdapter = new $.jqx.dataAdapter(source);

   $("#temGrid").jqxGrid({
      width: 400,
      height: 300,
      source: dataAdapter,
      editable: true,
      autoheight: false,
      theme: 'custom',
      columnsresize: true,
      localization: localizationobj,
      columns: [{
         text: '팀코드',
         editable: false,
         datafield: 'vTeamCode',
         width: '25%'
      }, {
         text: '팀명',
         editable: false,
         datafield: 'vTeamName',
         width: '75%'
      }]
   })

}
