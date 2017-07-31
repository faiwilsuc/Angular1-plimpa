/**
 * Stacked Menus
 * See documentation in stacked-menu.module.js for an overview.
 *
 * @name stackedMenu
 * @desc This component displays a menu with inline subMenus.
 *
 */

(function() {
  'use strict';

  angular
  .module('app.stackedMenu')
  .component('stackedMenu', {
    templateUrl: 'app/main/components/stacked-menu/stacked-menu.html',
    bindings: {
      /*
       * @arg menus   Array          A list of menus.
       *                             Each menu is { data, name, menus }, and the
       *                             'menus' key is a list of menus. If the menu
       *                             at a specific index is missing, the
       *                             'getList' callback is used, see next arg.
       */
      menus: '<',

      /*
       * @arg getMenu Function(key)  A promise-returning callback that given a
       *                             key returns a promise for a list of menus/items
       *                             to display. key: [ind1, ind2, ind3, ..], a
       *                             list of indices into the nested menu structure.
       *
       *                             When the user navigates, if the each nested level
       *                             is retried using a call to getList(key), to
       *                             allow for async loading of data.
       */
      getMenus: '<',

      /*
       * @arg itemsOrder Object       { val: 'someField', reverse: true }
       *                             passed to 'orderBy' filter on the items
       *                             ng-repeat
       */
      itemsOrder: '<',

      /*
       * @arg itemsLimit Number      passed to 'limitTo' filter on the items ng-repeat
       */
      itemsLimit: '<',

      /*
       * @arg filterAllLevels Boolean whether or not to apply order and limit on
       *                              all levels. When false then only last
       *                              level is filtered. Default false
       */
      filterAllLevels: '<',

      /*
       * @arg active  [Number]       A two-way binded key representing 'active'
       *                             menu/item. See 'getList' above for a
       *                             description of the key.
       */
      active: '=?',

      /*
       * @arg onNavigate AngExp      Output binding, triggered when user
       *                             navigates the menu. It is injected with
       *                             { key, obj }
       */
      onNavigate: '&',

      /*
       * @arg onChoose   AngExp      Output binding, triggered when user chooses
       *                             a leaf item (with no nested menus). It is
       *                             injected with { key, obj }
       *
       */
      onChoose: '&',

      /*
       * @arg closeOnChoose Boolean  Whether or not to close the menu when an
       *                             item is chosen. Defaults to true
       */
      closeOnChoose: '<'
    },
    transclude: {
      menuHeader: '?menuHeader',
      itemTemplates: '?itemTemplates',
    },
    require: {
      container: '^?stackedMenuContainer',
    },
    controller: 'stackedMenuController'
  })
})();
