/**
 * Created by Ryley Sevier on 7/10/2016.
 */
var goTrack = angular.module('goTrack');
goTrack.controller('DexCtlr', function($scope, $location, $routeParams, apiFactory) {
    var self = this;

    $scope.trainerID = $routeParams.id;

    var builtTiles = [];
    apiFactory.getTrainersPokemon($routeParams.id)
        .then(function(pokemonList){
            if(pokemonList.data == "null") {
                self.tiles = [{
                    background: "green",
                    cp: "???",
                    hp: "??",
                    id: "",
                    img: "",
                    isOpen: false,
                    nickname: "No Pokemon Have Been Caught!",
                    pokemon: ""
                }]
            } else {
                builtTiles = buildGridModel(pokemonList.data);
                self.tiles = builtTiles;
            }
        });

    function buildGridModel(trainerList){
        var j=1;
        angular.forEach(trainerList, function(trainer, trainerIndex, list){
            list[trainerIndex].span = {row: 1, col: 1};
            list[trainerIndex].isOpen = false;
            switch (j + 1) {
                case 1:
                    list[trainerIndex].background = "red";
                    //list[trainerIndex].span.row = list[trainerIndex].span.col = 2;
                    break;
                case 2:
                    list[trainerIndex].background = "green";
                    break;
                case 3:
                    list[trainerIndex].background = "darkBlue";
                    break;
                case 4:
                    list[trainerIndex].background = "blue";
                    break;
                case 5:
                    list[trainerIndex].background = "yellow";
                    break;
                case 6:
                    list[trainerIndex].background = "pink";
                    break;
                case 7:
                    list[trainerIndex].background = "darkBlue";
                    break;
                case 8:
                    list[trainerIndex].background = "purple";
                    break;
                case 9:
                    list[trainerIndex].background = "deepBlue";
                    break;
                case 10:
                    list[trainerIndex].background = "lightPurple";
                    break;
                case 11:
                    list[trainerIndex].background = "yellow";
                    break;
                case 12:
                    list[trainerIndex].background = "red";
                    break;
            }
            j++; if(j>11){j=0;}
        });
        return trainerList;
    }

    $scope.goToSubPage = function(trainerId){
        $location.path("pokemon/" + trainerId);
    }

    $scope.goToTrainerPage = function(){
        $location.path("trainer/");
    }


})
    .config(function($mdThemingProvider) {
        // Configure a dark theme with primary foreground yellow
        $mdThemingProvider.theme('docs-dark', 'default')
            .primaryPalette('yellow')
            .dark();
    });
