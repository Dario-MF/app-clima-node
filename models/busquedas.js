require('dotenv').config();
const { default: axios } = require("axios");


class Busquedas {
    
    historial = ['Madrid', 'Barcelona', 'valencia'];
    
    constructor(){
        //leer db
    }

    get paramsMapbox (){
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    }

    async ciudad( lugar = ''){
        //  peticion http
        try {
            const intance = axios.create({
                baseURL:`https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapbox
            });

            const resp = await intance.get();
            
            //console.log(resp.data)
            return [];
        } catch (error) {
            return [];
        }
        ; //retorna las ciudades coincidentes
    }
};



module.exports = Busquedas;