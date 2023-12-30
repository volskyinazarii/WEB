let cartItemCount = 0;

function openCartModal() {
    const emptyCartModal = document.getElementById("emptyCartModal");

    if (cartItemCount === 0) {
        emptyCartModal.style.display = "block";
    } else {
        window.location.href = "cart.html";
    }
}

function closeCartModal() {
    const emptyCartModal = document.getElementById("emptyCartModal");
    emptyCartModal.style.display = "none";
}

function openQuantityModal(productIndex) {
    const quantityModal = document.getElementById("quantityModal");
    quantityModal.style.display = "block";
    document.getElementById("quantityModal").setAttribute("data-product-index", productIndex);
}

function closeQuantityModal() {
    const quantityModal = document.getElementById("quantityModal");
    quantityModal.style.display = "none";
}

function addToCart() {
    const quantityInput = document.getElementById("quantityInput").value;

    if (quantityInput.trim() === "" || parseInt(quantityInput) <= 0) {
        alert("Будь ласка, вкажіть кількість товару більше 0.");
        return;
    }

    const addedToCartModal = document.getElementById("addedToCartModal");
 
    cartItemCount += parseInt(quantityInput);
    document.getElementById("cartItemCount").innerText = cartItemCount;

    addedToCartModal.style.display = "block";

    closeQuantityModal();
}
function closeAddedToCartModal() {
    const addedToCartModal = document.getElementById("addedToCartModal");
    addedToCartModal.style.display = "none";

}

function goToCart() {
    if (cartItemCount > 0) {
        window.location.href = "cart.html";
    } else {
        alert("Ваша корзина порожня. Додайте товари перед переходом до корзини.");
    }
}ion.href = "cart.html";


function pay() {
}

function returnToShopping() {
    window.location
}