document.getElementById('pedido-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const retiroFecha = new Date(document.getElementById('retiro-fecha').value);
    const entregaFecha = new Date(document.getElementById('entrega-fecha').value);
    const hoy = new Date();

    if (retiroFecha < hoy) {
        alert('La fecha de retiro debe ser mayor o igual a hoy.');
        return;
    }

    if (entregaFecha < hoy || entregaFecha < retiroFecha) {
        alert('La fecha de entrega debe ser mayor o igual a hoy y mayor o igual a la fecha de retiro.');
        return;
    }

    
    alert('Pedido publicado con éxito');
});
