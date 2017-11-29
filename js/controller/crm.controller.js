(function () {
    'use strict';

    angular
        .module('CRM')
        .controller('CRMController', CRMController);

    CRMController.$inject = ['$scope'];

    /* @ngInject */
    function CRMController($scope) {
        $scope.userList = [];
        $scope.user = {};
        $scope.modify = 0;
        $scope.search = {};
        $scope.studies = ['Primaria', 'Secundaria', 'Bachiller', 'Ciclo o Grado'];

        $scope.addUser = addUser;
        $scope.removeUser = removeUser;
        $scope.modifyUser = modifyUser;
        $scope.updateUser = updateUser;
        $scope.saveState = saveState;
        $scope.removeForm = removeForm;

        activate();

        ////////////////

        function activate() {
            if (checkData()) {
                var data = JSON.parse(localStorage.getItem('data'));
                $scope.userList = data;

                if (checkState()) {
                    $scope.search = JSON.parse(localStorage.getItem('filters'));
                    $scope.user = JSON.parse(localStorage.getItem('form'));
                }
            }
        }

        function addUser() {
            $scope.user.id = randId();
            $scope.userList.push($scope.user);
            $scope.user = {};
            saveData();
            saveState();
            $scope.userForm.$setUntouched();
        }

        function removeUser(id) {
            var name = prompt("Si desea eliminarlo introduzca el nombre");
            var index = checkId(id);
            var user = $scope.userList[index];

            if (name == user.name)
                $scope.userList.splice(index, 1);
            saveData();
        }

        function modifyUser(id) {
            $scope.modify = 1;
            var index = checkId(id);
            var copy = angular.copy($scope.userList);
            $scope.user = copy[index];
        }

        function updateUser() {
            $scope.modify = 0;
            var index = checkId($scope.user.id);
            if (index != -1)
                $scope.userList[index] = $scope.user;
            saveData();
            $scope.user = {};
            $scope.userForm.$setUntouched();
        }

        function randId() {
            return Math.random().toString(36).substr(2, 10);
        }

        function saveData() {
            localStorage.setItem('data', JSON.stringify($scope.userList));
        }

        function saveState() {
            localStorage.setItem('form', JSON.stringify($scope.user));
            localStorage.setItem('filters', JSON.stringify($scope.search));
        }

        function checkData() {
            if (localStorage.getItem('data') == null)
                return false;
            return true;
        }

        function checkState() {
            if ((localStorage.getItem('form') == null) && (localStorage.getItem('filter') == null))
                return false;
            return true;
        }

        function checkId(id) {
            for (var i = 0; i < $scope.userList.length; i++) {
                if ($scope.userList[i].id == id) {
                    return i;
                }
            }
            return -1;
        }

        function checkForm() {
            if ($scope.user.name && $scope.user.photo && $scope.user.phone && $scope.user.studies && $scope.user.mail)
                return true;
            return false;
        }

        function removeForm() {
            $scope.user = {};
            saveState();
            $scope.userForm.$setUntouched();
        }

    }
})();
