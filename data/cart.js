export const cart = [];

export function addToCart(cart, productId, itemQuantity) {
  let found = false;
  cart.forEach((item) => {
    if (item.productId === productId) {
      item.quantity += itemQuantity;
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
