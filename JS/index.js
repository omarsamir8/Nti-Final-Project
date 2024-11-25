const products = document.querySelectorAll(".product-1");
const cartBtn = document.querySelectorAll(".addtocartbutton");
let cart = JSON.parse(localStorage.getItem("cartinfo")) || [];

document.querySelector(".number").innerHTML = cart.length;
document.addEventListener("DOMContentLoaded", function () {
  ShowData();
});

for (var i = 0; i < cartBtn.length; i++) {
  cartBtn[i].addEventListener("click", function (e) {
    const product = e.target.closest(".product-1");
    const imgSrc = product.querySelector("img").src;
    const priceText = product.querySelector("h5").textContent;
    const productName = product.querySelector("h4").textContent;
    const productBrand = product.querySelector("p").textContent;
    const price = parseFloat(priceText.replace("$", ""));

    // تحقق مما إذا كان العنصر موجودًا بالفعل في العربة، إذا كان كذلك قم بزيادة الكمية
    const existingProduct = cart.find(
      (item) => item.productName === productName
    );
    if (existingProduct) {
      existingProduct.quantity += 1;
      existingProduct.total = existingProduct.quantity * existingProduct.price;
    } else {
      cart.push({
        imgSrc,
        productName,
        price,
        productBrand,
        quantity: 1,
        total: price,
      });
    }
    localStorage.setItem("cartinfo", JSON.stringify(cart));
    toastr.success("Added To Cart Successfully!", {
      positionClass: "toast-middle-center",
    });

    ShowData();
  });
}

function ShowData() {
  let cartitemscontainer = "";
  for (var i = 0; i < cart.length; i++) {
    cartitemscontainer += `<div class="cartItem">
          <img
            src="${cart[i].imgSrc}"
            alt="${cart[i].productName}"
          />
          <div>
            <h5>Name</h5>
            <p>${cart[i].productName}</p>
          </div>
          <div>
            <h5>Brand</h5>
            <p>${cart[i].productBrand}</p>
          </div>
          <div>
            <h5>Quantity</h5>
            <p>${cart[i].quantity}</p>
          </div>
          <div>
            <h5>Price</h5>
            <p>${cart[i].price}</p>
          </div>
          <div>
            <h5>Total</h5>
            <p>${cart[i].total}</p>
          </div>
           <i 
            onclick="deleteData(${i})"
            style="color: red; cursor: pointer; font-size: 20px"
            class="fa-solid fa-trash delete"
          ></i>
        </div>`;
  }
  document.getElementById("cartdata").innerHTML = cartitemscontainer;
  var orderTotal = cart.reduce((acc, item) => acc + item.total, 0);
  document.querySelector(
    ".totaloforder span"
  ).textContent = `$${orderTotal.toFixed(2)}`;
  document.querySelector(".totalpriceofcart").innerHTML = `$${orderTotal}`;
}

function deleteData(i) {
  cart.splice(i, 1);
  localStorage.setItem("cartinfo", JSON.stringify(cart));
  toastr.success("Deleted From Cart Successfully!", {
    position: "top-center",
  });
  ShowData();
}
