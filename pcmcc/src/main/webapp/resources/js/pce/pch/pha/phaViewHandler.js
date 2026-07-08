var PhaViewHandler = function(model, transaction) {

   var model = model;
   var transaction = transaction;

   var setupSearchField = function() {
      //평가코드
      $("#pha_searchCode").jqxComboBox({
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

      //진행단계
      $("#pha_searchStep").jqxComboBox({
         selectedIndex: 0,
         source: transaction.getEstiStep(),
         displayMember: 'vItemName',
         valueMember: 'vItemCode',
         width: '240px',
         height: '25px',
         theme: 'custom',
         disabled: false,
         autoDropDownHeight: true
      });

      //조회 버튼
      $("#pha_BtnSearch").jqxButton({
         width: '75px',
         height: '35px'
      });
   };

   var localizationobj = {
      emptydatastring: "검색 결과가 없습니다.",
      currencysymbol: " "
   };

   var setupPrjGrid = function() {

      //과제코드 목록 그리드
      $("#pha_prjGrid").jqxGrid({
         width: '100%',
         height: '350px',
         localization: localizationobj,
         theme: 'custom',
         autoheight: false,
         columnsheight: 35,
         columnsresize: true,
         enabletooltips: true,
         rowsheight: 35,
         selectionmode: 'singlerow',
         editable: false,
         editmode: 'click',   //클릭 시 수정 가능
         sortable: true,
         showsortmenuitems: false,
         filterable: true,
         showfilterrow: true,
         columns: [{
            text: '과제코드',
            datafield: 'vProjectCode',
            width: '80px',
            align: 'center',
            cellsalign: 'center'
         }, {
            text: '과제명',
            datafield: 'vProjectName',
            align: 'center',
            cellsalign: 'left',
         }, {
            text: '과제책임자',
            datafield: 'vProjectPmName',
            width: '80px',
            align: 'center',
            cellsalign: 'center',
         },{
            text: '기여율합',
            datafield: 'vProjectSum',
            width: '90px',
            align: 'center',
            cellsalign: 'center'
         }, {
            text: '진행단계',
            datafield: 'vEstiStep',
            width: '220px',
            align: 'center',
            cellsalign: 'center',
            cellsrenderer: function(row, column, value) {
               var prjdata = $('#pha_prjGrid').jqxGrid('getrowdata', row);
               var stepName = "";
               if (value == 1) {
                  if (prjdata.vFinish == "Y") {
                     stepName = "PM 평가중";
                  }
                  else {
                     stepName = "연구원 입력중";
                  }
               }
               else if (value == 2) {
                  if (prjdata.vConfirm == "Y") {
                     stepName = "센터장 확인중";
                  }
                  else {
                     stepName = "연구원 확인중";
                  }
               }
               else if (value == 3) {
                  stepName = "센터장 <span style='color:red;'>반려</span>";
               }
               else if (value == 4) {
                  stepName = "PM 최종 확인 중";
               }
               else if (value == 5) {
                  stepName = "최종 평가완료";
               }
               return '<div style="text-align: center; margin-top: 10px;"> ' + stepName + '</div>';
            }
         } ]
      });
   };

   var setupContGrid = function() {

      var imagerenderer = function(row, datafield, value) {
         if (value == 'new') {
            return '<img height="25" width="25" style="margin-top:78px;" src="/resources/images/blt_add.png"/>';
         }
         else if (value == 'mod') {
            return '<img height="25" width="25" style="margin-top:78px;" src="/resources/images/blt_edit.png"/>';
         }
         else if (value == 'del') {
            return '<img height="25" width="25" style="margin-top:78px;" src="/resources/images/blt_del.png"/>';
         }
         else {
            return '';
         }
      }

      var textrenderer = function(row, column, value) {
         return "<textarea style='width:370px; height:98%; font-family:sans-serif; font-size:13px; padding-top:5px; padding-bottom:5px;'>" + value + "</textarea>";
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

      var editorElement = null;
      var editorElement2 = null;
      var currentContent = '';
      var currentContent2 = '';

      //과제별 기여율 그리드
      $("#pha_contGrid").jqxGrid({
         width: '100%',
         height: '700px',
         localization: localizationobj,
         theme: 'custom',
         autoheight: false,
         columnsheight: 35,
         columnsresize: false,
         enabletooltips: false,
         rowsheight: 180,
         selectionmode: 'singlerow',
         editable: true,
         editmode: 'click',   //클릭 시 수정 가능
         showtoolbar: true,
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
               if ($("#pha_StoredEstiCode").val() != "" && $("#pha_StoredProjectCode").val() != "") {
                  var selectedrowindex = $("#pha_contGrid").jqxGrid('getselectedrowindex');
                  var id = $("#pha_contGrid").jqxGrid('getrowid', selectedrowindex);
                  var editFlag = $("#pha_contGrid").jqxGrid('getcellvalue',selectedrowindex, "editFlag");

                  if (editFlag == "new") {
                     $("#pha_contGrid").jqxGrid('deleterow', id);
                  }
                  else {
                     $("#pha_contGrid").jqxGrid('setcellvalue', selectedrowindex,"editFlag", "del");
                  }
               }
               else {
                  alert("과제코드 목록에 선택된 항목이 없습니다!");
               }
            });

            //save
            saveButton.click(function(event) {
               var save_vali = model.chkWorkVali();
               if (save_vali) {
                  if ($("#pha_StoredEstiCode").val() != "" && $("#pha_StoredProjectCode").val() != "") {
                     var rows = $("#pha_contGrid").jqxGrid('getrows');
                     transaction.saveContGrid(rows).then(function(result) {
                        if (result > -1) {
                           $("#pha_contGrid").jqxGrid('clearselection');
                           $("#pha_contGrid").jqxGrid({
                              source: transaction.getProjectContributeList($("#pha_StoredEstiCode").val(), $("#pha_StoredProjectCode").val())
                           });
                           $("#pha_count").text($("#pha_prjGrid").jqxGrid("getrows").length);
                           alert("과제별 기여율이 저장되었습니다.");
                        }
                        else {
                           alert("저장에 실패하였습니다 !");
                        }
                     }, function() {
                        console.log("과제별 기여율 저장 실패");
                     });
                  }
                  else {
                     alert("과제코드 목록에 선택된 항목이 없습니다!");
                  }
               }
            });
         },
         handlekeyboardnavigation: function(event) {
            var key = event.charCode ? event.charCode : event.keyCode ? event.keyCode : 0;

            if (key == 13) {

               if (editorElement != null) {
                  var txtArea = editorElement[0];
                  var txtValue = txtArea.value;
                  var selectPos = txtArea.selectionStart;
                  var beforeTxt = txtValue.substring(0, selectPos);
                  var afterTxt = txtValue.substring(txtArea.selectionEnd, txtValue.length);

                  currentContent = beforeTxt + "\n" + afterTxt;
                  editorElement.val(currentContent);

                  var pos = (selectPos+1);
                  var obj = document.getElementById("customTextArea0TextArea");
               }

               if (obj != null) {
                  if (obj.setSelectionRange) {
                     obj.focus();
                     obj.setSelectionRange(pos, pos);
                  }
                  else if (obj.createTextRange) {
                     var c = obj.crateTextRange();
                     c.move("character", pos);
                     c.select();
                  }
               }

               if (editorElement2 != null) {
                  var txtArea2 = editorElement2[0];
                  var txtValue2 = txtArea2.value;
                  var selectPos2 = txtArea2.selectionStart;
                  var beforeTxt2 = txtValue2.substring(0, selectPos2);
                  var afterTxt2 = txtValue2.substring(txtArea2.selectionEnd, txtValue2.length);

                  currentContent2 = beforeTxt2 + "\n" + afterTxt2;
                  editorElement2.val(currentContent2);

                  var pos2 = (selectPos2+1);
                  var obj2 = document.getElementById("customTextArea20TextArea");
               }

               if (obj2 != null) {
                  if (obj2.setSelectionRange) {
                     obj2.focus();
                     obj2.setSelectionRange(pos2, pos2);
                  }
                  else if (obj2.createTextRange) {
                     var c2 = obj2.crateTextRange();
                     c2.move("character", pos2);
                     c2.select();
                  }
               }

               return true;
            }
            else if (key == 27) {
               return true;
            }
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
            width: '80px',
            align: 'center',
            cellsalign: 'center'
         }, {
            text: '직위',
            editable: false,
            datafield: 'vPosName',
            align: 'center',
            cellsalign: 'center'
         }, {
            text: '업무',
            editable: true,
            datafield: 'vWork',
            width: '380px',
            align: 'center',
            cellsrenderer: textrenderer,
            columntype: 'template',
            createeditor: function(row, cellvalue, editor, celltext, cellwidth, cellheight) {
               editorElement = $('<textarea id="customTextArea' + row + '"></textarea>').prependTo(editor);
               editorElement.jqxTextArea({
                  width: '100%',
                  height: '100%'
               });
            },
            initeditor: function(row, cellvalue, editor) {
               currentContent = '';
               if (cellvalue != null) {
                  editorElement.val(cellvalue);
               }
               else {
                  editorElement.val("");
               }
            },
            geteditorvalue: function(row, cellvalue, editor) {
               return editor.find('textarea').val();
            }
         }, {
            text: '평가의견',
            editable: true,
            datafield: 'vContent',
            width: '380px',
            align: 'center',
            cellsrenderer: textrenderer,
            columntype: 'template',
            createeditor: function(row, cellvalue, editor, celltext, cellwidth, cellheight) {
               editorElement2 = $('<textarea id="customTextArea2' + row + '"></textarea>').prependTo(editor);
               editorElement2.jqxTextArea({
                  width: '100%',
                  height: '100%'
               });
            },
            initeditor: function(row, cellvalue, editor) {
               currentContent2 = '';
               if (cellvalue != null) {
                  editorElement2.val(cellvalue);
               }
               else {
                  editorElement2.val("");
               }
            },
            geteditorvalue: function(row, cellvalue, editor) {
               return editor.find('textarea').val();
            }
         }, {
            text: '기여율',
            editable: true,
            datafield: 'nContribution',
            width: '80px',
            align: 'center',
            cellsalign: 'center'
         }, {
            text: '완료여부',
            editable: true,
            datafield: 'vFinish',
            width: '70px',
            align: 'center',
            cellsalign: 'center',
            columntype: 'dropdownlist',
            createeditor: function(row, value, editor) {
               editor.jqxDropDownList({ source: ["Y","N"], autoDropDownHeight: true });
            }
         }, {
            text: '확인여부',
            editable: true,
            datafield: 'vConfirm',
            width: '70px',
            align: 'center',
            cellsalign: 'center',
            columntype: 'dropdownlist',
            createeditor: function(row, value, editor) {
               editor.jqxDropDownList({ source: ["Y","N"], autoDropDownHeight: true });
            }
         }]
      });

      //수정 시 이벤트
      $("#pha_contGrid").on('cellvaluechanged',function(event) {
         var args = event.args;

         if (args.datafield != "editFlag") {
            var selectedrowindex = args.rowindex;
            var editFlag = $("#pha_contGrid").jqxGrid('getcellvalue', selectedrowindex, "editFlag");

            var newvalue = args.newvalue;
            if (typeof newvalue == "undefined" || newvalue == "undefined") {
               newvalue = "";
            }

            var oldvalue = args.oldvalue;
            if (typeof oldvalue == "undefined" || oldvalue == "undefined") {
               oldvalue = "";
            }

            if (editFlag != "new" && newvalue != oldvalue) {
               $("#pha_contGrid").jqxGrid('setcellvalue', selectedrowindex, "editFlag", "mod");
            }
         }
      });

      //휴지통 버튼 클릭
      $("#pha_contGrid").on('cellclick',function(event) {
         var args = event.args;
         if (args.datafield == "editFlag" && args.value=="del") {
            $("#pha_contGrid").jqxGrid('setcellvalue', args.rowindex, "editFlag", "");
         }
      });

      $("#toolbarpha_contGrid").removeClass("jqx-widget-header");
      $("#toolbarpha_contGrid").removeClass("jqx-widget-header-custom");
   };

   var setupActionButton = function() {
      $("#pha_BtnExcel").jqxButton({
         width: '100px',
         height: '35px'
      });
      $("#pha_BtnProjectExcel").jqxButton({
         width: '100px',
         height: '35px'
      });
   };

   return {
      setupSearchField: setupSearchField,
      setupPrjGrid: setupPrjGrid,
      setupContGrid: setupContGrid,
      setupActionButton: setupActionButton
   }

}
