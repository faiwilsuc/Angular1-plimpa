(function() {
    'use strict';

    angular
        .module('plimpaDev')
        .config(routerConfig);

    /** @ngInject */
    function routerConfig($stateProvider, $urlRouterProvider, $locationProvider) {

        // Removing hash from the url
        if (window.history && window.history.pushState) {
            $locationProvider.html5Mode({
                enabled: true
            });
        }

        // Redirecting if there any matched urls
        $urlRouterProvider.otherwise('404');

        // Initial loading home page
        $stateProvider
            .state('home', {
                url: '/',
                resolve: {
                    sideBarList: function(itemsService, $rootScope, $timeout) {
                        $rootScope.startLoadingMain = true;
                        return itemsService.getCategoriesList.async().then(function(data) {
                            $timeout(function() {
                                $rootScope.startLoadingMain = false;
                            }, 600);
                            return data;
                        });
                    }
                },
                views: {
                    'main@': {
                        templateUrl: 'app/main/pages/home/home.html'
                    },
                    'container-desktop@': {
                      templateUrl: 'app/container/desktop.html'
                    },
                    'container-mobile@': {
                      templateUrl: 'app/container/mobile.html'
                    },
                    // Full map loading view **plan to merge main view**
                    'full-map@home': {
                        template: '<full-map></full-map>'
                    },
                    'categories-menu@home': {
                        template: '<categories-menu />'
                    },
                    'left-menu-2@home': {
                      template: '<items-around />',
                    }
                }
            });

        // Categories menu in sidebar
        var subCategoriesUrl = 'app/main/components/categories-menu/sub-categories/';
        $stateProvider
            .state('home.id', {
                url: '^/categories/:id',
                views: {
                    'categories-menu@home': {
                        template: '<categories-menu />'
                    }
                }
            })
            .state('home.subcat', {
                url: '^/categories/:id/:subId',
                views: {
                    'categories-menu@home': {
                        templateUrl: subCategoriesUrl + 'sub-categories.html',
                        controller: 'subCategoriesCtrl'
                    }
                }
            });

        // Getting items for sidebar view
        // it will replace sidebar categories view
        var homeItem = 'home.item';
        var itemInfoUrl = 'app/main/components/categories-menu/item-info/';
        $stateProvider
            .state(homeItem, {
                url: '^/categories/:id/:subId/:itemInfo',
                reloadOnSearch: false,
                views: {
                    'categories-menu@home': {
                        templateUrl: subCategoriesUrl + 'sub-categories.html',
                        controller: 'subCategoriesItemCtrl'
                    }
                }
            })
            .state(homeItem + '.search', {
                url: '^/search/:keyword',
                reloadOnSearch: false,
                views: {
                    'categories-menu@home': {
                        templateUrl: subCategoriesUrl + 'sub-categories-search-results.html',
                        controller: 'subItemSearchCtrl'
                    },
                    'left-menu-2@home': {
                      template: '<items-aggregated/>'
                    }
                }
            })
            .state(homeItem + '.search.modal-info', {
              modal: true,
              url: '^/item/modal/:itemNameSlug',
              params: {obj: ''},
              templateUrl: itemInfoUrl + "item-info-modal.html",
              views: {
                'modal-info-local@':{
                    templateUrl: itemInfoUrl + 'item-info-modal-local.html'
                },
                'modal-info-external@':{
                    templateUrl: itemInfoUrl + 'item-info-modal-external.html'
                }
              },
              controller: 'itemInfoModalCtrl'
            })
            .state(homeItem + '.searchVal', {
                url: '^/search/:id/:val',
                reloadOnSearch: false,
                views: {
                    'categories-menu@home.item': {
                        templateUrl: subCategoriesUrl + 'sub-categories.html',
                        controller: 'subItemSearchCtrl'
                    }
                }
            })
            .state(homeItem + '.info', {
                url: '^/items/:itemId/:itemNameSlug',
                views: {
                    'categories-menu@home': {
                        templateUrl: itemInfoUrl + 'item-info.html',
                        controller: 'itemInfoCtrl'
                    }
                },
                resolve: {
                  /* @ngInject */
                  item_seo: function(itemsService, $stateParams) {
                    return itemsService.getItemInfo.async($stateParams.itemId).then(function (data) {
                      return data;
                    });
                  }
                },
                metaTags: {
                  /* @ngInject */
                  title: function(item_seo) {
                    return item_seo.itemTitle;
                  },
                  description: '{{item_seo.itemDescr}}. Posted by: {{item_seo.itemEmail}}'
                }
            });

        // Auth views for login and register
        var authUrl = "app/main/pages/auth/";
        $stateProvider
            .state('home.login', {
                url: '^/login',
                views: {
                    'main@': {
                        templateUrl: authUrl + 'login/login.html',
                        controller: 'LoginController'
                    }
                }
            })
            .state('home.register', {
                url: '^/register',
                views: {
                    'main@': {
                        templateUrl: authUrl + 'register/register.html',
                        controller: 'RegisterController'
                    }
                }
            });

        // blog pages
        var blogUrl = "app/main/pages/blog/";
        $stateProvider
            .state('blog', {
                url: '^/blog',
                views: {
                    'main@': {
                        templateUrl: blogUrl + 'blog-page-main.html',
                        controller: 'blogCtrl'
                    },
                    'nav': {
                        templateUrl: 'app/navigation/nav.html'
                    }
                },
                metaTags: {
                  title: "Blog",
                  description: 'Checkout the latest articles'
                }
            })
            .state('blog.content', {
                url: '^/blog/:id/:titleSlug',
                views: {
                    'main@': {
                        templateUrl: blogUrl + 'blog-page-content.html',
                        controller: 'blogPostCtrl'
                    },
                    'nav': {
                        templateUrl: 'app/navigation/nav.html'
                    }
                },
                metaTags: {
                  /* @ngInject */
                  title: function($stateParams) {
                    return $stateParams.titleSlug;
                  },
                  description: '{{$stateParams.titleSlug}}. at Plimpa Blog'
                }
            });


        // directory for SEO
        var blogUrl = "app/main/pages/directory-items/";
        $stateProvider
            .state('items-directory', {
                url: '^/dir/categories',
                views: {
                    'main@': {
                        templateUrl: blogUrl + 'items-directory.html',
                        controller: 'directoryItemsCtrl'
                    },
                    'nav': {
                        templateUrl: 'app/navigation/nav.html'
                    }
                },
                metaTags: {
                  title: "Items Directory",
                  description: 'Checkout all the items listed at Plimpa. Find out what you need within a seconds.'
                }
            })
            .state('items-directory.cat', {
                url: '^/dir/categories/:id/:catNameSlug',
                views: {
                    'main@': {
                        templateUrl: blogUrl + 'items-directory-subcat.html',
                        controller: 'directoryItemsSubcatCtrl'
                    },
                    'nav': {
                        templateUrl: 'app/navigation/nav.html'
                    }
                },
                metaTags: {
                  /* @ngInject */
                  title:  function ($stateParams) {
                      return $stateParams.catNameSlug + " | Items Directory"
                  },
                  description: 'Checkout all the items listed at Plimpa within {{$stateParams.catNameSlug}} category. Find out what you need within a seconds.'
                }
            })
            .state('items-directory.items', {
                url: '^/dir/items/:catId/:subId/:subSlug',
                views: {
                    'main@': {
                        templateUrl: blogUrl + 'items-directory-items-list.html',
                        controller: 'directoryItemsListCtrl'
                    },
                    'nav': {
                        templateUrl: 'app/navigation/nav.html'
                    }
                },
                metaTags: {
                  /* @ngInject */
                  title:  function ($stateParams) {
                    return $stateParams.subSlug + " | Items subcategories directory"
                  },
                  description: 'Checkout all the items listed at Plimpa within {{$stateParams.subSlug}} subcategory. Find what you need in a seconds'
                }
            });

        // User profile views
        // Checkig auth before loading views
        var userAuth = function($state, utilsService, userService, $timeout, $rootScope) {
            $rootScope.startLoading = true;
            return utilsService.checkAuth.async().then(function(data) {
                console.log("Auth state: " + data)
                if (data === false) {
                    $rootScope.startLoading = false;
                    return $timeout(function() {
                        if (data === false) {
                            console.log("Auth state check 'false', redirect to login")
                            $state.go("home.login");
                        }
                    });
                } else {
                    return utilsService.getAuthUserName.async().then(function(data) {
                        return userService.getUserInfoByUsername.async(data.message).then(function(responseData) {
                            $rootScope.startLoading = false;
                            return responseData;
                        })
                    })
                };
            });
        }
        var userUrl = "app/main/components/user/";
        $stateProvider
            .state('home.my_account', {
                url: '^/my_account',
                views: {
                    'modals@': {
                        templateUrl: userUrl + 'my-account/my-account.html',
                        controller: 'myAccountCtrl'
                    }
                },
                resolve: {
                    userAuth: userAuth,
                    'urlFix': ['$location', function($location) {
                        $location.url($location.url().replace("#_=_", ""));
                    }]
                }
            })
            .state('home.home_location', {
                url: '^/home-location',
                resolve: {
                    userAuth: userAuth
                },
                views: {
                    'modals@': {
                        templateUrl: userUrl + 'home-location/home-location.html',
                        controller: 'homeLocationCtrl'
                    }
                }
            })
            .state('home.my_ads', {
                url: '^/my_ads',
                resolve: {
                    userAuth: userAuth
                },
                views: {
                    'modals@': {
                        templateUrl: userUrl + 'my-ads/my-ads.html',
                        controller: 'myAdsCtrl'
                    }
                }
            });

        // Posting item views
        var postAddUrl = "app/main/apps/post-add/";
        var categoriesMenu = {
            templateUrl: postAddUrl + 'post-add.html',
            controller: "postAddController as vm"
        }
        $stateProvider
            .state('home.post', {
                url: '^/post-item',
                views: {
                    'categories-menu@home': categoriesMenu,
                    'my-ads@home.post': {
                        templateUrl: postAddUrl + 'post-add-select/post-add-select.html',
                        controller: 'postAddSelectCtrl'
                    }
                }
            })
            .state('home.post.item', {
                url: '^/post-item/item',
                views: {
                    'categories-menu@home': categoriesMenu,
                    'my-ads@home.post.item': {
                        templateUrl: postAddUrl + 'post-add-information/post-add-information.html',
                        controller: 'postAddInfoCtrl'
                    }
                }
            })
            .state('home.post.location', {
                url: '^/post-item/location',
                views: {
                    'categories-menu@home': categoriesMenu,
                    'my-ads@home.post.location': {
                        templateUrl: postAddUrl + 'post-add-location/post-add-location.html',
                        controller: 'postAddLocationCtrl'
                    },
                    'location-new@home.post.location': {
                        templateUrl: postAddUrl + 'post-add-location/post-add-location-new.html',
                        controller: 'postAddLocationCtrl'
                    },
                    'location-existing@home.post.location': {
                        templateUrl: postAddUrl + 'post-add-location/post-add-location-existing.html',
                        controller: 'postAddLocationCtrl'
                    },
                    'location-confirm@home.post.location': {
                        templateUrl: postAddUrl + 'post-add-location/post-add-location-confirm.html',
                        controller: 'postAddLocationCtrl'
                    }

                }
            })
            .state('home.post.social', {
                url: '^/post-item/submit',
                views: {
                    'categories-menu@home': categoriesMenu,
                    'my-ads@home.post.social': {
                        templateUrl: postAddUrl + 'post-add-social/post-add-social.html',
                        controller: 'pastAddSocialCtrl'
                    }
                }
            })
            .state('home.post.complete_success', {
                url: '^/post-item/complete_success',
                views: {
                    'categories-menu@home': categoriesMenu,
                    'my-ads@home.post.complete_success': {
                        templateUrl: postAddUrl + 'post-add-complete/post-add-success.html',
                        controller: "postAddController as vm"
                    }
                }
            })
            .state('home.post.complete_error', {
                url: '^/post-item/complete_error',
                views: {
                    'categories-menu@home': categoriesMenu,
                    'my-ads@home.post.complete_error': {
                        templateUrl: postAddUrl + 'post-add-complete/post-add-error.html',
                        controller: "postAddController as vm"
                    }
                }
            })
            .state('home.post.register', {
                url: '^/post-item/register',
                resolve: {
                    authState: function($state, utilsService, $timeout) {
                        return utilsService.checkAuth.async().then(function(data) {
                            if (data === false);
                            return $timeout(function() {
                                if (data) {
                                    $state.go("home.post");
                                }
                            });
                        });
                    }
                },
                views: {
                    'categories-menu@home': categoriesMenu,
                    'my-ads@home.post.register': {
                        templateUrl: postAddUrl + 'post-add-register/post-add-register.html',
                        controller: 'postAddRegisterCtrl'
                    }
                }
            });

        // Additional pages
        $stateProvider
            .state('about', {
                url: '^/about',
                views: {
                    'main@': {
                        templateUrl: 'app/main/pages/about/about.html'
                    },
                    'nav': {
                        templateUrl: 'app/navigation/nav.html'
                    }
                },
                metaTags: {
                  title:  "About",
                  description: 'About the Plimpa Company'
                }
            })
            .state('terms_conditions', {
                url: '^/terms-and-conditions',
                views: {
                    'main@': {
                        templateUrl: 'app/main/pages/terms-conditions/terms-conditions.html'
                    },
                    'nav': {
                        templateUrl: 'app/navigation/nav.html'
                    }
                }
            })
            .state('privacy_policy', {
                url: '^/privacy-policy',
                views: {
                    'main@': {
                        templateUrl: 'app/main/pages/privacy-policy/privacy-policy.html'
                    },
                    'nav': {
                        templateUrl: 'app/navigation/nav.html'
                    }
                }
            })
            .state('careers', {
              url: '^/careers',
              views: {
                'main@': {
                  templateUrl: 'app/main/pages/job/job.html'
                }
              },
              metaTags: {
                title:  "Careers",
                description: 'Find out the career opportunities'
              }
            })
            .state('404', {
                url: '/404',
                views: {
                    'main@': {
                        templateUrl: 'app/main/pages/error/404/404.html'
                    },
                    'nav': {
                        templateUrl: 'app/navigation/nav.html'
                    }
                },
                metaTags: {
                  prerender: {
                    statusCode: 404,
                    header: 'Location: https://plimpa.com'
                  }
                }
            });
      //TODO 403 error
    }

})();
