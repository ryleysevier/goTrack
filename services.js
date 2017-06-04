/**
 * Created by Ryley Sevier on 7/10/2016.
 */
var goTrack = angular.module('goTrack');

goTrack.factory('apiFactory', ['$http', function($http) {

    var urlBase = './options.php';
    var apiFactory = {};

    apiFactory.getTrainers = function () {
        return $http.post(urlBase, {op: "getTrainers"});
    };

    apiFactory.getTrainer = function (id) {
        return $http.post(urlBase, {op: "getTrainer", id: id});
    };

    apiFactory.getAllPokemon = function () {
        return $http.post(urlBase, {op: "getPokemon"});
    };

    apiFactory.getTrainersPokemon = function (id) {
        return $http.post(urlBase, {op: "getTrainersPokemon", id: id});
    };

    apiFactory.getCPMultiplier = function (id) {
        return $http.post(urlBase, {op: "getCPMultiplier", level: level});
    };

    apiFactory.getMovesList = function () {
        return $http.post(urlBase, {op: "getAttacks"});
    };

    apiFactory.createNewPokemon = function (newEntry) {
        return $http.post(urlBase, {op: "addPokemon", newEntry: newEntry})
    };

    apiFactory.getPossibleNumberOfPowerUps = function(stardustCost){
        return $http.post(urlBase, {op: "getPossiblePowerUpsByStardustCost", "stardustCost": stardustCost})
    };



    return apiFactory;
}]);

