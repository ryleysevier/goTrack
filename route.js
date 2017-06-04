/**
 * Created by Ryley Sevier on 7/11/2016.
 */

var goTrack = angular.module('goTrack');

goTrack.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/trainer', {
                templateUrl: 'trainer/trainerVw.html',
                controller: 'TrainerCtlr'
            }).
            when('/pokemon/:id', {
                templateUrl: 'pokemon/pokemonVw.html',
                controller: 'StatCtlr'
            }).
            when('/dex/:id', {
                templateUrl: 'dex/dexVw.html',
                controller: 'DexCtlr'
            }).
            when('/analysis', {
                templateUrl: 'analysis/analysisVw.html',
                controller: 'AnalysisCtlr'
            }).
            otherwise({
                redirectTo: '/trainer'
            });
    }])