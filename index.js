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

                const nombreLugar = await leerInput('Introduzca ciudad: ');
                const coincidencias = await busquedas.ciudad(nombreLugar);
                const idLugarSelec = await inquirerLugares(coincidencias);
                const lugarSelec = coincidencias.find(lugar => lugar.id === idLugarSelec);
                const tiempo = await busquedas.tiempoPorLugar(lugarSelec.lat, lugarSelec.lon);


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
                console.log('seleccion 2');
                break;

            default:
                break;
        }
        await inquirerPausa();
    } while (opt !== 0);



};

main()