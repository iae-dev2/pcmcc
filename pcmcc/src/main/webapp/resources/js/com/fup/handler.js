/**
 * ui handling
 */
$(document).ready(function() {

   var data = [];
   var filecnt = 0;
   //UI초기화 모드
   formInit();

   //event handler 등록
   $('#jqxFileUpload').on('uploadEnd', function(event) {
      var args = event.args;
      var fileName = args.file;
      var serverResponse = args.response;
      //Your code here.

      var parsedObject = JSON.parse($(serverResponse).text());

      if (parsedObject.length > 0) {
         data.push(parsedObject[0]);
         console.log(parsedObject);
      }
        
      //2018-08-02
      if (filecnt == 1) {
         commonDialog.returnData = JSON.stringify(data);
         commonDialog.callback();
         commonDialog.close();
      }
   });

   $('#jqxFileUpload').on('remove', function(event) {
      filecnt --;
      var newHeight = $('#jqxFileUpload').outerHeight();

      if (filecnt == 0) {
         setTimeout(function() {
            commonDialog.resize(179+"px");
         }, 250);
      }
      else if (filecnt == 1) {
         setTimeout(function() {
            commonDialog.resize(258+"px");
         }, 250);
      } 
      else {
         newHeight = newHeight + 143;
         setTimeout(function() {
            commonDialog.resize(newHeight+"px");
         }, 250);
      }
   });
   $('#jqxFileUpload').on('select', function(event) {
      filecnt ++;
      var newHeight = $('#jqxFileUpload').outerHeight();
      if (filecnt == 0) {
         commonDialog.resize(179+"px");
      }
      else if (filecnt == 1) {
         commonDialog.resize(258+"px");
      } 
      else {
         newHeight = newHeight + 143;
         commonDialog.resize(newHeight+"px");
      }
   });

   $('#ok').on('click', function() {
      if (filecnt < 1) {
         alert("첨부된 파일이 없습니다!");
         return;
      }
      $("#jqxFileUpload").jqxFileUpload('uploadAll');
   });

   $('#cancel').on('click', function() {
      commonDialog.close();
   });

   $('#jqxFileUploadCancelButton').on('click', function() {
      commonDialog.close();
   });
});

var formInit = function() {

   $('#jqxFileUpload').jqxFileUpload({
      width: "440px",
      height: "auto",
      uploadUrl: uploadUrl,
      fileInputName: 'fileToUpload',
      multipleFilesUpload: multipleFiles,
      localization: {
         browseButton: '파일추가',
         uploadFileTooltip: '업로드',
         cancelFileTooltip: '취소'
      }
   });

   $("#ok").jqxButton({ width: '65px',template: "success" });
   $("#cancel").jqxButton({ width: '65px', template: "warning" });

   $(".jqx-file-upload-buttons-container").css("display", "none");

//    console.log("init length",$(".jqx-widget-content .jqx-rc-all .jqx-file-upload-file-row:visible").length);
//    console.log("init outerHeight",$('#jqxFileUpload').outerHeight());
}
