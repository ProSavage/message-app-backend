import {getUserFromSession} from "../SessionManager";

const authenticateRequest = async (admin: boolean, req: any, res: any, next: any) => {
    if (!req.headers.authorization) {
        res.json({success: false, message: "No authorization was provided."})
        return
    }
    const user = await getUserFromSession(req.headers.authorization)
    if (!user) {
        res.json({success: false, message: "You aren't authorized to use this endpoint."})
        return
    }

    if (admin && !user.admin) {
        res.json({success: false, message: "You have to be an administrator to use this endpoint."})
        return
    }

    req._user = user
    next()
}

export const getUserFromReq = (req: any) => {
    return req._user
}


export default authenticateRequest;