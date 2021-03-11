const inquirer = require('inquirer');
require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Que desea hacer?\n',
        choices: [
            {
                value: 1,
                name: `${'1.'.blue} Buscar ciudad`
            },
            {
                value: 2,
                name: `${'2.'.blue} Historial`
            },
            {
                value: 0,
                name: `${'0.'.blue} Salir`
            }
        ]
    }
];

const pausado = [
    {
        type: 'input',
        name: 'pausa',
        message: `Presione ${'ENTER'.cyan} para continuar.`
    }
];


const inquirerMenu = async () => {
    console.clear();
    console.log('\n==============================='.cyan);
    console.log(`${'----------'.blue} ${'El tiempo'.white} ${'----------'.blue}`);
    console.log('===============================\n'.cyan);

    const { opcion } = await inquirer.prompt(preguntas);
    return opcion;
};

const inquirerPausa = async () => {
    await inquirer.prompt(pausado);
};

const leerInput = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if (value.length === 0) {
                    return 'Por favor ingrese un valor';

                }
                return true;
            }
        }
    ];
    const { desc } = await inquirer.prompt(question);
    return desc;
};



const inquirerLugares = async (lugares = []) => {
    const choices = lugares.map((lugar, i) => {
        const idx = `${i + 1}.`.blue;

        return {
            value: lugar.id,
            name: `${idx} ${lugar.nombre}`,

        }
    });

    choices.push({
        value: '0',
        name: '0.'.blue + ' Cancelar'
    });

    const listaLugares = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione lugar: ',
            choices
        }
    ];
    const { id } = await inquirer.prompt(listaLugares);
    return id;
};




module.exports = {
    inquirerMenu,
    inquirerPausa,
    leerInput,
    inquirerLugares
}