/**
 * Created by Ryley Sevier on 7/10/2016.
 */
var goTrack = angular.module('goTrack');
goTrack.controller('AnalysisCtlr', function($scope, $http, $timeout, $q, $log, $location, $routeParams, apiFactory) {

    $scope.minimumLevel = 1;
    $scope.trainerLevel = 10;
    $scope.maximumLevel = $scope.trainerLevel;
    $scope.baseStamina = $scope.hp * 2;
    $scope.poweredUp = false;
    $scope.additionalCPMultiplier = 0;

    $scope.stardustPowerUpCost;
    $scope.stardustPowerUpCosts = [200,400,600,800,1000,1300,1600,1900,2200,2500,3000,3500,4000,4500,5000,6000,7000,8000,9000,10000];

    $scope.lowestPowerUps;
    $scope.highestPowerUps;
    $scope.lowestCPMultiplier;
    $scope.highestCPMultiplier;


    $scope.levelOneThroughTen

    $scope.trainerLevelChange = function(){
        $scope.maximumLevel = ($scope.trainerLevel + 1.5);
    };

    $scope.calculateBaseAttack = function(){
        $scope.baseAttack = parseInt(2 * (Math.pow($scope.pokemonAttack * $scope.pokemonSpecialAttack,0.5) +
                            Math.pow($scope.pokemonSpeed,0.5)));

    }

    $scope.calculateBaseDefense = function(){
        $scope.baseDefense = parseInt(2 * (Math.pow($scope.pokemonDefense * $scope.pokemonSpecialDefense,0.5) +
                            Math.pow($scope.pokemonSpeed,0.5)));
        parseInt($scope.baseDefense);
    }

    $scope.calculateBaseStamina = function(){
        $scope.baseStamina = $scope.hp * 2;
        if($scope.baseAttack != undefined){
            $scope.calculateMaxCP();
        }
    }

    $scope.stardustCostChange = function(){
        if($scope.stardustPowerUpCost != undefined){
            var returnData = apiFactory.getPossibleNumberOfPowerUps($scope.stardustPowerUpCost)
                .then(function successCallback(response){
                    $scope.lowestPowerUps = parseInt(response.data.minLevel);
                    $scope.highestPowerUps = parseInt(response.data.maxLevel);
                    $scope.lowestCPMultiplier = parseFloat(response.data.minCPMultiplier);
                    $scope.highestCPMultiplier = parseFloat(response.data.maxCPMultiplier);
                });
        }
    }

    $scope.calculateMaxCP = function(){
        $scope.maxPokemonCP = parseFloat((($scope.baseAttack + 15) *
        Math.pow(($scope.baseDefense + 15),0.5) *
        Math.pow(($scope.baseStamina + 15),0.5) * Math.pow(0.7903001,2))/10);
    }




    //logic for the pokemon selection system
    //need to get a bunch of values out of a table to use
    //for most of the calculations
    var self = this;
    self.pokemonQuerySearch   = pokemonQuerySearch;
    self.selectedItemChange = selectedItemChange;

    var pokemonList = apiFactory.getAllPokemon()
        .then(function successCallback(response){
            pokemonList = response.data.map( function (repo) {
                repo.value = repo.name.toLowerCase();
                repo.img = repo.img.toLowerCase();
                return repo;
            });
        });

    function pokemonQuerySearch (query) {
        var results = query ? pokemonList.filter( createFilterFor(query) ) : pokemonList;

        return results;
    }

    function selectedItemChange(selectedPokemonObj) {
        if(selectedPokemonObj!=undefined) {
            $scope.pokemonAttack = parseInt(selectedPokemonObj.attack);
            $scope.pokemonDefense = parseInt(selectedPokemonObj.defense);
            $scope.pokemonSpecialAttack = parseInt(selectedPokemonObj.specialAttack);
            $scope.pokemonSpecialDefense = parseInt(selectedPokemonObj.specialDefense);
            $scope.pokemonSpeed = parseInt(selectedPokemonObj.speed);

            $scope.calculateBaseAttack();
            $scope.calculateBaseDefense();
            $scope.calculateBaseStamina();
        }
    }

    function createFilterFor(query) {
        var lowercaseQuery = angular.lowercase(query);
        return function filterFn(targetString) {
            return (targetString.value.indexOf(lowercaseQuery) === 0);
        };
    }

});

