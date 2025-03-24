// Función para mostrar u ocultar el chat en vivo
function toggleChat() {
    var chatBox = document.getElementById('chat-box');
    if (chatBox.style.display === 'none' || chatBox.style.display === '') {
        chatBox.style.display = 'block';
    } else {
        chatBox.style.display = 'none';
    }
}

// Stripe.js - Configuración para manejar el pago
var stripe = Stripe('tu_clave_publica_de_stripe'); // Sustituye con tu clave pública
var elements = stripe.elements();
var card = elements.create('card');
card.mount('#card-element');

var form = document.getElementById('payment-form');
form.addEventListener('submit', function(event) {
    event.preventDefault();

    stripe.confirmCardPayment('tu_cliente_secret', {
        payment_method: {
            card: card,
            billing_details: {
                name: 'Nombre del Cliente',
                email: 'correo@cliente.com'
            }
        }
    }).then(function(result) {
        if (result.error) {
            document.getElementById('error-message').textContent = result.error.message;
        } else {
            if (result.paymentIntent.status === 'succeeded') {
                alert('Pago realizado exitosamente');
            }
        }
    });
});
