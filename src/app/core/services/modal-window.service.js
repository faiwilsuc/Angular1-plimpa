/**
 *  Module
 *
 * Description
 */
(function() {
    "use strict"

    angular
        .module('app.core')
        .factory('ModalWindowService', ['$uibModal', function($uibModal) {
            function openAddItemDialog($scope) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'app/main/components/modals/item/AddItemDialog.html',
                    controller: 'AddItemController',
                    //windowClass: 'app-modal-window',
                    resolve: {
                        aValue: function() {
                            return $scope.condo_id;
                        }
                    }
                });
                modalInstance.result.then(function(paramFromDialog) {
                    $scope.paramFromDialog = paramFromDialog;
                });
            }

            function openLookAroundDialog($scope) {
                $scope.animationsEnabled = true;

                $uibModal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'app/main/components/modals/LookAroundDialog.html',
                    controller: 'LookAroundController',
                    resolve: {
                        aValue: function() {
                            return $scope.condo_LatLng;
                        }
                    }
                });
            }

            function openDetailDialog($scope, item) {
                $scope.animationsEnabled = true;

                var modalInstance = $uibModal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'app/main/components/modals/item/DetailDialog.html',
                    controller: 'DetailController',
                    windowClass: 'detail-modal-window',

                    resolve: {
                        aValue: function() {
                            return item;
                        }
                    }
                });
                modalInstance.result.then(function(paramFromDialog) {
                    $scope.paramFromDialog = paramFromDialog;
                });
            }

            function openAddCondoDialog(latLng, callback) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'app/main/components/modals/condo/AddCondoDialog.html',
                    controller: 'AddCondoController',
                    resolve: {
                        aValue: function() {
                            return latLng;
                        }
                    }
                });
                modalInstance.result.then(function(IsSuccess) {
                    callback();
                });
            }

            function openAlertWindow(alertText) {
                return $uibModal.open({
                        animation: true,
                        templateUrl: 'app/main/components/modals/info/AlertWindow.html',
                        controller: 'alertController',
                        resolve: {
                            aValue: function() {
                                return alertText;
                            }
                        }
                    })
                    .result;
            }

            function openSuggestToRegisterDialog($scope) {
                $uibModal.open({
                    animation: true,
                    templateUrl: 'app/main/components/modals/info/SuggestToRegisterDialog.html',
                    controller: 'SuggestToRegisterController',
                    resolve: {
                        aValue: function() {
                            return $scope.condo_id;
                        }
                    }
                });
            }

            function openSuggestToAddCondoDialog($scope) {
                $uibModal.open({
                    animation: true,
                    templateUrl: 'app/main/components/modals/info/SuggestToAddCondoDialog.html',
                    controller: 'SuggestToAddCondoController'
                });
            }

            function openChooseHomeDialog($scope) {
                return $uibModal.open({
                        animation: true,
                        templateUrl: '/view/user/ChooseHomeDialog.html',
                        controller: 'chooseHomeDialogController',
                        windowClass: 'choose-home-modal-window'
                    })
                    .result;
            }

            function openAddItemMarkCondoDialog($scope) {
                return $uibModal.open({
                        animation: true,
                        templateUrl: 'app/main/components/modals/condo/MarkCondoAddItemDialog.html',
                        controller: 'markCondoAddItemController',
                        windowClass: 'choose-home-modal-window',
                        controllerAs: 'modal'
                    })
                    .result;
            }

            function openItemMarkMapDialog(item) {
                return $uibModal.open({
                        animation: true,
                        templateUrl: 'app/main/components/modals/item/ItemMarkMapDialog.html',
                        controller: 'itemMarkMapController',
                        windowClass: 'choose-home-modal-window',
                        controllerAs: 'modal',
                        resolve: {
                            aValue: function() {
                                return item;
                            }
                        }
                    })
                    .result;
            }

            function openItemInfoDialog(item) {
              return $uibModal.open({
                animation: true,
                templateUrl: 'app/main/components/categories-menu/item-info/item-info-dialog.html',
                controller: 'itemInfoModalCtrl',
                windowClass: 'choose-home-modal-window',
                controllerAs: '$scope',
                size: 'lg',
                resolve: {
                  itemVal: function() {
                    return item;
                  }
                }
              }).result;
            }

            return {
                openAddItemDialog: openAddItemDialog,
                openAddCondoDialog: openAddCondoDialog,
                openAddItemMarkCondoDialog: openAddItemMarkCondoDialog,
                openAlertWindow: openAlertWindow,
                openChooseHomeDialog: openChooseHomeDialog,
                openLookAroundDialog: openLookAroundDialog,
                openSuggestToRegisterDialog: openSuggestToRegisterDialog,
                openSuggestToAddCondoDialog: openSuggestToAddCondoDialog,
                openDetailDialog: openDetailDialog,
                openItemMarkMapDialog: openItemMarkMapDialog,
                openItemInfoDialog: openItemInfoDialog
            };
        }]);
})();
