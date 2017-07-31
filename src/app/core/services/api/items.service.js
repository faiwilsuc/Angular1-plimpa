/**
 *  Module
 *
 * Description
 */
(function() {
    "use strict"

    angular
        .module('app.core')
        .factory("itemsService", function(mainUrl, $http, $q) {
            var getCategoriesList = {
                async: function() {
                    var promise = $http.get(mainUrl + '/items/categories').then(function(response) {
                        return applyTranslationPrefixes(response.data, "CATEGORY");
                    });
                    return promise;
                }
            };

            var getImage = {
                async: function(imageName) {
                    var promise = $http.get(mainUrl + '/items/image_temp/' + imageName + "/").then(function(response) {
                        return response.data;
                    });
                    return promise;
                }
            };

            var getItemInfo = {
                async: function(id) {
                    var promise = $http.get(mainUrl + '/items/' + id).then(function(response) {
                        return response.data;
                    });
                    return promise;
                }
            };

            var deleteItemActive = {
              async: function(id) {
                var promise = $http.delete(mainUrl + '/items/delete_active/' + id).then(function(response) {
                  return response.data;
                });
                return promise;
              }
            };

            var deleteItemPending = {
              async: function(id) {
                var promise = $http.delete(mainUrl + '/items/delete_temp/' + id).then(function(response) {
                  return response.data;
                });
                return promise;
              }
            };


            var getSubcategoriesList = {
                async: function(id) {
                    var promise = $http.get(mainUrl + '/items/categories/' + id + '/subcategories').then(function(response) {
                        return applyTranslationPrefixes(response.data, "SUBCATEGORY");
                    });
                    return promise;
                }
            };

            var getCategoriesSubListElms = {
                async: function(id, subid) {
                    var promise = $http.get(mainUrl + '/items/categories/' + id + '/subcategories/' + subid).then(function(response) {
                        return response.data;
                    });
                    return promise;
                }
            };

            var searchByCondoList = {
                async: function(condo_list, keyword) {
                    if(typeof keyword == 'undefined') keyword = ''
                    var promise = $http.get(mainUrl + '/items/search_around/?condo_list=' + condo_list + '&keyword=' + keyword).then(function(response) {
                        return response.data;
                    });
                    return promise;
                }
            };

            var search = {
                async: function(country, city, title, category, subcategory) {
                    if(typeof country == 'undefined') country = ''
                    if(typeof city == 'undefined') city = ''
                    if(typeof title == 'undefined') title = ''
                    if(typeof category == 'undefined') category = ''
                    if(typeof subcategory == 'undefined') subcategory = ''
                    var promise = $http.get(mainUrl + '/items/search/?country=' + country + '&city=' + city + '&title=' + title + '&category=' + category + '&subcategory=' + subcategory).then(function(response) {
                        return response.data;
                    });
                    return promise;
                }
            };

            var postAdd = {
                async: function(generatedData) {

                    var promise = $http({
                        method: 'POST',
                        url: mainUrl + '/items/new_temp',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-CSRF-TOKEN': $('input[name="_csrf"]').val()
                        },
                        data: generatedData
                    }).then(function(response) {
                        return response.data;
                    });

                    return promise;
                }
            }

            //for angular-translate
            function applyTranslationPrefixes(data, prefix){
              for (var i = 0; i< data.length; i++ ){
                data[i].name =  prefix+ "."+data[i].name;
                //console.log(data[i].name)
              }
              return data;
            }

            var aggregatorServices = ['facebook', 'kaidee', 'craigslist'];
            function getAggregatedItemsByKeyword(keyword, country_code, services) {
              services = services || aggregatorServices.slice();
              country_code = country_code || 'TH'; // FIXME hardcoded!!
              return services.map(function(service) {
                var ret = {
                  service: service,
                  promise: $http({
                    method: 'POST',
                    url: mainUrl + '/v2/aggregator',
                    data: {
                      service: service,
                      keyword: keyword,
                      country_code: country_code
                    }
                  }).then(function(resp) {
                    return ret.results = resp.data;
                  })
                };
                return ret;
              });
            }

            return {
                getAggregatedItemsByKeyword: getAggregatedItemsByKeyword,
                getCategoriesList: getCategoriesList,
                getImage: getImage,
                getItemInfo: getItemInfo,
                getSubcategoriesList: getSubcategoriesList,
                getCategoriesSubListElms: getCategoriesSubListElms,
                search: search,
                searchByCondoList: searchByCondoList,
                deleteItemActive:deleteItemActive,
                deleteItemPending:deleteItemPending,
                postAdd: postAdd
            };
        });

})();
