var PdaModel = function() {

   var setPdaInfo = function(row) {
      if (row != "" && row != undefined) {

         if (row.vDeptName) { $("#pda_vDeptName").jqxInput("val", row.vDeptName); }   //센터명
         else { $("#pda_vDeptName").jqxInput("val", ""); }

         if (row.vProjectPmName) { $("#pda_vProjectPm").jqxInput("val", row.vProjectPmName); }   //PM명
         else { $("#pda_vProjectPm").jqxInput("val", ""); }

         if (row.vProjectCode) { $("#pda_vProjectCode").jqxInput("val", row.vProjectCode); }   //과제코드
         else { $("#pda_vProjectCode").jqxInput("val", ""); }

         if (row.vGovName) { $("#pda_vGovName").jqxInput("val", row.vGovName); }   //부처명
         else { $("#pda_vGovName").jqxInput("val", ""); }

         if (row.vProjectName) { $("#pda_vProjectName").jqxInput("val", row.vProjectName); }   //과제명
         else { $("#pda_vProjectName").jqxInput("val", ""); }

         if (row.vProjectDivision) { $("#pda_vProjectDivision").jqxInput("val", row.vProjectDivision); }   //사업명
         else { $("#pda_vProjectDivision").jqxInput("val", ""); }

         if (row.vProjectGoal) { $("#pda_vProjectGoal").jqxTextArea("val", row.vProjectGoal); }   //과제목표
         else { $("#pda_vProjectGoal").jqxTextArea("val", ""); }

         if (row.vProjectMilestone) { $("#pda_vProjectMilestone").jqxTextArea("val", row.vProjectMilestone); }   //평가 기간내 Milestone
         else { $("#pda_vProjectMilestone").jqxTextArea("val", ""); }

         if (row.vEstiCode) { $("#pda_StoredEstiCode").val(row.vEstiCode); }   //평가의견 저장을 위한 hidden ESTICODE
         else { $("#pda_StoredEstiCode").val(""); }

         if (row.vProjectCode) { $("#pda_StoredProjectCode").val(row.vProjectCode); }   //평가의견 저장을 위한 hidden PROJECTCODE
         else { $("#pda_StoredProjectCode").val(""); }

      }
      else {
         $("#pda_vDeptName").jqxInput("val", "");              //센터명
         $("#pda_vProjectPm").jqxInput("val", "");             //PM명
         $("#pda_vProjectCode").jqxInput("val", "");           //과제코드
         $("#pda_vGovName").jqxInput("val", "");               //부처명
         $("#pda_vProjectName").jqxInput("val", "");           //과제명
         $("#pda_vProjectDivision").jqxInput("val", "");       //사업명
         $("#pda_vProjectGoal").jqxTextArea("val", "");        //과제목표
         $("#pda_vProjectMilestone").jqxTextArea("val", "");   //평가 기간내 Milestone

         $("#pda_StoredEstiCode").val("");                     //평가의견 저장을 위한 hidden ESTICODE
         $("#pda_StoredProjectCode").val("");                  //평가의견 저장을 위한 hidden PROJECTCODE

         $("#pda_vReviewContent").jqxTextArea("val", "");      //평가의견 초기화   2021-05-18
      }
   }

   var chkVali = function() {
      var result = true;
      const len = $("#pda_vReviewContent").jqxTextArea("val").length;
      if (len > 1000) {
         alert(`평가의견은 1000글자를 넘을 수 없습니다\n입력 글자수 : ${len}`);
         result = false;
      }
      if (len < 10) {
         alert("평가의견을 10자이상 입력해 주세요.");
         result = false;
      }
      return result;
   }

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
            html +=       "<a href='javascript:void(0);' title='바로보기' class='pdaPreview'>";
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
      setPdaInfo: setPdaInfo,
      chkVali: chkVali,
      setFiles: setFiles
   }

}
