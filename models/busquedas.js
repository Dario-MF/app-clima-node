require('dotenv').config();
const { default: axios } = require("axios");


class Busquedas {

    historial = ['Madrid', 'Barcelona', 'valencia'];
    constructor() {

        //leer db
    }

    get paramsMapbox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    }

    get paramsOpenWeather() {
        return {
            'appid': process.env.OPENWEATHER_KEY,
            'units': 'metric',
            'lang': 'es'
        }
    }

    async ciudad(lugar = '') {
        //  peticion http
        try {
            const intance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapbox
            });

            const resp = await intance.get();

            //retorna las ciudades coincidentes
            return resp.data.features.map(lugar => (
                {
                    id: lugar.id,
                    nombre: lugar.place_name,
                    lon: lugar.center[0],
                    lat: lugar.center[1]
                }
            ));
        } catch (error) {
            return [];
        }
    }

    async tiempoPorLugar(lat, lon) {

        try {
            const intance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather?`,
                params: { ...this.paramsOpenWeather, lat, lon }
            });

            const resp = await intance.get();

            const { weather, main } = resp.data

            return {
                desc: weather[0].description || '',
                temperatura: main.temp || '',
                minima: main.temp_min || '',
                maxima: main.temp_max || '',
            }
        } catch (error) {
            return error
        }
    }
};



module.exports = Busquedas;