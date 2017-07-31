(function() {
  'use strict';

  angular
  .module('app.components')
  .component('itemsAround', {
    templateUrl: 'app/main/components/items-around/items-around.html',
    controller: function(
      $scope,
      itemsAround,
      categoriesMenuService,
      mpService,
      $state,
      itemsService,
      mapCons,
      S3Service,
      $filter
    ) {
      var $ctrl = this;

      $ctrl.itemsOrder = categoriesMenuService.subItemOrder;
      $ctrl.itemsLimit = categoriesMenuService.limitSubData;

      /** prod **/
      // itemsAround.determineSearchCenter().then(function (centerData) {
      //   var promise = centerData.city ?
      //      itemsService.search.async(centerData.country, centerData.city) :
      //      itemsAround.findItemsAround(centerData, 5000);
      //   promise.then(function(list) {
      //     $ctrl.menus = list;
      //   })
      // });

      //** prod TEMP **/
      itemsService.search.async('TH').then(function (list) {
        $ctrl.menus = list;
      });


      /** dev ** close this comment to turn on search location Bangkok
       *
      if (localStorage["menusJSON"]) {
        $ctrl.menus = JSON.parse(localStorage["menusJSON"]);
      }
      itemsAround.determineSearchCenter().then(function (centerData) {
        centerData = { country: 'TH', city: 'Bangkok' };
        var promise = centerData.city ?
          itemsService.search.async(centerData.country, centerData.city) :
          itemsAround.findItemsAround(centerData, 5000);
        promise.then(function(list) {
          $ctrl.menus = list;
          localStorage["menusJSON"] = JSON.stringify($ctrl.menus);
        })
      });
      /**/

      $ctrl.getThumb = function(item, idx) {
        if (!item || !item.itemImages || !item.itemImages[idx]) {
          return;
        }
        return S3Service.getS3ActiveImageThumbnailUrl(item.condoId, item.itemId, item.itemImages[idx]);
      };


      $ctrl.showInMap = function(elm, menuCtrl) {
        $state.go('home.item.info', { "itemId": elm.itemId, "itemNameSlug": $filter('slugify')(elm.itemTitle)});
          menuCtrl.setOpened(false);
      };
    }
  })
})();
