require('dotenv').config();

const { inquirerMenu,
    inquirerPausa,
    leerInput
 } = require('./helpers/inquirer');
const Busquedas = require('./models/busquedas');




console.clear()
const main = async() => {
    
    const busquedas = new Busquedas();
    let opt = null;

    do {
        opt =  await inquirerMenu();

        switch (opt) {
            case 1:
                
                const lugar = await leerInput('Introduzca ciudad: ')
                await busquedas.ciudad( lugar );

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