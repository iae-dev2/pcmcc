var PcfViewHandler = function (model, transaction) {

   var model = model;
   var transaction = transaction;

   var setupBbsGrid = function () {
      var localizationobj = {
         emptydatastring: "검색 결과가 없습니다.",
         currencysymbol: " "
      };

      $("#pcf_bbsGrid").jqxGrid({
         width: '100%',
         height: '250px',
         localization: localizationobj,
         theme: 'custom',
         autoheight: false,
         columnsheight: 35,
         rowsheight: 35,
         selectionmode: 'singlerow',
         editable: false,
         enabletooltips: true,
         columns: [{
            text: '번호',
            datafield: 'nSeqNo',
            width: '80px',
            align: 'center',
            cellsalign: 'center'
         }, {
            text: '제목',
            datafield: 'vSubject',
            align: 'center',
            cellsalign: 'left'
         }, {
            text: '이름',
            datafield: 'vName',
            width: '100px',
            align: 'center',
            cellsalign: 'center'
         }, {
            text: '날짜',
            datafield: 'vYyyymmdd',
            width: '140px',
            align: 'center',
            cellsalign: 'center'
         }, {
            text: '조회',
            editable: false,
            datafield: 'nHit',
            width: '120px',
            align: 'center',
            cellsalign: 'center'
         }, {
            text: '첨부파일',
            editable: true,
            datafield: 'nFileSeqNo',
            width: '120px',
            align: 'center',
            cellsalign: 'center',
            cellsrenderer: function (row, column, value) {
               if (value > 0) {
                  let bbsFileIcon = "";
                  bbsFileIcon =  '<div style="margin-top: 10px; margin-left: 50px;">';
                  bbsFileIcon +=    '<img height="15" width="15" src="/resources/images/btn_disk.png"/>';
                  bbsFileIcon += '<a/>';

                  return bbsFileIcon;
               }
               else {
                  return "";
               }
            }
         }]
      });

   };

   var setupActionForm = function (param) {
      // 저장
      $("#pcf_BtnSave").jqxButton({
         width: '75px',
         height: '35px',
         disabled: true
      });
      // 삭제
      $("#pcf_BtnDel").jqxButton({
         width: '75px',
         height: '35px',
         disabled: true
      });
      // 신규
      $("#pcf_BtnNew").jqxButton({
         width: '75px',
         height: '35px',
         disabled: param
      });
   };

   var setupBbsField = function (param) {
      // 작성자
      $("#pcf_name").jqxInput({
         width: 100,
         height: 25,
         theme: 'custom',
         disabled: true
      });

      // 제목
      $("#pcf_subject").jqxInput({
         width: param,
         height: 25,
         theme: 'custom',
         disabled: true
      });

      // 내용
      $("#pcf_content").jqxTextArea({
         width: param,
         height: 200,
         theme: 'custom',
         disabled: true
      });
   }

   // 첨부파일 그리드
   var setupFileGrid = function () {

      var localizationobj = {
         emptydatastring: "검색 결과가 없습니다.",
         currencysymbol: " "
      };
      var imagerenderer = function (row, datafield, value) {
         if (value == 'new') {
            return '<img height="25" width="25" src="/resources/images/blt_add.png"/>';
         }
         else if (value == 'mod') {
            return '<img height="25" width="25" src="/resources/images/blt_edit.png"/>';
         }
         else if (value == 'del') {
            return '<img height="25" width="25" src="/resources/images/blt_del.png"/>';
         }
         else {
            return '';
         }
      };

      // 로딩바
      $("#pcf_jqxLoader").jqxLoader({
         isModal: true,
         width: 200,
         height: 80,
         imagePosition: 'center'
      });

      $("#pcf_fileGrid").jqxGrid({
         width: "100%",
         localization: localizationobj,
         theme: 'custom',
         autoheight: true,
         columnsheight: 25,
         rowsheight: 25,
         selectionmode: 'singlerow',
         disabled: true,
         editable: true,
         editmode: 'click',   // 클릭 시 수정 가능
         showtoolbar: true,
         rendertoolbar: function (statusbar) {
            var container = $("<div style='overflow: hidden; position: relative; margin: 5px;'></div>");
            var addButton = $("<button id='pcf_filegrid_add' class='btn-frame2 btn-line btn-line-add-img' style='margin-right: 5px;float: right; backgroud-color: #fff;'>파일추가</button>");
            var deleteButton = $("<button id='pcf_filegrid_del' class='btn-frame2 btn-line btn-line-delete-img' style='float: right; backgroud-color: #fff;'>파일삭제</button>");
            var previewButton = $("<button id='pcffilegrid_preview' class='btn-frame2 btn-line btn-line-search-img' style='margin-right: 10px; float: right; backgroud-color: #fff;'>바로보기</button>");

            container.append(deleteButton);
            container.append(addButton);
            container.append(previewButton);
            statusbar.append(container);

            addButton.jqxButton({
               width: 80,
               height: 25
            });
            deleteButton.jqxButton({
               width: 80,
               height: 25
            });
            previewButton.jqxButton({
               width: 80,
               height: 25
            });

            // 새로운 행 추가
            addButton.click(function (event) {
               if (_mode == 'pce') {
                  if (!$("#pcf_fileGrid").jqxGrid('disabled')) {
                     // 사용자가 정의해서 사용한다.
                     var fupParam = {
                        "vFileType": "pcf",       // 업무분류 - 패키지 명 - 필수
                        "vEmplNo": _loginUser,    // 사번 - 필수
                        "multipleFiles": "true"   // 멀티파일 업로드 허용여부 true:multi / false:single
                     }
                     var fupCallBack = function () {
                        var _data = commonDialog.returnData;
                        var returnData = JSON.parse(_data);

                        if (returnData.length > 0) {
                           for (var i = 0; i < returnData.length; i++) {
                              var row = {};
                              row["editFlag"] = "new";
                              row["vFileType"] = "pcf";
                              row["nSeqNo"] = $("#pcf_nSeqNo").val();
                              row["nFileSeqNo"] = returnData[i].nFileSeqNo;
                              row["vFileName"] = returnData[i].vFileName;
                              row["vTempFileName"] = returnData[i].vTempFileName;
                              row["vFilePath"] = returnData[i].vFilePath;
                              row["vFileExtension"] = returnData[i].vFileExtension;

                              $("#pcf_fileGrid").jqxGrid('addrow', null, row);
                           }
                        }

                     }
                     commonDialog.open('fup', fupParam, fupCallBack);
                  }
               }
            });

            // 선택한 행 삭제
            deleteButton.click(function (event) {
               if (_mode == 'pce') {
                  if (!$("#pcf_fileGrid").jqxGrid('disabled')) {
                     var selectedrowindex = $("#pcf_fileGrid").jqxGrid('getselectedrowindex');
                     var id = $("#pcf_fileGrid").jqxGrid('getrowid', selectedrowindex);
                     var editFlag = $("#pcf_fileGrid").jqxGrid('getcellvalue',selectedrowindex, "editFlag");

                     if (editFlag == "new") {
                        $("#pcf_fileGrid").jqxGrid('deleterow', id);
                     }
                     else {
                        $("#pcf_fileGrid").jqxGrid('setcellvalue', selectedrowindex,"editFlag", "del");
                     }
                  }
               }
            });

            // 바로보기
            previewButton.click(function (event) {
               if (!$("#pcf_fileGrid").jqxGrid("disabled")) {
                  var rows = $("#pcf_fileGrid").jqxGrid('getrows');

                  if (rows.length > 0) {
                     $("#pcf_jqxLoader").jqxLoader({ 'text': '변환 중입니다...' });
                     $("#pcf_jqxLoader").jqxLoader('open');   // 로딩바 열기

                     transaction.registerWithDap(rows).then(function (result) {
                        if (result != null && result.alink != null) {
                           window.open(result.alink);

                           $("#pcf_jqxLoader").jqxLoader('close');   // 로딩바 닫기
                        }
                        else {
                           alert("바로보기 실패 !");
                           $("#pcf_jqxLoader").jqxLoader('close');   // 로딩바 닫기
                        }
                     }, function() {
                        console.log("바로보기 실패 !");
                        $("#pcf_jqxLoader").jqxLoader('close');   // 로딩바 닫기
                     });
                  }
                  else {
                     alert("등록된 첨부파일이 없습니다.");
                  }
               }
            });
         },
         columns: [{
            text: '',
            editable: false,
            datafield: 'editFlag',
            width: '25px',
            cellsalign: 'center',
            align: 'center',
            cellsrenderer: imagerenderer
         }, {
            text: 'nFileSeqNo',
            datafield: 'nFileSeqNo',
            width: '50px',
            hidden: true
         }, {
            text: '파일명',
            editable: false,
            editmode: 'click',
            datafield: 'vFileName',
            align: 'center',
            cellsrenderer: function (row, column, value) {
               var seqNo = $("#pcf_fileGrid").jqxGrid('getcellvalue', row, "nSeqNo");
               var fileSeqNo = $("#pcf_fileGrid").jqxGrid('getcellvalue', row, "nFileSeqNo");
               var href = '/fileDownload?vFileType=pcf';
               href += '&param2=';
               href += seqNo;
               href += '&param3=';
               href += fileSeqNo;
               if (value.indexOf('#') != -1) {
                  value += value.substring(0, value.indexOf('#'));
               }
               return "<div style='margin-top: 4px;'><a style='margin-left: 10px; color: #6666FF;' href='" + href + "'> " + value + "</a></div>";
            }
         }, {
            datafield: 'vTempFileName',
            hidden: true
         }, {
            datafield: 'vFilePath',
            hidden: true
         }, {
            datafield: 'vFileExtension',
            hidden: true
         }, {
            datafield: 'vPdfFileName',
            hidden: true
         }, {
            datafield: 'vPdfCreateDate',
            hidden: true
         }]
      });
      $("#toolbar" + "pcf_fileGrid").removeClass("jqx-widget-header");
      $("#toolbar" + "pcf_fileGrid").removeClass("jqx-widget-header-custom");

   };

   var setActionButton = function (stat) {
      if (_mode == 'pce') {
         if (stat == 'new') {
            $("#pcf_BtnNew").jqxButton({ disabled: false });
            $("#pcf_BtnDel").jqxButton({ disabled: false });
            $("#pcf_BtnSave").jqxButton({ disabled: false });

            $("#pcf_BtnNew").css("cursor", "");   // 마우스 오버 시 손모양 유지   2021-05-18
            $("#pcf_BtnDel").css("cursor", "");
            $("#pcf_BtnSave").css("cursor", "");
         }
         else if (stat == 'mod') {
            $("#pcf_BtnNew").jqxButton({ disabled: false });
            $("#pcf_BtnDel").jqxButton({ disabled: false });
            $("#pcf_BtnSave").jqxButton({ disabled: false });

            $("#pcf_BtnNew").css("cursor", "");
            $("#pcf_BtnDel").css("cursor", "");
            $("#pcf_BtnSave").css("cursor", "");
         }
         else {
            $("#pcf_BtnNew").jqxButton({ disabled: false });
            $("#pcf_BtnDel").jqxButton({ disabled: true });
            $("#pcf_BtnSave").jqxButton({ disabled: true });

            $("#pcf_BtnNew").css("cursor", "");
         }
      }
   };

   var setPcfFormDisabled = function (stat) {
      $("#pcf_subject").jqxInput({ disabled: stat });
      $("#pcf_content").jqxTextArea({ disabled: stat });
      $("#pcf_fileGrid").jqxGrid({ disabled: stat });
   };

   return {
      setupBbsGrid: setupBbsGrid,
      setupActionForm: setupActionForm,
      setupBbsField: setupBbsField,
      setupFileGrid: setupFileGrid,
      setActionButton: setActionButton,
      setPcfFormDisabled: setPcfFormDisabled
   }

};
