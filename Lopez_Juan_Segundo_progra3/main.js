let deckId = null;
let historial = [];
let paginaActual = 0;

async function inicializar() {
    const respuesta = await fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=6');
    const datos = await respuesta.json();

    deckId = datos.deck_id;
    historial.push(datos.cards);
    paginaActual = 0;

    mostrarCartas(datos.cards);
}

async function paginaSiguiente() {
    if (paginaActual + 1 < historial.length) {
        paginaActual++;
        mostrarCartas(historial[paginaActual]);
        return;
    }

    const respuesta = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=6`);
    const datos = await respuesta.json();

    if (datos.cards && datos.cards.length > 0) {

        historial.push(datos.cards);
        paginaActual++;
        mostrarCartas(datos.cards);
    } else {
        alert('No hay mas cartas en el mazo.')
    }
}

function paginaAnterior() {
    if (paginaActual > 0) {
        paginaActual--;
        mostrarCartas(historial[paginaActual]);
    }
}

function mostrarCartas(cards) {
    const contenedor = document.getElementById('cartas');
    contenedor.innerHTML = '';

    cards.forEach(dato => {
        const carta = new Carta(dato.code, dato.value, dato.suit, dato.imagen);
        contenedor.appendChild(carta.createHtmlElement());
    });
}

document.getElementById('siguiente').addEventListener('click', paginaSiguiente);
document.getElementById('anterior').addEventListener('click', paginaAnterior);

window.addEventListener('load', () => {
    inicializar();
});