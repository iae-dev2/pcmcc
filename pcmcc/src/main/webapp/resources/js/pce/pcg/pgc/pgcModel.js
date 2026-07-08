var PgcModel = function() {

   var getVali = function() {

      var result = true;
      var pgc_rows = $("#pgc_grid").jqxGrid('getrows');

      for (var i=0; i<pgc_rows.length; i++) {
         if (pgc_rows[i].editFlag == "new") {
            if (pgc_rows[i].vEmplNo == "") {
               alert("사번을 입력해주세요 !");
               result = false;
               break;
            }
            if (pgc_rows[i].vPassword == "") {
               alert("비밀번호를 입력해주세요 !");
               result = false;
               break;
            }
            if (pgc_rows[i].vGrade == "") {
               alert("평가등급을 입력해주세요 !");
               result = false;
               break;
            }
         }

         if (pgc_rows[i].editFlag == "new" || pgc_rows[i].editFlag == "mod") {
            if (pgc_rows[i].vEmplNo.length != 7) {
               alert("사번을 정확히 입력해주세요 !");
               result = false;
               break;
            }
            else if (pgc_rows[i].vPassword.length > 20) {
               alert("비밀번호는 20글자까지 입력이 가능합니다. \n현재 : " + pgc_rows[i].vPassword.length);
               result = false;
               break;
            }
         }

         return result;
      }

   };

   var getCopyVali = function() {
      var copyResult = true;
      var regExp = /^\d{4}-\d{2}$/;
      if (!regExp.test($("#pgc_copy").val())) {
         alert("데이터 복사 형식은 YYYY-MM 입니다");
         copyResult = false;
         $("#pgc_copy").jqxInput("focus");
      }
      else if ($("#pgc_searchCode").val() == $("#pgc_copy").val()) {
         alert("평가코드 날짜와 데이터 복사 날짜가 동일합니다 !");
         copyResult = false;
         $("#pgc_copy").jqxInput("focus");
      }
      return copyResult;
   }

   return {
      getVali: getVali,
      getCopyVali: getCopyVali
   }

}
