const productsDOM = document.querySelector('.products-center');
const featuredProductsDOM = document.querySelector('.featured-products-center');

const displayProducts = (products) => {
    let result = '';
    if (productsDOM) {
        // create html for all products in shopall.html
        products.forEach(product => {
            result += `
            <!-- single product -->
            <article class="product ${product.bestseller ? "best-seller" : ""}" data-active>
                <div class="img-container">
                    <img class="product-img" src=.${product.image} alt="product">
                    <button class="cart-btn" data-id=${product.id}>
                        <i class="fas fa-shopping-cart"></i>
                        add to cart
                    </button>
                    <button class="quick-view-btn" data-id=${product.id}>
                        <i class="fa-solid fa-magnifying-glass"></i>
                        quick view
                    </button>
                </div>
                <h3>${product.title}</h3>
                <h4>$${product.price}</h4>
                <p class="best-seller-info">Best Seller</p>
            </article>
            <!-- end of single product -->
            `;           
        });
        productsDOM.innerHTML = result
    } else if (featuredProductsDOM) {
        // create html only for carousel in index.html
        products.forEach(product => {
            result += `
            <!-- single product -->
            <article class="product ${product.bestseller ? "best-seller" : ""}">
                <div class="img-container">
                    <img class="product-img" src=${product.image} alt="product">
                    <button class="cart-btn" data-id=${product.id}>
                        <i class="fas fa-shopping-cart"></i>
                        add to cart
                    </button>
                    <button class="quick-view-btn" data-id=${product.id}>
                        <i class="fa-solid fa-magnifying-glass"></i>
                        quick view
                    </button>                    
                </div>
                <h3>${product.title}</h3>
                <h4>$${product.price}</h4>
                <p class="best-seller-info">Best Seller</p>
            </article>
            <!-- end of single product -->              
            `;           
        });
        featuredProductsDOM.innerHTML += result;

        // render 3 first slide in carousel [0,1,2]
        const slides = document.querySelectorAll('.product');
        for (let i = 0; i < 4; i++) {
            slides[i].dataset.active = true;
        }
    } else {
        return;
    }
}

export default displayProducts;
