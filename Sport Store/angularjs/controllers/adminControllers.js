(function (module) {

    var authCtrl=function ($http, $location, authUrl) {
        var vm = this;

        vm.authenticate = function (user, pass) {
            $http.post(authUrl, {
                username: user,
                password: pass
            }, {
                withCredentials: true
            }).then(function (response) {
                $location.path("/main");
            }, (function (error) {
                vm.authenticationError = error;
            }));
        };
    };

    var mainCtrl= function () {
        var vm=this;

        vm.screens = ["Products", "Orders"];
        vm.current = vm.screens[0];
        vm.setScreen = function (index) {
            vm.current = vm.screens[index];
        };
        vm.getScreen = function () {
            return vm.current == "Products"
                ? "views/adminProducts.html" : "views/adminOrders.html";
        };
    };

    var ordersCtrl= function ($http, ordersUrl) {
        var vm=this;

        $http.get(ordersUrl, {withCredentials : true})
            .then(function (response) {
                vm.orders = response.data;
            },(function (error) {
                vm.error = error;
            }));
        vm.selectedOrder;
        vm.selectOrder = function(order) {
            vm.selectedOrder = order;
        };
        vm.calcTotal = function(order) {
            var total = 0;
            for (var i = 0; i < order.products.length; i++) {
                total +=order.products[i].count * order.products[i].price;
            }
            return total;
        }
    };

    module.constant("authUrl", "http://localhost:5500/users/login")
        .constant("ordersUrl", "http://localhost:5500/orders")
        .controller("mainCtrl",mainCtrl)
        .controller("authCtrl",authCtrl)
        .controller("ordersCtrl",ordersCtrl);
}(angular.module("sportsStoreAdmin")));
