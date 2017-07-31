/**
 * Stacked Menus
 *
 * General Description and Usage
 * -----------------------------
 * This module contains the <stacked-menu> component and associated helper
 * directives and controller.
 *
 * The <stacked-menu> component renders a 1 or 2 level menu based on input data.
 * Input data is expected to be on the 'menus' attribute, it should be an array
 * of 'menu item' objects, which are simply any objects that they themselves can
 * contains a 'menus' key (for the second level of menu).
 *
 * The other important attribute is 'get-menus' which should be a function that
 * will be called with a 'key' argument, which is an array of indices into the
 * menu structure. It should return a promise for the array of menu items for
 * that key. So 'getMenus([2])' means return the array of menus for the item at
 * index '2' in the first level of the menu, and 'getMenus([1,4])' is menus for
 * item at index 4 in the second level (menu) of items at index 1 in the first
 * level. This is mainly to later support arbitrary levels, but for now only two
 * are supported so getMenus will really be called with a key of length 1.
 *
 * When using the menu you must simply pass the menu data and a getMenus
 * callback, and also fill in a transclusion slot called <item-templates>.
 * Inside this slot, you must use <div level="..."> tags to supply the templates
 * for each level. Inside the template for each level you have access to
 * ngRepeat variables for that level, these are '$index' and friends, and also
 * 'item0' if you are in level 0, 'item1' if in level 1, and so on. Due to the
 * nature of how this is built though, you cannot use ng-if (or other directives
 * that replace themselves with comments, like ng-repeat) inside item
 * templates[see internals note 1].
 *
 * There are other bindings (attribute arguments) that you can look at
 * documented in the stacked-menu.component.js file.
 * You should also take a look at the usage in categories-menu and items-around.
 *
 * There are two output bindings: on-navigate and on-choose. They both get
 * called with injectables { key, obj, menuCtrl }. onNavigate is called on all
 * but the last level, and onChoose is called for the last level. For the
 * current implementation this means onNavigate is called on level 0 and
 * onChoose is called on level 1. Note that the menu closes by default after
 * onChoose, but you can override that behavior with the 'close-on-choose'
 * binding.
 *
 * Styles
 * ------
 *
 * The menu has two basic styles, itemsFlat and itemsCards. You can see them in
 * action in the 'categories' menu (which is itemsFlat) and in the 'items around'
 * menu, which is itemsCards. The styles are applied by just adding the
 * appropriate class to the <stacked-menu> component.
 *
 * Compatibility Layer
 * -------------------
 *
 * For compatibility with older menus that have not been fully moved to the new
 * system, you can use the stacked-menu-compat directive, a good example is
 * sub-categories/sub-categories.html. You need to apply it on a wrapper div
 * with class 'stacked-menu' and optionally 'opened'. Please see
 * sub-categories.html for a full example (mainly the header part as well).
 * Also you have access to the 'menuCtrl' scope variable within the scope of
 * stacked-menu-compat.
 *
 * Note that the compat layer is just for applying styling and control over
 * open/close and scrolling behavior. But it does not render menus, that is done
 * manually by the old code. So it does not take any attributes
 *
 * Current Use [Feb 12 2017]
 * -------------------------
 *
 * The stackedMenuContainer is directly in the index page, and it contains the
 * ui-views that are used for menus and content.
 *
 * itemsAroud, itemsAggregated, and categoriesMenu currently use the stackedMenu
 * directive to implement their functionality.
 *
 * subCategories (also used for item search listing!!) and itemInfo have not been migrated
 * yet, and use the compatibility layer.
 *
 * Internals Notes
 * --------------
 *
 * [1] because the levelTemplates are collected too late, ng-if is replaced
 * with a comment, and it doesn't work any more (since we clone the DOM
 * element... solution is to collect templates in compile phase, which means
 * stacked-menu should be turned into a directive because I don't think there's
 * access to the compile phase from the component API.
 *
 * [2] the stacked-menu controller looks for an 'export-ctrl' attribute and
 * exports itself on the parent(!) scope with a key as specified in the
 * attribute. You should normally not need this, consider it an internal API.
 *
 * [3] the stacked-menu controller is split into a separate file only for the
 * sake of re-use in the compat layer.
 *
 * [4] the stacked-menu-level directive is a helper directive for inserting
 * compiled copies of the level transcludes.
 *
 */
(function() {
    'use strict';

    angular.module('app.stackedMenu', []);

})();
