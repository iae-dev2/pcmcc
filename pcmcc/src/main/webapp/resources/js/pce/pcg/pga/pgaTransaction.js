var PgaTransaction = function() {

   //검색 필드 조회
   var getCommonCodeList = function() {
      var source01 = {
         datatype: "json",
         type: "GET",
         datafields: [
            { name: 'vEstiCode'      , type: 'string' },
            { name: 'vEstiCodeName'  , type: 'string' },
            { name: 'vEstiCodeView'  , type: 'string' },
            { name: 'vEstiCodeUpdate', type: 'string' }
         ],
         url: "/com/getEstiCodeList",
         async: false
      };
      var dataAdapter01 = new $.jqx.dataAdapter(source01, {
         autoBind: true
      });

      return dataAdapter01;
   };

   //그리드 조회
   var getEstiCodeList = function() {
      var param = {
         "vYear": $("#pga_year").val()
      }
      var source01 = {
         datatype: "json",
         type: "GET",
         data: param,
         datafields: [
            { name: 'editFlag'       , type: 'string' },
            { name: 'vEstiCode'      , type: 'string' },
            { name: 'vEstiCodeName'  , type: 'string' },
            { name: 'vEstiCodeView'  , type: 'string' },
            { name: 'vEstiCodeUpdate', type: 'string' }
         ],
         url: "/pcg/pga/getEstiCodeList",
         async: false
      };
      var dataAdapter01 = new $.jqx.dataAdapter(source01, {
         autoBind: true
      });

      return dataAdapter01;
   };

   var saveEstiCode = function(pgavolist) {
      var deferred = $.Deferred();
      try {
         $.ajax({
            url: '/pcg/pga/saveEstiCode',
            method: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            crossDomain: true,
            data: JSON.stringify(pgavolist),
            success: function(data) {
               deferred.resolve(data);
            }
         });
      } catch (err) {
         deferred.reject(err);
      }

      return deferred.promise();
   };

   return {
      getCommonCodeList: getCommonCodeList,
      getEstiCodeList: getEstiCodeList,
      saveEstiCode: saveEstiCode
   }

}
