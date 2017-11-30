(function () {
    'use strict';

    angular
        .module('CRM')
        .controller('CRMController', CRMController);

    CRMController.$inject = ['$scope', 'StateLocalProvider', 'UserServerProvider'];

    /* @ngInject */
    function CRMController($scope, state, usersServer) {
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
            usersServer.getCustomers()
                .then(successConnection)
                .catch(displayServerError);
            $scope.user = state.getFormData();
            $scope.search = state.getFilterData();
            $scope.modify = state.getState();
        }

        function addUser() {
            //users.addUser($scope.user);
            usersServer.addCustomers($scope.user)
                .then()
                .catch(displayServerError);
           
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
            usersServer.removeCustomer(id);
        }

        function modifyUser(id) {
            $scope.modify = 1;
            var index = checkId(id);
            var copy = angular.copy($scope.userList);
            $scope.user = copy[index];
            state.saveState(1);
            saveState();
        }

        function updateUser() {
            $scope.modify = 0;
            var index = checkId($scope.user.id);
            if (index != -1)
                $scope.userList[index] = $scope.user;
            usersServer.updateCustomer($scope.user);
            state.saveState(0);
            $scope.user = {};
            $scope.userForm.$setUntouched();
        }

        function randId() {
            return Math.random().toString(36).substr(2, 10);
        }

        function saveState() {
            console.log($scope.user);
            state.saveFormData($scope.user);
            state.saveFilters($scope.search);
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
        
        function successConnection(users){
            $scope.userList = users;
        }
        
        function successAdd(id){
            $scope.user.id = id;
            $scope.userList.push($scope.user);
        }
        
        function displayServerError(e){
            console.log("Error al leer datos del servidor");
        }

    }
})();
