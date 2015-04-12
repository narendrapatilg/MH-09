var MyServices = angular.module('MyServices', ['ngRoute']);

MyServices.factory('myservices', function ($http) {
    var myService = {
        getcomponentlist: function () {
            var promise = $http.get('json/package.json').then(function (response) {
                return response.data;
            });
            return promise;
        },
        getalladvertise: function () {
            var promise = $http.get('http://kolhapur09.com.cp-in-6.webhostbox.net/cakephp/webservice/advertise_all?advertise=all').then(function (response) {
                return response.data;
            });
            return promise;
        },
        gettrainlist: function () {
            var promise = $http.get('json/train.json').then(function (response) {
                return response.data;
            });
            return promise;
        },
        getbloodbanklist: function () {
            var promise = $http.get('json/blood_bank.json').then(function (response) {
                return response.data;
            });
            return promise;
        },
        getfirefightlist: function () {
            var promise = $http.get('json/firefight.json').then(function (response) {
                return response.data;
            });
            return promise;
        },
        getpolicelist: function () {
            var promise = $http.get('json/police.json').then(function (response) {
                return response.data;
            });
            return promise;
        },
        getprivatetransport: function () {
            var promise = $http.get('json/private-transport.json').then(function (response) {
                return response.data;
            });
            return promise;
        },
        getdevotional: function () {
            var promise = $http.get('http://kolhapur09.com.cp-in-6.webhostbox.net/cakephp/webservice/devotional_info?devo=all').then(function (response) {
                return response.data;
            });
            return promise;
        },
        getmovies: function () {
            var promise = $http.get('http://kolhapur09.com.cp-in-6.webhostbox.net/cakephp/webservice/movies?movie=all').then(function (response) {
                return response.data;
            });
            return promise;
        },
        getmsrtctransport: function () {
            var promise = $http.get('json/msrtc-transport.json').then(function (response) {
                return response.data;
            });
            return promise;
        }
    };
    return myService;
});
