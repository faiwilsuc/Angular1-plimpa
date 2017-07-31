(function() {
  'use strict';

  angular
  .module('app.components')
  .component('itemsAggregated', {
    templateUrl: 'app/main/components/items-aggregated/items-aggregated.html',
    controller: function($state, itemsService, categoriesMenuService, $filter) {
      var $ctrl = this;
      $ctrl.expand = false;

      $ctrl.itemsOrder = categoriesMenuService.subItemOrder;

      var keyword = $state.params.keyword.replace(/_/g, ' '),
          // FIXME pass country_code!!
          country_code = '';

      var serviceInfo = {
        facebook: {
          title: 'Facebook',
          iconClass: 'fa fa-2x fa-facebook'
        },
        kaidee: {
          title: 'Kaidee',
          iconClass: 'kaidee-icon'
        },
        craigslist: {
          title: 'Craigslist',
          iconClass: 'craigslist-icon'
        }
      };

      $ctrl.menus = itemsService.getAggregatedItemsByKeyword(
        keyword, country_code, Object.keys(serviceInfo));

      angular.forEach($ctrl.menus, function(menu) {
        menu.loading = true;
        menu.promise.then(function(results) {
          menu.menus = results;
          delete menu.loading;
        });
        angular.merge(menu, serviceInfo[menu.service]);
      });

      $ctrl.menuExpand = function(e) {
        if (window.matchMedia('(min-width: 992px)').matches) {
          var elem = e.currentTarget;
          if ($ctrl.expand == false) {
            $('.expandBlock').remove();
            $(elem).append('<div class="expandBlock">' +
              '<span class="carret">' +
              '<i class="fa fa-angle-left" aria-hidden="true"></i>' +
              '</span>' +
              '</div>');
              $('.fa-angle-left').css({"bottom": "12px", "left": "9px"})
          } else {
            $('.expandBlock').remove();
            $(elem).append('<div class="expandBlock">' +
              '<span class="carret">' +
              '<i class="fa fa-angle-right" aria-hidden="true"></i>' +
              '</span>' +
              '</div>');
            $('.fa-angle-right').css({"bottom": "12px", "left": "12px"})
          }
          return $ctrl.expand = !$ctrl.expand;
        }
      };

      $ctrl.getMenus = function(key) {
        return $ctrl.menus[key[0]].promise;
      };

      $ctrl.onChoose = function(key, obj) {
        $state.go('home.item.search.modal-info', { "itemNameSlug": $filter('slugify')(obj.itemTitle), obj: obj });
        // if (obj.product_url)
        //   window.open(obj.product_url, '_blank');
      };
    }
  });
})();
