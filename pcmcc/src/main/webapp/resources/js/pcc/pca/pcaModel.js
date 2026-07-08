var PcaModel = function() {

   var setPrjInfo = function(row) {
      if (row != "" && row != undefined) {

         if (row.vDeptName) {   /* 센터명 */
            $("#pca_vDeptName").jqxInput("val", row.vDeptName);
         }
         else {
            $("#pca_vDeptName").jqxInput("val", "");
         }

         if (row.vProjectPmName) {   /* PM명 */
            $("#pca_vProjectPm").jqxInput("val", row.vProjectPmName);
         }
         else {
            $("#pca_vProjectPm").jqxInput("val", "");
         }

         if (row.vProjectCode) {   /* 과제코드 */
            $("#pca_vProjectCode").jqxInput("val", row.vProjectCode);
         }
         else {
            $("#pca_vProjectCode").jqxInput("val", "");
         }

         if (row.vGovName) {   /* 부처명 */
            $("#pca_vGovName").jqxInput("val", row.vGovName);
         }
         else {
            $("#pca_vGovName").jqxInput("val", "");
         }

         if (row.vProjectName) {   /* 과제명 */
            $("#pca_vProjectName").jqxInput("val", row.vProjectName);
         }
         else {
            $("#pca_vProjectName").jqxInput("val", "");
         }

         if (row.vProjectDivision) {   /* 사업명 */
            $("#pca_vProjectDivision").jqxInput("val", row.vProjectDivision);
         }
         else {
            $("#pca_vProjectDivision").jqxInput("val", "");
         }

         if (row.vEstiCode) {   /* 평가의견 저장을 위한 hidden ESTICODE */
            $("#pca_StoredEstiCode").val(row.vEstiCode);
         }
         else {
            $("#pca_StoredEstiCode").val("");
         }

         if (row.vProjectCode) {   /* 평가의견 저장을 위한 hidden PROJECTCODE */
            $("#pca_StoredProjectCode").val(row.vProjectCode);
         }
         else {
            $("#pca_StoredProjectCode").val("");
         }

      }
      else {
         $("#pca_vDeptName").jqxInput("val", "");
         $("#pca_vProjectPm").jqxInput("val", "");
         $("#pca_vProjectCode").jqxInput("val", "");
         $("#pca_vGovName").jqxInput("val", "");
         $("#pca_vProjectName").jqxInput("val", "");
         $("#pca_vProjectDivision").jqxInput("val", "");
         $("#pca_vProjectGoal").jqxTextArea("val", "");
         $("#pca_vProjectMilestone").jqxTextArea("val", "");

         $("#pca_StoredEstiCode").val("");
         $("#pca_StoredProjectCode").val("");
      }
   };

   var chkGoalVali = function() {
      var result = true;
      if ($("#pca_vProjectGoal").val().length > 1000) {
         alert("과제목표는 1000글자를 넘을 수 없습니다\n입력 글자수 : "+ $("#pca_vProjectGoal").val().length);
         result = false;
      }
      if (result) {
         if ($("#pca_vProjectMilestone").val().length > 1000) {
            alert("평가 기간내 Milestone은 1000글자를 넘을 수 없습니다\n입력 글자수 : "+ $("#pca_vProjectMilestone").val().length);
            result = false;
         }
      }
      return result;
   };

   var getPrjInfo = function() {
      var _formdata = {
         "vEstiCode": $("#pca_StoredEstiCode").val(),
         "vProejctCode": $("#pca_StoredProjectCode").val(),
         "vProjectGoal": $("#pca_vProjectGoal").val(),
         "vProjectMilestone": $("#pca_vProjectMilestone").val()
      }
      return _formdata;
   };

   var chkContentVali = function() {
      var content_result = true;
      var emp_rows = $("#pca_empGrid").jqxGrid('getrows');
      for (var i=0; i<emp_rows.length; i++) {
         if (emp_rows[i].vContent != null && emp_rows[i].vContent != '') {
            if (emp_rows[i].vContent.length > 1000) {
               alert("참여연구원 기여율의 의견 항목은 1000글자를 넘을 수 없습니다\n입력 글자수 : "+ emp_rows[i].vContent.length);
               content_result = false;
               break;
            }
            if (emp_rows[i].vContent.length < 10) {
               alert("참여연구원 기여율의 의견 항목은 10글자이상 입력해 주세요.");
               content_result = false;
               break;
            }
         }
         else {
            alert("참여연구원 기여율의 의견 항목을 입력해 주세요.");
            content_result = false;
            break;
         }
      }
      return content_result;
   }

   var getPcaAllValues = function() {
      var pcavo = {
         "vEstiCode": $("#pca_StoredEstiCode").val(),
         "vProjectCode": $("#pca_StoredProjectCode").val(),
         "vProjectPm": _loginUser,

         "empInfo": $("#pca_empGrid").jqxGrid('getrows')
      };
      return pcavo;
   };

   var cutStr = function(full_str) {
      var cut_result = "";
      if (full_str.length > 5) {
         cut_result = full_str.substr(0, 5);
         cut_result += "...";
      }
      else {
         cut_result = full_str;
      }
      return cut_result;
   }

   //확장자 추출
   var getFileExtension = function(filename) {
      var extension_result = "";
      var ext_arr = new Array();
      if (filename.length > 4) {
         extension_result = filename.slice(-5);
         ext_arr = extension_result.split(".");
         extension_result = ("." + ext_arr[1]);
      }
      return extension_result;
   }

   //산출물
   var setFiles = function(week, emplno, seqno, file_str) {

      var html = "";
      var file_arr = new Array();
      var file_down_url = "/fileDownload?vFileType=pca";
      var file_url_final = "";
      var file_seq_arr;
      var file_seq_no = 0;
      file_down_url += "&param1=" + week;
      file_down_url += "&param2=" + emplno;
      file_down_url += "&param3=" + seqno;
      file_down_url += "&param4=";

      if (file_str != null && file_str != '' && file_str != '->') {
         file_arr = file_str.split('|');

         file_arr.forEach((el, idx, arr) => {

            file_url_final = file_down_url;   //NFILESEQNO 초기화

            file_seq_arr = new Array();
            file_seq_arr = el.split('->');   //파일명 + NFILESEQNO
            file_url_final += file_seq_arr[1];

            html += "<div style='width: 100%; height: 25px; text-align: center;'>";

            html +=    "<div style='display: inline-block' title='" + file_seq_arr[0] + "'>" + cutStr(el) + "</div>";

            html +=    "<div style='width: 27px; display: inline-block; margin-left: 6px;'>";
            html +=       "<a href='javascript:void(0);' title='바로보기' class='pcaPreview'>";
            html +=          "<img style='width: 17px; height: 10px;' src='/resources/images/btn_preview.png'/>";
            html +=          "<input type='hidden' value='" + week + "'>";
            html +=          "<input type='hidden' value='" + emplno + "'>";
            html +=          "<input type='hidden' value='" + seqno + "'>";
            html +=          "<input type='hidden' value='" + file_seq_arr[1] + "'>";
            html +=          "<input type='hidden' value='" + getFileExtension(file_seq_arr[0]) + "'>";
            html +=       "</a>";
            html +=    "</div>";

            html +=    "<div style='width: 27px; display: inline-block; margin-left: 2px;'>";
            html +=       "<a href='javascript:void(0);' onclick='location.href=\"" + file_url_final + "\"' title='다운로드'>";
            html +=          "<img style='width: 17px; height: 10px;' src='/resources/images/btn_down.png'/>";
            html +=       "</a>";
            html +=    "</div>";

            html += "</div>";
         });
      }
      else {
         html = "<div></div>";
      }

      return html;
   };

   return {
      setPrjInfo: setPrjInfo,
      chkGoalVali: chkGoalVali,
      getPrjInfo: getPrjInfo,
      chkContentVali: chkContentVali,
      getPcaAllValues: getPcaAllValues,
      setFiles: setFiles
   }

}
