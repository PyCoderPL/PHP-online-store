// create local storage class
class Storage {
    // create static method (no need to create new instance of class
    static saveProducts(products) {
     localStorage.setItem('products', JSON.stringify(products));
    }
    static getProduct(id) {
     // get string from LS and change into json
     let products = JSON.parse(localStorage.getItem('products'));
     // retrive product if product id in LS = id parameter
     return products.find(product => product.id === id);
    }
    static saveCart(cart) {
     localStorage.setItem('cart', JSON.stringify(cart));
    }
    static getCart() {
     return localStorage.getItem('cart')
         ? JSON.parse(localStorage.getItem('cart'))
         : []
    }
 }

export default Storage;