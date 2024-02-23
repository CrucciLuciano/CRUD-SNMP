import AccessPointService from "../service/accesPoint.services.js";

const aPController = new AccessPointService()

export const createAP = async (req, res) => {
    const data = req.body
    try {
        return res.status(200).json({
            status: "success",
            msg: "AP Agregado",
            data: await aPController.createAP(data)
        })
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            status: "error",
            msg: "something went wrong :(",
            data: { e },
        });
    }
}

export const getAP = async (req, res) => {
    const resGet = await aPController.getAP()
    res.render("home", { resGet })
}

export const upDateAP = async (req, res) => {
    const IP = req.params.IP
    const data = req.body
    const resUpdate = await aPController.upDateAP(data, IP)
    try {
        return res.status(200).json({
            status: "success",
            msg: "AP Actualizado",
            data: resUpdate
        })
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            status: "error",
            msg: "something went wrong :(",
            data: { e },
        });
    }
}