var PiaTransaction = function() {

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

   //그리드 - 구분
   var getClass = function() {
      var source = [
         { "vItemCode": "01", "vItemName": "인건비" },
         { "vItemCode": "02", "vItemName": "간접비" }
      ]
      var dataAdapter = new $.jqx.dataAdapter(source, {
         autoBind: true
      });

      return dataAdapter;
   };
   //위 autoBind는 local 사용용으로 삭제하지 마십시오. 2020-06-04

   //월별 내부인건비/간접비 그리드 조회
   var getPiaList = function() {
      var param = {
         "vYear": $("#pia_code").jqxComboBox('val').substring(0, 4)
      }
      var source02 = {
         datatype: "json",
         method: "GET",
         data: param,
         datafields: [
            { name: 'vProjectCode', type: 'string' },
            { name: 'vYear'       , type: 'string' },
            { name: 'vClass'      , type: 'string' },
            { name: 'dsp_vClass', value: 'vClass', values: {
               source: getClass().records, value: 'vItemCode', name: 'vItemName'
            }},
            { name: 'n1MonAmount' , type: 'number' },
            { name: 'n2MonAmount' , type: 'number' },
            { name: 'n3MonAmount' , type: 'number' },
            { name: 'n4MonAmount' , type: 'number' },
            { name: 'n5MonAmount' , type: 'number' },
            { name: 'n6MonAmount' , type: 'number' },
            { name: 'n7MonAmount' , type: 'number' },
            { name: 'n8MonAmount' , type: 'number' },
            { name: 'n9MonAmount' , type: 'number' },
            { name: 'n10MonAmount', type: 'number' },
            { name: 'n11MonAmount', type: 'number' },
            { name: 'n12MonAmount', type: 'number' },
         ],
         url: "/pci/pia/getPiaList",
         async: false
      };
      var dataAdapter02 = new $.jqx.dataAdapter(source02);

      return dataAdapter02;
   };

   //반기별 내부인건비/간접비 그리드 조회
   var getPiaHalfYearList = function() {
      var param = {
         "vEstiCode": $("#pia_code").jqxComboBox('val')
      }
      var source02 = {
         datatype: "json",
         method: "GET",
         data: param,
         datafields: [
            { name: 'vEstiCode'      , type: 'string' },
            { name: 'vProjectCode'   , type: 'string' },
            { name: 'nDirectAmount'  , type: 'number' },
            { name: 'nIndirectAmount', type: 'number' },
            { name: 'nAmount'        , type: 'number' },
         ],
         url: "/pci/pia/getPiaHalfYearList",
         async: false
      };
      var dataAdapter02 = new $.jqx.dataAdapter(source02);

      return dataAdapter02;
   };

   //과제 체크
   var checkPiaProject = function(searchProjectCode) {
      var deferred = $.Deferred();

      try {
         $.ajax({
            type: "GET",
            url: "/pci/pia/checkPiaProject",
            data: {
               "vProjectCode": searchProjectCode
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

   //월별 내부인건비/간접비 계산
   var calculateMonthly = function(param) {
      var deferred = $.Deferred();

      try {
         $.ajax({
            url: '/pci/pia/calculateMonthly',
            method: 'GET',
            contentType: 'application/json',
            dataType: 'text',
            crossDomain: true,
            data: param,
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

   //월별 내부인건비/간접비 목록 저장
   var savePiaGrid = function(piavolist) {
      var deferred = $.Deferred();

      try {
         $.ajax({
            url: '/pci/pia/savePiaList',
            method: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            crossDomain: true,
            data: JSON.stringify(piavolist),
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

   //반기별 내부인건비/간접비 계산
   var calculateHalfYear = function(param) {
      var deferred = $.Deferred();

      try {
         $.ajax({
            url: '/pci/pia/calculateHalfYear',
            method: 'GET',
            contentType: 'application/json',
            dataType: 'text',
            crossDomain: true,
            data: param,
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

   //반기별 내부인건비/간접비 목록 저장
   var savePiaHalfYearGrid = function(piavolist) {
      var deferred = $.Deferred();

      try {
         $.ajax({
            url: '/pci/pia/savePiaHalfYearList',
            method: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            crossDomain: true,
            data: JSON.stringify(piavolist),
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
      getClass: getClass,
      getPiaList: getPiaList,
      getPiaHalfYearList: getPiaHalfYearList,
      checkPiaProject: checkPiaProject,
      savePiaGrid: savePiaGrid,
      savePiaHalfYearGrid: savePiaHalfYearGrid,
      calculateMonthly: calculateMonthly,
      calculateHalfYear: calculateHalfYear
   }

}
