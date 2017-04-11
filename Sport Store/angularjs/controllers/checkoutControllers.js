(function (module) {

    var cartSummaryController=function (cart) {
        var summary=this;

        summary.cartData = cart.getProducts();
        summary.total = function () {
            var total = 0;
            for (var i = 0; i < summary.cartData.length; i++) {
                total += (summary.cartData[i].price * summary.cartData[i].count);
            }
            return total;
        }
        summary.remove = function (id) {
            cart.removeProduct(id);
        }
    };

    module.controller("cartSummaryController",cartSummaryController);

}(angular.module("sportsStore")));