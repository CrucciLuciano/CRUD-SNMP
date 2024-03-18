import { OIDs, SNMP } from "../utils.js"
import apSchema from "./dao/ap.model.js"

class AccessPointModel {
    async createAP(combineData) {
        const apData = await apSchema.create(combineData)
        return apData
    }

    async getAP() {
        const getAP = await apSchema.find().lean()
        return getAP
    }

    async upDateAP(data, ip) {
        const objSearch = { ip: ip }
        const upDate = await apSchema.findOneAndUpdate(objSearch, data, { new: true })
        return upDate
    }

    async deleteAP(ip) {
        const objSearch = { ip: ip }
        const deleteAP = await apSchema.findOneAndDelete(objSearch, objSearch)
        return deleteAP
    }

    async updateAll() {
        const allDB = await apSchema.find()
        // Usamos un bucle for...of para iterar de forma asíncrona
        for (const ap of allDB) {
            const OID = OIDs(ap.technology)
            const dataSNMP = await SNMP(OID, ap.ip)
            const datos = {};

            for (const objeto of dataSNMP) {
                const oid = objeto.oid;
                const valor = objeto.valor;

                if (oid === "1.3.6.1.4.1.17713.21.1.2.1.0") {
                    datos.frequency = valor;
                } else if (oid === "1.3.6.1.4.1.17713.21.1.2.2.0") {
                    if (valor === 1) {
                        datos.channel = 20
                    } else if (valor === 2) {
                        datos.channel = 40
                    } else if (valor === 3) {
                        datos.channel = 10
                    } else if (valor === 4) {
                        datos.channel = 5
                    } else if (valor === 5) {
                        datos.channel = 80
                    }
                } else if (oid === "1.3.6.1.4.1.17713.21.1.2.10.0") {
                    datos.countSM = valor;
                } else if (oid === "1.3.6.1.4.1.17713.21.2.1.65.0") {
                    datos.MB = valor;
                }
            }
            const upDateDB = await apSchema.findOneAndUpdate({ ip: ap.ip }, datos)
        }
        return allDB
    }
}
export default AccessPointModel