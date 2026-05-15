class Carta {
    constructor(code, value, suit, imagen) {
        this.code = code;
        this.value = value;
        this.suit = suit;
        this.imagen = imagen;
    }

    toJsonString() {
        return JSON.stringify(this);
    }

    static crearFromJsonString(json) {
        const obj = JSON.parse(json);
        return new Carta(obj.code, obj.value, obj.suit, obj.imagen);
    }

    createHtmlElement() {
        const div = document.createElement('div');
        div.classList.add('carta-card');

        const link = document.createElement('a');
        link.href = this.imagen;
        link.target = '_blank';

        const img = document.createElement('img');
        img.src = this.imagen;
        img.alt = this.code;

        link.appendChild(img);

        const code = document.createElement('p');
        code.textContent = `Codigo ${this.code}`;

        const suit = document.createElement('p');
        suit.textContent = `Palo: ${this.suit}`;

        const value = documen.createElement('p');
        value.textContent = `Valor: ${this.value}`;

        const btnGuardar = document.createElement('button');
        btnGuardar.textContent = 'Guardar';
        btnGuardar.addEventListener('click', () => Carta.guardarCarta(this));

        div.appendChild(link);
        div.appendChild(code);
        div.appendChild(suit);
        div.appendChild(value);
        div.appendChild(btnGuardar);

        return div;
    }

    static guardarCarta(carta) {
        const guadadas = JSON.parse(localStorage.getItem('catasGuardadas') || '[]');
        const yaExiste = guadadas.some(c => c.code === carta.code);

        if (!yaExiste) {
            guadadas.push(carta);
            localStorage.setItem('cartasGuardadas', JSON.stringify(guadadas));
            alert(`Carta "${carta.code}" guardada!`);
        } else {
            alert(`La carta "${carta.code}" ya se encuentra guardada.`);
        }
    }
}