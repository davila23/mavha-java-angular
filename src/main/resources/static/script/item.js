var app = angular.module('items', ['ngResource', 'ngGrid', 'ui.bootstrap']);


// Controler para el bind de la grilla
app.controller('itemsListController', function ($scope, $rootScope, itemservice,$http) {

    // Refresco grilla , llamando al Controler
    $scope.refreshGrid = function () {
        $http({
            url: '/items',
            method: 'GET',
        }).success(function (data) {
            $scope.items = data;

            console.log(data);
        });

    };

    // Delate Row
    $scope.deleteRow = function (row) {
        $rootScope.$broadcast('deleteItem', row.entity.id);
    };

    // Refresh Grid
    $scope.$on('refreshGrid', function () {
        $scope.refreshGrid();
    });

    $scope.filterOptions = {
        filter: $scope.myFilter,
        useExternalFilter: true
    }

    $scope.lowerLimit = 50;

    // Filtrado
    $scope.myFilter = function(entry) {
        if (entry < $scope.lowerLimit) {
            return false;
        }
        return true;
     }

    $scope.gridOptions = {
        data: 'items',
        enableFiltering: true,
        enableColumnResize: true,
        multiSelect: true,
        enableSorting: true,
        selectedItems: $scope.selectedEntries,
        filterOptions: $scope.filterOptions,
        selectAll :  true,

        columnDefs: [
            { field: 'id', displayName: 'ID' },
            { field: 'description', displayName: 'Description' },
            { field: 'Resolved', cellTemplate: '<div class="ngSelectionCell"><input tabindex="-1"  class="ngSelectionCheckbox" type="checkbox" ng-checked="row.resolved" /> </div>'},
            { field: '', width: 40, cellTemplate: '<span class="glyphicon glyphicon-remove remove" ng-click="deleteRow(row)"></span>' }
        ],

        multiSelect: false,
        selectedItems: [],

        // Selector Item
        afterSelectionChange: function (rowItem) {
            if (rowItem.selected) {
                $rootScope.$broadcast('itemselected', $scope.gridOptions.selectedItems[0].id);
            }
        }
    };
});


// Create a controller with name itemsFormController to bind to the form section.
app.controller('itemsFormController', function ($scope, $rootScope, itemservice) {

  // Select Item
    $scope.$on('itemSelected', function (event, id) {
        $scope.item = itemservice.get({id: id});
    });

  // Save / Update Item
    $scope.updateitem = function () {
        itemservice.save($scope.item).$promise.then(
            function () {
                // Refresco Grilla
                $rootScope.$broadcast('refreshGrid');
                // Notificacion de Creado
                $rootScope.$broadcast('itemsaved');
                // Reset de formulario
                $scope.clearForm();
            },
            function () {
                // Error de servidor
                $rootScope.$broadcast('error');
            });
    };

  // Delete Item
    $scope.$on('deleteItem', function (event, id) {
        itemservice.delete({id: id}).$promise.then(
            function () {
                // Refresco Grilla
                $rootScope.$broadcast('refreshGrid');
                // Notificacion de borrado
                $rootScope.$broadcast('itemDeleted');
                $scope.clearForm();
            },
            function () {
                // Server Error
                $rootScope.$broadcast('error');
            });
    });

  // Clear Form
    $scope.clearForm = function () {
        $scope.item = null;
            // Clear Display
        document.getElementById('imageUrl').value = null;
            // Resets forms
        $scope.itemForm.$setPristine();
            // Clear
        $rootScope.$broadcast('clear');
      };
});

// Notificaciones
app.controller('alertMessagesController', function ($scope) {

    // Item guardado
    $scope.$on('itemSaved', function () {
        $scope.alerts = [
            { type: 'success', msg: 'Item saved successfully!' }
        ];
    });

    // Item Borrado
    $scope.$on('itemDeleted', function () {
        $scope.alerts = [
            { type: 'success', msg: 'Item deleted successfully!' }
        ];
    });

    // Error Servidor
    $scope.$on('error', function () {
        $scope.alerts = [
            { type: 'danger', msg: 'There was a problem in the server!' }
        ];
    });

    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };
});

app.factory('itemservice', function ($resource) {
    return $resource('items/:id');
});
