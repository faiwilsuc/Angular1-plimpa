/**
 *  Module
 *
 * Description
 */
(function() {
  "use strict"

  angular
    .module('app.core')
    .controller('CarouselController', function($scope) {
      $scope.carouselProps = {
        interval: 5000,
        noWrapSlides: false,
        active: 0,
      };
      $scope.slides = [
        {
          id: 0,
          image: '../../../assets/img/icons/popup-icons.png'
        },
        {
          id: 1,
          image: '../../../assets/img/icons/popup-icons.png'
        }];
    })
    .factory("tourFactory", function($compile, $rootScope) {
      var tour = new Tour({
        backdrop: true,
        onShown: function(tour) {
          var popup = $('.plimpa-tour');
          $compile(popup)($rootScope);
        },
        steps: [
          {
            template: "<div class='popover tour plimpa-tour first'>" +
            "<div class='plimpa-popup-bg-block'>" +
            "<img class='plimpa-popup-bg' src='../../assets/img/first-popup-bg.jpg'>" +
            "</div>" +
            "<div class='plimpa-popup-content first'>" +
            "<div class='plimpa-popup-descr'>" +
            "<p class='plimpa-sub-title' translate='TOUR.POPUP.FIRST.HEADER'></p>" +
            "<p class='plimpa-sub-descr' translate='TOUR.POPUP.FIRST.BODY'</p>" +
            "</div>" +
            "<div class='popover-carousel' ng-controller='CarouselController'>" +
            "<div uib-carousel active='carouselProps.active' interval='carouselProps.interval' no-wrap='carouselProps.noWrapSlides' no-pause='true'>" +
            "<div uib-slide ng-repeat='slide in slides track by slide.id' index='slide.id'>" +
            "<img ng-src='{{slide.image}}'>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "<div class='popover-navigation ad'>" +
            "<button class='plimpa-popup-button thanks' data-role='next' translate='TOUR.POPUP.BTN_START'></button>" +
            "<button class='plimpa-popup-button skip first' data-role='end' translate='TOUR.POPUP.BTN_SKIP'></button>" +
            "</div>" +
            "</div>",
            animation: true,
            placement: 'auto',
            orphan: true,
            next: 1
          },
          {
            element: "#search_keyword",
            template: "<div class='popover tour plimpa-tour search'>" +
            "<div class='arrow'></div>" +
            "<h4 class='plimpa-title' translate='TOUR.POPUP.SEARCH.HEADER'></h4>" +
            "<div class='plimpa-popup-content'>" +
            "<div class='popup-info-block'>" +
            "<img class='plimpa-popup-info' preload-image ng-src='../../assets/img/search-anim.gif' default-image='../../assets/img/loader.gif'>" +
            "</div>" +
            "<div class='plimpa-popup-descr'>" +
            "<p class='plimpa-sub-descr' translate='TOUR.POPUP.SEARCH.BODY'></p>" +
            "</div>" +
            "</div>" +
            "<div class='popover-navigation search'>" +
            "<button class='plimpa-popup-button back' data-role='prev' translate='NAVIGATION.BTN.BACK'></button>" +
            "<button class='plimpa-popup-button more' data-role='next' translate='TOUR.POPUP.BTN_NEXT'></button>" +
            "<button class='plimpa-popup-button skip search' data-role='end' translate='TOUR.POPUP.BTN_SKIP'></button>" +
            "</div>" +
            "</div>",
            animation: true,
            placement: "bottom",
            prev: 0,
            next: 2
          },
          {
            element: "#sell_btn",
            template: "<div class='popover tour plimpa-tour ad'>" +
            "<div class='arrow'></div>" +
            "<h4 class='plimpa-title' translate='TOUR.POPUP.REPOST.HEADER'></h4>" +
            "<div class='plimpa-popup-content'>" +
            "<div class='popup-info-block'>" +
            "<img class='plimpa-popup-info' preload-image ng-src='../../assets/img/ad-anim.gif' default-image='../../assets/img/loader.gif'>" +
            "</div>" +
            "<div class='plimpa-popup-descr'>" +
            "<p class='plimpa-sub-descr' translate='TOUR.POPUP.REPOST.BODY'></p>" +
            "</div>" +
            "</div>" +
            "<div class='popover-navigation ad'>" +
            "<button class='plimpa-popup-button skip sell' data-role='end' translate='TOUR.POPUP.BTN_SKIP'></button>" +
            "<button class='plimpa-popup-button back' data-role='prev' translate='NAVIGATION.BTN.BACK'></button>" +
            "<button class='plimpa-popup-button thanks sell' data-role='end' translate='TOUR.POPUP.BTN_THANKS'></button>" +
            "</div>" +
            "</div>",
            animation: true,
            placement: "bottom",
            prev: 1
          }
        ]
      });

      function getTourElement(tour) {
        return tour._options.steps[tour._current].element
      }

      return {
        run: function() {
          if (!tour._inited) {
            tour.init();
            tour.start();
          }
        }
      };
    });
})();
