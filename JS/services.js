angular.module("ntpServices", [])
    .factory("getSearch", function ($http, $rootScope) {
        return function (query, searchRange) {
            if (searchRange === "Everything") {
                $http.get("http://api.feedzilla.com/v1/articles/search.json?q=" + query)
                    .success(function (data) {
                        console.log(data);
                        $rootScope.setArticles(data);
                    })
            } else if (searchRange === "Current category") {
                if ($rootScope.categoryId) {
                    $http.get("http://api.feedzilla.com/v1/categories/" + $rootScope.categoryId + "/articles/search.json?q=" + query)
                        .success(function (data) {
                            console.log(data);
                            $rootScope.setArticles(data);
                        })
                }
            }
        }
    })
    .factory("getCategories", function ($http) {
        return function (scope, target) {
            $http.get("http://api.feedzilla.com/v1/categories.json?order=popular")
                .success(function (data) {
                    //console.log(data);
                    scope[target] = data;
                });
        }
    })
    .factory("getCategories", function ($http) {
        return function (scope, target, innerTarget) {
            $http.get("http://api.feedzilla.com/v1/categories.json?order=popular")
                .success(function (data) {
                    //console.log(data);
                    scope[target][innerTarget] = data;
                });
        }
    })
    .factory("appendParams", function () {
        return function (requestUrl, params) {
            if (params) {
                if (params.count) {
                    requestUrl += "count=" + params.count;
                    if (params.since || params.order || params.title_only) {
                        requestUrl += "&";
                    }
                }
                if (params.since) {
                    requestUrl += "since=" + params.since;
                    if (params.order || params.title_only) {
                        requestUrl += "&";
                    }
                }
                if (params.order) {
                    requestUrl += "order=" + params.order;
                    if (params.title_only) {
                        requestUrl += "&";
                    }
                }
                if (params.title_only) {
                    requestUrl += "title_only=1";
                }
                return requestUrl;
            }
        }
    })
    .factory("getArticles", function ($http, appendParams) {
        return function (scope, target, categoryId, params) {
            var requestUrl = "http://api.feedzilla.com/v1/categories/" + categoryId + "/articles.json?";
// Filterparameterergänzung in eigene Funktion packen
            requestUrl = appendParams(requestUrl, params);
            $http.get(requestUrl)
                .success(function (data) {
                    //console.log(data);
                    scope[target] = data;
                });
        }
    });

