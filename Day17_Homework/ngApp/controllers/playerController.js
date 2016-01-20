var MyApp;
(function (MyApp) {
    var Controllers;
    (function (Controllers) {
        var PlayersController = (function () {
            function PlayersController($resource, $routeParams, $uibModal) {
                this.$uibModal = $uibModal;
                this.playerResource = $resource('/api/players/:id');
                this.getPlayers();
            }
            PlayersController.prototype.getPlayers = function () {
                this.playersAll = this.playerResource.query();
            };
            PlayersController.prototype.getPlayer = function (id) {
                this.playerInd = this.playerResource.get({ id: id });
            };
            PlayersController.prototype.savePlayer = function () {
                var _this = this;
                this.playerResource.save(this.playerDetails).$promise.then(function () {
                    _this.getPlayers(); // reloading page
                }).catch(function (error) {
                    var validationErrors = [];
                    for (var i in error.data.modelState) {
                        var errorMessage = error.data.modelState[i];
                        validationErrors = validationErrors.concat(errorMessage);
                    }
                    _this.validationErrors = validationErrors;
                });
            };
            PlayersController.prototype.showModal = function (player) {
                this.$uibModal.open({
                    templateUrl: '/ngApp/views/modals/playerModal.html',
                    controller: ModalController,
                    controllerAs: "vm",
                    resolve: {
                        data: function () { return player; }
                    },
                    size: "sm"
                });
            };
            PlayersController.prototype.doSort = function (prop) {
                this.sortBy = prop;
                this.reverse = !this.reverse;
            };
            return PlayersController;
        })();
        Controllers.PlayersController = PlayersController;
    })(Controllers = MyApp.Controllers || (MyApp.Controllers = {}));
})(MyApp || (MyApp = {}));
var ModalController = (function () {
    function ModalController(data, $uibModalInstance, $resource, $route) {
        this.data = data;
        this.$uibModalInstance = $uibModalInstance;
        this.$route = $route;
        this.playerResource = $resource('/api/players/:id');
    }
    ModalController.prototype.closeModal = function () {
        this.$uibModalInstance.close();
        this.$route.reload();
    };
    ModalController.prototype.savePlayer = function () {
        var _this = this;
        this.playerResource.save(this.playerDetails).$promise.then(function () {
            _this.getPlayers();
            _this.closeModal();
        }).catch(function (error) {
            var validationErrors = [];
            for (var i in error.data.modelState) {
                var errorMessage = error.data.modelState[i];
                validationErrors = validationErrors.concat(errorMessage);
            }
            _this.validationErrors = validationErrors;
        });
    };
    ModalController.prototype.getPlayers = function () {
        this.playersAll = this.playerResource.query();
    };
    ModalController.prototype.getPlayer = function (id) {
        this.playerDetails = this.playerResource.get({ id: id });
    };
    ModalController.prototype.deletePlayer = function (id, name) {
        var answer = confirm("Are you sure you want to permanently delete " + name + " ?");
        if (answer) {
            this.playerResource.delete({ id: id });
            this.closeModal();
        }
    };
    return ModalController;
})();
