const hamburger = document.getElementById("hamburger")
const mobile_nav = document.getElementById("mobile_nav")
let open_hamburber = false;
hamburger.addEventListener("mouseup", (e) => {
    let hamburger_show = anime({
        targets: [mobile_nav],
        translateY: ['-100','0'],
        opacity: ['0','1'],
        autoplay: false,
        easing: 'easeInOutSine',
        duration: 500,
        begin: function() {
            mobile_nav.style.visibility = "visible"
        }
    })
    let hamburger_hide = anime({
        targets: [mobile_nav],
        translateY: ['0','-100'],
        opacity: ['1','0'],
        easing: 'easeInOutSine',
        autoplay: false,
        duration: 1000,
    })
    open_hamburber = !open_hamburber 
    open_hamburber ? hamburger_show.play() : hamburger_hide.play()
});
// HANDLE CHECKOUT
// BUY NOW
const buy_button = document.querySelectorAll('.buy-button');
buy_button.forEach(button => { button.addEventListener('click', async event => {
    event.preventDefault()
    const stripe = Stripe('pk_test_iFlVIBdzmPmFXEFGNPX2WIy700R7NtKmOZ');
    const elements = stripe.elements();
    const cardElement = elements.create('card');
    const productContainer = button.closest('.product');
    const cardElementContainer = productContainer.querySelector('.card-element');

    cardElement.mount(cardElementContainer);

    const form = document.querySelectorAll('.payment-form');
    const resultMessage = document.getElementById('payment-result');

    form.forEach(button => { button.addEventListener('submit', async (event) => {
        event.preventDefault()

        const { token, error } = await stripe.createToken(cardElement);

        if (error) {
            resultMessage.textContent = error.message;
        } else {
            // Send the token to your Laravel backend
            fetch('laravel_backend', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: token.id,
                    amount: 100, // Amount in dollars
                }),
            })
            .then(response => response.json())
            .then(data => {
                resultMessage.textContent = data.message;
            })
            .catch(error => {
                resultMessage.textContent = 'Payment failed. Please try again.';
            });
        }
    })});
})})
// TODO: ADD TO CART 
