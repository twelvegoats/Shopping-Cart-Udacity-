# Udacity Shopping Cart

A JavaScript-based shopping cart application that demonstrates fundamental web development concepts including object-oriented programming and test-driven development.

## 🎯 What I Learned

### JavaScript Fundamentals

- **Object Literal Notation**: Created product objects with properties like `productId`, `name`, `price`, and `image`
- **Array Manipulation**: Managed cart items using array methods like `find()`, `push()`, and `map()`
- **Function Design**: Implemented modular functions for cart operations (add, remove, increase/decrease quantity)
- **ES6 Features**: Used arrow functions, template literals, and modern JavaScript syntax

### Test-Driven Development (TDD)

- **Test Coverage**: Ensured all functions work correctly through automated testing
- **Debugging**: Used tests to identify and fix issues in cart logic

### Application Architecture

- **Separation of Concerns**:
  - `script.js` - Core business logic and data management
  - `index.html` - Structure and layout

### Advanced Features Implemented

- **Currency Conversion**: Built a currency converter that updates all product prices in real-time
- **Payment Processing**: Created a payment system that calculates change and handles insufficient funds

### Problem-Solving Skills

- **Cart Logic**: Implemented complex cart operations like preventing duplicate items and handling quantity changes
- **Mathematical Calculations**: Built accurate total calculation and change-making functionality
- **Edge Case Handling**: Managed scenarios like empty carts, insufficient payments, and currency conversions

## 🚀 Features

- Add products to cart
- Increase/decrease item quantities
- Remove items from cart
- Calculate cart totals
- Process payments with change calculation
- Multi-currency support
- Empty cart functionality
- Real-time UI updates

## 🧪 Testing

Run the test suite to verify all functionality:

```bash
npm run test
```

## 🐛 Issues Encountered & Solutions

### 1. Currency Symbol Display Bug

**Problem**: The payment receipt was displaying incorrect currency formatting with trailing dollar signs and inconsistent currency symbols.

**Location**: `/src/assets/front.js` - Payment event listener

**Solution**:

- Removed the trailing `$` from the returned value display
- Changed the remaining balance to use `${currencySymbol}` to properly show the correct currency symbol instead of hardcoded `$`

**Before**:

```javascript
div.innerHTML = `
    <p>Remaining Balance: -$${-cashReturn}$</p>  // Had trailing $
`;
```

**After**:

```javascript
div.innerHTML = `
    <p>Remaining Balance: -${currencySymbol}${-cashReturn}</p>  // Clean formatting
`;
```

### 2. JavaScript Scoping Issue with Products Array

**Problem**: Initially declared the products array before the individual product objects were defined, causing reference errors.

**Location**: `/src/assets/script.js`

**Root Cause**: JavaScript hoisting behavior - the array was trying to reference objects that weren't yet defined in the execution context.

**Solution**:

Moved the `products` array declaration below the individual product object declarations to ensure proper scoping.

**Before**:

```javascript
const products = [cherry, orange, strawberry]; // Referenced before declaration

const cherry = { /* object definition */ };
const orange = { /* object definition */ };
const strawberry = { /* object definition */ };
After:
const cherry = { /* object definition */ };
const orange = { /* object definition */ };
const strawberry = { /* object definition */ };

// Moved products array below the objects declaration because of scoping issues
const products = [cherry, orange, strawberry];
```

**After**:

```javascript
const cherry = {
  /* object definition */
};
const orange = {
  /* object definition */
};
const strawberry = {
  /* object definition */
};

// Moved products array below the objects declaration because of scoping issues
const products = [cherry, orange, strawberry];
```
