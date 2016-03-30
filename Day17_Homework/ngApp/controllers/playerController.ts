namespace MyApp.Controllers {

    export class PlayersController {

        private playerResource;
        public playersAll;
        public playerInd;
        public playerDetails;
        public validationErrors;
        public sortBy;
        public reverse;

        constructor($resource: ng.resource.IResourceService, $routeParams: ng.route.IRouteParamsService, private $uibModal: angular.ui.bootstrap.IModalService) {
            this.playerResource = $resource('/api/players/:id');
            this.getPlayers();
        }

        public getPlayers() {
            this.playersAll = this.playerResource.query();
        }

        public getPlayer(id) {
            this.playerInd = this.playerResource.get({ id: id });
        }

        public savePlayer() {

            this.playerResource.save(this.playerDetails).$promise.then(() => {

                this.getPlayers(); // reloading page

            }).catch((error) => {

                let validationErrors = [];
                for (let i in error.data.modelState) {
                    let errorMessage = error.data.modelState[i];
                    validationErrors = validationErrors.concat(errorMessage);
                }
                this.validationErrors = validationErrors;
            });
        }

        public showModal(player) {
            this.$uibModal.open({
                templateUrl: '/ngApp/views/modals/playerModal.html',
                controller: ModalController,
                controllerAs: "vm",
                resolve: {
                    data: ()=>player
                },
                size: "sm"
            });
        }

        public doSort(prop) {
            this.sortBy = prop;
            this.reverse = !this.reverse;
        }
    }


}

class ModalController {

    public playerResource;
    public playerDetails;
    public validationErrors;
    public playersAll;

    constructor(public data, private $uibModalInstance: angular.ui.bootstrap.IModalServiceInstance, $resource: ng.resource.IResourceService, private $route: ng.route.IRouteService) {
        this.playerResource = $resource('/api/players/:id');
    }

    closeModal() {
        this.$uibModalInstance.close();
        this.$route.reload();
    }


    public savePlayer(playerToSave) {

        this.playerResource.save(playerToSave).$promise.then(() => {
            this.getPlayers();
            this.closeModal();
        }).catch((error) => {

            let validationErrors = [];
            for (let i in error.data.modelState) {
                let errorMessage = error.data.modelState[i];
                validationErrors = validationErrors.concat(errorMessage);
            }
            this.validationErrors = validationErrors;
        });
    }

    public getPlayers() {
        this.playersAll = this.playerResource.query();
    }

    public getPlayer(id) {
        this.playerDetails = this.playerResource.get({ id: id });
    }

    public deletePlayer(id, name) {
        let answer = confirm("Are you sure you want to permanently delete " + name + " ?");
        if (answer) {
            this.playerResource.delete({ id: id });
            this.closeModal();
        }
    }
}