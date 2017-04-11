(function (module) {

    var productListCtrl = function (productListActiveClass,productListPageCount,cart) {

        var prod=this;

        var selectedCategory = null;

        prod.selectedPage = 1;
        prod.pageSize = productListPageCount;

        prod.selectCategory = function (newCategory) {
            selectedCategory = newCategory;
            prod.selectedPage = 1;
        };

        prod.selectPage = function (newPage) {
            prod.selectedPage = newPage;
        };

        prod.categoryFilterFn = function (product) {
            return selectedCategory == null ||
                product.category == selectedCategory;
        };

        prod.getCategoryClass = function (category) {
            return selectedCategory == category ? productListActiveClass : "";
        };

        prod.getPageClass = function (page) {
            return prod.selectedPage == page ? productListActiveClass : "";
        };

        prod.addProductToCart = function (product) {
            cart.addProduct(product.id, product.name, product.price);
        };
    };

    module.constant("productListActiveClass", "btn-primary")
        .constant("productListPageCount", 3)
        .controller("productListCtrl",productListCtrl);

}(angular.module("sportsStore")));
