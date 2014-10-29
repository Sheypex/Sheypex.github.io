angular.module("ntpApp", [
    "ui.bootstrap",
    "ui.router",
    "ngAnimate",
    "angular-loading-bar",
    "ntpServices",
    "ntpDirectives",
    "ntpControllers"
])
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/home");
        /* SAMPLE:
        $stateProvider.state("...", {
            url: "...",
            views: {
                "info": {
                    template: '' +
                        '<div class="row"> ' +
                        '   <div class="col-lg-12">' +
                        '       <h1 class="page-header">...</h1>' +
                        '   </div>' +
                        '</div>'
                },
                "categories": {
                    templateUrl: "PARTIALS/categories.html"
                },
                "subcategories": {
                    templateUrl: "PARTIALS/subcategories.html"
                },
                "filters": {
                    templateUrl: "PARTIALS/filters.html"
                },
                "articles": {
                    templateUrl: "PARTIALS/articles.html"
                }
            }
        });*/
        $stateProvider.state("home", {
            url: "/home",
            views: {
                "info": {
                    template: '' +
                        '<div class="row" ng-controller="homeCtrl"> ' +
                        '   <div class="col-lg-12">' +
                        '       <h1 class="page-header">Home</h1>' +
                        '   </div>' +
                        '</div>'
                },
                "categories": {
                    templateUrl: "PARTIALS/categories.html"
                },
                "subcategories": {},
                "filters": {},
                "articles": {}
            }
        });
        $stateProvider.state("search", {
            url: "/search?query&searchRange",
            views: {
                "info": {
                    template: '' +
                        '<div class="row" ng-controller="searchInfoCtrl"> ' +
                        '   <div class="col-lg-12">' +
                        '       <h1 class="page-header">Search for {{searchText}} in {{searchRange}}</h1>' +
                        '   </div>' +
                        '</div>'
                },
                "categories": {},
                "subcategories": {},
                "filters": {
                    templateUrl: "PARTIALS/filters.html"
                },
                "articles": {
                    templateUrl: "PARTIALS/articles.html"
                }
            }
        });
        $stateProvider.state("category", {
            url: "/category/:categoryName/:categoryId",
            views: {
                "info": {
                    template: '' +
                        '<div class="row" ng-controller="categoryInfoCtrl"> ' +
                        '   <div class="col-lg-12">' +
                        '       <h1 class="page-header">{{categoryName}}</h1>' +
                        '   </div>' +
                        '</div>'
                },
                "categories": {
                    templateUrl: "PARTIALS/categories.html"
                },
                "subcategories": {
                    templateUrl: "PARTIALS/subcategories.html"
                },
                "filters": {
                    templateUrl: "PARTIALS/filters.html"
                },
                "articles": {
                    templateUrl: "PARTIALS/articles.html"
                }
            }
        });
        $stateProvider.state("subcategory", {
            url: "/category/:categoryName/:categoryId/subcategory/:subcategoryName/:subcategoryId",
            views: {
                "info": {
                    template: '' +
                        '<div class="row" ng-controller="subcategoryInfoCtrl"> ' +
                        '   <div class="col-lg-12">' +
                        '       <h1 class="page-header">{{categoryName}}/{{subcategoryName}}</h1>' +
                        '   </div>' +
                        '</div>'
                },
                "categories": {
                    templateUrl: "PARTIALS/categories.html"
                },
                "subcategories": {
                    templateUrl: "PARTIALS/subcategories.html"
                },
                "filters": {
                    templateUrl: "PARTIALS/filters.html"
                },
                "articles": {
                    templateUrl: "PARTIALS/articles.html"
                }
            }
        });
    });