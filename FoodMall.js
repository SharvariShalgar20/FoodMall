const itemData = {
    burger: {
        name: "KFC's zinger burger",
        description: "A delicious and juicy burger with fresh ingredients.",
        pricing: "$10",
        deliveryTime: "20 minutes",
        imageUrl: "images/img1.png" 
    },
    pasta: {
        name: "Pasta La Vista",
        description: "A classic Italian pasta with rich tomato sauce.",
        pricing: "$10",
        deliveryTime: "25 minutes",
        imageUrl: "images/img2.png" 
    },
    fries: {
        name: "Crispy Crunch Fries",
        description: "Crispy golden fries, a perfect side to any meal.",
        pricing: "$10",
        deliveryTime: "15 minutes",
        imageUrl: "images/img3.png" 
    }
};

const foodItems = document.querySelectorAll('.card');
foodItems.forEach(item => {
    item.addEventListener('click', (event) => {
        const itemId = item.getAttribute('data-item');
        showItemDetails(itemId);
    });
});

function showItemDetails(itemId) {
    const item = itemData[itemId];
    document.getElementById('item-name').innerText = item.name;
    document.getElementById('item-description').innerText = item.description;
    document.getElementById('item-pricing').innerText = `Price: ${item.pricing}`;
    document.getElementById('item-delivery').innerText = `Estimated Delivery Time: ${item.deliveryTime}`;
    document.getElementById('item-image').src = item.imageUrl;
    const itemDetailsModal = new bootstrap.Modal(document.getElementById('itemDetails'));
    itemDetailsModal.show();
}

// FoodMall.js

// Function to handle adding items to the cart
function addToCart(item) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(item.name + " added to cart!");
}

// Handle cart page
if (window.location.pathname.endsWith('addToCart.html')) {
    // Display cart items
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsDiv = document.getElementById('cart-items');
    const totalPriceSpan = document.getElementById('total-price');

    let totalPrice = 0;
    cartItemsDiv.innerHTML = ''; // Clear previous content

    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        itemDiv.innerHTML = `
            <p>${item.name} - $${item.price}</p>
            <button class="btn btn-danger btn-sm remove-item" data-name="${item.name}">Remove</button>
        `;
        cartItemsDiv.appendChild(itemDiv);
        totalPrice += item.price;
    });

    totalPriceSpan.textContent = totalPrice;

    // Remove item from cart
    const removeButtons = document.querySelectorAll('.remove-item');
    removeButtons.forEach(button => {
        button.addEventListener('click', function () {
            const itemName = button.getAttribute('data-name');
            cart = cart.filter(item => item.name !== itemName);
            localStorage.setItem('cart', JSON.stringify(cart));
            window.location.reload(); // Reload page to reflect changes
        });
    });

    // Handle "Buy" button
    document.getElementById('buy-button').addEventListener('click', function () {
        if (cart.length === 0) {
            alert("Your cart is empty!");
        } else {
            const orderConfirmationModal = new bootstrap.Modal(document.getElementById('orderConfirmation'));
            orderConfirmationModal.show();
        }
    });
}

// Add event listeners for "Add to Cart" buttons
const addToCartButtons = document.querySelectorAll('.btn-outline-secondary');
addToCartButtons.forEach(button => {
    button.addEventListener('click', function () {
        const card = button.closest('.card');
        const itemName = card.querySelector('.card-text').textContent;
        const itemPrice = 10; // Assuming each item costs $10 for now

        const item = {
            name: itemName,
            price: itemPrice,
        };

        addToCart(item);
    });
});

