var myapp = angular.module('myApp', [
    'ngRoute',
    'toaster',
    'mobile-angular-ui',
    'My-Main-Controller',
    'mobile-angular-ui.core'
]);
myapp.run(function ($rootScope,myservices,$window){
    // Needed for the loading screen
//    $rootScope.$on('$routeChangeStart', function(){
//        $rootScope.loading = true;
//    });
//
//    $rootScope.$on('$routeChangeSuccess', function(){
//        $rootScope.loading = false;
//    });

    $rootScope.online = navigator.onLine;
    $window.addEventListener("offline", function () {
        $rootScope.$apply(function() {
            $rootScope.online = false;
        });
    }, false);
    $window.addEventListener("online", function () {
        $rootScope.$apply(function() {
            $rootScope.online = true;
        });
    }, false);

    $rootScope.$watch('online', function(newStatus) {
        if(!$rootScope.online)
            alert(message.NO_INTERNET_MSG);
    });

    myservices.getcomponentlist().then(function (data) {
        $rootScope.componentData = data;
    }, function (_error) {
        alert(_error.message);
    });

});
myapp.config(function($routeProvider) {
    $routeProvider
        .when(constant.DASH_BOARD_ROUTE, {
            templateUrl: 'templates/dashboard-view.html',
            controller: 'MyController',
            title: 'Dashboard',
            resolve: {
                action: function () {
                    return 'bash-board';
                }
            }
        })

        .when(constant.TRAIN_INFO_PAGE_ROUTE, {
            templateUrl: 'templates/train-view.html',
            controller: 'MyController',
            title: 'Train Info',
            resolve: {
                action: function () {
                    return 'train-list';
                }
            }
        })

        .when(constant.TRAIN_INFO_PAGE_ROUTE+'/:indexNumber', {
            templateUrl: 'templates/train-detail.html',
            controller: 'MyController',
            title: 'Train Detail',
            resolve: {
                action: function () {
                    return 'train-detail';
                }
            }
        })
        .when(constant.EMERGENCY_INFO_PAGE_ROUTE, {
            templateUrl: 'templates/emergency-view.html',
            controller: 'MyController',
            title: 'Emergency',
            resolve: {
                action: function () {
                    return 'emergency';
                }
            }
        })
        .when(constant.DEVOTIONAL_PAGE_ROUTE, {
            templateUrl: 'templates/devo-view.html',
            controller: 'MyController',
            title: 'Devotional',
            resolve: {
                action: function () {
                    return 'devo';
                }
            }
        })
        .when(constant.PRIVATE_TRANSPORT_PAGE_ROUTE, {
            templateUrl: 'templates/privatetransport-view.html',
            controller: 'MyController',
            title: 'Private Transport',
            resolve: {
                action: function () {
                    return 'privat-transport';
                }
            }
        })
        .when(constant.DEALS_PAGE_ROUTE, {
            templateUrl: 'templates/sale-view.html',
            controller: 'MyController',
            title: 'Sales',
            resolve: {
                action: function () {
                    return 'sales';
                }
            }
        })
        .when(constant.MH_TRANSPORT_PAGE_ROUTE, {
            templateUrl: 'templates/mhtransport-view.html',
            controller: 'MyController',
            title: 'MH-Transport',
            resolve: {
                action: function () {
                    return 'mhtransport';
                }
            }
        })
        .when(constant.MOVIES_PAGE_ROUTE, {
            templateUrl: 'templates/movies-view.html',
            controller: 'MyController',
            title: 'Movies',
            resolve: {
                action: function () {
                    return 'movie';
                }
            }
        })
        .when(constant.MORE_PAGE_ROUTE, {
            templateUrl: 'templates/calender-view.html',
            controller: 'MyController',
            title: 'more',
            resolve: {
                action: function () {
                    return 'more';
                }
            }
        })
        .otherwise({
            redirectTo: constant.DASH_BOARD_ROUTE
        });
});

function onDeviceReady() {
    // Add event listener to the back button
    document.addEventListener("backbutton", backButtonHandler, false);
}

function backButtonHandler() {

    var currentPath = window.location.hash;
    if(localStorage.getItem("ls.toggle")){
        window.location.hash = window.location.hash;
        localStorage.setItem("ls.toggle","");
    }
    else if(currentPath == "#"+constant.DASH_BOARD_ROUTE){
        navigator.notification.confirm("Do you want to exit app?", function (result) {
            if (result == 2) {
                navigator.app.exitApp();
                return false;
            }
        }, 'MH-09', 'No,Yes');
        return false;
    }
    else if(currentPath == "#"+constant.DEALS_PAGE_ROUTE || currentPath == "#"+constant.MORE_PAGE_ROUTE || currentPath == "#"+constant.MOVIES_PAGE_ROUTE || currentPath == "#"+constant.PRIVATE_TRANSPORT_PAGE_ROUTE|| currentPath == "#"+constant.DEVOTIONAL_PAGE_ROUTE || currentPath == "#"+constant.EMERGENCY_INFO_PAGE_ROUTE || currentPath == "#"+constant.TRAIN_INFO_PAGE_ROUTE ){
        window.location.hash = "#"+constant.DASH_BOARD_ROUTE;
    }
    else{
        window.history.back();
    }
}

document.addEventListener("deviceready", onDeviceReady, false);
