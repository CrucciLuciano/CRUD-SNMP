import AccessPointModel from "../dto/accesPoint.dto.js"
import { OIDs, SNMP } from "../utils.js"

class AccessPointService {
    constructor() {
        this.accessPointService = new AccessPointModel()
    }

    deleteAP = async (ip) => {
        return this.accessPointService.deleteAP(ip)
    }

    upDateAP = async (data, ip) => {
        return this.accessPointService.upDateAP(data, ip)
    }

    getAP = async () => {
        return this.accessPointService.getAP()
    }

    createAP = async (node, ip, technology, serviceMax) => {
        const OID = OIDs(technology)
        const dataSNMP = await SNMP(OID, ip)
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
        const combineData = { node, ip, technology, serviceMax, ...datos }
        return this.accessPointService.createAP(combineData)
    }

    updateAll = async () => {
        return this.accessPointService.updateAll()
    }
}

export default AccessPointService