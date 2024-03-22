import { Response } from "express"


const CreatedResponse = (res: Response,data: any) => {
    return res.status(201).json({
        "success": true,
        "message": "Operation Successful",
        data});
}

const SuccessResponse = (res: Response,data: any) => {
    return res.status(200).json({
        "success": true,
        "message": "Operation Successful",
        data});
}

const BadRequestResponse = (res: Response, data: any) => {
    return res.status(400).json({"success": false, data});
}

const ServerResponse = (res: Response, data: any) => {
    return res.status(500).json({"success": false, data});
}

export {
    CreatedResponse,
    SuccessResponse,
    BadRequestResponse,
    ServerResponse,

}