var PgaViewHandler = function(model, transaction) {

   var model = model;
   var transaction = transaction;

   var setupSearchField = function() {
      //평가코드
      $("#pga_year").jqxNumberInput({
         width: 210,
         height: 25,
         inputMode: 'simple',
         spinButtons: true,
         min: 1970,
         decimalDigits: 0,
         theme: 'custom'
      });
      $("#pga_year").jqxNumberInput('val', moment().year());

      //조회 버튼
      $("#pga_BtnSearch").jqxButton({
         width: '75px',
         height: '35px'
      });
   };

   var setupPgaGrid = function() {
      var localizationobj = {
         emptydatastring: "검색 결과가 없습니다.",
         currencysymbol: " "
      };

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
         var selectedrowindexrowedit = $("#pga_grid").jqxGrid('getselectedrowindex');
         var selectedrowdata = $("#pga_grid").jqxGrid('getrowdata', selectedrowindexrowedit);
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

      $("#pga_grid").jqxGrid({
         width: '100%',
         height: '450px',
         localization: localizationobj,
         source: transaction.getEstiCodeList(),
         theme: 'custom',
         autoheight: false,
         columnsheight: 35,
         rowsheight: 35,
         selectionmode: 'singlerow',
         editable: true,
         editmode: 'click',   //클릭 시 수정 가능
         enabletooltips: true,
         showtoolbar: true,
         rendertoolbar: function(statusbar) {
            var container = $("<div style='overflow:hidden; position:relative; margin:5px;'></div>");
            var addButton = $("<button class='btn-frame2 btn-line btn-line-add-img' style='margin-right:5px; float:right; backgroud-color:#fff; cursor:pointer;'>행추가</button>");
            var deleteButton = $("<button class='btn-frame2 btn-line btn-line-delete-img' style='margin-right:5px; float:right; backgroud-color:#fff; cursor:pointer;'>행삭제</button>");
            var saveButton = $("<button class='btn-frame btn-s-save' style='margin-right:5px; float:right;'>저장</button>");
            container.append(saveButton);
            container.append(deleteButton);
            container.append(addButton);
            statusbar.append(container);
            addButton.jqxButton({
               width: 65,
               height: 25
            });
            deleteButton.jqxButton({
               width: 65,
               height: 25
            });
            saveButton.jqxButton({
               width: 65,
               height: 25
            });
            addButton.click(function(event) {
               if (!$("#pga_grid").jqxGrid('disabled')) {
                  var row = {};
                  row["editFlag"] = "new";
                  row["vEstiCode"] = "";
                  row["vEstiCodeName"] = "";
                  row["vEstiCodeView"] = "";
                  row["vEstiCodeUpdate"] = "";
                  $("#pga_grid").jqxGrid('addrow', null, row, 'first');
               }
            });
            deleteButton.click(function(event) {
               var selectedrowindex = $("#pga_grid").jqxGrid('getselectedrowindex');
               var id = $("#pga_grid").jqxGrid('getrowid', selectedrowindex);
               var editFlag = $("#pga_grid").jqxGrid('getcellvalue',selectedrowindex, "editFlag");

               if (editFlag == "new") {
                  $("#pga_grid").jqxGrid('deleterow', id);
               }
               else {
                  $("#pga_grid").jqxGrid('setcellvalue', selectedrowindex,"editFlag", "del");
               }
            });

            //save
            saveButton.click(function(event) {
               var rows = $("#pga_grid").jqxGrid('getrows');
               transaction.saveEstiCode(rows).then(function(result) {
                  if (result > -1) {
                     $("#pga_grid").jqxGrid('clearselection');
                     $("#pga_grid").jqxGrid({ source: transaction.getEstiCodeList() });
                     alert("평가코드가 저장되었습니다.");
                  }
                  else {
                     alert("저장에 실패하였습니다 !");
                  }
               }, function() {
                  console.log("평가코드 저장 실패");
               });
            });
         },
         columns: [{
            text: '',
            editable: false,
            datafield: 'editFlag',
            width: '25px',
            align: 'center',
            cellsalign: 'center',
            cellsrenderer: imagerenderer
         }, {
            text: '평가코드',
            editable: true,
            datafield: 'vEstiCode',
            width: '100px',
            align: 'center',
            cellsalign: 'center',
            cellbeginedit: rowEdit
         }, {
            text: '설명',
            editable: true,
            datafield: 'vEstiCodeName',
            align: 'center',
            cellsalign: 'left'
         }, {
            text: '평가코드 View',
            editable: true,
            datafield: 'vEstiCodeView',
            width: '120px',
            align: 'center',
            cellsalign: 'center',
            columntype: 'dropdownlist',
            createeditor: function(row, value, editor) {
               editor.jqxDropDownList({ source: ["Y","N"], autoDropDownHeight: true});
            }
         }, {
            text: '평가코드 갱신',
            editable: true,
            datafield: 'vEstiCodeUpdate',
            width: '120px',
            align: 'center',
            cellsalign: 'center',
            columntype: 'dropdownlist',
            createeditor: function(row, value, editor) {
               editor.jqxDropDownList({ source: ["Y","N"], autoDropDownHeight: true});
            }
         }]
      });

      //수정 시 이벤트
      $("#pga_grid").on('cellvaluechanged',function(event) {
         var args = event.args;

         if (args.datafield != "editFlag") {
            var selectedrowindex = args.rowindex;
            var editFlag = $("#pga_grid").jqxGrid('getcellvalue', selectedrowindex, "editFlag");

            var newvalue = args.newvalue;
            if (typeof newvalue == "undefined" || newvalue == "undefined") {
               newvalue = "";
            }

            var oldvalue = args.oldvalue;
            if (typeof oldvalue == "undefined" || oldvalue == "undefined") {
               oldvalue = "";
            }

            if (editFlag != "new" && newvalue != oldvalue) {
               $("#pga_grid").jqxGrid('setcellvalue', selectedrowindex, "editFlag", "mod");
            }
         }
      });

      //휴지통 버튼 클릭
      $("#pga_grid").on('cellclick',function(event) {
         var args = event.args;
         if (args.datafield == "editFlag" && args.value=="del") {
            $("#pga_grid").jqxGrid('setcellvalue', args.rowindex, "editFlag", "");
         }
      });

      $("#toolbarpga_grid").removeClass("jqx-widget-header");
      $("#toolbarpga_grid").removeClass("jqx-widget-header-custom");
   };

   return {
      setupSearchField: setupSearchField,
      setupPgaGrid: setupPgaGrid
   }

}
