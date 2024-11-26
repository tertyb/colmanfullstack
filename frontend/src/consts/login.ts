import { EneterModes } from "../enums/login";
import { IEnterModeOption } from "../interfaces/login";
import { IUser } from "../interfaces/user";
import { getLogin, register } from "../services/userService";

export const fetchByType: Record<EneterModes, (username: string, password: string) => Promise<IUser | undefined>> = {
    [EneterModes.LOGIN]: getLogin,
    [EneterModes.REGISTER]: register
}


export const enterModeText: Record<EneterModes, string> = {
    [EneterModes.LOGIN]: 'התחברות',
    [EneterModes.REGISTER]: 'הרשמה',
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
