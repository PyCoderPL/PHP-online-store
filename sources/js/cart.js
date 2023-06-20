import Storage from "./storage.js";

const cartDOM = document.querySelector('.cart');
const cartOverlay = document.querySelector('.cart-overlay');

const cartBtn = document.querySelector('.nav-cart-btn');
const closeCartBtn = document.querySelector('.close-cart');
const clearCartBtn = document.querySelector('.clear-cart');

const cartContent = document.querySelector('.cart-content');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');

let fileName = location.href.split('/').slice(-1);
fileName = fileName[0];
let imagesDirectory = fileName === 'index.html' || fileName === "" ? '' : '.';

// global variables after DOM loaded
let cart = [];
let buttonsDOM = [];

class Cart {
    // reload 'Cart' after page refresh and activate show/close buttons
    reloadCart() {
        // get 'Shopping Cart' (with all products) from localstorage if exists
        cart = Storage.getCart();
        this.populateCartItems(cart);
        this.setCartValue(cart);
        this.setBtnValue();
        // show 'Cart' on click
        cartBtn.addEventListener('click', this.showCart);
        // close 'Cart' on click 'x'
        closeCartBtn.addEventListener('click', this.hideCart);
        // close 'Cart' on click anywhere outside 'Cart'
        cartOverlay.addEventListener('click', (event) => {
            if (event.target.classList.contains('cart-overlay')) {
                cartOverlay.classList.remove('transparentBcg');
                cartDOM.classList.remove('showCart');  
            }
        })
    }
    // create 'Cart Item' DOM (for each product)
    populateCartItems(cart) {
        cart.forEach(item => this.addCartItem(item));
    }
    // create 'cart item' DOM (for each product) callback
    addCartItem(item) {
        const div = document.createElement('div');
        div.classList.add('cart-item');
        div.innerHTML = `
            <img src=${imagesDirectory}${item.image} alt="product">
            <div>
                <h5>$${item.price}</h5>
                <h4>${item.title}</h4>
                <span class="remove-item" data-id=${item.id}>remove</span>
            </div>
            <div>
                <i class="fas fa-chevron-up" data-id=${item.id}></i>
                <p class="item-amount" data-id=${item.id}>${item.amount}</p>
                <i class="fas fa-chevron-down" data-id=${item.id}></i>
            </div>`;
        cartContent.appendChild(div);
    }
    // set 'Total Price' in cart and 'Total Count' next to shop icon
    setCartValue(cart) {
        let itemsTotalPrice = 0;
        let itemsTotalCount = 0;
        cart.map( item => {
            itemsTotalPrice += item.price * item.amount;
            itemsTotalCount += item.amount;
        })
        cartTotal.innerText = parseFloat(itemsTotalPrice.toFixed(2));
        cartItems.innerText = itemsTotalCount; 
    }  
    setBtnValue() {
        // get nodelist of btns and change nodelist into array
        // array has better access to particular button than nodelist
        const buttons = [...document.querySelectorAll('.cart-btn')];
        buttonsDOM = buttons;
        buttons.forEach(button => {
            let id = button.dataset.id;
            // get 'Item Cart' from 'Cart'
            let inCart = cart.find(item => item.id === id);
            if (inCart) {
                // set amount in buttons after reload page
                button.innerText = `in cart (${inCart.amount})`;
            }
        })
    }
    // listen 'add to cart buttons'
    addToCart() {
        buttonsDOM.forEach(button => {
            button.addEventListener('click', (event) => {
                this.addToCartSetup(event)
            })
        })
    }
    // listen 'add to cart buttons' cont. and add to 'cart'
    addToCartSetup(event) {
        // check if product already is in the cart
        let id = event.target.dataset.id;
        let inCart = cart.find(item => item.id === id);
        let index = cart.indexOf(inCart);
        if (inCart) {
            // update amount in single cart item
            inCart.amount += 1;
            // update whole cart item in cart
            cart[index] = inCart;                    
            // save cart in local storage
            Storage.saveCart(cart);
            // set cart values
            this.setCartValue(cart);
            // update counter in cart
            const counters = [...document.querySelectorAll('.fa-chevron-up')];
            const counter = counters.find(counter => counter.dataset.id === id);
            counter.nextElementSibling.innerText = inCart.amount;
            // show the cart and overlay
            this.showCart();
            // update counter in 'add to cart' btn
            buttonsDOM.find(button => button.dataset.id === id).innerText = `in cart (${inCart.amount})`;
            // update counter in quick view'add to cart' btn            
            event.target.innerText = `in cart (${inCart.amount})`;
            console.log('update product')
        } else {
            // get product from products
            let cartItem = {...Storage.getProduct(id), amount: 1};
            // add product to the cart items
            cart = [...cart, cartItem];
            // save cart in local storage
            Storage.saveCart(cart);
            // set cart values
            this.setCartValue(cart);
            // display cart item
            this.addCartItem(cartItem);
            // show the cart and overlay
            this.showCart();
            // update counter in 'add to cart' btn
            buttonsDOM.find(button => button.dataset.id === id).innerText = `in cart (${cartItem.amount})`;
            // update counter in quick view'add to cart' btn
            event.target.innerText = `in cart (${cartItem.amount})`;
            console.log('add new product')
        } 
    }
    // show shopping cart after click (CSS)
    showCart() {
        cartOverlay.classList.add('transparentBcg');
        cartDOM.classList.add('showCart');
    }
    // close shopping cart after click x (CSS)
    hideCart() {
        cartOverlay.classList.remove('transparentBcg');
        cartDOM.classList.remove('showCart');  
    }
    inCartOperations() {
        clearCartBtn.addEventListener('click', () => {
            this.clearCart();
        });
        cartContent.addEventListener('click', event => {
            // console.log(event.target);
            // activate 'remove' button in shopping cart
            if (event.target.classList.contains('remove-item')) {
                let removeBtn = event.target;
                let id = removeBtn.dataset.id;
                // remove 'div.cart-item'
                cartContent.removeChild(removeBtn.parentElement.parentElement); 
                this.removeItem(id);
            } else if (event.target.classList.contains('fa-chevron-up')) {
                // increase product
                let upBtn = event.target;
                let id = upBtn.dataset.id;
                let cartItem = cart.find(item => item.id === id);
                cartItem.amount += 1;
                Storage.saveCart(cart);
                this.setCartValue(cart);
                upBtn.nextElementSibling.innerText = cartItem.amount;
                buttonsDOM.find(button => button.dataset.id === id).innerText = `in cart (${cartItem.amount})`;
            } else if (event.target.classList.contains('fa-chevron-down')) {
                // decrease product
                let downBtn = event.target;
                let id = downBtn.dataset.id;
                let cartItem = cart.find(item => item.id === id);
                cartItem.amount -= 1;
                if (cartItem.amount > 0) {
                    Storage.saveCart(cart);
                    this.setCartValue(cart);
                    downBtn.previousElementSibling.innerText = cartItem.amount;
                    buttonsDOM.find(button => button.dataset.id === id).innerText = `in cart (${cartItem.amount})`;
                } else {
                    cartContent.removeChild(downBtn.parentElement.parentElement); 
                    this.removeItem(id); 
                }
            }
        })
    }
    // callback 
    clearCart() {
        // create an array with id
        let cartItems = cart.map(item => item.id);
        // loop over the array and call removeItem method
        cartItems.forEach(id => this.removeItem(id));
        while (cartContent.children.length > 0) {
            cartContent.removeChild(cartContent.children[0]);
        }
        this.hideCart();        
    }
    // callback
    removeItem(id) {
        //  return cart excepts items in cart
        cart = cart.filter(item => item.id !== id);
        // clear shopping values
        this.setCartValue(cart);
        // update cart in localstorage
        Storage.saveCart(cart);
        // change back buttons from 'in cart' to 'add to cart'
        let button = this.getSingleButton(id);
        button.disabled = false;
        button.innerHTML = `<i class="fas fa-shopping-cart"></i>add to cart`;
    }
    // callback
    // return buttons only with id from shooping cart
    getSingleButton(id) {
        return buttonsDOM.find(button => button.dataset.id === id);
    }
}

export default Cart;
