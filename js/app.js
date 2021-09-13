
// load products function
const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add('col');
    div.innerHTML = `
    <div class=" card h-100 shadow rounded  text-center p-3 single-product">
    
      <img src="${image}" class=" card-img-top" height="200px" alt="">
    
    <div class="card-body ">
      <h5 class="card-title">${product.title}</h5>
      <p class="card-text"> Category: ${product.category}</p>
      <p class="card-text"> Rating: ${product.rating.rate}</p>
      <p class="card-text"> Total Rating count: ${product.rating.count}</p>
      <h3>Price: $ ${product.price}</h3>
    </div>

    <div class="card-footer  border-0">
      <button onclick="addToCart(${product.price})"  class="buy-now btn btn-success">add to cart</button>
      <button id="details-btn" class="btn btn-danger">Details</button></div>
    </div>
  </div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};


let count = 0;
// Add products price to cart  function
const addToCart = (price) => {
  count = count + 1;

  // Update product price of the cart
  updatePrice("price", price);

  // update tax of the main price
  updateTaxAndCharge();
  updateTotal();
  document.getElementById("total-Products").innerText = count;
};

// get input value function 
const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = (total).toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = (value).toFixed(2);
};

// update delivery charge and total Tax 
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");

  // set delivery charge 30  and tax 20% for products price greater than 200
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }

  // set delivery charge 50 and tax 30% for products price greater than 400
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }

  // set delivery charge 60 and tax 40% for products price greater than 500
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};
