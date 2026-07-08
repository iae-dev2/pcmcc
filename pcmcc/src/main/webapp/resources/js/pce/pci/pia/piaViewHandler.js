var PiaViewHandler = function(model, transaction) {

   var model = model;
   var transaction = transaction;

   var setupSearchField = function() {
      //평가코드
      $("#pia_code").jqxComboBox({
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
      $("#pia_BtnSearch").jqxButton({
         width: '75px',
         height: '35px'
      });
   };

   //월별 내부인건비/간접비 목록 그리드
   var setupMainGrid = function() {

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
         var selectedrowindexrowedit = $("#pia_mainGrid").jqxGrid('getselectedrowindex');
         var selectedrowdata = $("#pia_mainGrid").jqxGrid('getrowdata', selectedrowindexrowedit);
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

      var numberWithCommas = function(x) {
         if (x == 0) {
            return "0";
         }
         else {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
         }
      }

      $("#pia_mainGrid").jqxGrid({
         width: '100%',
         height: '450px',
         localization: localizationobj,
         theme: 'custom',
         autoheight: false,
         columnsheight: 35,
         rowsheight: 35,
         selectionmode: 'singlerow',
         disabled: true,
         editable: true,
         editmode: 'click',   //클릭 시 수정 가능
         enabletooltips: false,
         showtoolbar: true,
         rendertoolbar: function(statusbar) {
            var container = $("<div style='overflow:hidden; position:relative; margin:5px;'></div>");
            var saveButton = $("<button class='btn-frame btn-s-save' style='margin-right:5px; float:right; cursor:default;'>저장</button>");
            container.append(saveButton);
            statusbar.append(container);
            saveButton.jqxButton({
               width: 65,
               height: 25
            });

            //save
            saveButton.click(function(event) {
               if (!$("#pia_mainGrid").jqxGrid('disabled')) {
                  var rows = $("#pia_mainGrid").jqxGrid('getrows');
                  transaction.savePiaGrid(rows).then(function(result) {
                     if (result > -1) {
                        alert("직접비/간접비 목록이 저장되었습니다.");

                        $("#pia_mainGrid").jqxGrid('clearselection');
                        $("#pia_mainGrid").jqxGrid({ source: transaction.getPiaList() });
                     }
                     else {
                        alert("저장에 실패하였습니다 !");
                     }
                  }, function() {
                     console.log("직접비/간접비 목록 저장 실패");
                  });
               }
            });
         },
         columns: [{
            text: '',
            editable: false,
            datafield: 'editFlag',
            width: '25px',
            align: 'center',
            cellsalign: 'center',
            cellsrenderer: imagerenderer,
            pinned: true
         }, {
            text: '과제코드',
            editable: true,
            datafield: 'vProjectCode',
            width: '80px',
            align: 'center',
            cellsalign: 'center',
            cellbeginedit: rowEdit,
            cellvaluechanging: function(rowindex, datafield, columntype, oldvalue, newvalue) {
               transaction.checkPiaProject(newvalue.toUpperCase()).done(function(result) {
                  if (result.length == 1) {
                     $("#pia_mainGrid").jqxGrid('setcellvalue', rowindex, "vProjectCode", result[0].vProjectCode);
                  }
                  else {
                     $("#pia_mainGrid").jqxGrid('setcellvalue', rowindex, "vProjectCode", "");
                     var spmParam = {
                        "vProjectCode": "",
                        "vProjectName": ""
                     };
                     var spmCallBack = function() {
                        var _data = commonDialog.returnData;
                        $("#pia_mainGrid").jqxGrid('setcellvalue', rowindex, "vProjectCode", _data.vProjectCode);
                     }
                     commonDialog.open('spm', spmParam, spmCallBack);
                  }
               });
            },
            pinned: true
         }, {
            text: '과제연도',
            editable: false,
            datafield: 'vYear',
            width: '80px',
            align: 'center',
            cellsalign: 'center',
            pinned: true
         }, {
            text: '구분',
            editable: true,
            datafield: 'vClass',
            displayfield: 'dsp_vClass',
            width: '80px',
            align: 'center',
            cellsalign: 'center',
            cellbeginedit: rowEdit,
            columntype: 'dropdownlist',
            createeditor: function(row, value, editor) {
               editor.jqxDropDownList({
                  source: transaction.getClass(),
                  displayMember: 'vItemName',
                  valueMember: 'vItemCode',
                  autoDropDownHeight: true
               });
            },
            pinned: true
         }, {
            text: '1월',
            editable: true,
            datafield: 'n1MonAmount',
            width: '110px',
            align: 'center',
            cellsalign: 'right',
            cellsformat: 'c'
         }, {
            text: '2월',
            editable: true,
            datafield: 'n2MonAmount',
            width: '110px',
            align: 'center',
            cellsalign: 'right',
            cellsformat: 'c'
         }, {
            text: '3월',
            editable: true,
            datafield: 'n3MonAmount',
            width: '110px',
            align: 'center',
            cellsalign: 'right',
            cellsformat: 'c'
         }, {
            text: '4월',
            editable: true,
            datafield: 'n4MonAmount',
            width: '110px',
            align: 'center',
            cellsalign: 'right',
            cellsformat: 'c'
         }, {
            text: '5월',
            editable: true,
            datafield: 'n5MonAmount',
            width: '110px',
            align: 'center',
            cellsalign: 'right',
            cellsformat: 'c'
         }, {
            text: '6월',
            editable: true,
            datafield: 'n6MonAmount',
            width: '110px',
            align: 'center',
            cellsalign: 'right',
            cellsformat: 'c'
         }, {
            text: '7월',
            editable: true,
            datafield: 'n7MonAmount',
            width: '110px',
            align: 'center',
            cellsalign: 'right',
            cellsformat: 'c'
         }, {
            text: '8월',
            editable: true,
            datafield: 'n8MonAmount',
            width: '110px',
            align: 'center',
            cellsalign: 'right',
            cellsformat: 'c'
         }, {
            text: '9월',
            editable: true,
            datafield: 'n9MonAmount',
            width: '110px',
            align: 'center',
            cellsalign: 'right',
            cellsformat: 'c'
         }, {
            text: '10월',
            editable: true,
            datafield: 'n10MonAmount',
            width: '110px',
            align: 'center',
            cellsalign: 'right',
            cellsformat: 'c'
         }, {
            text: '11월',
            editable: true,
            datafield: 'n11MonAmount',
            width: '110px',
            align: 'center',
            cellsalign: 'right',
            cellsformat: 'c'
         }, {
            text: '12월',
            editable: true,
            datafield: 'n12MonAmount',
            width: '110px',
            align: 'center',
            cellsalign: 'right',
            cellsformat: 'c'
         }, {
            text: '합계',
            editable: false,
            datafield: 'vTotal',
            width: '120px',
            align: 'center',
            cellsalign: 'right',
            cellsformat: 'c',
            cellsrenderer: function(index, datafield, value, defaultvalue, column, rowdata) {
               var total = (rowdata.n1MonAmount + rowdata.n2MonAmount  + rowdata.n3MonAmount  + rowdata.n4MonAmount +
                            rowdata.n5MonAmount + rowdata.n6MonAmount  + rowdata.n7MonAmount  + rowdata.n8MonAmount+
                            rowdata.n9MonAmount + rowdata.n10MonAmount + rowdata.n11MonAmount + rowdata.n12MonAmount);
               return "<div style='margin-top:10px; margin-right:4px;' class='jqx-right-align'>" + numberWithCommas(total) + "</div>";
           }
         }]
      });

      //수정 시 이벤트
      $("#pia_mainGrid").on('cellvaluechanged', function(event) {
         var args = event.args;

         if (args.datafield != "editFlag") {
            var selectedrowindex = args.rowindex;
            var editFlag = $("#pia_mainGrid").jqxGrid('getcellvalue', selectedrowindex, "editFlag");

            var newvalue = args.newvalue;
            if (typeof newvalue == "undefined" || newvalue == "undefined") {
               newvalue = "";
            }

            var oldvalue = args.oldvalue;
            if (typeof oldvalue == "undefined" || oldvalue == "undefined") {
               oldvalue = "";
            }

            if (editFlag != "new" && newvalue != oldvalue) {
               $("#pia_mainGrid").jqxGrid('setcellvalue', selectedrowindex, "editFlag", "mod");
            }
         }
      });

      //휴지통 버튼 클릭
      $("#pia_mainGrid").on('cellclick', function(event) {
         var args = event.args;

         if (args.datafield == "editFlag" && args.value=="del") {
            $("#pia_mainGrid").jqxGrid('setcellvalue', args.rowindex, "editFlag", "");
         }
      });

      $("#toolbarpia_mainGrid").removeClass("jqx-widget-header");
      $("#toolbarpia_mainGrid").removeClass("jqx-widget-header-custom");
   };

   //분기별 내부인건비/간접비 목록 그리드
   var setupHalfYearGrid = function() {

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
         var selectedrowindexrowedit = $("#pia_halfYearGrid").jqxGrid('getselectedrowindex');
         var selectedrowdata = $("#pia_halfYearGrid").jqxGrid('getrowdata', selectedrowindexrowedit);

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

      var numberWithCommas = function(x) {
         if (x == 0) {
            return "0";
         }
         else {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
         }
      }

      $("#pia_halfYearGrid").jqxGrid({
         width: '100%',
         height: '450px',
         localization: localizationobj,
         theme: 'custom',
         autoheight: false,
         columnsheight: 35,
         rowsheight: 35,
         selectionmode: 'singlerow',
         disabled: true,
         editable: true,
         editmode: 'click',   //클릭 시 수정 가능
         enabletooltips: false,
         showtoolbar: true,
         rendertoolbar: function(statusbar) {
            var container = $("<div style='overflow:hidden; position:relative; margin:5px;'></div>");
            var saveButton = $("<button class='btn-frame btn-s-save' style='margin-right:5px; float:right; cursor:default;'>저장</button>");

            container.append(saveButton);
            statusbar.append(container);
            saveButton.jqxButton({
               width: 65,
               height: 25
            });

            // save
            saveButton.click(function(event) {
               if (!$("#pia_halfYearGrid").jqxGrid('disabled')) {
                  var rows = $("#pia_halfYearGrid").jqxGrid('getrows');

                  transaction.savePiaHalfYearGrid(rows).then(function(result) {
                     if (result > -1) {
                        alert("직접비/간접비 목록이 저장되었습니다.");

                        $("#pia_halfYearGrid").jqxGrid('clearselection');
                        $("#pia_halfYearGrid").jqxGrid({ source: transaction.getPiaHalfYearList() });
                     }
                     else {
                        alert("저장에 실패하였습니다 !");
                     }
                  }, function() {
                     console.log("직접비/간접비 목록 저장 실패");
                  });
               }
            });
         },
         columns: [{
            text: '',
            editable: false,
            datafield: 'editFlag',
            /*width: '25px',*/
            width: '1%',
            align: 'center',
            cellsalign: 'center',
            cellsrenderer: imagerenderer
         }, {
            text: '평가코드',
            hidden: true,
            editable: false,
            datafield: 'vEstiCode',
            align: 'center',
            cellsalign: 'center'
         }, {
            text: '과제코드',
            editable: false,
            datafield: 'vProjectCode',
            /*width: '80px',*/
            width: '20%',
            align: 'center',
            cellsalign: 'center'
         }, {
            text: '인건비',
            editable: true,
            datafield: 'nDirectAmount',
            /*width: '110px',*/
            width: '26%',
            align: 'center',
            cellsalign: 'right',
            cellsformat: 'c'
         }, {
            text: '간접비',
            editable: true,
            datafield: 'nIndirectAmount',
            /*width: '110px',*/
            width: '26%',
            align: 'center',
            cellsalign: 'right',
            cellsformat: 'c'
         }, {
            text: '합계',
            editable: false,
            datafield: 'nAmount',
            /*width: '110px',*/
            align: 'center',
            cellsalign: 'right',
            cellsformat: 'c',
            cellsrenderer: function(index, datafield, value, defaultvalue, column, rowdata) {
               var total = (rowdata.nDirectAmount + rowdata.nIndirectAmount);

               return "<div style='margin-top:10px; margin-right:4px;' class='jqx-right-align'>" + numberWithCommas(total) + "</div>";
           }
         }]
      });

      //수정 시 이벤트
      $("#pia_halfYearGrid").on('cellvaluechanged',function(event) {
         var args = event.args;

         if (args.datafield != "editFlag") {
            var selectedrowindex = args.rowindex;
            var editFlag = $("#pia_halfYearGrid").jqxGrid('getcellvalue', selectedrowindex, "editFlag");
            var newvalue = args.newvalue;

            if (typeof newvalue == "undefined" || newvalue == "undefined") {
               newvalue = "";
            }

            var oldvalue = args.oldvalue;

            if (typeof oldvalue == "undefined" || oldvalue == "undefined") {
               oldvalue = "";
            }

            if (editFlag != "new" && newvalue != oldvalue) {
               $("#pia_halfYearGrid").jqxGrid('setcellvalue', selectedrowindex, "editFlag", "mod");
            }
         }
      });

      //휴지통 버튼 클릭
      $("#pia_halfYearGrid").on('cellclick',function(event) {
         var args = event.args;

         if (args.datafield == "editFlag" && args.value=="del") {
            $("#pia_halfYearGrid").jqxGrid('setcellvalue', args.rowindex, "editFlag", "");
         }
      });

      $("#toolbarpia_halfYearGrid").removeClass("jqx-widget-header");
      $("#toolbarpia_halfYearGrid").removeClass("jqx-widget-header-custom");
   };

   var setupActionButton = function() {
      $("#pia_BtnUpload").jqxButton({ width: '220px', height: '35px' });
      $("#pia_BtnMonthlyCal").jqxButton({ width: '230px', height: '35px' });
      $("#pia_BtnExcel").jqxButton({ width: '100px', height: '35px' });
      $("#pia_BtnHalfYearCal").jqxButton({ width: '230px', height: '35px' });
      $("#pia_BtnHalfYearExcel").jqxButton({ width: '100px', height: '35px' });
   };

   var setupPiaHelp = function() {
      var pgb_x = ($(window).width() / 2) - 300;
      var pgb_y = $(window).height() - 600;

      $("#pia_WinHelp").jqxWindow({
         width: '610px',
         height: '250px',
         resizable: false,
         position: {
            x: pgb_x,
            y: pgb_y
         },
         isModal: true,
         okButton: $("#pia_BtnOk"),
         autoOpen: false,
         initContent: function() {
            $("#pia_BtnOk").jqxButton({
               width: '65px',
               template: 'primary'
            });
            $("#pia_BtnOk").focus();
         },
         theme: 'custom'
      });
   };

   var setupPiaLoader = function() {
      $("#pia_jqxLoader").jqxLoader({
         isModal: true,
         width: 150,
         height: 60,
         imagePosition: 'top'
      });
   }

   return {
      setupSearchField: setupSearchField,
      setupMainGrid: setupMainGrid,
      setupHalfYearGrid: setupHalfYearGrid,
      setupActionButton: setupActionButton,
      setupPiaHelp: setupPiaHelp,
      setupPiaLoader: setupPiaLoader
   }

}
