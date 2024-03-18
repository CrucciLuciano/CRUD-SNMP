///////////////////Dirname y Filename///////////////////////////////
// https://flaviocopes.com/fix-dirname-not-defined-es-module-scope/
import path from "path";
import { fileURLToPath } from "url";
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

//////////////////Funcion para peticiones SNMP///////////
import snmp from "net-snmp"
import { toBigIntBE } from "bigint-buffer"

export function SNMP(OID, ip) {
    const options = {
        puerto: 161,
        reintentos: 5,
        tiempoEspera: 5000,
        retroceso: 1.0,
        transporte: "udp4",
        puertoTrampa: 162,
        version: snmp.Version2c,
        obtenerSiguientesHaciaAtras: false,
        informarErroresDeDesajusteDeOid: false,
        tamañoDeBitsDeId: 32,
    };

    // Crear e iniciar sesión con registro de errores
    const session = crearYRegistrarError(ip, "Canopyro", options);

    // Definir un array vacío para almacenar datos
    let datos = [];

    // Usar un enfoque basado en Promise para el manejo asincrónico
    return new Promise((resolver, rechazar) => {
        session.get(OID, (error, varbinds) => {
            if (error) {
                rechazar(error.toString()); // Rechazar la Promesa con el error
            } else {
                varbinds.map((varbind) => {
                    if (snmp.isVarbindError(varbind)) {
                        return snmp.varbindError(varbind); // Manejar errores de varbind
                    } else {
                        // Usar BigInt (si aplica) o Number para la conversión
                        const valor = obtenerValorConvertido(varbind.value);

                        // Construir el objeto y añadirlo al array de datos
                        const obj = {
                            oid: varbind.oid,
                            valor,
                        };
                        datos.push(obj);
                    }
                });

                session.close(((error) => {
                    if (error) {
                        console.error("Error al cerrar la sesión:", error);
                        // Opcionalmente, manejar errores aquí
                    } else {
                        // La sesión se ha cerrado correctamente, proceder a la resolución de la Promesa
                        resolver(datos);
                    }
                })());
            }
        });
    });
}
// Crear e iniciar sesión con registro de errores
function crearYRegistrarError(ip, comunidad, options) {
    try {
        return snmp.createSession(ip, comunidad, options);
    } catch (error) {
        console.error("Error al crear la sesión SNMP:", error);
        // Opcionalmente, manejar el registro o devolver un error aquí
    }
}

// Convertir el valor según el tipo (BigInt o Number)
function obtenerValorConvertido(valor) {

    if (typeof valor == "object") {
        // Usar BigInt si se admite
        valor = Number(toBigIntBE(valor))
        return valor;
    } else {
        // Usar Number de lo contrario
        return valor;
    }
}
//////////////////OIDs segun Tecnologia///////////
export function OIDs(tec) {
    if (tec == "ePMP") {
        const OID = ["1.3.6.1.4.1.17713.21.1.2.1.0", "1.3.6.1.4.1.17713.21.1.2.2.0", "1.3.6.1.4.1.17713.21.1.2.10.0", "1.3.6.1.4.1.17713.21.2.1.65.0"]
        return OID
    }
}


///////////////////////Mongoose//////////////////
import mongoose from "mongoose";
const url = "mongodb://localhost:27017/"

mongoose.connect(url, { dbName: "Plazas" })
    .then(() => {
        console.log("DB connected")
    })
    .catch(e => {
        console.error("Error conectando a la DB")
    })


///////Funcion para actualizar los APs//////

const actualizarAutomaticamenteObjetoEnBaseDeDatos = () => {
    setInterval(async () => {
        try {
            // Lógica para actualizar el objeto
            await actualizarObjetoEnBaseDeDatos();
            console.log('Objeto actualizado automáticamente');
        } catch (error) {
            console.error('Error al actualizar automáticamente el objeto:', error);
        }
    }, 60000); // Se ejecutará cada 60 segundos (60000 milisegundos)
}