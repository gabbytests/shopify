document.addEventListener("DOMContentLoaded", () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    function renderCart() {
        cartItems.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            total += item.price * item.quantity;
            cartItems.innerHTML += `
                <li>
                    ${item.name} - $${item.price} x ${item.quantity} 
                    <button onclick="removeFromCart(${index})">Remove</button>
                </li>
            `;
        });

        cartTotal.innerText = total;
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    function addToCart(product) {
        const existingItem = cart.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        renderCart();
    }

    window.removeFromCart = (index) => {
        cart.splice(index, 1);
        renderCart();
    };

    window.clearCart = () => {
        localStorage.removeItem("cart");
        cart.length = 0;
        renderCart();
    };

    window.checkout = () => {
        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        const phoneNumber = "0539115369"; // Replace with your WhatsApp number
        let message = "🛒 *New Order*%0A%0A";

        cart.forEach(item => {
            message += `📦 ${item.name} - $${item.price} x ${item.quantity}%0A`;
        });

        message += `%0A💰 *Total:* $${cartTotal.innerText}%0A%0A🚀 *Send my order!*`;

        const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
        window.open(whatsappURL, "_blank");
    };

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", (event) => {
            const productElement = event.target.closest(".product");
            const product = {
                id: productElement.dataset.id,
                name: productElement.dataset.name,
                price: parseFloat(productElement.dataset.price)
            };
            addToCart(product);
        });
    });

    renderCart();
});
