angular.module("ntpDirectives", [])
    .directive("ntpCaretToggle", function () {
        return {
            restrict: "A",
            scope: {
                caretToggle: "=ntpCaretToggle",
                hideCaret: "="
            },
            transclude: true,
            templateUrl: "TEMPLATES/caretToggle.html",
            link: function (scope, elem, attrs) {
                scope.checkShowCaretWanted = function () {
                    if (typeof scope.hideCaret === "undefined")return true;
                    else return !scope.hideCaret;
                }
            }
        }
    })
    .directive("ntpEvaluateToContent", function () {
        return {
            restrict: "A",
            scope: {
                value: "&ntpEvaluateToContent"
            },
            transclude: true,
            template: "<span ng-transclude></span> <span>{{value()}}</span>"
        }
    });