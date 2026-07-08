var PgbModel = function() {

   var getVali = function() {
      var result = true;

      var pgb_rows = $("#pgb_grid").jqxGrid('getrows');

      for (var i=0; i<pgb_rows.length; i++) {
         if (pgb_rows[i].editFlag == "new") {
            if (pgb_rows[i].vProjectCode == "") {
               alert("과제코드를 입력해주세요 !");
               result = false;
               break;
            }
            else if (pgb_rows[i].vProjectName == "") {
               alert("과제명을 입력해주세요 !");
               result = false;
               break;
            }
            else if (pgb_rows[i].vDeptName == "") {
               alert("센터명을 입력해주세요 !");
               result = false;
               break;
            }
            else if (pgb_rows[i].vGovName == undefined || pgb_rows[i].vGovName == "") {
               alert("부처명을 입력해주세요 !");
               result = false;
               break;
            }
            else if (pgb_rows[i].vProjectDivision == undefined || pgb_rows[i].vProjectDivision == "") {
               alert("사업명을 입력해주세요 !");
               result = false;
               break;
            }
            else if (pgb_rows[i].vStartDate == "") {
               alert("과제 시작일을 입력해주세요 !");
               result = false;
               break;
            }
            else if (pgb_rows[i].vEndDate == "") {
               alert("과제 종료일을 입력해주세요 !");
               result = false;
               break;
            }
            else if (pgb_rows[i].vProjectPm == "") {
               alert("과제 PM을 입력해주세요 !");
               result = false;
               break;
            }
            else if (pgb_rows[i].vProjectEva == "") {
               alert("과제 평가자를 입력해주세요 !");
               result = false;
               break;
            }
         }
         if (pgb_rows[i].editFlag == "new" || pgb_rows[i].editFlag == "mod") {
            if (pgb_rows[i].vProjectName != undefined && pgb_rows[i].vProjectName.length > 250) {
               alert("과제명은 250글자까지 입력이 가능합니다. \n현재 : "+pgb_rows[i].vProjectName.length);
               result = false;
               break;
            }
            else if (pgb_rows[i].vDeptName != undefined && pgb_rows[i].vDeptName.length > 50) {
               alert("센터명은 50글자까지 입력이 가능합니다. \n현재 : "+pgb_rows[i].vDeptName.length);
               result = false;
               break;
            }
            else if (pgb_rows[i].vGovName != undefined && pgb_rows[i].vGovName.length > 25) {
               alert("부처명은 25글자까지 입력이 가능합니다. \n현재 : "+pgb_rows[i].vGovName.length);
               result = false;
               break;
            }
            else if (pgb_rows[i].vProjectDivision != undefined && pgb_rows[i].vProjectDivision.length > 50) {
               alert("사업명은 50글자까지 입력이 가능합니다. \n현재 : "+pgb_rows[i].vProjectDivision.length);
               result = false;
               break;
            }
            else if (pgb_rows[i].vProjectGoal != undefined && pgb_rows[i].vProjectGoal.length > 1000) {
               alert("과제 목표는 1000글자까지 입력이 가능합니다. \n현재 : "+pgb_rows[i].vProjectGoal.length);
               result = false;
               break;
            }
            else if (pgb_rows[i].vProjectMilestone != undefined && pgb_rows[i].vProjectMilestone.length > 1000) {
               alert("Milestone은 1000글자까지 입력이 가능합니다. \n현재 : "+pgb_rows[i].vProjectMilestone.length);
               result = false;
               break;
            }
         }
      }

      return result;
   }

   return {
      getVali: getVali
   }

}
