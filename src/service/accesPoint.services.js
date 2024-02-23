import AccessPointModel from "../dto/accesPoint.dto.js"
import { OIDs, SNMP } from "../utils.js"

class AccessPointService {
    constructor() {
        this.accessPointService = new AccessPointModel()
    }

    upDateAP = async (data, IP) => {
        return this.accessPointService.upDateAP(data, IP)
    }

    getAP = async () => {
        return this.accessPointService.getAP()
    }

    createAP = async (data) => {
        const OID = OIDs(data.technology)
        const IP = data.ip
        const dataSNMP = await SNMP(OID, IP)
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
        const combineData = { ...data, ...datos }
        return this.accessPointService.createAP(combineData)
    }
}

export default AccessPointService