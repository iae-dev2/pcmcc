/**
 * ui handling
 */
$(document).ready(function() {
   //UI초기화 모드

   formInit();

   //event handler 등록
   $('#ok').on('click', function() {
      var selectedrowindex = $('#lnkGrid').jqxGrid('selectedrowindex');
      var data = $('#lnkGrid').jqxGrid('getrowdata', selectedrowindex);
      commonDialog.returnData = data;
      commonDialog.callback();
      commonDialog.close();
   });
   $('#cancel').on('click', function() {
      commonDialog.close();
   });
   $('#lnkGrid').on('rowdoubleclick', function(event) {
      var selectedrowindex = $('#lnkGrid').jqxGrid('selectedrowindex'); 
      var data = $('#lnkGrid').jqxGrid('getrowdata', selectedrowindex);
      commonDialog.returnData = data;
      commonDialog.callback();
      commonDialog.close();
   });
});

var formInit = function() {

   var selectedData;

   var datasource = {
      datatype: "json",
      datafields: [ 
         { name: 'vCusResidentNo'  },
         { name: 'sbjtId'          },
         { name: 'sbjtNm'          },
         { name: 'engSbjtNm'       },
         { name: 'bzClasCd'        },
         { name: 'bzClasNm'        },
         { name: 'cpcgInstNm'      },
         { name: 'instRoleDv'      },
         { name: 'totlDevTrmStrDt' },
         { name: 'totlDevTrmEndDt' },
         { name: 'vEmplNo'         },
         { name: 'sbjtRsprNm'      },
         { name: 'vDeptCode'       },
         { name: 'vDeptName'       },
         { name: 'vTeamCode'       },
         { name: 'vTeamName'       }
      ],
      url: "/com/getLinkProject"
   };

   var dataAdapter = new $.jqx.dataAdapter(datasource);

   $("#lnkGrid").jqxGrid({
      width: 1030,
      height: 400,
      source: dataAdapter,
      theme: 'custom',
      enabletooltips: true,
      showfilterrow: true,
      filterable: true,
      columngroups: [
         { text: '총개발기간', align: 'center', name: 'dateRange' },
         { text: '과제책임자', align: 'center', name: 'manager'   }
      ],
      columns: [{
         text: '과제ID',
         editable: false,
         datafield: 'sbjtId',
         width: '130px',
         cellsalign: 'left',
         align: 'center'
      }, {
         text: '과제명',
         editable: false,
         datafield: 'sbjtNm',
         width: '200px',
         cellsalign: 'left',
         align: 'center'
      }, {
         text: '사업분류',
         editable: false,
         datafield: 'bzClasNm',
         width: '150px',
         cellsalign: 'left',
         align: 'center'
      }, {
         text: '전담기관',
         editable: false,
         datafield: 'cpcgInstNm',
         width: '150px',
         cellsalign: 'left',
         align: 'center'
      }, {
         text: '시작일자',
         editable: false,
         datafield: 'totlDevTrmStrDt',
         width: '100px',
         cellsalign: 'center',
         align: 'center',
         columngroup: 'dateRange'
      }, {
         text: '종료일자',
         editable: false,
         datafield: 'totlDevTrmEndDt',
         width: '100px',
         cellsalign: 'center',
         align: 'center',
         columngroup: 'dateRange'
      }, {
         text: '사번',
         editable: false,
         datafield: 'vEmplNo',
         width: '100px',
         cellsalign: 'center',
         align: 'center',
         columngroup: 'manager'
      }, {
         text: '책임자명',
         editable: false,
         datafield: 'sbjtRsprNm',
         width: '80px',
         cellsalign: 'center',
         align: 'center',
         columngroup: 'manager'
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
