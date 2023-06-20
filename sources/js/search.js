import displayProducts from "./displayProducts.js";
const searchBarInput = document.querySelector('.search-bar-input');

const searchProducts = (products) => {
    if (searchBarInput) {
        searchBarInput.addEventListener('input', () => {
            // const inputValue = event.target.value;
            const inputValue = searchBarInput.value;
            const foundProducts = products.filter( (product) => {
                if (product.title.toLowerCase().includes(inputValue.toLowerCase())) {
                    return product;
                    // console.log(product);
                }
            })
            const emptySearch = document.querySelector('.empty-search');
            foundProducts.length === 0 
                ? emptySearch.classList.add('active') 
                : emptySearch.classList.remove('active');
            displayProducts(foundProducts);
        })
    }
}

export default searchProducts;