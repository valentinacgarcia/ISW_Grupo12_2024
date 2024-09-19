document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('pedido-form');
    const submitButton = form.querySelector('button[type="submit"]');
    const successMessage = document.getElementById('success-message');

    const retiroFecha = document.getElementById('retiro-fecha');
    const entregaFecha = document.getElementById('entrega-fecha');
    const retiroDomicilioCalle = document.getElementById('retiro-domicilio-calle');
    const retiroDomicilioNumero = document.getElementById('retiro-domicilio-numero');
    const retiroLocalidad = document.getElementById('retiro-localidad');
    const retiroProvincia = document.getElementById('retiro-provincia');
    const retiroReferencia = document.getElementById('retiro-referencia');

    const entregaDomicilioCalle = document.getElementById('entrega-domicilio-calle');
    const entregaDomicilioNumero = document.getElementById('entrega-domicilio-numero');
    const entregaLocalidad = document.getElementById('entrega-localidad');
    const entregaProvincia = document.getElementById('entrega-provincia');
    const entregaReferencia = document.getElementById('entrega-referencia');
    const fotosInput = document.getElementById('fotos');

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
   
        const requiredFields = [
            'retiro-domicilio-calle',
            'retiro-domicilio-numero',
            'retiro-localidad',
            'retiro-provincia',
            'retiro-fecha',
            'entrega-domicilio-calle',
            'entrega-domicilio-numero',
            'entrega-localidad',
            'entrega-provincia',
            'entrega-fecha'
        ];
        requiredFields.forEach(id => {
            const field = document.getElementById(id);
            if (!field.value) {
                isValid = false;
            }
        });

        submitButton.disabled = !isValid;
        return isValid;
    }

    function enviarEmail() {

        const fileNames = Array.from(fotosInput.files).map(file => file.name);

        const templateParams = {
            "retiro-fecha": retiroFecha.value,
            "entrega-fecha": entregaFecha.value,
            "retiro-domicilio-calle": retiroDomicilioCalle.value,
            "retiro-domicilio-numero": retiroDomicilioNumero.value,
            "retiro-localidad": retiroLocalidad.value,
            "retiro-provincia": retiroProvincia.value,
            "retiro-referencia": retiroReferencia.value,
            "entrega-domicilio-calle": entregaDomicilioCalle.value,  
            "entrega-domicilio-numero": entregaDomicilioNumero.value,
            "entrega-localidad": entregaLocalidad.value,
            "entrega-provincia": entregaProvincia.value,
            "entrega-referencia": entregaReferencia.value,
            "fotos": fileNames.join(', ')

        };


        emailjs.send('service_z5vfelj', 'template_r22jk1l', templateParams)
            .then(function(response) {
                console.log('Correo enviado exitosamente', response);
                successMessage.classList.remove('hidden');
                successMessage.classList.add('show');

                setTimeout(() => {
                    successMessage.classList.remove('show');
                    successMessage.classList.add('hidden');
                }, 3000);

                form.reset();
                updateMinDates();
            }, function(error) {
                console.error('Error al enviar el correo:', error);
                alert('Error al enviar el correo: ' + JSON.stringify(error));
            });
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault();


        const retiroNumero = document.getElementById('retiro-domicilio-numero');
        const entregaNumero = document.getElementById('entrega-domicilio-numero');

        if (isNaN(retiroNumero.value) || retiroNumero.value <= 0) {
            alert("El número de domicilio de retiro debe ser un número positivo.");
            return;
        }

        if (isNaN(entregaNumero.value) || entregaNumero.value <= 0) {
            alert("El número de domicilio de entrega debe ser un número positivo.");
            return;
        }

        if (!checkFormValidity()) {
            console.log('Form is not valid');
            return;
        }

        enviarEmail();  
    });

    updateMinDates();
});
