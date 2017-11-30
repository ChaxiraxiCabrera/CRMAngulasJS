(function () {
    'use strict';

    angular
        .module('CRM')
        .controller('CRMController', CRMController);

    CRMController.$inject = ['$scope', 'UsersLocalProvider'];

    /* @ngInject */
    function CRMController($scope, users) {
        $scope.userList = [];
        $scope.user = {};
        $scope.modify = 0;
        $scope.search = {};
        $scope.studies = ['Primaria', 'Secundaria', 'Bachiller', 'Ciclo o Grado'];
        $scope.message = 'hola';

        $scope.addUser = addUser;
        $scope.removeUser = removeUser;
        $scope.modifyUser = modifyUser;
        $scope.updateUser = updateUser;
        $scope.saveState = saveState;
        $scope.removeForm = removeForm;
        $scope.displayError = displayError;

        activate();

        ////////////////

        function activate() {
            $scope.userList = users.getUsers();
            $scope.user = users.getFormData();
            $scope.search = users.getFilterData();
            $scope.modify = users.getState();
        }

        function addUser() {
            $scope.user.id = randId();
            $scope.userList.push($scope.user);
            users.addUser($scope.user);
            $scope.user = {};
            saveState();
            $scope.userForm.$setUntouched();
        }

        function removeUser(id) {
            var name = prompt("Si desea eliminarlo introduzca el nombre");
            var index = checkId(id);
            var user = $scope.userList[index];

            if (name == user.name)
                $scope.userList.splice(index, 1);
            users.removeUser(id);
        }

        function modifyUser(id) {
            $scope.modify = 1;
            var index = checkId(id);
            var copy = angular.copy($scope.userList);
            $scope.user = copy[index];
            users.saveState(1);
            saveState();
        }

        function updateUser() {
            $scope.modify = 0;
            var index = checkId($scope.user.id);
            if (index != -1)
                $scope.userList[index] = $scope.user;
            users.updateUser($scope.user);
            users.saveState(0);
            $scope.user = {};
            $scope.userForm.$setUntouched();
        }

        function randId() {
            return Math.random().toString(36).substr(2, 10);
        }

        function saveState() {
            users.saveFormData($scope.user);
            users.saveFilters($scope.search);
        }

        function checkId(id) {
            for (var i = 0; i < $scope.userList.length; i++) {
                if ($scope.userList[i].id == id) {
                    return i;
                }
            }
            return -1;
        }

        function removeForm() {
            $scope.user = {};
            saveState();
            $scope.userForm.$setUntouched();
        }
        
        function displayError() {
            let error = $scope.userForm.age.$error;
            if (error.min){
                 $scope.message = 'La edad mínima debe ser 18';
                 return true;
            }else if (error.max) {
                $scope.message = 'La edad máxima debe ser 100';
                 return true;
            }
        }

    }
})();
