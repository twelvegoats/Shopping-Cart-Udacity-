/* Create 3 or more product objects using object literal notation 
   Each product should include five properties
   - name: name of product (string)
   - price: price of product (number)
   - quantity: quantity in cart should start at zero (number)
   - productId: unique id for the product (number)
   - image: picture of product (url string)
*/

const cherry = {
  name: "Cherry",
  price: 3,
  quantity: 0,
  productId: 1,
  image: "./images/cherry.jpg",
};

const orange = {
  name: "Orange",
  price: 4,
  quantity: 0,
  productId: 2,
  image: "./images/orange.jpg",
};

const strawberry = {
  name: "Strawberry",
  price: 5,
  quantity: 0,
  productId: 3,
  image: "./images/strawberry.jpg",
};

/* Create an array named products which you will use to add all of your product object literals that you create in the next step. */

// Moved products array below the objects declaration because of scoping issues
const products = [cherry, orange, strawberry];

/* Images provided in /images folder. All images from Unsplash.com
   - cherry.jpg by Mae Mu
   - orange.jpg by Mae Mu
   - strawberry.jpg by Allec Gomes
*/

/* Declare an empty array named cart to hold the items in the cart */

const cart = [];

/* Create a function named addProductToCart that takes in the product productId as an argument
  - addProductToCart should get the correct product based on the productId
  - addProductToCart should then increase the product's quantity
  - if the product is not already in the cart, add it to the cart
*/

const addProductToCart = (productId) => {
  const product = products.find((product) => product.productId === productId);
  if (product) {
    product.quantity++;
    if (!cart.includes(product)) {
      cart.push(product);
    }
  }
};

/* Create a function named increaseQuantity that takes in the productId as an argument
  - increaseQuantity should get the correct product based on the productId
  - increaseQuantity should then increase the product's quantity
*/

const increaseQuantity = (productId) => {
  const product = products.find((product) => product.productId === productId);
  if (product) {
    product.quantity++;
  }
};

/* Create a function named decreaseQuantity that takes in the productId as an argument
  - decreaseQuantity should get the correct product based on the productId
  - decreaseQuantity should decrease the quantity of the product
  - if the function decreases the quantity to 0, the product is removed from the cart
*/

const decreaseQuantity = (productId) => {
  // Find the product in the products array
  for (let i = 0; i < products.length; i++) {
    if (products[i].productId === productId) {
      products[i].quantity--;

      if (products[i].quantity === 0) {
        // Find and remove the product from cart
        for (let j = 0; j < cart.length; j++) {
          if (cart[j].productId === productId) {
            cart.splice(j, 1);
            break;
          }
        }
      }
      break;
    }
  }
};

/* Create a function named removeProductFromCart that takes in the productId as an argument
  - removeProductFromCart should get the correct product based on the productId
  - removeProductFromCart should update the product quantity to 0
  - removeProductFromCart should remove the product from the cart
*/

const removeProductFromCart = (productId) => {
  // Find the product in the products array
  for (let i = 0; i < products.length; i++) {
    if (products[i].productId === productId) {
      products[i].quantity = 0;

      // Find and remove the product from cart
      for (let j = 0; j < cart.length; j++) {
        if (cart[j].productId === productId) {
          cart.splice(j, 1);
          break;
        }
      }
      break;
    }
  }
};

/* Create a function named cartTotal that has no parameters
  - cartTotal should iterate through the cart to get the total cost of all products
  - cartTotal should return the total cost of the products in the cart
  Hint: price and quantity can be used to determine total cost
*/

const cartTotal = () => {
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    total += cart[i].price * cart[i].quantity;
  }
  return parseFloat(total.toFixed(2));
};

/* Create a function called emptyCart that empties the products from the cart */

const emptyCart = () => {
  // Reset product quantities
  products.forEach((product) => {
    product.quantity = 0;
  });

  // Reset payment when cart is emptied
  cart.length = 0;
  remainingBalance = 0;
};

/* Create a function named pay that takes in an amount as an argument
  - amount is the money paid by customer
  - pay will return a negative number if there is a remaining balance
  - pay will return a positive number if money should be returned to customer
  Hint: cartTotal function gives us cost of all the products in the cart  
*/

let remainingBalance = 0;

const pay = (amount) => {
  const totalCost = cartTotal();

  // Set the balance
  if (remainingBalance === 0 && totalCost > 0) {
    remainingBalance = totalCost;
  }

  remainingBalance -= amount;

  // Return change and reset
  if (remainingBalance <= 0) {
    const change = Math.abs(remainingBalance);
    remainingBalance = 0;
    return parseFloat(change.toFixed(2));
  }

  // Return remaining balance
  return parseFloat((-remainingBalance).toFixed(2));
};

/* Place stand out suggestions here (stand out suggestions can be found at the bottom of the project rubric.)*/

const exchangeRates = {
  USD: 1,
  EUR: 0.85,
  YEN: 110,
};

// Store original prices to avoid conversion errors
const originalPrices = products.map((product) => ({
  productId: product.productId,
  price: product.price,
}));

const currency = (currencyCode) => {
  const rate = exchangeRates[currencyCode];

  // Convert all product prices
  products.forEach((product) => {
    const originalPrice = originalPrices.find(
      (p) => p.productId === product.productId
    ).price;
    product.price = parseFloat((originalPrice * rate).toFixed(2));
  });

  // Reset payment state when currency changes
  remainingBalance = 0;
};

/* The following is for running unit tests. 
   To fully complete this project, it is expected that all tests pass.
   Run the following command in terminal to run tests
   npm run test
*/

module.exports = {
  products,
  cart,
  addProductToCart,
  increaseQuantity,
  decreaseQuantity,
  removeProductFromCart,
  cartTotal,
  pay,
  emptyCart,
  /* Uncomment the following line if completing the currency converter bonus */
  currency,
};
