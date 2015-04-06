var MyDirectives = angular.module('My-Directives', []);

MyDirectives.directive("menuSlider", function () {
    return {
        restrict: "E",
        templateUrl: "templates/menu-slider.html"
    }
});
MyDirectives.directive("loaderView", function () {
    return {
        restrict: "E",
        templateUrl: "templates/loader-view.html"
    }
});