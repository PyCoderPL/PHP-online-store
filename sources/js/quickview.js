import Storage from "./storage.js";
import Cart from "./cart.js";
const cart = new Cart();

const quickViewCenter = document.querySelector('.quick-view-center');
const cartOverlay = document.querySelector('.cart-overlay');

class QuickViewModal {
    QuickViewHandler() {
        const quickViewBtns = document.querySelectorAll('.quick-view-btn');
        // show Quick-View modal
        quickViewBtns.forEach( (button) => {
            button.addEventListener('click', () => {
                let id = button.dataset.id;
                let productsInfo = Storage.getProduct(id);
                let cart = Storage.getCart().find(item => item.id === id);

                this.createQuickViewDOM(productsInfo, cart);
                this.displayQuickView();
                this.updateShoppingCart();

                // close Quick-View modal after click 'x'
                const quickViewClose = document.querySelector('.quick-view-close');
                quickViewClose.addEventListener('click', this.closeQuickView);
                // close Quick-View modal after click anywhere
                cartOverlay.addEventListener('click', (event) => {
                    if (event.target.classList.contains('cart-overlay')) {
                        cartOverlay.classList.remove('transparentBcg');
                        quickViewCenter.classList.remove('show');
                    }
                })          
            })
        })
    }
    createQuickViewDOM(data, cart) {
        let result = `<span class="quick-view-close">
        <i class="fas fa-window-close"></i>
        </span>
        <img class="" src=${data.image} alt="product">
        <article class="quick-view">
        <h3 class="">${data.title}</h3>
        <h4 class="">$${data.price}</h4>
        <p class="product-desc">${data.descr}</p>
        <button class="quick-view-cart-btn" data-id=${data.id}>
        ${cart ? `in cart (${cart.amount})` : '<i class="fas fa-shopping-cart"></i>add to cart'}
        </button>     
        </article>`
        quickViewCenter.innerHTML = result;
    }
    displayQuickView() {
        cartOverlay.classList.add('transparentBcg');
        quickViewCenter.classList.add('show');
    }    
    closeQuickView() {
        cartOverlay.classList.remove('transparentBcg');
        quickViewCenter.classList.remove('show');
    }
    closeQuickViewAfterBuy() {
        quickViewCenter.classList.remove('show');
    }
    updateShoppingCart() {
        const addToCartBtn = document.querySelector('.quick-view-cart-btn');
        // const id = addToCartBtn.dataset.id;
        addToCartBtn.addEventListener('click', (event) => {
            cart.addToCartSetup(event);
            this.closeQuickViewAfterBuy();
            console.log('add to cart from Quick View');
        });
    }
}

export default QuickViewModal;
