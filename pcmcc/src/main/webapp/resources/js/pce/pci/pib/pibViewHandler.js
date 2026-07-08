var PibViewHandler = function(model, transaction) {

   var model = model;
   var transaction = transaction;

   var setupSearchField = function() {
      //평가코드
      $("#pib_code").jqxComboBox({
         selectedIndex: 0,
         source: transaction.getEstiCodeList(),
         displayMember: 'vEstiCodeName',
         valueMember: 'vEstiCode',
         width: '280px',
         height: '25px',
         theme: 'custom',
         disabled: false,
         autoDropDownHeight: true
      });

      //조회 버튼
      $("#pib_BtnSearch").jqxButton({
         width: '75px',
         height: '35px'
      });
   };

   var localizationobj = {
      emptydatastring: "검색 결과가 없습니다.",
      currencysymbol: " "
   };

   var setupMainGrid = function() {

      var imagerenderer = function(row, datafield, value) {
         if (value == 'new') {
            return '<img height="25" width="25" style="margin-top:4px;" src="/resources/images/blt_add.png"/>';
         }
         else if (value == 'mod') {
            return '<img height="25" width="25" style="margin-top:4px;" src="/resources/images/blt_edit.png"/>';
         }
         else if (value == 'del') {
            return '<img height="25" width="25" style="margin-top:4px;" src="/resources/images/blt_del.png"/>';
         }
         else {
            return '';
         }
      }

      var rowEdit = function(row) {
         var selectedrowindexrowedit = $("#pha_contGrid").jqxGrid('getselectedrowindex');
         var selectedrowdata = $("#pha_contGrid").jqxGrid('getrowdata', selectedrowindexrowedit);
         if (selectedrowdata) {
            if (selectedrowdata.editFlag == "new") {
               return true;
            }
            else {
               return false;
            }
         }
         return false;
      }

      $("#pib_mainGrid").jqxGrid({
         width: '100%',
         height: '450px',
         localization: localizationobj,
         theme: 'custom',
         autoheight: false,
         columnsheight: 35,
         rowsheight: 35,
         selectionmode: 'singlerow',
         editable: true,
         editmode: 'click',   //클릭 시 수정 가능
         enabletooltips: false,
         showtoolbar: true,
         filterable: true,
         showfilterrow: true,
         sortable: true,
         showsortmenuitems: false,
         rendertoolbar: function(statusbar) {
            var container = $("<div style='overflow:hidden; position:relative; margin:5px;'></div>");
            var deleteButton = $("<button class='btn-frame2 btn-line btn-line-delete-img' style='margin-right:5px; float:right; backgroud-color:#fff; cursor:pointer;'>행삭제</button>");
            var saveButton = $("<button class='btn-frame btn-s-save' style='margin-right:5px; float:right;'>저장</button>");
            container.append(saveButton);
            container.append(deleteButton);
            statusbar.append(container);
            deleteButton.jqxButton({
               width: 65,
               height: 25
            });
            saveButton.jqxButton({
               width: 65,
               height: 25
            });

            deleteButton.click(function(event) {
               var selectedrowindex = $("#pib_mainGrid").jqxGrid('getselectedrowindex');
               if (selectedrowindex > -1) {
                  var id = $("#pib_mainGrid").jqxGrid('getrowid', selectedrowindex);
                  var editFlag = $("#pib_mainGrid").jqxGrid('getcellvalue',selectedrowindex, "editFlag");
                  if (editFlag == "new") {
                     $("#pib_mainGrid").jqxGrid('deleterow', id);
                  }
                  else {
                     $("#pib_mainGrid").jqxGrid('setcellvalue', selectedrowindex,"editFlag", "del");
                  }
               }
               else {
                  alert("삭제할 항목을 선택하세요!");
               }
            });

            //save
            saveButton.click(function(event) {
               if (true) {
                  var rows = $("#pib_mainGrid").jqxGrid('getrows');
                  transaction.savePibGrid(rows).then(function(result) {
                     if (result > -1) {
                        alert("개인별 인건비 목록이 저장되었습니다.");

                        $("#pib_mainGrid").jqxGrid('clearselection');
                        $("#pib_mainGrid").jqxGrid({ source: transaction.getPibList() });
                     }
                     else {
                        alert("저장에 실패하였습니다 !");
                     }
                  }, function() {
                     console.log("개인별 인건비 목록 저장 실패");
                  });
               }
            });
         },
         columns: [{
            text: '',
            editable: false,
            filterable: false,
            datafield: 'editFlag',
            width: '25px',
            align: 'center',
            cellsalign: 'center',
            cellsrenderer: imagerenderer
         }, {
            text: '차수코드',
            editable: false,
            filterable: false,
            datafield: 'vEstiCode',
            width: '80px',
            align: 'center',
            cellsalign: 'center'
         }, {
            text: '사번',
            editable: false,
            datafield: 'vEmplNo',
            width: '80px',
            align: 'center',
            cellsalign: 'center'
         }, {
            text: '성명',
            editable: false,
            datafield: 'vName',
            width: '100px',
            align: 'center',
            cellsalign: 'center'
         }, {
            text: '직위명',
            editable: false,
            datafield: 'vPosName',
            width: '150px',
            align: 'center',
            cellsalign: 'center'
         }, {
            text: '센터명',
            editable: false,
            datafield: 'vDeptName',
            align: 'center',
            cellsalign: 'center'
         }, {
            text: '팀명',
            editable: false,
            datafield: 'vTeamName',
            width: '200px',
            align: 'center',
            cellsalign: 'center'
         }, {
            text: '인건비',
            editable: true,
            filterable: false,
            datafield: 'nAmount',
            width: '200px',
            cellsformat: 'c',
            align: 'center',
            cellsalign: 'right'
         }]
      });

      //수정 시 이벤트
      $("#pib_mainGrid").on('cellvaluechanged',function(event) {
         var args = event.args;

         if (args.datafield != "editFlag") {
            var selectedrowindex = args.rowindex;
            var editFlag = $("#pib_mainGrid").jqxGrid('getcellvalue', selectedrowindex, "editFlag");

            var newvalue = args.newvalue;
            if (typeof newvalue == "undefined" || newvalue == "undefined") {
               newvalue = "";
            }

            var oldvalue = args.oldvalue;
            if (typeof oldvalue == "undefined" || oldvalue == "undefined") {
               oldvalue = "";
            }

            if (editFlag != "new" && newvalue != oldvalue) {
               $("#pib_mainGrid").jqxGrid('setcellvalue', selectedrowindex, "editFlag", "mod");
            }
         }
      });

      //휴지통 버튼 클릭
      $("#pib_mainGrid").on('cellclick',function(event) {
         var args = event.args;
         if (args.datafield == "editFlag" && args.value=="del") {
            $("#pib_mainGrid").jqxGrid('setcellvalue', args.rowindex, "editFlag", "");
         }
      });

      $("#toolbarpib_mainGrid").removeClass("jqx-widget-header");
      $("#toolbarpib_mainGrid").removeClass("jqx-widget-header-custom");
   };

   var setupActionButton = function() {
      $("#pib_BtnUpload").jqxButton({ width : '130px', height : '35px' });
      $("#pib_BtnExcel").jqxButton({ width : '100px', height : '35px' });
   };

   return {
      setupSearchField: setupSearchField,
      setupMainGrid: setupMainGrid,
      setupActionButton: setupActionButton
   }

}
