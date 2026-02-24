export const cart = [];

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
}
