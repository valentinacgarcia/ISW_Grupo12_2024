document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('pedido-form');
    const submitButton = form.querySelector('button[type="submit"]');
    const retiroFecha = document.getElementById('retiro-fecha');
    const entregaFecha = document.getElementById('entrega-fecha');
    const successMessage = document.getElementById('success-message');
    
    const retiroDomicilio = document.getElementById('retiro-domicilio');
    const retiroLocalidad = document.getElementById('retiro-localidad');
    const retiroProvincia = document.getElementById('retiro-provincia');
    
    const entregaDomicilio = document.getElementById('entrega-domicilio');
    const entregaLocalidad = document.getElementById('entrega-localidad');
    const entregaProvincia = document.getElementById('entrega-provincia');

    function getToday() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    function updateMinDates() {
        const today = getToday();
        retiroFecha.setAttribute('min', today);
        
        if (retiroFecha.value) {
            entregaFecha.setAttribute('min', retiroFecha.value);
        } else {
            entregaFecha.removeAttribute('min');
        }
    }

    function checkFormValidity() {
        let isValid = true;
        const today = getToday();
        
        if (!retiroDomicilio.value || !retiroLocalidad.value || !retiroProvincia.value || !retiroFecha.value) {
            isValid = false;
        }
        
        if (!entregaDomicilio.value || !entregaLocalidad.value || !entregaProvincia.value || !entregaFecha.value) {
            isValid = false;
        }

        submitButton.disabled = !isValid;
        return isValid;
    }

    retiroFecha.addEventListener('input', function () {
        updateMinDates();
        checkFormValidity();
    });

    entregaFecha.addEventListener('input', function () {
        checkFormValidity();
    });

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        
     
        if (!form.checkValidity()) {
            console.log('Form is not valid');
            return;
        }
        

        successMessage.classList.remove('hidden');
        successMessage.classList.add('show');
        
        setTimeout(() => {
            successMessage.classList.remove('show');
            successMessage.classList.add('hidden');
        }, 3000);
        

        form.reset();
        

        updateMinDates();
    });

   
    updateMinDates();
});
