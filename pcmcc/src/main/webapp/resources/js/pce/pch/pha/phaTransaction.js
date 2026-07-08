var PhaTransaction = function() {

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

   //그리드 - 진행 단계
   var getEstiStep = function() {
      var source = [
         { "vItemCode": "A", "vItemName": "전체"                        },
         { "vItemCode": "1", "vItemName": "연구원 입력중/PM 평가중"     },
         { "vItemCode": "2", "vItemName": "연구원 확인중/센터장 확인중" },
         { "vItemCode": "3", "vItemName": "평가자 반려"                 },
         { "vItemCode": "4", "vItemName": "PM 최종 확인 중"             },
         { "vItemCode": "5", "vItemName": "최종 평가완료"               }
      ]
      var dataAdapter = new $.jqx.dataAdapter(source, {
         autoBind: true
      });

      return dataAdapter;
   };
   //위 autoBind는 local 사용용으로 삭제하지 마십시오.   2020-06-05

   //과제코드 목록 그리드 조회
   var getProjectCodeList = function() {
      var param = {
         "vEstiCode": $("#pha_searchCode").jqxComboBox('val'),
         "vEstiStep": $("#pha_searchStep").jqxComboBox('val')
      }
      var source01 = {
         datatype: "json",
         method: "GET",
         data: param,
         datafields: [
            { name: 'vEstiCode'     , type: 'string' },
            { name: 'vProjectCode'  , type: 'string' },
            { name: 'vProjectName'  , type: 'string' },
            { name: 'vProjectPm'    , type: 'string' },
            { name: 'vProjectPmName', type: 'string' },
            { name: 'vProjectSum'   , type: 'string' },
            { name: 'vEstiStep'     , type: 'string' },
            { name: 'vConfirm'      , type: 'string' },
            { name: 'vFinish'       , type: 'string' }
         ],
         url: "/pch/pha/getPrjCodeList",
         async: false
      };
      var dataAdapter02 = new $.jqx.dataAdapter(source01, {
         autoBind: true
      });

      return dataAdapter02;
   };

   //과제별 기여율 그리드 조회
   var getProjectContributeList = function(esticode, prjcode) {
      var param = {
         "vEstiCode": esticode,
         "vProjectCode": prjcode
      }
      var source01 = {
         datatype: "json",
         method: "GET",
         data: param,
         datafields: [
            { name: 'vEstiCode'    , type: 'string' },
            { name: 'vProjectCode' , type: 'string' },
            { name: 'vEmplNo'      , type: 'string' },
            { name: 'vName'        , type: 'string' },
            { name: 'vPosName'     , type: 'string' },
            { name: 'vWork'        , type: 'string' },
            { name: 'nContribution', type: 'number' },
            { name: 'vContent'     , type: 'string' },
            { name: 'vConfirm'     , type: 'string' },
            { name: 'vFinish'      , type: 'string' }
         ],
         url: "/pch/pha/getPrjContList",
         async: false
      };
      var dataAdapter03 = new $.jqx.dataAdapter(source01, {
         autoBind: true
      });

      return dataAdapter03;
   };

   //과제별 기여율 그리드 저장
   var saveContGrid = function(Phavolist) {
      var deferred = $.Deferred();

      try {
         $.ajax({
            url: '/pch/pha/savePrjContList',
            method: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            crossDomain: true,
            data: JSON.stringify(Phavolist),
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
      getEstiStep: getEstiStep,
      getProjectCodeList: getProjectCodeList,
      getProjectContributeList: getProjectContributeList,
      saveContGrid: saveContGrid
   }

}
