(function () {
    'use strict';
    angular
        .module('CRM')
        .factory('UserServerProvider', UserServerProvider);

    UserServerProvider.$inject = ['$http'];

    /* @ngInject */
    function UserServerProvider($http) {
        var exports = {
            getCustomers: getCustomers,
            addCustomers: addCustomers,
            removeCustomer: removeCustomer,
            updateCustomer: updateCustomer
        };


        return exports;

        ////////////////

        function getCustomers() {
            return $http.get('http://localhost:3000/api/customers')
                .then(formatData)
                .catch(displayError);
        }

        function formatData(response) {
            var userFormat = response.data;
            for (let i = 0; i < userFormat.length; i++) {
                userFormat[i].id = userFormat[i].customerId;
            }
            return userFormat;
        }

        function displayError() {
            console.log('Error al obtener los datos del servidor');
        }

        function addCustomers(newUser) {
            return $http.post('http://localhost:3000/api/customers', newUser)
                .then(generateId)
                .catch(displayError);
        }


        function generateId(response) {
            return response.data.customerId;
        }
        
        function succes(response){
            console.log(response);
        }

        function removeCustomer(id) {
            var url = 'http://localhost:3000/api/customers/' + id
            return $http.delete(url)
                .then(succes)
                .catch(displayError);
        }
        
        function updateCustomer(user){
            var url = 'http://localhost:3000/api/customers/' + user.id;
            return $http.put(url, user)
                .then(succes)
                .catch(displayError);
        }

    }
})();
