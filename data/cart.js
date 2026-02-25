export let cart = JSON.parse(localStorage.getItem("cart")) || [
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2,
  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1,
  },
];

function saveToStorage(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(cart, productId, itemQuantity) {
  let found = false;
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      cartItem.quantity += itemQuantity;
      found = true;
    }
  });

  if (!found) {
    cart.push({
      productId: productId,
      quantity: itemQuantity,
    });
  }
  saveToStorage(cart);
}

export function deleteFromCart(cart, productId) {
  const index = cart.findIndex((cartItem) => cartItem.productId === productId);
  if (index !== -1) {
    cart.splice(index, 1);
  }
  saveToStorage(cart);
}

// showing "Added {checkmark}" message whenever the "Add to chart"
// button is pressed
export function showAddedToCartMessage(productId, delayMilliseconds) {
  const addToCartMessage = document.querySelector(
    `.js-added-to-cart-${productId}`,
  );

  addToCartMessage.classList.add("message-is-visible");
  setTimeout(() => {
    addToCartMessage.classList.remove("message-is-visible");
  }, delayMilliseconds);
}

// function to always to keep the cartQuantity updated.
export function updateCartQuantity(cart, className) {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  cartQuantity = cartQuantity === 0 ? "" : cartQuantity;
  document.querySelector(`${className}`).innerHTML = cartQuantity;
}
