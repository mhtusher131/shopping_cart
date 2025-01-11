
let label = document.getElementById("label");
let ShoppingCart = document.getElementById("shopping-cart");

let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();



let generateCartItems = () => {
  if (basket.length !== 0) {
    ShoppingCart.innerHTML = basket
      .map((x) => {
        let { id, item } = x;
        let search = shopItemsData.find((y) => y.id === id) || {};
        return `
                        <tbody>
                            <tr>
                                <td class="py-4">
                                    <div class="flex items-center">
                                        <img class="h-16 w-16 mr-4" src=${search.img || ""} alt="Product image">
                                        <span class="font-semibold">${search.name || "Unknown Item"}</span>
                                    </div>
                                </td>
                                <td class="py-4"> $ ${search.price || 0}</td>
                                <td class="py-4">
                                    <div class="flex items-">
                                        <button class="border rounded-md py-2 px-4 mr-2" onclick="decrement('${id}')">-</button>
                                        <span class="text-center w-8 mt-6" id=${id}>${item}</span>
                                        <button class="border rounded-md py-2 px-4 ml-2" onclick="increment('${id}')">+</button>
                                    </div>
                                </td>
                                <td class="py-4">$ ${item * (search.price || 0)}</td>
                            </tr>
                            <!-- More product rows -->
                        </tbody>
        `;
        return `
        
        `
      })
      .join("");
  } else {
    ShoppingCart.innerHTML = ``;
    label.innerHTML = `
      <h2>Cart is Empty</h2>
      <a href="index.html">
        <button class="HomeBtn">Back to home</button>
      </a>
    `;
  }
};

generateCartItems();

let increment = (id) => {
  let search = basket.find((x) => x.id === id);

  if (search === undefined) {
    basket.push({
      id: id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  generateCartItems();
  update(id);
  localStorage.setItem("data", JSON.stringify(basket));
};

let decrement = (id) => {
  let search = basket.find((x) => x.id === id);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }

  basket = basket.filter((x) => x.item !== 0);
  generateCartItems();
  update(id);
  calculation();
  localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search ? search.item : 0;
  calculation();
  TotalAmount();
};

let removeItem = (id) => {
  basket = basket.filter((x) => x.id !== id);
  generateCartItems();
  TotalAmount();
  calculation();
  localStorage.setItem("data", JSON.stringify(basket));
};

let clearCart = () => {
  basket = [];
  generateCartItems();
  calculation();
  localStorage.setItem("data", JSON.stringify(basket));
};

let TotalAmount = () => {
  if (basket.length !== 0) {
    let amount = basket
      .map((x) => {
        let { item, id } = x;
        let search = shopItemsData.find((y) => y.id === id) || {};
        return item * (search.price || 0);
      })
      .reduce((x, y) => x + y, 0);
    label.innerHTML = `
         <div class="bg-white rounded-lg shadow-md p-6">
                    <h2 class="text-lg font-semibold mb-4">Summary</h2>
                    <div class="flex justify-between mb-2">
                        <span>Subtotal</span>
                        <span>$ ${amount}</span>
                    </div>
                    <div class="flex justify-between mb-2">
                        <span>Taxes</span>
                        <span>$0.00</span>
                    </div>
                    <div class="flex justify-between mb-2">
                        <span>Shipping</span>
                        <span>$0.00</span>
                    </div>
                    <hr class="my-2">
                    <div class="flex justify-between mb-2">
                        <span class="font-semibold">Total</span>
                        <span class="font-semibold">$ ${amount}</span>
                    </div>
                    <div class="flex gap-x-5  md:max-lg:flex">
                        <button class=" bg-green-500 text-white py-2 px-4 rounded-lg mt-4 w-full">Checkout</button>
                        <button class=" bg-red-500 text-white py-2 px-4 rounded-lg mt-4 w-full gap0" onclick="clearCart()" class="removeAll">Clear Cart</button>
                    </div>
                    
                </div>
    `;
  } else {
    label.innerHTML = "";
  }
};

TotalAmount();
