// const client = contentful.createClient({
//     space: 'abc',
//     accessToken: 'abc',
// });

//get file name
let fileName = location.href.split('/').slice(-1);
fileName = fileName[0];
let directory = fileName === 'index.php' || fileName === "" ? 'products.json' : '../products.json';
    
// get products
class Products {
    async getProducts() {
        try {
            // get products from json file (all json)
            let result = await fetch(directory);
            let data = await result.json();
            // get 'items' from json (items are defined in 'products.json' file)
            let products = data.items;
            
            // get products from Contentful:
            // let contentful = await client.getEntries({
            //     content_type: 'leatherstore'
            // })
            // console.log(contentful.items);
            // let products = contentful.items;

            // create new array
            products = products.map(item => {
                const {id} = item.sys;
                const {title, price, bestseller, descr} = item.fields;
                const image = item.fields.image.fields.file.url;
                return {id,title,price,bestseller,descr,image};
            })
            // products.forEach(product => console.log(product.id));
            return products;
        } catch (error) {
            console.log(error);
        }
    }
 }

 export default Products;