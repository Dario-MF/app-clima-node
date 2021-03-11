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


const inquirerMenu = async() => {
    console.clear();
    console.log('\n==============================='.cyan);
    console.log(`${'----'.blue} ${'Seleciona una opción'.white} ${'----'.blue}`);
    console.log('===============================\n'.cyan);

    const { opcion } = await inquirer.prompt(preguntas);
    return opcion;
};

const inquirerPausa = async () => {
    await inquirer.prompt(pausado);
};

const leerInput = async(message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value){
                if(value.length=== 0){
                    return 'Por favor ingrese un valor';
                    
                }
                return true;
            }
        }
    ];
    const {desc} = await inquirer.prompt(question);
    return desc;
};

const inquirerTareasBorrar = async( tareas = []) => {
    const choices = tareas.map((tarea, i) => {
        const idx = `${i + 1}.`.blue;
        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`
        }
    });  
    const lista = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar Tarea',
            choices
        }
    ];
    choices.push({
            value: '0',
            name: '0.'.blue + ' Cancelar'
        });

    const { id } = await inquirer.prompt(lista);
    return id;
};

const inquirerTareas = async(tareas = []) => {
    const choices = tareas.map(tarea => {
        return {
            value: tarea.id,
            name: tarea.desc
        }
    });   
    const lista = [
        {
            type: 'list',
            name: 'id',
            message: 'Listado de tareas',
            choices: (choices.length) ? choices : [{value:'', name:'Lista de tareas vacia.'.blue}]
        }
    ];
    const { id } = await inquirer.prompt(lista);
    return id;
};

const confirmar = async( message ) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message,
        }
    ];
    const { ok } = await inquirer.prompt(question);
    return ok;
};

const inquirerTareasCheckList = async( tareas = []) => {
    const choices = tareas.map((tarea, i) => {
        const idx = `${i + 1}.`.blue;
        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: (tarea.completadoEn) ? true : false
        }
    });

    const lista = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ];

    const { ids } = await inquirer.prompt(lista);
    return ids;
};





module.exports = {
    inquirerMenu,
    inquirerPausa,
    leerInput,
    inquirerTareas,
    inquirerTareasBorrar,
    confirmar,
    inquirerTareasCheckList
}