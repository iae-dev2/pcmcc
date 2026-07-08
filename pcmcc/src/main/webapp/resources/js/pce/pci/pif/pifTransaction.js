var PifTransaction = function() {

   //평가코드 조회
   var getEstiCodeList = function() {
      var source = {
         datatype: "json",
         method: "GET",
         datafields: [
            { name: 'vEstiCode'    , type: 'string' },
            { name: 'vEstiCodeName', type: 'string' }
         ],
         url: "/pcg/pga/getEstiCodeList",
         async: false
      };
      var dataAdapter01 = new $.jqx.dataAdapter(source, {
         autoBind: true
      });

      return dataAdapter01;
   };

   // 내부위탁과제 목록 그리드 조회
   var getPifList = function() {
      var param = {
         "vYear": $("#pif_code").jqxComboBox('val').substring(0, 4)
      }
      var source02 = {
         datatype: "json",
         method: "GET",
         data: param,
         datafields: [
            { name: 'vProjectCode' , type: 'string' },
            { name: 'vProjectName' , type: 'string' },
            { name: 'vEmplNo'      , type: 'string' },
            { name: 'vName'        , type: 'string' },
         ],
         url: "/pci/pif/getPifEntrustList",
         async: false
      };
      var dataAdapter02 = new $.jqx.dataAdapter(source02);

      return dataAdapter02;
   };

   // 내부위탁과제 인건비 업데이트
   var updateEntrust = function(param) {
      var deferred = $.Deferred();

      try {
         $.ajax({
            url: '/pci/pif/updateEntrust',
            method: 'POST',
            contentType: 'application/json',
            dataType: 'text',
            crossDomain: true,
            data: JSON.stringify(param) ,
            success: function(message) {
               deferred.resolve(message);
            }
         });
      }
      catch (err) {
         console.error(err);
         deferred.reject(err);
      }

      return deferred.promise();
   };

   return {
      getEstiCodeList: getEstiCodeList,
      getPifList: getPifList,
      updateEntrust: updateEntrust,
   }

}
