'use strict';

angular.module('sgisServices')
  .service('sharedTagService', function () {
    var activeTagList = {};
    var filterByList = [];
    var matchAll = true;

    return {
      //active tag stuff
      getTagList:function () {
        return Object.keys(activeTagList);
      },
      getTagListForInput:function(){
        var list = [];
        for (var tag in activeTagList){
          list.push({text:tag});
        }
        return list;
      },
      addTags:function(dataset){
        for (var i = 0; i < dataset.tags.length; i++ ){
          if(activeTagList.hasOwnProperty(dataset.tags[i])){
            activeTagList[dataset.tags[i]][dataset.id] = true;
          }else{
            activeTagList[dataset.tags[i]] = {};
            activeTagList[dataset.tags[i]][dataset.id] = true;
          }
        }
      },
      removeTags:function (dataset) {
        for (var i = 0; i < dataset.tags.length; i++ ){
          if(activeTagList.hasOwnProperty(dataset.tags[i]) && activeTagList[dataset.tags[i]].hasOwnProperty(dataset.id)){
            delete activeTagList[dataset.tags[i]][dataset.id];
          }
        }
      },
      //filter by tag stuff
      getFilterByListForInput: function(){
        var list = [];
        for (var tag in filterByList){
          list.push({text:tag});
        }
        return list;
      },
      getFilterByList: function(){
        return filterByList;
      },
      setFilterByList: function(list){

      },
      matchAll:function(){
        matchAll = true;
      },
      matchAny:function(){
        matchAll = false;
      },
      getMatch:function(){
        return matchAll ? 'all' : 'any';
      },
  };
})