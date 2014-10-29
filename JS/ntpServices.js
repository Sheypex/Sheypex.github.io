angular.module("ntpServices", [])
    .factory("loadCategories", function ($http, appendLoadParams) {
        return function (scope, target, params) {
            var reqUrl = "http://api.feedzilla.com/v1/categories.json";
            if (params) {
                reqUrl = appendLoadParams(reqUrl, params);
            }
            $http.get(reqUrl)
                .success(function (data) {
                    //console.log(data);
                    scope[target] = data;
                });
        }
    })
    .factory("loadSubcategories", function ($http, appendLoadParams) {
        return function (scope, target, categoryId, params) {
            var reqUrl = "http://api.feedzilla.com/v1/categories/" + categoryId + "/subcategories.json";
            if (params) {
                reqUrl = appendLoadParams(reqUrl, params);
            }
            $http.get(reqUrl)
                .success(function (data) {
                    //console.log(data);
                    scope[target] = data;
                });
        }
    })
    .factory("loadCatArticles", function ($http, $rootScope, appendLoadParams) {
        return function (categoryId, params) {
            $rootScope.currentlyCatOrSubcat = "Category";

            var reqUrl = "http://api.feedzilla.com/v1/categories/" + categoryId + "/articles.json";
            if (params) {
                reqUrl = appendLoadParams(reqUrl, params);
            }
            console.log(reqUrl);
            console.log("-------------------------------------------");
            $http.get(reqUrl)
                .success(function (data) {
                    //console.log(data);
                    //scope[target] = data;
                    $rootScope.setArticles(data);
                });
        }
    })
    .factory("loadSubcatArticles", function ($http, $rootScope, appendLoadParams) {
        return function (categoryId, subcategoryId, params) {
            $rootScope.currentlyCatOrSubcat = "Subcategory";

            var reqUrl = "http://api.feedzilla.com/v1/categories/" + categoryId + "/subcategories/" + subcategoryId + "/articles.json";
            if (params) {
                reqUrl = appendLoadParams(reqUrl, $rootScope.articleParams);
            }
            console.log(reqUrl);
            console.log("-------------------------------------------");
            $http.get(reqUrl)
                .success(function (data) {
                    //console.log(data);
                    //scope[target] = data;
                    $rootScope.setArticles(data);
                });
        }
    })
    .factory("loadSearch", function ($http, $rootScope, appendLoadParams) {
        return function (searchRange, params) {
            if (searchRange === "Everything") {
                var reqUrl = "http://api.feedzilla.com/v1/articles/search.json";
                if (params) {
                    reqUrl = appendLoadParams(reqUrl, params);
                }
                $http.get(reqUrl)
                    .success(function (data) {
                        console.log(data);
                        $rootScope.setArticles(data);
                    })
            } else if (searchRange === "Current Category") {
                if ($rootScope.categoryId) {
                    var reqUrl = "http://api.feedzilla.com/v1/categories/" + $rootScope.categoryId + "/articles/search.json";
                    if (params) {
                        reqUrl = appendLoadParams(reqUrl, params);
                    }
                    $http.get(reqUrl)
                        .success(function (data) {
                            //console.log(data);
                            $rootScope.setArticles(data);
                        })
                }
            }
        }
    })
    .factory("appendLoadParams", function () {
        return function (str, paramsObj) {
            str += "?";
            angular.forEach(paramsObj, function (value, key) {
                if (value)str += key + "=" + value + "&";
            });
            str = str.substring(0, str.length - 1);
            //console.log(str);
            return str;
        }
    });