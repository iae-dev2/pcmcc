var PcfTransaction = function() {

   var getPcfList = function() {
      var datasource = {
         datatype: "json",
         datafields: [
            { name: 'editFlag'  , type: 'string' },
            { name: 'nSeqNo'    , type: 'number' },
            { name: 'vEmplNo'   , type: 'string' },
            { name: 'vName'     , type: 'string' },
            { name: 'vSubject'  , type: 'string' },
            { name: 'vContent'  , type: 'string' },
            { name: 'nHit'      , type: 'number' },
            { name: 'vYyyymmdd' , type: 'string' },
            { name: 'nFileSeqNo', type: 'number' }
         ],
         url: "/pce/pcf/getPcfList"
      };
      var dataAdapter = new $.jqx.dataAdapter(datasource);

      return dataAdapter;
   };

   var deletePcf = function(param) {
      var deferred = $.Deferred();

      try {
         $.ajax({
            type: "GET",
            url: "/pce/pcf/deletePcf",
            data: param,
            dataType: "json",
            success: function(data) {
               deferred.resolve(data);
            }
         });
      }
      catch (err) {
         deferred.reject(err);
      }
      return deferred.promise();
   };

   var savePcf = function(volist) {
      var deferred = $.Deferred();
      try {
         $.ajax({
            url: '/pce/pcf/savePcf',
            method: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            crossDomain: true,
            data: JSON.stringify(volist),
            success: function(data) {
               deferred.resolve(data);
            }
         });
      }
      catch (err) {
         deferred.reject(err);
      }

      return deferred.promise();
   };

   var getPcfFileList = function(param) {
      var sourceTeam = {
         datatype: "json",
         type: "GET",
         data: param,
         datafields: [
            { name: 'editFlag'      , type: 'string' },
            { name: 'nSeqNo'        , type: 'int'    },
            { name: 'nFileSeqNo'    , type: 'int'    },
            { name: 'vFileName'     , type: 'string' },
            { name: 'vTempFileName' , type: 'string' },
            { name: 'vFilePath'     , type: 'string' },
            { name: 'vFileExtension', type: 'string' },
            { name: 'vPdfFileName'  , type: 'string' },
            { name: 'vPdfCreateDate', type: 'string' }
         ],
         url: "/pce/pcf/getPcfFileList",
         async: false
      }
      var dataAdapter = new $.jqx.dataAdapter(sourceTeam, {
      });

      return dataAdapter;
   };

   var addHit = function(param) {
      var deferred = $.Deferred();

      try {
         $.ajax({
            type: "GET",
            url: "/pce/pcf/addHit",
            data: param,
            dataType: "json",
            success: function(data) {
               deferred.resolve(data);
            }
         });
      }
      catch (err) {
         deferred.reject(err);
      }

      return deferred.promise();
   };

   var registerWithDap = function(param) {
      var deferred = $.Deferred();

      try {
         $.ajax({
            url: '/pef/peg/registerWithDap',
            method: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            crossDomain: true,
            data: JSON.stringify(param),
            success: function(message) {
               deferred.resolve(message);
            }
         });
      }
      catch (err) {
         deferred.reject(err);
      }

      return deferred.promise();
   };

   return {
      getPcfList: getPcfList,
      deletePcf: deletePcf,
      savePcf: savePcf,
      getPcfFileList: getPcfFileList,
      registerWithDap: registerWithDap,
      addHit: addHit
   };

};
