var MyMainController = angular.module('My-Main-Controller', ['ngRoute','toaster',
    'mobile-angular-ui',
    'LocalStorageModule',
    'ui.bootstrap',
    'MyServices',
    'My-Directives'
]);

MyMainController.controller('MyController', function($scope, toaster,localStorageService, $http, action, $route, $sce, $log, $routeParams, $rootScope, $interval, $window, $location,myservices){


    $scope.loader = {
        loading: false
    };

    $scope.showloader = function(){
        $scope.loader.loading = true ;
    };
    $scope.hideloader = function(){
        $scope.loader.loading = false ;
    };

    switch (action) {
	    case 'bash-board':
	    {
	        $scope.showloader();
	        $scope.adImageArrayForSlider =[];
	        if( $rootScope.online){
	        	if(localStorageService.get("adDataKey")){
	        		$scope.adData = localStorageService.get("adDataKey");
	        		$scope.hideloader();
	 	            var adLength = $scope.adData.length;
	 	            for (var i=0; i<adLength; i++) {
	 	                var subAdLength = $scope.adData[i].ad_offer.length;
	 	                for (var j=0; j<subAdLength; j++) {
	 	                    $scope.adImageArrayForSlider.push($scope.adData[i].ad_offer[j]);
	 	                }
	 	            }
	        	}else{
	        	  	 myservices.getalladvertise().then(function (data) {
	 	 	            $scope.adData = data.Result.result;
	 	                 localStorageService.set("adDataKey",  $scope.adData);
	 	                 $scope.hideloader();
	 	  	            var adLength = $scope.adData.length;
	 	  	            for (var i=0; i<adLength; i++) {
	 	  	                var subAdLength = $scope.adData[i].ad_offer.length;
	 	  	                for (var j=0; j<subAdLength; j++) {
	 	  	                    $scope.adImageArrayForSlider.push($scope.adData[i].ad_offer[j]);
	 	  	                }
	 	  	            }
	 	 	        }, function (_error) {
                         $scope.hideloader();
	 	                 toaster.pop('error','Something went wrong !');
	 	 	        });
	        	}
	        }else{
	        	$scope.adData = localStorageService.get("adDataKey");
	        	$scope.hideloader();
 	            var adLength = $scope.adData.length;
 	            for (var i=0; i<adLength; i++) {
 	                var subAdLength = $scope.adData[i].ad_offer.length;
 	                for (var j=0; j<subAdLength; j++) {
 	                    $scope.adImageArrayForSlider.push($scope.adData[i].ad_offer[j]);
 	                }
 	            }
	        }

	        $scope.myInterval = 2000;

	        break;
	    }// End of case dash-board
	    case 'sales':
	    {
	        $scope.showloader();
	        if( $rootScope.online){
	        	if(localStorageService.get("adDataDetailKey")){
	        		 $scope.adData = localStorageService.get("adDataDetailKey");
	        	}else{
	        		 myservices.getalladvertise().then(function (data) {
	 	 	            $scope.adData = data.Result.result;
	 	 	           localStorageService.set("adDataDetailKey", $scope.adData );
	 	 	            $scope.hideloader();
	 	 	        }, function (_error) {
	 	 	        	toaster.pop('error','Something went wrong !')
	 	 	            $scope.hideloader();
	 	 	        });
	        	}

	        }else{
	        	$scope.adData = localStorageService.get("adDataDetailKey");
	        }
	        break;
	    }// End of case dash-board
	    case 'train-list':
	    {
	        myservices.gettrainlist().then(function (data) {
	            $scope.trainData = data;
	        }, function (_error) {
	        	toaster.pop('error','Something went wrong !')
	        });

	        break;
	    }//End of case train-list
	    case 'train-detail':{
	        myservices.gettrainlist().then(function (data) {
	            $scope.trainDetailData = data;
	            $scope.trainDetail = $scope.trainDetailData[parseInt($routeParams.indexNumber)];
	        }, function (_error) {
	        	toaster.pop('error','Something went wrong !')
	        });

	        break;
	    }// End of case train-detail
	    case 'emergency':{
	        myservices.getbloodbanklist().then(function (data) {
	            $scope.bloodBankData = data;
	        }, function (_error) {
	        	toaster.pop('error','Something went wrong !')
	        });
	        myservices.getfirefightlist().then(function (data) {
	            $scope.fireFightData = data;
	        }, function (_error) {
	        	toaster.pop('error','Something went wrong !')
	        });
	        myservices.getpolicelist().then(function (data) {
	            $scope.policeData = data;
	        }, function (_error) {
	        	toaster.pop('error','Something went wrong !')
	        });
	        break;
	    }//End of case emergency
	    case 'devo':{
	    	 if( $rootScope.online){
	    		 if(localStorageService.get("adDevotionalKey")){
	    			 $scope.devotionalData = localStorageService.get("adDevotionalKey");
	    		 }else{
					myservices.getdevotional().then(function (data) {
					    $scope.showloader();
					    $scope.devotionalData = data.Result.result;
					    localStorageService.set("adDevotionalKey",$scope.devotionalData)
					    $scope.hideloader();
					}, function (_error) {
						toaster.pop('error','Something went wrong !')
					});
	    		 }
	    	 }else{
	    		 $scope.devotionalData = localStorageService.get("adDevotionalKey");
	    	 }
            $scope.refreshData = function(){
                myservices.getdevotional().then(function (data) {
                    $scope.showloader();
                    $scope.devotionalData = data.Result.result;
                    localStorageService.set("adDevotionalKey",$scope.devotionalData)
                    $scope.hideloader();
                }, function (_error) {
                    toaster.pop('error','Something went wrong !')
                });

            };
	        break;
	    }
	    case 'movie':{
	        myservices.getmovies().then(function (data) {
	            $scope.showloader();
	            $scope.moviesData = data.Result.result;
	            $scope.hideloader();
            }, function () {
                toaster.pop('error','Something went wrong !')
	        });
	        break;
	    }
	    case 'mhtransport':{
//	        $scope.message = 'Coming Soon';
//	        navigator.notification.confirm("Coming Soon?", function (result) {
//	            if (result == 1) {
//	            	$location.path(constant.DASH_BOARD_ROUTE);
//	                return false;
//	            }
//	        }, 'MH-09', 'Ok');
	        myservices.getmsrtctransport().then(function (data) {
	            $scope.msrtcTransportData = data;
	        }, function (_error) {
	            alert(_error.message);
	        });
	        break;
	    }
	    case 'privat-transport':{
	        myservices.getprivatetransport().then(function (data) {
	            $scope.privateTransportData = data;
	        }, function () {
	        	toaster.pop('error', 'Something went wrong !');
	        });
	        break;
	    }
	    case 'more':{
	//Set of Photos
	        $scope.photos = [
	            {src: 'img/calender/1.jpg', desc: 'Image 01'},
	            {src: 'img/calender/2.jpg', desc: 'Image 02'},
	            {src: 'img/calender/3.jpg', desc: 'Image 03'},
	            {src: 'img/calender/4.jpg', desc: 'Image 04'},
	            {src: 'img/calender/5.jpg', desc: 'Image 05'},
	            {src: 'img/calender/6.jpg', desc: 'Image 06'},
	            {src: 'img/calender/7.jpg', desc: 'Image 07'},
	            {src: 'img/calender/8.jpg', desc: 'Image 08'},
	            {src: 'img/calender/9.jpg', desc: 'Image 09'},
	            {src: 'img/calender/10.jpg', desc: 'Image 10'},
	            {src: 'img/calender/11.jpg', desc: 'Image 11'},
	            {src: 'img/calender/11.jpg', desc: 'Image 12'}
	        ];
	        // initial image index
	        $scope._Index = 0;
	        // if a current image is the same as requested image
	        $scope.isActive = function (index) {
	            return $scope._Index === index;
	        };

	        // show prev image
	        $scope.showPrev = function () {
	            $scope._Index = ($scope._Index > 0) ? --$scope._Index : $scope.photos.length - 1;
	        };

	        // show next image
	        $scope.showNext = function () {
	            $scope._Index = ($scope._Index < $scope.photos.length - 1) ? ++$scope._Index : 0;
	        };
	        // show a certain image
	        $scope.showPhoto = function (index) {
	            $scope._Index = index;
	        };

	        break;
	    }// End of case more

    }// End of Switch Case
    $scope.back_navigation = function(){
        $scope.currentPath = $location.path();
        if($scope.currentPath == constant.TRAIN_INFO_PAGE_ROUTE){
            $location.path(constant.DASH_BOARD_ROUTE);
        }else if($scope.currentPath == '/train/'+$routeParams.indexNumber){
            $location.path(constant.TRAIN_INFO_PAGE_ROUTE);
        }else if($scope.currentPath == constant.EMERGENCY_INFO_PAGE_ROUTE){
            $location.path(constant.DASH_BOARD_ROUTE);
        }else if($scope.currentPath == constant.MORE_PAGE_ROUTE){
            $location.path(constant.DASH_BOARD_ROUTE);
        }else if($scope.currentPath == constant.PRIVATE_TRANSPORT_PAGE_ROUTE){
            $location.path(constant.DASH_BOARD_ROUTE);
         }else if($scope.currentPath == constant.DEALS_PAGE_ROUTE){
            $location.path(constant.DASH_BOARD_ROUTE);
        }else if($scope.currentPath == constant.DEVOTIONAL_PAGE_ROUTE){
            $location.path(constant.DASH_BOARD_ROUTE);
        }else if($scope.currentPath == constant.MOVIES_PAGE_ROUTE){
            $location.path(constant.DASH_BOARD_ROUTE);
        }else if($scope.currentPath == constant.MH_TRANSPORT_PAGE_ROUTE){
            $location.path(constant.DASH_BOARD_ROUTE);
        }
    };

    $scope.menu_navigation = function (_itemID){
        switch (_itemID){
            case '1':{
                $location.path(constant.TRAIN_INFO_PAGE_ROUTE);
                break;
            }
            case '2':{
                $location.path(constant.MH_TRANSPORT_PAGE_ROUTE);
                break;
            }
            case '3':{
                $location.path(constant.MOVIES_PAGE_ROUTE);
                break;
            }
            case '4':{
                $location.path(constant.EMERGENCY_INFO_PAGE_ROUTE);
                break;
            }
            case '5':{
                $location.path(constant.FOOD_PAGE_ROUTE);
                break;
            }
            case '6':{
                $location.path(constant.DEALS_PAGE_ROUTE);
                break;
            }
            case '7':{
                $location.path(constant.DEVOTIONAL_PAGE_ROUTE);
                break;
            }
            case '8':{
                $location.path(constant.PRIVATE_TRANSPORT_PAGE_ROUTE);
                break;
            }
            case '9':{
                $location.path(constant.MORE_PAGE_ROUTE);
                break;
            }

        }// End of Switch-Case
    }
    });

