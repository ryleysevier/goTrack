/**
 * Created by Ryley Sevier on 7/10/2016.
 */
var goTrack = angular.module('goTrack');
goTrack.controller('StatCtlr', function($scope, $http, $timeout, $q, $log, $location, $routeParams, apiFactory) {

    $scope.loaded = false;
    apiFactory.getTrainer($routeParams.id).then(function(trainer){
        trainer = trainer.data[0];
        $scope.newEntry.trainer = trainer.name;
        $scope.newEntry.icon = "img/balls/"+trainer.icon+".svg";
        switch (parseInt(trainer.faction)) {
            case 0:
                $scope.newEntry.faction = "img/teams/yellow.svg";
                break;
            case 1:
                $scope.newEntry.faction = "img/teams/blue.svg";
                break;
            case 2:
                $scope.newEntry.faction = "img/teams/red.svg";
                break;
        }
        $scope.loaded = true;
    });

    $scope.newEntry = {
        trainerID: $routeParams.id,
        trainer: "",
        level: 10,
        pokemon: "",
        pokemonDisabled : false,
        nickname:"",
        cp: 0,
        hp: 0,
        weight: 0,
        weightMod: 0,
        height: 0,
        heightMod: 0,
        attackReg: "",
        attackRegDmg: "",
        attackRegType: "",
        attackRegEnabled: true,
        attackSp: "",
        attackSpDmg: "",
        attackSpType: "",
        attackSpEnabled: true
    };



    $scope.allPokemon = [];
    $scope.allAttackTypes = [];
    $scope.allAttacks = [];

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
            $scope.newEntry.pokemon = selectedPokemonObj.pokedex;
        }
    }

    function createFilterFor(query) {
        var lowercaseQuery = angular.lowercase(query);
        return function filterFn(targetString) {
            return (targetString.value.indexOf(lowercaseQuery) === 0);
        };
    }


/////********************************************************
/////********************************************************

    var attackList = apiFactory.getMovesList()
        .then(function successCallback(response){
            attackList = response.data.map( function (repo) {
                repo.value = repo.attack.toLowerCase();
                return repo;
            });
        });

    self.queryRegAttackSearch   = queryAttackSearch;
    self.querySpAttackSearch   = queryAttackSearch;
    self.selectedAttackRegChange = selectedAttackRegChange;
    self.selectedAttackSpChange = selectedAttackSpChange;
    self.searchTextChange   = searchTextChange;

    // ******************************
    // Internal methods
    // ******************************

    /**
     * Search for repos... use $timeout to simulate
     * remote dataservice call.
     */
    function queryAttackSearch (query) {
        var results = query ? attackList.filter(createRegAttackFilterFor(query)) : attackList;
        return results;
    }

    function searchTextChange(text) {
        $log.info('Text changed to ' + text);
    }

    function selectedAttackRegChange(attackObj) {
        $log.info('Item changed to ' + JSON.stringify(attackObj));
        if(attackObj!=undefined) {
            $scope.newEntry.attackRegID = attackObj.id
            $scope.newEntry.attackReg = attackObj.attack;
            $scope.newEntry.attackRegType = attackObj.type;
            $scope.newEntry.attackRegTypeIcon = "img/moves/move" + attackObj.type.toLowerCase() + ".svg";

            $scope.newEntry.attackRegDmg = parseInt(attackObj.damage);
        }
    }
    function selectedAttackSpChange(attackObj) {
        $log.info('Item changed to ' + JSON.stringify(attackObj));
        if(attackObj!=undefined) {
            $scope.newEntry.attackSpID = attackObj.id
            $scope.newEntry.attackSp = attackObj.attack;
            $scope.newEntry.attackSpType = attackObj.type;
            $scope.newEntry.attackSpTypeIcon = "img/moves/move" + attackObj.type.toLowerCase() + ".svg";
            $scope.newEntry.attackSpDmg = parseInt(attackObj.damage);
        }
    }


    /**
     * Create filter function for a query string
     */
    function createRegAttackFilterFor(query) {
        var lowercaseQuery = angular.lowercase(query);

        return function filterFn(item) {
            return (item.value.indexOf(lowercaseQuery) === 0);
        };

    }
    function createSpAttackFilterFor(query) {
        var lowercaseQuery = angular.lowercase(query);

        return function filterFn(item) {
            return (item.value.indexOf(lowercaseQuery) === 0);
        };

    }

    $scope.regAttackPlaceholder = "Select the Regular Attack"
    $scope.regAttackDisabled = false;
    $scope.enableRegMoveFields = function(){
        $scope.newEntry.attackRegEnabled = false;

        //clear out the old object just in case they selected something
        $scope.attackRegObj = null;
        $scope.searchRegAttackText = "";
        $scope.regAttackDisabled = true;
        $scope.regAttackPlaceholder = "Enter The New Attack Information Below";

        $scope.newEntry.attackRegID = "";
        $scope.newEntry.attackReg = "";
        $scope.newEntry.attackRegType = "";
        $scope.newEntry.attackRegTypeIcon = "";
        $scope.newEntry.attackRegDmg = 0;
    }


    $scope.spAttackDisabled = false;
    $scope.spAttackPlaceholder = "Select the Special Attack";
    $scope.enableSpMoveFields = function(){
        $scope.newEntry.attackSpEnabled = false;

        //clear out the old object just in case they selected something
        //clear out the old object just in case they selected something
        $scope.attackSpObj = null;
        $scope.searchSpAttackText = "";
        $scope.spAttackPlaceholder = "Enter The New Attack Information Below";
        $scope.spAttackDisabled = true;

        $scope.newEntry.attackSpID = "";
        $scope.newEntry.attackSp = "";
        $scope.newEntry.attackSpType = "";
        $scope.newEntry.attackSpTypeIcon = "";
        $scope.newEntry.attackSpDmg = 0;
    }

    $scope.save = function(){
        apiFactory.createNewPokemon($scope.newEntry).then(function(data){
            console.log(data);
            $location.path("dex/" + $routeParams.id);
        });
    }

})
    .config(function($mdThemingProvider) {
        $mdThemingProvider.theme('blue')
            .primaryPalette('light-blue')
            .warnPalette('red')
            .dark();

        $mdThemingProvider.theme('red')
                .primaryPalette('red')
                .warnPalette('red')
                .dark();

        $mdThemingProvider.theme('yellow')
            .primaryPalette('yellow')
            .warnPalette('red')
            .dark();

    }).filter('numberFixedLen', function () {
        return function (n, len) {
            var num = parseInt(n, 10);
            len = parseInt(len, 10);
            if (isNaN(num) || isNaN(len)) {
                return n;
            }
            num = '' + num;
            while (num.length < len) {
                num = '0' + num;
            }
            return num;
        }
    });

