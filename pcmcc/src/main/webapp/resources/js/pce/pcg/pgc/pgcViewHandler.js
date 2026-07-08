var PgcViewHandler = function(model, transaction) {

   var model = model;
   var transaction = transaction;

   var setupSearchField = function() {
      //평가코드
      $("#pgc_searchCode").jqxComboBox({
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

      //센터명
      $("#pgc_searchDept").jqxComboBox({
         selectedIndex: 0,
         source: transaction.getDeptCodeList(),
         displayMember: 'vDeptName',
         valueMember: 'vDeptName',
         width: '280px',
         height: '25px',
         theme: 'custom',
         disabled: false,
         autoDropDownHeight: true
      });
      $("#pgc_searchDept").jqxComboBox('insertAt', { label: '전체', value: 'All'}, 0);

      //평가등급
      $("#pgc_searchGrade").jqxComboBox({
         selectedIndex: 0,
         source: transaction.getGrade(),
         displayMember: 'vItemName',
         valueMember: 'vItemCode',
         width: '140px',
         height: '25px',
         theme: 'custom',
         disabled: false,
         autoDropDownHeight: true
      });

      //평가 대상여부
      $("#pgc_searchYn").jqxComboBox({
         selectedIndex: 0,
         source: transaction.getEstiYn(),
         displayMember: 'vItemName',
         valueMember: 'vItemCode',
         width: '140px',
         height: '25px',
         theme: 'custom',
         disabled: false,
         autoDropDownHeight: true
      });

      //조회 버튼
      $("#pgc_BtnSearch").jqxButton({
         width: '75px',
         height: '35px'
      });
   };

   var setupPgcGrid = function() {
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
         var selectedrowindexrowedit = $("#pgc_grid").jqxGrid('getselectedrowindex');
         var selectedrowdata = $("#pgc_grid").jqxGrid('getrowdata', selectedrowindexrowedit);
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

      $("#pgc_grid").jqxGrid({
         width: '100%',
         height: '450px',
         localization: localizationobj,
         theme: 'custom',
         autoheight: false,
         columnsheight: 35,
         rowsheight: 35,
         selectionmode: 'singlerow',
         //disabled: true,
         editable: true,
         editmode: 'click',
         enabletooltips: true,
         showtoolbar: true,
         sortable: true,
         showsortmenuitems: false,
         filterable: true,
         showfilterrow: true,
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
               if (!$("#pgc_grid").jqxGrid('disabled')) {
                  var row = {};
                  row["editFlag"] = "new";
                  row["vEstiCode"] = $("#pgc_searchCode").jqxComboBox('val');
                  row["vEmplNo"] = "";
                  row["vName"] = "";
                  row["vDeptName"] = "";
                  row["vTeamName"] = "";
                  row["vPosName"] = "";
                  row["vPassword"] = "";
                  row["vGrade"] = "";
                  row["vGradeName"] = "";
                  row["vEstiYn"] = "Y";
                  row["vRetireYn"] = "N";
                  $("#pgc_grid").jqxGrid('addrow', null, row, 'first');
               }
            });

            deleteButton.click(function(event) {
               if (!$("#pgc_grid").jqxGrid('disabled')) {
                  var selectedrowindex = $("#pgc_grid").jqxGrid('getselectedrowindex');
                  var id = $("#pgc_grid").jqxGrid('getrowid', selectedrowindex);
                  var editFlag = $("#pgc_grid").jqxGrid('getcellvalue',selectedrowindex, "editFlag");

                  if (editFlag == "new") {
                     $("#pgc_grid").jqxGrid('deleterow', id);
                  }
                  else {
                     $("#pgc_grid").jqxGrid('setcellvalue', selectedrowindex,"editFlag", "del");
                  }
               }
            });

            //save
            saveButton.click(function(event) {
               if (!$("#pgc_grid").jqxGrid('disabled')) {
                  var vali = model.getVali();
                  if (vali) {
                     var rows = $("#pgc_grid").jqxGrid('getrows');
                     transaction.saveEmplNo(rows).then(function(result) {
                        if (result > -1) {
                           $("#pgc_grid").jqxGrid('clearselection');
                           $("#pgc_grid").jqxGrid({ source: transaction.getEmplNoList() });
                           
                           $("#pgc_count").text($("#pgc_grid").jqxGrid("getrows").length);
                           alert("인원정보가 저장되었습니다.");
                        }
                        else {
                           alert("저장에 실패하였습니다 !");
                        }
                     }, function() {
                        console.log("인원정보 저장 실패");
                     });
                  }
               }
            });
         },
         columns: [{
            text: '',
            editable: false,
            sortable: false,
            filterable: false,
            datafield: 'editFlag',
            width: '25px',
            align: 'center',
            cellsalign: 'center',
            cellsrenderer: imagerenderer
         }, {
            text: '사번',
            editable: true,
            datafield: 'vEmplNo',
            width: '90px',
            align: 'center',
            cellsalign: 'center',
            cellbeginedit: rowEdit,
            cellvaluechanging: function(rowindex, datafield, columntype, oldvalue, newvalue) {
               var vEmplNo = "";
               var vName = "";
               if ($.isNumeric(newvalue)) {
                  vEmplNo = newvalue;
               }
               else {
                  vName = newvalue;
               }
               transaction.getHrInfo(vEmplNo, vName, 'N').done(function(result) {
                  if (result.length == 1) {
                     $("#pgc_grid").jqxGrid('setcellvalue', rowindex, "vEmplNo", result[0].vEmplNo);
                     $("#pgc_grid").jqxGrid('setcellvalue', rowindex, "vName", result[0].vName);
                     $("#pgc_grid").jqxGrid('setcellvalue', rowindex, "vDeptName", result[0].vDeptName);
                     $("#pgc_grid").jqxGrid('setcellvalue', rowindex, "vTeamName", result[0].vTeamName);
                     $("#pgc_grid").jqxGrid('setcellvalue', rowindex, "vPosName", result[0].vPosName);
                     $("#pgc_grid").jqxGrid('setcellvalue', rowindex, "vPassword", result[0].vEmplNo);
                  }
                  else if (result.length == 0) {
                     alert("사번을 찾을 수 없습니다!");
                     $("#pgc_grid").jqxGrid('setcellvalue', rowindex, "vEmplNo", "");
                     $("#pgc_grid").jqxGrid('setcellvalue', rowindex, "vName", "");
                     $("#pgc_grid").jqxGrid('setcellvalue', rowindex, "vDeptName", "");
                     $("#pgc_grid").jqxGrid('setcellvalue', rowindex, "vTeamName", "");
                     $("#pgc_grid").jqxGrid('setcellvalue', rowindex, "vPosName", "");
                     $("#pgc_grid").jqxGrid('setcellvalue', rowindex, "vPassword", "");
                  }
                  else {
                     //2명 이상 조회되는 경우
                     var empParam = {
                        "vEmplNo": vEmplNo,
                        "vName": vName,
                        "vRetire": "N"
                     }
                     commonDialog.open('emp',empParam,function() {
                        var _data = commonDialog.returnData;
                        $("#pgc_grid").jqxGrid('setcellvalue', rowindex, "vEmplNo", _data.vEmplNo);
                        $("#pgc_grid").jqxGrid('setcellvalue', rowindex, "vName", _data.vName);
                        $("#pgc_grid").jqxGrid('setcellvalue', rowindex, "vDeptName", _data.vDeptName);
                        $("#pgc_grid").jqxGrid('setcellvalue', rowindex, "vTeamName", _data.vTeamName);
                        $("#pgc_grid").jqxGrid('setcellvalue', rowindex, "vPosName", _data.vPosName);
                        $("#pgc_grid").jqxGrid('setcellvalue', rowindex, "vPassword", _data.vEmplNo);
                     });
                  }
               });
            }
         }, {
            text: '성명',
            editable: false,
            datafield: 'vName',
            width: '90px',
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
            text: '직위명',
            editable: false,
            datafield: 'vPosName',
            width: '140px',
            align: 'center',
            cellsalign: 'center'
         }, {
            text: '비밀번호',
            editable: true,
            sortable: false,
            datafield: 'vPassword',
            width: '140px',
            align: 'center',
            cellsalign: 'center'
         }, {
            text: '평가등급',
            editable: true,
            sortable: false,
            datafield: 'vGradeName',
            width: '100px',
            align: 'center',
            cellsalign: 'center',
            columntype: 'dropdownlist',
            createeditor: function(row, value, editor) {
               editor.jqxDropDownList({
                  source: transaction.getGradeCode(),
                  displayMember: 'vItemName',
                  valueMember: 'vItemCode',
                  autoDropDownHeight: true
               });
            },
            geteditorvalue: function(row, cellvalue, editor) {
               var selecteditem = editor.jqxDropDownList('getSelectedItem');
               if (selecteditem != null) {
                  $("#pgc_grid").jqxGrid('setcellvalue', row, "vGrade", selecteditem.value);
                  return selecteditem.label;
               }
               return cellvalue;
            }
         }, {
            text: '평가등급',
            datafield: 'vGrade',
            hidden: true
         }, {
            text: '평가 대상여부',
            editable: true,
            sortable: false,
            datafield: 'vEstiYn',
            width: '100px',
            align: 'center',
            cellsalign: 'center',
            columntype: 'dropdownlist',
            createeditor: function(row, value, editor) {
               editor.jqxDropDownList({
                  source: ["Y","N"],
                  autoDropDownHeight: true
               });
            }
         }, {
            text: '퇴사여부',
            editable: true,
            sortable: false,
            datafield: 'vRetireYn',
            width: '100px',
            align: 'center',
            cellsalign: 'center',
            columntype: 'dropdownlist',
            createeditor: function(row, value, editor) {
               editor.jqxDropDownList({
                  source: ["Y","N"],
                  autoDropDownHeight: true
               });
            }
         }]
      });

      //수정 시 이벤트
      $("#pgc_grid").on('cellvaluechanged',function(event) {
         var args = event.args;

         if (args.datafield != "editFlag") {
            var selectedrowindex = args.rowindex;
            var editFlag = $("#pgc_grid").jqxGrid('getcellvalue', selectedrowindex, "editFlag");

            var newvalue = args.newvalue;
            if (typeof newvalue == "undefined" || newvalue == "undefined") {
               newvalue = "";
            }

            var oldvalue = args.oldvalue;
            if (typeof oldvalue == "undefined" || oldvalue == "undefined") {
               oldvalue = "";
            }

            if (editFlag != "new" && newvalue != oldvalue) {
               $("#pgc_grid").jqxGrid('setcellvalue', selectedrowindex, "editFlag", "mod");
            }
         }
      });

      //휴지통 버튼 클릭
      $("#pgc_grid").on('cellclick',function(event) {
         var args = event.args;
         if (args.datafield == "editFlag" && args.value=="del") {
            $("#pgc_grid").jqxGrid('setcellvalue', args.rowindex, "editFlag", "");
         }
      });

      $("#toolbarpgc_grid").removeClass("jqx-widget-header");
      $("#toolbarpgc_grid").removeClass("jqx-widget-header-custom");
   };

   var setupActionButton = function() {
      //데이터 복사 입력창
      $("#pgc_copy").jqxInput({
         width: '80px',
         height: '35px',
         maxLength: 7,
         disabled: true,
      });
      //데이터 복사
      $("#pgc_BtnCopy").jqxButton({
         width: '120px',
         height: '35px',
         disabled: true
      });
      //인원정보 업로드
      $("#pgc_BtnUpload").jqxButton({
         width: '140px',
         height: '35px'
      });
   }

   var setupPgcHelp = function() {
      var pgc_x = ($(window).width() / 2) - 300;
      var pgc_y = $(window).height() - 600;

      $("#pgc_WinHelp").jqxWindow({
         width: 610,
         height: 250,
         resizable: false,
         position: {
            x: pgc_x,
            y: pgc_y
         },
         isModal: true,
         okButton: $("#pgc_BtnOk"),
         autoOpen: false,
         initContent: function() {
            $("#pgc_BtnOk").jqxButton({
               width: '65px',
               template: 'primary'
            });
            $("#pgc_BtnOk").focus();
         },
         theme: 'custom'
      });
   };

   return {
      setupSearchField: setupSearchField,
      setupPgcGrid: setupPgcGrid,
      setupActionButton: setupActionButton,
      setupPgcHelp: setupPgcHelp
   }

}
