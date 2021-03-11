require('dotenv').config();
const fs = require('fs');
const { default: axios } = require("axios");



class Busquedas {
    constructor() {
        //leer db
        this.leerDB()
    }

    historial = [];
    dbPath = './db/database.json';

    get historialCapitalizado() {
        const capitalize = this.historial.map(lugar => {
            const camel = lugar.split(' ').map(word => word[0].toUpperCase() + word.substring(1));
            return camel.join(' ');
        })
        return capitalize;
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

    agregarHistorial(lugar = '') {
        //prevenir duplicados
        if (this.historial.includes(lugar.toLocaleLowerCase())) {
            return;
        };

        this.historial = this.historial.splice(0, 5);

        this.historial.unshift(lugar.toLocaleLowerCase());

        // grabar en db.
        this.guardarDB()
    }

    guardarDB() {
        const payload = {
            historial: this.historial
        };

        fs.writeFileSync(this.dbPath, JSON.stringify(payload));
    }

    leerDB() {
        if (!fs.existsSync(this.dbPath)) {
            return;
        };
        const info = JSON.parse(fs.readFileSync(this.dbPath, 'utf-8'));

        this.historial = info.historial;
    }
};



module.exports = Busquedas;