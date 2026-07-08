var PgcTransaction = function() {

   //평가코드
   var getEstiCodeList = function() {
      var source01 = {
         datatype: "json",
         type: "GET",
         datafields: [
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

   //센터명
   var getDeptCodeList = function() {
      var source02 = {
         datatype: "json",
         type: "GET",
         datafields: [
            { name: 'vDeptCode', type: 'string' },
            { name: 'vDeptName', type: 'string' }
         ],
         url: "/com/getHrDept",
         async: false
      };
      var dataAdapter02 = new $.jqx.dataAdapter(source02, {
         autoBind: true
      });

      return dataAdapter02;
   };

   //평가등급
   var getGrade = function() {
      var source = [
         { "vItemCode": "All", "vItemName": "전체"     },
         { "vItemCode": "A"  , "vItemName": "관리자"   },
         { "vItemCode": "B"  , "vItemName": "PM"       },
         { "vItemCode": "C"  , "vItemName": "평가자"   },
         { "vItemCode": "E"  , "vItemName": "피평가자" }
      ]
      var dataAdapter = new $.jqx.dataAdapter(source, {
         autoBind: true
      });

      return dataAdapter;
   };

   var getGradeCode = function() {
      var source = [
         { "vItemCode": "A", "vItemName": "관리자"   },
         { "vItemCode": "B", "vItemName": "PM"       },
         { "vItemCode": "C", "vItemName": "평가자"   },
         { "vItemCode": "E", "vItemName": "피평가자" }
      ]
      var dataAdapter = new $.jqx.dataAdapter(source, {
         autoBind: true
      });

      return dataAdapter;
   };

   //평가 대상여부
   var getEstiYn = function() {
      var source = [
         { "vItemCode": "All", "vItemName": "전체" },
         { "vItemCode": "Y"  , "vItemName": "Y"    },
         { "vItemCode": "N"  , "vItemName": "N"    }
      ]
      var dataAdapter = new $.jqx.dataAdapter(source, {
         autoBind: true
      });

      return dataAdapter;
   };

   //연구원 검색
   var getHrInfo = function(vemplno, vname, vretire) {
      var deferred = $.Deferred();

      try {
         $.ajax({
            type: "GET",
            url: "/com/getHrInfo",
            data: {
               "vEmplNo": vemplno,
               "vName": vname,
               "vRetire": vretire
            },
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

   //그리드 조회
   var getEmplNoList = function() {
      var param = {
         "vEstiCode": $("#pgc_searchCode").jqxComboBox('val'),
         "vDeptName": $("#pgc_searchDept").jqxComboBox('val'),
         "vEstiGrade": $("#pgc_searchGrade").jqxComboBox('val'),
         "vEstiYn": $("#pgc_searchYn").jqxComboBox('val')
      }
      var source01 = {
         datatype: "json",
         type: "GET",
         data: param,
         datafields: [
            { name: 'editFlag'  , type: 'string' },
            { name: 'vEstiCode' , type: 'string' },
            { name: 'vEmplNo'   , type: 'string' },
            { name: 'vName'     , type: 'string' },
            { name: 'vDeptName' , type: 'string' },
            { name: 'vTeamName' , type: 'string' },
            { name: 'vPosName'  , type: 'string' },
            { name: 'vPassword' , type: 'string' },
            { name: 'vGrade'    , type: 'string' },
            { name: 'vGradeName', type: 'string' },
            { name: 'vEstiYn'   , type: 'string' },
            { name: 'vRetireYn' , type: 'string' },
         ],
         url: "/pcg/pgc/getEmplNoList",
         async: false
      };
      var dataAdapter01 = new $.jqx.dataAdapter(source01);

      return dataAdapter01;
   };

   var saveEmplNo = function(pgcvolist) {
      var deferred = $.Deferred();

      try {
         $.ajax({
            url: '/pcg/pgc/saveEmplNo',
            method: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            crossDomain: true,
            data: JSON.stringify(pgcvolist),
            success: function(data) {
               deferred.resolve(data);
            }
         });
      } catch (err) {
         deferred.reject(err);
      }

      return deferred.promise();
   };

   var copyPgc = function(param) {
      var deferred = $.Deferred();

      try {
         $.ajax({
            url: '/pcg/pgc/copyPgc',
            method: 'GET',
            dataType: 'text',
            crossDomain: true,
            data: param,
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

   return {
      getEstiCodeList: getEstiCodeList,
      getDeptCodeList: getDeptCodeList,
      getGrade: getGrade,
      getGradeCode: getGradeCode,
      getEstiYn: getEstiYn,
      getHrInfo: getHrInfo,
      getEmplNoList: getEmplNoList,
      saveEmplNo: saveEmplNo,
      copyPgc: copyPgc
   }

}
