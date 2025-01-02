// Array per memorizzare gli articoli nel carrello
let cart = JSON.parse(localStorage.getItem('carrello')) || [];

// Funzione per aggiungere un prodotto al carrello
function addToCart(name, price) {
  cart.push({ name, price });
  updateCart();
  saveCart();
}

// Funzione per aggiornare la visualizzazione del carrello
function updateCart() {
  const cartItems = document.getElementById('cart-items');
  const totalPrice = document.getElementById('total-price');

  // Pulisci il carrello
  cartItems.innerHTML = '';

  // Mostra gli articoli nel carrello
  cart.forEach((item, index) => {
    const itemElement = document.createElement('div');
    itemElement.textContent = `${item.name} - €${item.price.toFixed(2)}`;
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Rimuovi';
    removeButton.onclick = () => removeFromCart(index);
    itemElement.appendChild(removeButton);
    cartItems.appendChild(itemElement);
  });

  // Calcola il totale
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  totalPrice.textContent = `Totale: €${total.toFixed(2)}`;
}

// Funzione per rimuovere un articolo dal carrello
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
  saveCart();
}

// Funzione per procedere al pagamento
function checkout() {
  if (cart.length === 0) {
    alert('Il carrello è vuoto!');
    return;
  }
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  alert(`Grazie per il tuo acquisto! Totale: €${total.toFixed(2)}`);
  cart = []; // Svuota il carrello dopo il pagamento
  updateCart();
  saveCart();
}

// Funzione per salvare il carrello nel localStorage
function saveCart() {
  localStorage.setItem('carrello', JSON.stringify(cart));
}

// Lightbox JS (Se hai bisogno di una lightbox per le immagini)
<script src="https://cdn.jsdelivr.net/npm/lightbox2@2.11.3/dist/js/lightbox.min.js"></script>

// Gestione dell'accordion
const accordions = document.querySelectorAll('.accordion-header');

// Aggiungi un evento di clic per ogni pulsante
accordions.forEach(accordion => {
  accordion.addEventListener('click', () => {
    // Toggle la classe 'active' per il pulsante
    accordion.classList.toggle('active');
    
    // Trova il contenuto dell'accordion relativo al pulsante cliccato
    const content = accordion.nextElementSibling;
    
    // Mostra o nascondi il contenuto
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
});

// Inizializza EmailJS con la tua public key
emailjs.init("g_kFikFUMA1_4kAVW"); // sostituisci "g_kFikFUMA1_4kAVW" con la tua public key

// Gestione della sezione indirizzo
const deliverySelect = document.getElementById("delivery");
const addressSection = document.getElementById("addressSection");

deliverySelect.addEventListener("change", () => {
    if (deliverySelect.value === "spedizione") {
        addressSection.classList.remove("hidden");
    } else {
        addressSection.classList.add("hidden");
    }
});

// Gestione dell'invio del modulo
const purchaseForm = document.getElementById("purchaseForm");

purchaseForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Previene il comportamento predefinito del form

    // Raccogli i dati del modulo
    const formData = new FormData(purchaseForm);
    const data = {
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        delivery: formData.get("delivery"),
        address: formData.get("address") || "N/A",
        postalCode: formData.get("postalCode") || "N/A",
        paymentMethod: formData.get("paymentMethod"),
    };

    // Invia l'email tramite EmailJS
    emailjs.sendForm("service_2yae16e", "template_paqddwm", purchaseForm)
        .then((response) => {
            console.log("Success:", response);
            alert("Email inviata con successo!");
        })
        .catch((error) => {
            console.error("Errore:", error);
            alert("C'è stato un errore nell'invio dell'email.");
        });
});
