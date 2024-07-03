import AccessPointService from "../service/accesPoint.services.js";

const aPController = new AccessPointService()

export const createAPGet = async (req, res) => {
    try {
        return res.status(200).render("formCreateAP")
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            status: "error",
            msg: "something went wrong :(",
            data: { e },
        });
    }
}

export const createAPost = async (req, res) => {
    try {
        const { node, ip, technology, serviceMax } = req.body;
        const data = await aPController.createAP(node, ip, technology, serviceMax)
        return res.status(200).json({
            status: "success",
            msg: "AP Creado"
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
    res.render("home", { style: "style.css", resGet })
}

export const upDateAP = async (req, res) => {
    const ip = req.params.ip
    const data = req.body
    const resUpdate = await aPController.upDateAP(data, ip)
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

export const deleteAP = async (req, res) => {
    const ip = req.params.ip
    const resDelete = await aPController.deleteAP(ip)
    try {
        return res.status(200).json({
            status: "success",
            msg: "AP Borrado",
            data: resDelete
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

export const updateAll = async (req, res) => {
    const updateResult = await aPController.updateAll()
    try {
        return res.status(200).json({
            status: "success",
            msg: "APs Actualizados",
            data: updateResult
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