import { cart, deleteFromCart, updateCartQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utility/money.js";

updateCartQuantity(cart, ".js-return-to-home-link");

let cartSummaryHTML = "";
cart.forEach((cartItem, index) => {
  const productID = cartItem.productId;

  let matchingProduct;
  products.forEach((product) => {
    if (product.id === productID) {
      matchingProduct = product;
    }
  });

  cartSummaryHTML += `
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
    <div class="delivery-date">Delivery date: Tuesday, June 21</div>

    <div class="cart-item-details-grid">
        <img
        class="product-image"
        src="${matchingProduct.image}"
        />

        <div class="cart-item-details">
        <div class="product-name">
            ${matchingProduct.name}
        </div>
        <div class="product-price">$${formatCurrency(matchingProduct.priceCents)}</div>
        <div class="product-quantity">
            <span> Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span> </span>
            <span class="update-quantity-link link-primary js-update-quantity-link"
            data-product-id="${matchingProduct.id}">
            Update
            </span>

            <input type="number" 
                   name="update-quantity" 
                   class="quantity-input js-quantity-input-${matchingProduct.id}"
                   value="${cartItem.quantity}"/>
            <span class="save-quantity-link link-primary js-save-quantity-link"
            data-product-id="${matchingProduct.id}">
            Save
            </span>
            <span class="delete-quantity-link link-primary js-delete-link" 
            data-product-id="${matchingProduct.id}">
            Delete
            </span>
        </div>
        </div>

        <div class="delivery-options">
        <div class="delivery-options-title">
            Choose a delivery option:
        </div>
        <div class="delivery-option">
            <input
            type="radio"
            checked
            class="delivery-option-input"
            name="delivery-option-${index}"
            />
            <div>
            <div class="delivery-option-date">Tuesday, June 21</div>
            <div class="delivery-option-price">FREE Shipping</div>
            </div>
        </div>
        <div class="delivery-option">
            <input
            type="radio"
            class="delivery-option-input"
            name="delivery-option-${index}"
            />
            <div>
            <div class="delivery-option-date">Wednesday, June 15</div>
            <div class="delivery-option-price">$4.99 - Shipping</div>
            </div>
        </div>
        <div class="delivery-option">
            <input
            type="radio"
            class="delivery-option-input"
            name="delivery-option-${index}"
            />
            <div>
            <div class="delivery-option-date">Monday, June 13</div>
            <div class="delivery-option-price">$9.99 - Shipping</div>
            </div>
        </div>
        </div>
    </div>
    </div>
  `;
});

const orderSummaryElem = document.querySelector(".js-order-summary");
orderSummaryElem.innerHTML = cartSummaryHTML;

function getItemContainer(productId) {
  return document.querySelector(`.js-cart-item-container-${productId}`);
}

function getQuantityInput(productId) {
  return document.querySelector(`.js-quantity-input-${productId}`);
}

function getQuantityLabel(productId) {
  return document.querySelector(`.js-quantity-label-${productId}`);
}

document.querySelectorAll(".js-delete-link").forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;
    deleteFromCart(cart, productId);

    // Removing item container in case we press "Delete" link.
    const itemContainer = getItemContainer(productId);
    itemContainer.remove();

    // updating cartQuantity based on className
    updateCartQuantity(cart, ".js-return-to-home-link");
  });
});

document.querySelectorAll(".js-update-quantity-link").forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;
    const itemContainer = getItemContainer(productId);
    itemContainer.classList.add("is-editing-quantity");
  });
});

document.querySelectorAll(".js-save-quantity-link").forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;

    const quantityInputElem = getQuantityInput(productId);
    const itemContainer = getItemContainer(productId);
    const quantityLabelElem = getQuantityLabel(productId);
    const newValue = Number(quantityInputElem.value);

    if (newValue < 0) {
      alert("Enter Valid Value!");
      itemContainer.classList.remove("is-editing-quantity");
      return;
    } else if (newValue === 0) {
      itemContainer.remove();
      updateCartQuantity(cart, ".js-return-to-home-link");
      return;
    }

    const cartItem = cart.find((item) => item.productId === productId);
    cartItem.quantity = Number(newValue);

    quantityLabelElem.innerHTML = Number(newValue);
    itemContainer.classList.remove("is-editing-quantity");

    // saveToStorage(cart);
    updateCartQuantity(cart, ".js-return-to-home-link");
  });
});
