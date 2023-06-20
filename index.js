//Loads video before showing

function loadVideo() {
  return new Promise((resolve, reject) => {
    const videoElement = document.querySelector('#video-banner');
    videoElement.addEventListener('loadedmetadata', () => {
      resolve(videoElement);
    });
    videoElement.addEventListener('error', (error) => {
      reject(error);
    });
  });
}

(async () => {
  try {
    const video = await loadVideo();
    video.style.display = 'block';
  } catch (error) {
    console.error('Error loading video:', error);
  }
})();

//All products

const products = [
  {
    name: "Hoppy Haze 330ml", 
    price: 2.30, 
    img: "./item1.jpg",
    stars: 4.5,
    desc: "Immerse yourself in the hazy world of craft beer with the tantalizing Hoppy Haze. This New England-style IPA boasts a luscious blend of tropical fruit flavors, balanced with a generous hop profile that offers a smooth bitterness. With its cloudy appearance and juicy aroma, Hoppy Haze is a beer drink that will captivate your taste buds."
  },
  {
    name:"Amber Twilight 500ml",
    price: 3.40,
    img: "./item2.jpg",
    stars: 4.8,
    desc: "Experience the magic of a sunset with the captivating Amber Twilight. This amber ale delivers a rich and toasty malt character, complemented by a subtle blend of caramel and nutty flavors. Sip on this beer as you watch the sun dip below the horizon, and let the warm embrace of Amber Twilight transport you to a moment of pure tranquility."
  },
  {
    name:"Hoppy Haze 500ml",
    price: 4.30,
    img: "./item3.jpg",
    stars: 4.5,
    desc: "Immerse yourself in the hazy world of craft beer with the tantalizing Hoppy Haze. This New England-style IPA boasts a luscious blend of tropical fruit flavors, balanced with a generous hop profile that offers a smooth bitterness. With its cloudy appearance and juicy aroma, Hoppy Haze is a beer drink that will captivate your taste buds."
  },
  {
    name: "Amber Twilight 330ml",
    price: 2.30,
    img: "./item4.jpg",
    stars: 4.8,
    desc: "Experience the magic of a sunset with the captivating Amber Twilight. This amber ale delivers a rich and toasty malt character, complemented by a subtle blend of caramel and nutty flavors. Sip on this beer as you watch the sun dip below the horizon, and let the warm embrace of Amber Twilight transport you to a moment of pure tranquility."
  },
  {
    name: "Citrus Zephyr 500ml",
    price: 4.50,
    img: "./item5.jpg",
    stars: 4.9,
    desc: "Refresh your senses with the invigorating burst of Citrus Zephyr. This citrus-infused wheat beer offers a crisp and tangy flavor, derived from a blend of zesty lemon and orange peel. With its light body and effervescent nature, Citrus Zephyr is the perfect beer drink to enjoy on a sunny afternoon, bringing a cool breeze to your palate."
  },
  {
    name: "Stout Serenade 500ml",
    price: 3.60,
    img: "./item6.jpg",
    stars: 4.4,
    desc: "Indulge in the velvety embrace of Stout Serenade, a beer drink that sings with deep and complex flavors. This robust stout offers notes of dark chocolate, roasted coffee, and a hint of smokiness, creating a symphony of richness on your palate. With its thick, creamy texture, Stout Serenade is a true delight for beer enthusiasts."
  },
  {
    name: "Belgian Breeze 330ml",
    price: 2.50,
    img: "./item7.jpg",
    stars: 4.6,
    desc: "Embark on a journey to Belgium with the effervescent and aromatic Belgian Breeze. This Belgian-style wheat beer showcases a spicy and fruity yeast character, with hints of coriander and orange peel. Its light and refreshing nature make it a delightful companion for leisurely afternoons and warm summer evenings."
  },
  {
    name: "Pale Moonrise 500ml",
    price: 3.90,
    stars: 4.8,
    img: "./item8.jpg",
    desc: "Witness the beauty of a Pale Moonrise as you savor this crisp and hop-forward American Pale Ale. Bursting with citrus and floral notes, this beer drink offers a balanced bitterness and a clean finish. Raise a glass to the glowing moon and let Pale Moonrise transport you to a moment of pure beer-drinking bliss."
  }
];
addProducts();

//function for star calculation
function calculateStars(stars, item, starsNum) {
  const fullStars = Math.floor(stars);
  const remindingStar = Number((stars - fullStars).toFixed(1));
  let halfOrEmpty = false;
  if (remindingStar >= 0.5) {
    halfOrEmpty = true;
  } else if (remindingStar < 0.5) {
    halfOrEmpty = false;
  }
  
  const spotsWithStar = Math.ceil(stars);
  const starDiv = document.querySelector("#star-container" + item);
  for (let i = 0; i < fullStars; i++) {
    let fullStarIcon = document.createElement("i");
    fullStarIcon.classList.add("fa", "fa-star");
    document.getElementById("star-container" + item).append(fullStarIcon);
  } 
  if (halfOrEmpty && fullStars !== 5) {
    const halfStar = document.createElement("i");
    halfStar.classList.add("fa", "fa-star-half-o");
    document.getElementById("star-container" + item).append(halfStar)
  } else if (!halfOrEmpty && fullStars !== 5) {
    const emptyStar = document.createElement("i");
    emptyStar.classList.add("fa", "fa-star-o");
    document.getElementById("star-container" + item).append(emptyStar);
  }
  if (fullStars !== 5) {
    for (let j = 0; j < 5 - spotsWithStar; j++) {
      const emptyStar = document.createElement("i");
      emptyStar.classList.add("fa", "fa-star-o");
      document.getElementById("star-container" + item).append(emptyStar);
    }
  }
  document.getElementById("star-container" + item).append(starsNum);
}

//Sorts top products by stars and displays them in the DOM
  const copyOfProducts = products.slice();
  const sortedStars = (copyOfProducts).sort(function(a, b){
  return b.stars - a.stars;
}); 

for (let i = 0; i < 3; i++) {
  const topProduct = sortedStars[i];
  const topProductDiv = document.createElement("div");
  const topProductImage = document.createElement("img");
  const topProductName = document.createElement("h3");
  topProductName.classList.add("top-product-name");
  const topProductPrice = document.createElement("h3");
  topProductPrice.classList.add("top-product-price");
  topProductPrice.innerHTML = topProduct.price + " €";
  topProductName.innerHTML = topProduct.name;
  const button = document.createElement("button");
  topProductDiv.classList.add("product");
  topProductImage.setAttribute("src", topProduct.img);
  button.innerHTML = "View Product";
  topProductDiv.append(topProductImage, topProductName, topProductPrice, button);
  document.querySelector(".slider").append(topProductDiv);
}


//starts top product slider loop

const slideInterval = 5000;
const slider = document.querySelector('.slider');
const sliderItems = document.querySelectorAll(".product");

let currentSlide = 0;

function nextSlide() {
  currentSlide = (currentSlide + 1) % sliderItems.length;
  slider.style.transform = `translateX(-${currentSlide * 100}%)`;
}

setInterval(nextSlide, slideInterval);


// sets cartAmount to 0
let cartAmount = 0;

//adds products
function addProducts() {
  const productsSpot = document.querySelector(".all-products")
  products.forEach((element, index) => {
    const div = document.createElement("div");
    div.setAttribute("id", "product" + index);
    div.setAttribute("class", "product-container");
    div.setAttribute("data-price", element.price);
    const image = document.createElement("img");
    const name = document.createElement("h3");
    name.innerHTML = element.name;
    name.classList.add("product-name")
    image.classList.add("product-image");
    image.setAttribute("src", element.img);
    const button = document.createElement("button");
    button.setAttribute("onclick", "addToCart(" + index + ")")
    button.classList.add("cart-button")
    const price = document.createElement("h3");
    price.classList.add("product-price");
    price.innerHTML = (element.price).toFixed(2) + " €";
    const shoppingCartIcon = document.createElement("i");
    shoppingCartIcon.classList.add("fa", "fa-shopping-cart", "cart-icon");
    button.innerHTML = "Add to cart";
    button.append(shoppingCartIcon);
    const description = document.createElement("p");
    description.innerHTML = element.desc;
    const div2 = document.createElement("div");
    div2.classList.add("star-container");
    div2.setAttribute("id", "star-container" + index);
    const starsNum = document.createElement("h3");
    starsNum.classList.add("star-rating")
    starsNum.innerHTML = "(" + element.stars + ")";
    
    div.append(image);
    div.append(name);
    div.append(div2);
    div.append(price);
    div.append(button);
    div.append(description);
    productsSpot.append(div);
    calculateStars(element.stars, index, starsNum);
  })
}

const navBar = document.querySelector(".links");
const burgerParts = document.querySelectorAll(".burger-part");

document.querySelector(".burger").addEventListener("click", toggleNav);

document.querySelector(".close-container").addEventListener("click", toggleCart);

document.querySelector(".shopping-cart").addEventListener("click", toggleCart);

//Toggles nav
function toggleNav() {
  if (cartOpen === true) {
    return;
  }
  if (navOpen === false){
    navOpen = true;
  } else {
    navOpen = false;
  }
  burgerParts.forEach((item) => {
    item.classList.toggle("active");
  })
navBar.classList.toggle("active");
background.classList.toggle("active");
}

//Toggles shopping cart
const background = document.querySelector(".background");
let cartOpen = false;
let navOpen = false;

function toggleCart() {
  if (navOpen === true) {
    return;
  }
  if (cartOpen === false) {
    cartOpen = true;
  } else {
    cartOpen = false;
  }
  document.querySelector(".shopping-cart-container").classList.toggle("active");
  background.classList.toggle("active");
}

//toggles nav or cart from background click
background.addEventListener("click", toggleNavOrCart)

function toggleNavOrCart() {
  if (navOpen === true) {
    toggleNav();
  } else if (cartOpen === true) {
    toggleCart();
  }
}

//Checks if cart is Empty
let isCartEmpty = true;

function cartEmpty() {
  if (cartAmount === 0) {
    document.querySelector(".cart-empty").innerHTML = "Empty";
    isCartEmpty = true;
  } else {
    document.querySelector(".cart-empty").innerHTML = ""
    isCartEmpty = false;
  }
}

cartEmpty();

//Calculates the product total price depending on quantity for 1 item
function calculatePrice(item) {
  const product = document.getElementById("quantity" + item);
  let quantityNow = product.getAttribute("value");
  quantityNow = product.value;
  quantityNow = Number(quantityNow);
  let price = quantityNow * products[item].price;
  document.getElementById("price" + item).setAttribute("data-price", price);
  document.getElementById("price" + item).innerHTML = price.toFixed(2) + "€";
  updatePrice();
}

//Calculates total cart price
let totalCartPrice = 0;

updatePrice();

function updatePrice() {
  totalCartPrice = 0;
  document.querySelectorAll(".cart-price").forEach((element) => {
    const price = Number(element.getAttribute("data-price"));
    totalCartPrice += price;
  });
  document.querySelector(".cart-total-price").innerHTML = "Total price: " + totalCartPrice.toFixed(2) + " €";
}

//Calculates total quantity in cart

let totalQuantity = 0;

function totalQuantityCart() {
  const allCartItems = document.querySelectorAll(".quantity-cont input");
  totalQuantity = 0;
  allCartItems.forEach((element) => {
    totalQuantity = totalQuantity + Number(element.value);
  });
}
 
totalQuantityCart();

//Checks out and shows price
function checkOut() {
  if (isCartEmpty) {
    alert("Cart is empty");
    return;
  }
  alert("You bought " + totalQuantity + " items for " + totalCartPrice.toFixed(2) + " €" );
}

//Removes item from cart
function deleteCartItem(item) {
  
  const allCartItems = document.querySelectorAll(".cart-item");
  allCartItems.forEach((element) => {
    if (element.getAttribute("id") === ("cart" + item)) {
      cartAmount--;
      const price = Number(document.getElementById("price" + item).getAttribute("data-price"));
      totalCartPrice -= price; 
      element.remove();
      cartEmpty();
      updatePrice();
      totalQuantityCart();
      updateCartQuantity();
    }
  });
}

//Adds to cart item quantity
function changeQuantity(product, plusOrMinus) {
  if (plusOrMinus === "plus") {
    const productNow = document.getElementById("quantity" + product);
    let valueNow = productNow.getAttribute("value");
    valueNow = productNow.value;
    valueNow = Number(valueNow) + 1;
    productNow.setAttribute("value", valueNow);
    productNow.value = valueNow;
    checkQuantity(product);
    calculatePrice(product)
  } else if (plusOrMinus === "minus") {
    const productNow = document.getElementById("quantity" + product);
    let valueNow = productNow.getAttribute("value");
    valueNow = productNow.value;
   valueNow = Number(valueNow) - 1;
   productNow.setAttribute("value", valueNow);
   productNow.value = valueNow;
   checkQuantity(product)
   calculatePrice(product)
  }
}

//shows cart quantity on upper right corner 
function updateCartQuantity() {
  document.querySelector(".cart-amount").innerHTML = document.querySelectorAll(".cart-item").length;
}

updateCartQuantity();

//Checks quantity if its between 1 and 10000
function checkQuantity(item) {
  const productNow = document.getElementById("quantity" + item);
  let valueNow = productNow.getAttribute("value");
  valueNow = productNow.value;
  valueNow = Number(valueNow);
  calculatePrice(item);
  if (valueNow > 10000) {
   productNow.setAttribute("value", 10000);
   productNow.value = 10000;
   calculatePrice(item)
  } else if (valueNow < 1) {
   productNow.setAttribute("value", 1);
   productNow.value = 1;
   calculatePrice(item);
  }
  totalQuantityCart();
}

//Ads items to cart
function addToCart(item) {
  products.forEach((element, index) => {
    if (index === item) {
      let exitFunction = false;
      if (document.querySelectorAll(".cart-item").length !== 0) {
        const allCartItems = document.querySelectorAll(".cart-item");
        allCartItems.forEach((element) => {
        if (element.getAttribute("id") == ("cart" + item)) {
          exitFunction = true;
          return;
          }
        })
      }
      
      if (exitFunction) {
        return
      }
      cartAmount++;
      cartEmpty();
      //Creates quantity box
      const wrapper = document.createElement("div");
      wrapper.classList.add("quantity-cont");
      const plusQuantity = document.createElement("button");
      plusQuantity.setAttribute("onclick", "changeQuantity(" + item + ", 'plus')")
      plusQuantity.innerHTML = "+"
      const minusQuantity = document.createElement("button");
      minusQuantity.setAttribute("onclick", "changeQuantity(" + item + ", 'minus')");
      minusQuantity.innerHTML = "-"
      const quantityInput = document.createElement("input");
      quantityInput.setAttribute("id", "quantity" + item);
      quantityInput.setAttribute("type", "number");
      quantityInput.setAttribute("value", "1");
      quantityInput.setAttribute("min", "1")
      quantityInput.setAttribute("max", "10000")
      quantityInput.setAttribute("onchange", "checkQuantity("+ item +")");
      wrapper.append(minusQuantity, quantityInput, plusQuantity);
      //Other elements
      const div = document.createElement("div");
      const img = document.createElement("img");
      const button = document.createElement("button")
      const price = document.createElement("h3");
      const name = document.createElement("h3");
      name.innerHTML = element.name;
      name.setAttribute("class", "cart-item-name");
      div.classList.add("cart-item");
      div.setAttribute("data-price", element.price);
      div.setAttribute("id", "cart" + index);
      img.setAttribute("src", element.img);
      img.classList.add("cart-image");
      button.setAttribute("class", "cart-del-button");
      button.setAttribute("id", "del" + index);
      button.setAttribute("onclick", "deleteCartItem(" + item + ")");
      button.innerHTML = "Remove"
      price.classList.add("cart-price");
      price.setAttribute("id", "price" + item);
      price.innerHTML = (element.price).toFixed(2) + " €";
      div.append(img, name, button, price, wrapper);
      document.querySelector(".cart-items").append(div);
      calculatePrice(item);
      totalQuantityCart();
      updateCartQuantity();
    }
  });
}



