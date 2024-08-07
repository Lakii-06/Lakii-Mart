let cart = [];

function addItem(name, price, qtyId) {
    const quantity = parseFloat(document.getElementById(qtyId).value);
    if (!isNaN(quantity) && quantity > 0) {
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({ name, price, quantity });
        }
        updateCartTable();
    }
}

function updateCartTable() {
    const cartTable = document.getElementById('cart-table').getElementsByTagName('tbody')[0];
    cartTable.innerHTML = '';

    let total = 0;

    cart.forEach(item => {
        const row = cartTable.insertRow();
        const nameCell = row.insertCell(0);
        const qtyCell = row.insertCell(1);
        const priceCell = row.insertCell(2);
        const actionCell = row.insertCell(3); //xxxxxxxxxx

        
        nameCell.textContent = item.name;
        qtyCell.textContent = item.quantity;
        priceCell.textContent = `Rs.${item.price * item.quantity}/=`;        
        actionCell.innerHTML = `<button onclick='removeItemFromCart("${item.name}")'>Remove</button>`;


        total += item.price * item.quantity;
    });
    const totRow = cartTable.insertRow();
    totRow.insertCell(0);
    totRow.insertCell(1);
    totRow.insertCell(2);
    const totalAmountCell = totRow.insertCell(3);    
    totalAmountCell.innerHTML = "<td colspan='4' >Total Amount :"+ total + "/=<td>";
    totalAmountCell.style.fontWeight = "bold";
    totalAmountCell.style.fontSize = "120%";
    totalAmountCell.style.color = "green";

    //document.getElementById('total-price').textContent = `Total: Rs.${total}/=`;
}

//*****removeItemFromCart() */
function removeItemFromCart(itemName){

    const existingItem = cart.find(item => item.name === itemName);

    if (existingItem) {        
        alert('Remove item from the cart?');
        cart.pop(existingItem);
    } 
    updateCartTable();

    
}

function saveFavorite() {
    localStorage.setItem('favoriteCart', JSON.stringify(cart));
    alert('Favorite saved!');
}

function applyFavorite() {
    const favoriteCart = localStorage.getItem('favoriteCart');
    if (favoriteCart) {
        cart = JSON.parse(favoriteCart);
        updateCartTable();
        alert('Favorite applied!');
    } else {
        alert('No favorite found!');
    }
}

document.getElementById('buy-now').addEventListener('click', () => {
    localStorage.setItem('cart', JSON.stringify(cart));
    // window.location.href = 'checkout.html';
    window.location.href = 'y.html';
});


