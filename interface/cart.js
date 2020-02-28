let httpGet = theUrl => {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", theUrl, false);
  xmlHttp.send(null);
  return JSON.parse(xmlHttp.response);
};
let productList = httpGet("http://localhost:3000/api/v1/products");
let prdList = [];

let createProductList = jsonProductList => {
  const productListElt = document.getElementById("productList");

  jsonProductList.forEach(item => {
    const newProduct = document.createElement("div");
    productListElt.appendChild(newProduct);
    newProduct.setAttribute("class", "product");
    newProduct.setAttribute("id", item._id);
    newProduct.innerHTML = `<img src=${item.imgUrl}></img>
        <h2>${item.name}</h2>
        <p>${item.description}</p>
        <p>${item.price}</p>
        <select selected=1>
            <option value=1>1</option>
            <option value=2>2</option>
            <option value=3>3</option>
            <option value=4>4</option>
            <option value=5>5</option>
            <option value=6>6</option>
            <option value=7>7</option>
            <option value=8>8</option>
            <option value=9>9</option>
            <option value=10>10</option>
        </select>
        <button onClick="addProductToCart(this.parentNode.id,parseInt(this.parentNode.childNodes[8].value))">Add</button>`;
  });
  prdList = jsonProductList;
};

let cart = [];

let createCartProduct = (name, price, quantity) => {
  const cartElt = document.getElementById("cart");
    const cartProduct = document.createElement("div");
    cartElt.appendChild(cartProduct);
    cartProduct.innerHTML = `<p>${name}</p>
        <p>${price}</p>
        <button onClick="incrementQuantity(this.nextSibling)">+</button>
        <p>${quantity}</p>
        <button onClick="decrementQuantity(this.previousSibling)">-</button>
        `;
};

let incrementQuantity = (node) => {
  
    let quantity = parseInt(node.nextSibling.textContent);
    quantity++
    node.nextSibling.innerHTML = quantity

}

let decrementQuantity = (node) => {
     
    let quantity = parseInt(node.previousSibling.textContent);
    quantity--
    node.previousSibling.innerHTML = quantity
    if(quantity == 0) {
        const productElt = node.parentNode;

    }
}


let addProductToCart = (id, quantity) => {

    let getProduct = prdList.find(item => item._id == id);
    let isInCart = cart.find(item => item._id == id);
    if(!isInCart){
        getProduct.quantity = quantity;
        cart.push(getProduct);
        createCartProduct(getProduct.name, getProduct.price, quantity);
    }else{
        isInCart.quantity = isInCart.quantity + quantity;

    }

};

setTimeout(createProductList(productList), 700);