document.addEventListener("DOMContentLoaded", function() {
    
    const form = document.getElementById('form-suscripcion');
    const tituloHola = document.getElementById('titulo-hola');
    const inputNombre = document.getElementById('nombre');

    const actualizarSaludo = (e) => {
        const valor = e.target.value.trim();
        tituloHola.textContent = valor ? `HOLA ${valor.toUpperCase()}` : "HOLA";
    };
    inputNombre.addEventListener('keyup', actualizarSaludo);
    inputNombre.addEventListener('focus', actualizarSaludo);

    const validaciones = {
        nombre: (val) => {
            return val.length > 6 && val.includes(' ');
        },
        email: (val) => {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(val);
        },
        password: (val) => {
            const tieneLetras = /[a-zA-Z]/.test(val);
            const tieneNumeros = /[0-9]/.test(val);
            return val.length >= 8 && tieneLetras && tieneNumeros;
        },
        'password-repeat': (val) => {
            const passOriginal = document.getElementById('password').value;
            return val !== '' && val === passOriginal;
        },
        edad: (val) => {
            const num = parseInt(val);
            return Number.isInteger(num) && num >= 18;
        },
        telefono: (val) => {
            const regex = /^\d{7,}$/;
            return regex.test(val);
        },
        direccion: (val) => {
            const tieneLetras = /[a-zA-Z]/.test(val);
            const tieneNumeros = /[0-9]/.test(val);
            const tieneEspacio = val.indexOf(' ') > 0 && val.lastIndexOf(' ') < val.length - 1;
            return val.length >= 5 && tieneLetras && tieneNumeros && tieneEspacio;
        },
        ciudad: (val) => {
            return val.length >= 3;
        },
        cp: (val) => {
            return val.length >= 3;
        },
        dni: (val) => {
            const regex = /^\d{7,8}$/;
            return regex.test(val);
        }
    };

    const mensajesError = {
        nombre: "Debe tener más de 6 letras y al menos un espacio.",
        email: "Debe ser un formato de email válido.",
        password: "Al menos 8 caracteres, formados por letras y números.",
        'password-repeat': "Las contraseñas no coinciden.",
        edad: "Debe ser un número entero mayor o igual a 18.",
        telefono: "Al menos 7 dígitos. No uses espacios ni guiones.",
        direccion: "Al menos 5 caracteres, con letras, números y un espacio en medio.",
        ciudad: "Debe tener al menos 3 caracteres.",
        cp: "Debe tener al menos 3 caracteres.",
        dni: "Debe ser un número de 7 u 8 dígitos."
    };

    const inputs = form.querySelectorAll('input');

    inputs.forEach(input => {
        input.addEventListener('blur', function(e) {
            const id = e.target.id;
            const valor = e.target.value.trim();
            const errorP = document.getElementById(`error-${id}`);
            
            if (!validaciones[id](valor)) {
                errorP.textContent = mensajesError[id];
                errorP.style.display = 'block';
            }
        });

        input.addEventListener('focus', function(e) {
            const id = e.target.id;
            const errorP = document.getElementById(`error-${id}`);
            errorP.style.display = 'none';
        });
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        let hayErrores = false;
        let listaErrores = [];
        let datosCargados = [];

        inputs.forEach(input => {
            const id = input.id;
            const valor = input.value.trim();
            const errorP = document.getElementById(`error-${id}`);

            if (!validaciones[id](valor)) {
                errorP.textContent = mensajesError[id];
                errorP.style.display = 'block';
                hayErrores = true;
                listaErrores.push(`- ${id}: ${mensajesError[id]}`);
            } else {
                datosCargados.push(`- ${id}: ${valor}`);
            }
        });

        if (hayErrores) {
            alert("El formulario tiene errores:\n\n" + listaErrores.join('\n'));
        } else {
            alert("¡Suscripción exitosa!\nDatos enviados:\n\n" + datosCargados.join('\n'));
            form.reset();
            tituloHola.textContent = "HOLA";
        }
    });
});