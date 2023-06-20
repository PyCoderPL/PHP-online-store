import Products from "./sources/js/getProducts.js";
import displayProducts from "./sources/js/displayProducts.js";
import Storage from "./sources/js/storage.js";
import carousel from "./sources/js/carousel.js";
import searchProducts from './sources/js/search.js';
import QuickViewModal from "./sources/js/quickview.js";
import Cart from "./sources/js/cart.js";
import Login from "./sources/js/login.js"

document.addEventListener('DOMContentLoaded', () => {
    // new instance of constructors
    const products = new Products();
    const cart = new Cart();
    const quickviewmodal = new QuickViewModal();
    const login = new Login();

    products.getProducts().then((data) => {
        displayProducts(data);
        Storage.saveProducts(data);
        carousel();
        searchProducts(data);
        quickviewmodal.QuickViewHandler();
        login.LoginCart();
        login.closeLoginCart();
    }).then( () => {
        cart.reloadCart();
        cart.addToCart();
        cart.inCartOperations();
    })
})

