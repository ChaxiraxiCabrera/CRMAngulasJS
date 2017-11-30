(function () {
    'use strict';
    angular
        .module('CRM')
        .factory('UsersLocalProvider', UsersLocalProvider);

    UsersLocalProvider.$inject = [];

    /* @ngInject */
    function UsersLocalProvider(){
        var exports = {
            getUsers: getUsers,
            getFormData: getFormData,
            getFilterData: getFilterData,
            getState: getState,
            addUser: addUser,
            removeUser: removeUser,
            updateUser: updateUser,
            saveState: saveState,
            saveFormData: saveFormData,
            saveFilters: saveFilters
        };
        
        return exports;

        ////////////////

        function getUsers() {
            if('data' in localStorage) {
                return JSON.parse(localStorage.getItem('data'));
            } else {
                return [];
            }
        }
        
        function getFormData(){
            if ('form' in localStorage){
                return JSON.parse(localStorage.getItem('form'));
            } else {
                return [];
            }
        }
        
        function getFilterData(){
            if ('filters' in localStorage){
                return JSON.parse(localStorage.getItem('filters'));
            } else {
                return {};
            }
        }
        
        function getState(){
            if ('modify' in localStorage){
                return localStorage.getItem('modify');
            } else {
                return 0;
            }
        }
        
        function addUser(newUser){
            var users = getUsers();
            users.push(newUser);
            localStorage.setItem('data', JSON.stringify(users));
        }
        
        function removeUser(id){
            var users = getUsers();
            for(let i = 0; i < users.length; i++){
                if (users[i].id == id)
                    users.splice(i, 1);
            }
            localStorage.setItem('data',JSON.stringify(users));
        }
        
        function updateUser(user){
            var users = getUsers();
            for(let i = 0; i < users.length; i++){
                if (users[i].id == user.id)
                    users[i] = user;
            }
            localStorage.setItem('data',JSON.stringify(users));
        }
        
        function saveState(newState) {
            localStorage.setItem('modify', newState);
        }
        
        function saveFormData(data){
            localStorage.setItem('form', JSON.stringify(data));
        }
        
        function saveFilters(filters){
            localStorage.setItem('filters', JSON.stringify(filters));
        }
        
    }
})();