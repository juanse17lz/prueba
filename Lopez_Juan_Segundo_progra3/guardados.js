function mostrarCartas(lista) {
    const contenedor = document.getElementById('cartas');
    contenedor.innerHTML= '';

    if (lista.length === 0) {
        contenedor.innerHTML = '<p>No hay cartas guardadas<p>';
        return;
    }

    lista.forEach(dato => {
        const carta= new Carta(dato.code, dato.value, dato.suit, dato.imagen);
        contenedor.appendChild(carta.createHtmlElement());
    });

}


window.addEventListener('load', () => {
    const guadadas = JSON.parse(localStorage.getItem('cartasGuardadas') || '[]');
    mostrarCartas(guadadas);
});



document.getElementById('ordenar-nombre').addEventListener('click', () => {
    const guadadas= JSON.parse(localStorage.getItem('cartasGuardadas') || '[]');
    guadadas.sort((a,b) => a.value.localeCompare(b.value));
    mostrarCartas(guadadas);
});

document.getElementById('ordenar-palo').addEventListener('click', () => {
    const guadadas = JSON.parse(localStorage.getItem('cartasGuardadas') || '[]');
    guadadas.sort((a,b) => a.suit.localeCompare(b.suit));
    mostrarCartas(guadadas);
});