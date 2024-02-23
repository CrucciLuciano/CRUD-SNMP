import apSchema from "./dao/ap.model.js"


class AccessPointModel {
    async createAP(data) {
        const apData = await apSchema.create(data)
        return apData
    }

    async getAP() {
        const getAP = await apSchema.find().lean()
        return getAP
    }

    async upDateAP(data, IP) {
        const objSearch = { ip: IP }
        console.log(typeof IP)
        const upDate = await apSchema.findOneAndUpdate(objSearch, data, { new: true })
        return upDate
    }
}
export default AccessPointModel