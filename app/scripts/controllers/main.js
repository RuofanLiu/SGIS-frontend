'use strict';

/**
 * @ngdoc function
 * @name socialjusticeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the socialjusticeApp
 */
angular.module('socialjusticeApp')
  .controller('MainCtrl',function ($scope,$http, $modal, dataSource, dataFeed) {

    var google = window.google;
    $scope.sources = dataSource.query();
    $scope.data = {};
    $scope.dataTag = {};
    $scope.dataset1={};
    $scope.dataset2={};
    $scope.dataset3={};

    $scope.$watch('dataTag',function(){
        //console.log($scope.dataTag);
    });
    $scope.tagObject={};
    $scope.saveTag=function(){
        $scope.dataTag={
            id:$scope.tagObject.id,
            nameTag:$scope.tagObject.nameTag,
            descriptionTag:$scope.tagObject.descriptionTag,
            outputTagSelect:$scope.tagObject.outputTagSelect,
            addNewTag:$scope.tagObject.addNewTag
        };
        var tagId=$scope.dataTag.id;
        
        for(var i=$scope.APIMArker.length-1;i>=0;i--){
            if(tagId==$scope.APIMArker[i].id){
                $scope.APIMArker[i].name=$scope.dataTag.nameTag;
                $scope.APIMArker[i].city=$scope.dataTag.descriptionTag;
                $scope.APIMArker[i].tags=$scope.dataTag.addNewTag;
            }
        }    
        for(var i in $scope.data){
            for(var j in $scope.data[i]){
                if(tagId==$scope.data[i][j].id){
                    // temp[j].name=$scope.dataTag.nameTag;
                    // temp[j].city=$scope.dataTag.descriptionTag;
                    // required only when we want to edit the shop names
                    $scope.data[i][j].tags=$scope.dataTag.addNewTag;
                    console.log($scope.data[i][j].tags);
                }
            }
        }                
    };
     // TagsModal info window
    var tagsModal = $modal({scope: $scope, template: 'views/modal/tags.html', show: false});
    $scope.makeModal = function(markerkey) {
        console.log(markerkey);
        
        console.log($scope.data.length);
        for(var index in $scope.data){
            var temp=$scope.data[index];
            console.log(temp);
            for(var j in temp){
                if(markerkey==temp[j].id){
                    $scope.tagObject.nameTag=temp[j].name;
                    $scope.tagObject.descriptionTag=temp[j].city;
                    $scope.tagObject.id=temp[j].id;
                    $scope.tagObject.addNewTag=temp[j].tags;
                    tagsModal.$promise.then(tagsModal.show);
                } 
            }    
        } 
    };

    //Adding polygons
    $scope.singleModel = 1;
    $http.get('fake_data/test_neighbourhood.json').success(function(dataPoly){  
        $scope.poly1=dataPoly;
     });
    $scope.showHidePoly=function(){
        if($scope.singleModel===1){
            $scope.polyShowArray=$scope.poly1;
        }
        else{
            $scope.polyShowArray=null;
        }
    };
    $scope.fillcolor={  
        color:'#63C3F2',
        opacity: '0.2'
    };
    $scope.strokecolor={
        weight: 1,
        color: '#505152',
        opacity: 1
    };
    
    

   
    // _.each($scope.APIMArker, function (marker) {
    //     marker.closeClick = function () {
    //       marker.showWindow = false;
    //       $scope.$apply();
    //     };
    //     marker.onClicked = function () {
    //     onMarkerClicked(marker);
    //     $scope.$apply();
    //     console.log(marker.showWindow);
    //     };
    // });
        //  _.each($scope.data, function (arr){
        //     console.log(arr);
        //      _.each(arr, function (marker) {
        //         marker.closeClick = function () {
        //           marker.showWindow = false;
        //           $scope.$apply();
        //         };
        //         marker.onClicked = function () {
        //             console.log("2");    
        //             onMarkerClicked(marker);
        //             $scope.$apply();
        //         };
        //     });
        // });
        //      for(var i in $scope.data){

        //         for(var j in $scope.data[i]){
                    
        //         }
        //      }
    $scope.onSelect = function(dataSourceId) {
        if($scope.data[dataSourceId] !== undefined) {
            $scope.data[dataSourceId] = undefined;
             if(dataSourceId==1){
                $scope.dataset1={};
            }
            else if(dataSourceId==11){
                $scope.dataset2={};
            } 
            else if(dataSourceId==15){
                $scope.dataset3=;
            }
        }
        else 
        {
            $scope.data[dataSourceId] = dataFeed.query({'dataSourceId':dataSourceId});  
            $scope.data[dataSourceId].$promise.then(function (result) {
                $scope.data[dataSourceId] = result;
                console.log($scope.data[dataSourceId]);
                $scope.setValues(dataSourceId); 
            });     
        }
    };
    
    $scope.setValues=function(dataSourceId){
        
        if(dataSourceId==1){
            $scope.dataset1=$scope.data[dataSourceId];
        }
        else if(dataSourceId==11){
            $scope.dataset2=$scope.data[dataSourceId];
        } 
        else if(dataSourceId==15){
            $scope.dataset3=$scope.data[dataSourceId];
        }

        
        
        console.log('Setting values');
        console.log('Dataset1'+$scope.dataset1);
        console.log('end');
        console.log($scope.data[dataSourceId]);
        
        // var tempObj1=$scope.dataset1;
        // for(var index in tempObj1){
        //     tempObj1[index].showWindow=false;
        //     console.log(tempObj1[index]);
        // }
        // $scope.dataset1=tempObj1;


        // var onMarkerClicked = function (marker) {
        //     marker.showWindow = true;  
        // };
        // _.each($scope.dataset1, function (marker) {
              
        //     marker.closeClick = function () {
        //       marker.showWindow = false;
        //       $scope.$apply();
        //     };
        //     marker.onClicked = function () {
        //     onMarkerClicked(marker);
        //     $scope.$apply();
        //     //console.log(marker.showWindow);
        //     };

        // });
        console.log($scope.dataset1);

       
    };
   
    $scope.result = '';
    $scope.options = null;
    $scope.details = '';
    $scope.newMark={};
    $scope.convertCoords= function(){
        $scope.newMark.location={
            latitude: $scope.details.geometry.location.k,
            longitude: $scope.details.geometry.location.B
        };
        $scope.map.center.latitude=$scope.newMark.location.latitude;
        $scope.map.center.longitude=$scope.newMark.location.longitude;
    };
    $scope.map = {
    	center: {
    	  	latitude: 42.678681,
    	  	longitude: -73.741265
    	},
    	zoom: 7,
    	options: {
    		streetViewControl: true,
    		panControl: true,
    		panControlOptions: {
    			position: google.maps.ControlPosition.TOP_RIGHT
    		},
    		zoomControl: true,
    		zoomControlOptions: {
				style: google.maps.ZoomControlStyle.LARGE,
				position: google.maps.ControlPosition.RIGHT_TOP
    		},
    		maxZoom: 20,
    		minZoom: 3
    	},
	    dragging: true
    };
    var markerToClose = null;  
    $scope.symbol={
      path: window.google.maps.SymbolPath.CIRCLE,
      scale: 5
    };
    $scope.tabs = [
        {
        'title': 'Charts',
        'content': 'Charts View will give an area to compare different data sets',
        'template': 'views/charts.html'
        },
        {
        'title': 'Draw',
        'content': 'You can draw you own own elements',
        'template': 'views/draw.html'
        },
        {
        'title': 'Add',
        'template': 'views/about.html',
        'content': 'Add'
        }
    ];
    $scope.showWindow=true;
    $scope.editTagEvents={
        options:{ 
            draggable:true},
        events:{ 
            // click:function(marker){
            //     var markerKey=marker.key;
            //     console.log(marker);
            //    // $scope.resetInfo(markerKey);
            //     marker.showWindow = true;
            //     console.log('Marker clicked');    
            //     $scope.$apply();
            // },
             dblclick:function(marker){
                console.log('dbl clicked');
                var pos = marker.getPosition();
                var markerKey=marker.key;
                $scope.makeModal(markerKey);
            }
        }
    };

   
    $scope.infoWindowWithCustomClass= {
        options: {
            boxClass: 'custom-info-window'
        }
    };
    $scope.hello=function(){
        alert("hello");
        $scope.$apply();
    };
    $scope.AddwithDescription=function(){
        $scope.editTodo=true;
        console.log('Hi');
    };
    $scope.polygonEvents={
        // mouseover:function mouseOverFn(polygon, eventName, polyMouseEvent) {    
        //     var polygonScopeObject = this.polygon, scope = this.scope;
        //     console.log(polygon);
        //     console.log(eventName);
        //     console.log(polyMouseEvent);
        //     scope.$apply(function() {
        //         polygonScopeObject.selected = !polygonScopeObject.selected;
        //         // Change colors or whatever you want via the polygon_scope_object
        //     });
        // },
        click:function(polygon, eventName, polyMouseEvent) {
            //var polygonScopeObject = this.polygon, scope = this.scope;
             console.log(polygon);
             console.log(eventName);
             polygon.fillColor="#ffffff";
             $scope.$apply();
            // console.log(polyMouseEvent);
            
            // scope.$apply(function() {
            //     polygonScopeObject.selected = !polygonScopeObject.selected;
            //     // Change colors or whatever you want via the polygon_scope_object
            // });
        }
        //   ,
        // mouseout:function mouseOutFn(polygon, eventName, polyMouseEvent) {
        //     var polygonScopeObject = this.polygon, scope = this.scope;
        //     console.log(polygon);
        //     console.log(eventName);
        //     console.log(polyMouseEvent);
        //     scope.$apply(function() {
        //         polygonScopeObject.selected = !polygonScopeObject.selected;
        //         // Change colors or whatever you want via the polygon_scope_object
        //     });
        // }    
    };
    $scope.APIMArker=[ 
            
                {
                'dataset': 'http://107.170.106.235/api-ds/11/', 
                'id': 56487, 
                
                'name': 'MR SAM FOOD MARKET', 
                'latitude': '42.667402000000003', 
                'longitude': '-73.770546899999999', 
                'street': '61 QUAIL ST', 
                'city': 'ALBANY', 
                'state': 'NY', 
                'zipcode': '12206', 
                'county': 'Albany', 
                'field1': 'ALSAEDI GAMAL A', 
                'tags': '', 
                'field3': ''
            } 
            
            ,
                {
                'dataset': 'http://107.170.106.235/api-ds/11/', 
                'id': 56488, 
                
                'name': 'WESTMERE NEWS & VARIETY', 
                'latitude': '42.690869300000003', 
                'longitude': '-73.867752999999993', 
                'street': '1823 WESTERN AVE', 
                'city': 'ALBANY', 
                'state': 'NY', 
                'zipcode': '12203', 
                'county': 'Albany', 
                'field1': 'WESTMERE NEWS INC', 
                'tags': '', 
                'field3': ''
            }
        ,
            {
                'dataset': 'http://107.170.106.235/api-ds/11/', 
                'id': 56493, 
                
                'name': 'PRICE CHOPPER 138', 
                'latitude': '42.754105500000001', 
                'longitude': '-73.756456600000007', 
                'street': '873 NEW LOUDON RD', 
                'city': 'LATHAM', 
                'state': 'NY', 
                'zipcode': '12110', 
                'county': 'Albany', 
                'field1': 'PRICE CHOPPER OPERATING CO INC', 
                'tags': '', 
                'field3': ''
            }
            
            
            
    ];
     $scope.resetInfo=function(markerKey){
        for(var index in $scope.APIMArker){
            for(var jindex in $scope.APIMArker[index]){
                if(markerKey==$scope.APIMArker[index][jindex].id){
                    console.log("called");

                }
                else{
                    $scope.APIMArker[index][jindex].showWindow=false;
                    console.log('reset info called');
                }
            }
        }
    };
   
   
});
