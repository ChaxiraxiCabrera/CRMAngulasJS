(function () {
    'use strict';
    angular
        .module('CRM')
        .factory('StateLocalProvider', StateLocalProvider);

    StateLocalProvider.$inject = [];

    /* @ngInject */
    function StateLocalProvider(){
        var exports = {
            getFormData: getFormData,
            getFilterData: getFilterData,
            getState: getState,
            saveState: saveState,
            saveFormData: saveFormData,
            saveFilters: saveFilters
        };
        
        return exports;

        ////////////////

        
        function getFormData(){
            if ('formInfo' in localStorage){
                return JSON.parse(localStorage.getItem('formInfo'));
            } else {
                return {};
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
        
        
        function saveState(newState) {
            localStorage.setItem('modify', newState);
        }
        
        function saveFormData(data){
            localStorage.setItem('formInfo', JSON.stringify(data));
            
            
        }
        
        function saveFilters(filters){
            localStorage.setItem('filters', JSON.stringify(filters));
        }
        
    }
})();