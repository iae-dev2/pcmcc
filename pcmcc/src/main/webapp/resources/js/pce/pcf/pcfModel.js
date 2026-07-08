var PcfModel = function() {

   var initPcfForm = function() {
      $("#pcf_nSeqNo").val("");
      $("#pcf_emplno").val(_loginUser);
      $("#pcf_name").val(_loginName);
      $("#pcf_subject").val("");
      $("#pcf_content").val("");
   };

   var setPcfForm = function(vo) {
      $("#pcf_nSeqNo").val(vo.nSeqNo);
      $("#pcf_emplno").val(vo.vEmplNo);
      $("#pcf_name").val(vo.vName);
      $("#pcf_subject").val(vo.vSubject);
      $("#pcf_content").val(vo.vContent);
   };

   var getPcfForm = function() {
      var _formdata = {
         "editFlag": $("#pcf_editFlag").val(),
         "nSeqNo": $("#pcf_nSeqNo").val(),
         "vEmplNo": $("#pcf_emplno").val(),
         "vName": $("#pcf_name").val(),
         "vSubject": $("#pcf_subject").val(),
         "vContent": $("#pcf_content").val(),
         "fileList": $("#pcf_fileGrid").jqxGrid("getrows")
      }
      return _formdata;
   };

   var getPcfVali = function() {
      var bPcfValiResult = true;

      if ($("#pcf_subject").val() == "") {
         alert("제목을 입력해주세요");
         $("#pcf_subject").jqxInput("focus");
         bPcfValiResult = false;
      }
      else if ($("#pcf_subject").val().length > 50) {
         alert("제목은 50글자까지 입력이 가능합니다. \n현재 : " + $("#pcf_subject").val().length + " 글자");
         $("#pcf_subject").jqxInput('focus');
         bPcfValiResult = false;
      }
      else if ($("#pcf_content").val() == "") {
         alert("내용을 입력해주세요");
         $("#pcf_content").jqxTextArea("focus");
         bPcfValiResult = false;
      }
      else if ($("#pcf_content").val().length > 1000) {
         alert("내용은 1000글자까지 입력이 가능합니다. \n현재 : " + $("#pcf_content").val().length + " 글자");
         $("#pcf_content").jqxTextArea('focus');
         bPcfValiResult = false;
      }

      return bPcfValiResult;
   };

   return {
      initPcfForm: initPcfForm,
      setPcfForm: setPcfForm,
      getPcfForm: getPcfForm,
      getPcfVali: getPcfVali
   };

};