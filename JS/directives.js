angular.module("ntpDirectives", [
    "ntpServices"
])
    .directive("fssDropdown", function () {
        return {
            restrict: "A",
            scope: {
                mapKey: "="
            },
            controller: function fssDropdownCtrl($scope) {
                $scope.category = "";
            },
            link: function (scope, element, attrs){
                element.addClass("dropdown");
                scope.category = scope.category[attrs.mapKey];
            },
            template: "" +
                "   <a href='{{category.link}}' class='dropdown-toggle' data-toggle='dropdown'>" +
                "       {{category.title}} <span class='caret'></span>" +
                "   </a>" +
                "   <ul class='dropdown-menu'>" +
                "       <li ng-repeat='opt in category.options'>" +
                "           <a href='{{opt.link}}'>{{opt.title}}</a>" +
                "       </li>" +
                "   </ul>"
        }
    });