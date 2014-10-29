angular.module("ntpControllers", [
    "ntpServices"
])
    .controller("homeCtrl", function ($scope, $rootScope) {
        // INIT:
        $rootScope.setArticles = function () {
        };
        $rootScope.enableCategoriesPanelToggle = false;
        $rootScope.currentlyCatOrSubcat = "Category";
    })
    .controller("navCtrl", function ($scope, $rootScope, $state) {
        $scope.searchValidate = function () {
            if ($scope.searchForm.searchTextInput.$valid) {
                //console.log("Search is valid");
                $scope.showError = false;
            } else {
                //console.log("Search is NOT valid");
                $scope.showError = true;
            }
        };
        $scope.searchValidTransition = function () {
            if ($scope.searchForm.searchTextInput.$valid) {
                //console.log("Search is valid");
                $scope.showError = false;
                $state.go("search", {query: $scope.searchText, searchRange: $scope.searchRange});
            } else {
                //console.log("Search is NOT valid");
                $scope.showError = true;
            }
        }
    })
    .controller("searchInfoCtrl", function ($scope, $rootScope, $stateParams, loadSearch) {
        // PARAMS:
        $scope.searchText = $stateParams.query;
        $scope.searchRange = $stateParams.searchRange;

        loadSearch($scope.searchRange, {q: $scope.searchText});
    })
    .controller("categoryInfoCtrl", function ($scope, $rootScope, $stateParams, loadCatArticles) {
        // PARAMS:
        $scope.categoryName = $stateParams.categoryName;
        $scope.categoryId = $stateParams.categoryId;
        $rootScope.categoryName = $scope.categoryName;
        $rootScope.categoryId = $scope.categoryId;

        $rootScope.enableCategoriesPanelToggle = true;

        //$scope.catArticles = {};
        loadCatArticles($scope.categoryId); // ... , $scope, "catArticles" ...
    })
    .controller("subcategoryInfoCtrl", function ($scope, $rootScope, $stateParams, loadSubcatArticles) {
        // PARAMS:
        $scope.subcategoryName = $stateParams.subcategoryName;
        $scope.subcategoryId = $stateParams.subcategoryId;
        $rootScope.subcategoryName = $scope.subcategoryName;
        $rootScope.subcategoryId = $scope.subcategoryId;

        $rootScope.enableCategoriesPanelToggle = true;

        //$scope.catArticles = {};
        loadSubcatArticles($rootScope.categoryId, $scope.subcategoryId);
    })
    .controller("categoriesCtrl", function ($scope, $rootScope, loadCategories) {
        $scope.categories = [];
        loadCategories($scope, "categories", {order: "popular"});

        $scope.panelToggleIsEnabled = $rootScope.enableCategoriesPanelToggle;
        $scope.togglePanelClosed = $rootScope.enableCategoriesPanelToggle;
        $scope.toggleOpen = function () {
            if ($rootScope.enableCategoriesPanelToggle) {
                $scope.togglePanelClosed = !$scope.togglePanelClosed;
            }
        }
    })
    .controller("subcategoriesCtrl", function ($scope, $rootScope, loadSubcategories) {
        $scope.categoryName = $rootScope.categoryName;
        $scope.categoryId = $rootScope.categoryId;

        $scope.subcategories = [];
        loadSubcategories($scope, "subcategories", $rootScope.categoryId, {order: "popular"});
    })
    .controller("filtersCtrl", function ($scope, $rootScope, $state, $stateParams, loadCatArticles, loadSubcatArticles) {
        $scope.loadParams = {};
        /*count: NUMBER,
         since: STRING,
         order: STRING,
         title_only: BOOLEAN*/
        $scope.reloadArticles = function () {
            console.log($scope.loadParams.since);
            if ($scope.loadParams.since)$scope.loadParams.since = String(moment($scope.loadParams.since).format("YYYY-MM-DD"));
            console.log($scope.loadParams.since);
            $rootScope.loadParams = $scope.loadParams;
            if ($rootScope.currentlyCatOrSubcat === "Category") {
                console.log("Reload Category");
                angular.forEach($scope.loadParams, function (value, key) {
                    console.log(key + " = " + value);
                });
                console.log("-------------------------------------------");
                loadCatArticles($rootScope.categoryId, $scope.loadParams);
            } else if ($rootScope.currentlyCatOrSubcat === "Subcategory") {
                console.log("Reload Subcategory");
                angular.forEach($scope.loadParams, function (value, key) {
                    console.log(key + " = " + value);
                });
                console.log("-------------------------------------------");
                loadSubcatArticles($rootScope.categoryId, $rootScope.subcategoryId, $scope.loadParams);
            }
        };
    })
    .controller("articlesCtrl", function ($scope, $rootScope, $sce) {
        $scope.articles = {};
        $rootScope.setArticles = function (newArticles) {
            $scope.articles = newArticles;
        };

        $scope.trustArticlesSummary = function (smth) {
            return $sce.trustAsHtml(smth);
        }
    });