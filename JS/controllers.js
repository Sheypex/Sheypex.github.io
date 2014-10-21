angular.module("ntpControllers", [
    'ntpServices'
])
    .controller("navCtrl", function ($scope, getCategories, getSearch) {
        $scope.navLinks = {
            categories: []
        };
        getCategories($scope, "navLinks", "categories");
        $scope.navSearch = function (query, searchRange) {
            getSearch(query, searchRange);
        };
        $scope.makeActiveLink = function (elem) {
            $scope.activeLink = elem;
        };
        $scope.isActiveLink = function (elem) {
            return $scope.activeLink === elem;
        }
    })
    .controller("categoryCtrl", function ($scope, $rootScope, $stateParams, getArticles) {
        $scope.categoryName = $stateParams.categoryName;
        //console.log($scope.categoryName);
        $scope.categoryId = $stateParams.categoryId;
        //console.log($scope.categoryId);
        $rootScope.categoryId = $stateParams.categoryId;
        //console.log($rootScope.categoryId);
        $scope.articles = {
        };
        $rootScope.setArticles = function(newArticles){
            $scope.articles = newArticles;
        };
        $scope.getArticlesParams = {};
        getArticles($scope, "articles", $stateParams.categoryId, $scope.getArticlesParams);
        $scope.reloadArticles = function () {
            getArticles($scope, "articles", $stateParams.categoryId, $scope.getArticlesParams);
        }
    });