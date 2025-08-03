 const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    

    // Form submission handling
    const orderForm = document.getElementById('order-form');
    const formMessage = document.getElementById('form-message');
    orderForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(orderForm);
        const orderData = Object.fromEntries(formData.entries());

        // Clear previous messages
        formMessage.innerHTML = '';

        // POST data to the server
        fetch('http://localhost:3000/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
        })
        .then(response => {
            console.log('Response status:', response.status);
            if (!response.ok) {
                // If server responds with an error, throw it to the catch block
                return response.json().then(err => { throw new Error(err.message) });
            }
            return response.json();
        })
        .then(data => {
            // Success
            formMessage.innerHTML = `
                <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg" role="alert">
                    <strong class="font-bold">Thank you, ${orderData.name}!</strong>
                    <span class="block sm:inline">${data.message}</span>
                </div>
            `;
            orderForm.reset();
        })
        .catch(error => {
            // Error
            formMessage.innerHTML = `
                <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg" role="alert">
                    <strong class="font-bold">Oops!</strong>
                    <span class="block sm:inline">${error.message || 'Something went wrong.'}</span>
                </div>
            `;
        });
    });