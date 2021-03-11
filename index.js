require('dotenv').config();

const { inquirerMenu,
    inquirerPausa,
    leerInput,
    inquirerLugares
} = require('./helpers/inquirer');
const Busquedas = require('./models/busquedas');




console.clear()
const main = async () => {

    const busquedas = new Busquedas();
    let opt = null;

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                // pedir lugar
                const nombreLugar = await leerInput('Introduzca ciudad: ');
                // buscar coincidencias
                const coincidencias = await busquedas.ciudad(nombreLugar);
                // pedir opcion elegida
                const idLugarSelec = await inquirerLugares(coincidencias);
                if(idLugarSelec === '0') continue;
                const lugarSelec = coincidencias.find(lugar => lugar.id === idLugarSelec);
                // guardar en db.
                busquedas.agregarHistorial(lugarSelec.nombre);
                // buscar tiempo en lugar seleccionado
                const tiempo = await busquedas.tiempoPorLugar(lugarSelec.lat, lugarSelec.lon);

                // mostrar resultados.
                console.log('\nInformación del clima'.blue);
                console.log('Ciudad: '.blue, lugarSelec.nombre);
                console.log('Lat: '.blue, lugarSelec.lat);
                console.log('Lon: '.blue, lugarSelec.lon);
                console.log('Hace tiempo: '.blue, tiempo.desc);
                console.log('Temperatura: '.blue, tiempo.temperatura);
                console.log('Mínima: '.blue, tiempo.minima);
                console.log('Máxima: '.blue, tiempo.maxima);

                break;
            case 2:
                busquedas.historial.forEach( lugar => {
                    console.log(lugar)
                })
                break;

            default:
                break;
        }
        await inquirerPausa();
    } while (opt !== 0);



};

main()