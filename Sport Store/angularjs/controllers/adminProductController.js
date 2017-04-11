(function (module) {

    var productCtrl=function ($resource, productUrl) {
        var vm=this;

        vm.productsResource = $resource(productUrl + ":id", { id: "@id" });
        vm.listProducts = function () {
            vm.products = vm.productsResource.query();
        };
        vm.deleteProduct = function (product) {
            product.$delete().then(function () {
                vm.products.splice(vm.products.indexOf(product), 1);
            });
        };
        vm.createProduct = function (product) {
            new vm.productsResource(product).$save().then(function (newProduct) {
                vm.products.push(newProduct);
                vm.editedProduct = null;
            });
        };
        vm.updateProduct = function (product) {
            product.$save();
            vm.editedProduct = null;
        };
        vm.startEdit = function (product) {
            vm.editedProduct = product;
        };
        vm.cancelEdit = function () {
            vm.editedProduct = null;
        };
        vm.listProducts();

    };


    module.constant("productUrl", "http://localhost:5500/products/")
        .config(function($httpProvider) {
            $httpProvider.defaults.withCredentials = true;
        })
        .controller("productCtrl",productCtrl);
}(angular.module("sportsStoreAdmin")));
