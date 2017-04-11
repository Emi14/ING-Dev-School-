(function (module) {

    var sportsStoreCtrl=function ($http,dataUrl,orderUrl,cart,$location) {
        var vm=this;

        vm.data={};

        $http.get(dataUrl)
            .then(function (response) {
                vm.data.products = response.data;
            },(function (error) {
                vm.data.error = error;
            }));

        vm.sendOrder = function (shippingDetails) {
            var order = angular.copy(shippingDetails);
            order.products = cart.getProducts();
            $http.post(orderUrl, order)
                .then(function (data) {
                    vm.data.orderId = data.id;
                    cart.getProducts().length = 0;
                }, (function (error) {
                    vm.data.orderError = error;
                })).finally(function () {
                $location.path("/complete");
            });

        };

    };
    module.constant("dataUrl", "http://localhost:5500/products")
        .constant("orderUrl", "http://localhost:5500/orders")
        .controller('sportsStoreCtrl',sportsStoreCtrl);
}(angular.module("sportsStore")));
