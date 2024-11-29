import { EneterModes } from "../enums/login";
import { IEnterModeOption } from "../interfaces/login";
import { IUser } from "../interfaces/user";
import { getLogin, loginUser, registerUser } from "../services/userService";

export const fetchByType: Record<EneterModes, (username: string, password: string) => Promise<void>> = {
    [EneterModes.LOGIN]: loginUser,
    [EneterModes.REGISTER]: registerUser
}


export const enterModeText: Record<EneterModes, string> = {
    [EneterModes.LOGIN]: 'login',
    [EneterModes.REGISTER]: 'register',
}

export const enterModeOptions: IEnterModeOption[] = [
    {
        key: EneterModes.LOGIN,
        title: enterModeText[EneterModes.LOGIN]
    },
    {
        key: EneterModes.REGISTER,
        title: enterModeText[EneterModes.REGISTER]
    }
]
