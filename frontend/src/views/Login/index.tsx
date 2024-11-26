import React, { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../../assets/images/google.png';
import { useUser } from "../../contexts/userContext";
import { EneterModes } from "../../enums/login";
import { IEnterModeOption } from "../../interfaces/login";
import { getLogin, register } from "../../services/userService";
import { EnterMode } from "./EnterMode";
import './index.scss';
import { IUser } from "../../interfaces/user";


const enterModeText: Record<EneterModes, string> = {
    [EneterModes.LOGIN]: 'התחברות',
    [EneterModes.REGISTER]: 'הרשמה',
}

const enterModeOptions: IEnterModeOption[] = [
    {
        key: EneterModes.LOGIN,
        title: enterModeText[EneterModes.LOGIN]
    },
    {
        key: EneterModes.REGISTER,
        title: enterModeText[EneterModes.REGISTER]
    }
]

interface IProp {
    enterMode: EneterModes;
    setEnterMode: React.Dispatch<React.SetStateAction<EneterModes>>;
    onSubmit: (username: string, password: string) => Promise<void>;
}

export const LoginCard: React.FC<IProp> = ({ onSubmit, enterMode, setEnterMode }: IProp) => {
    const [username, setusername] = useState('');
    const [password, setPassword] = useState('');
      

    const onLogin = useCallback(async () => {
        await onSubmit(username, password)
    }, [username, password])


    return <div className="login-card">

        <div className="header">
            <span className="title">Welcome to SocialNet</span>
            <span className="desc">Connect with friends and share your moments</span>
        </div>

        <div className="card-data">
            <EnterMode selected={enterMode} options={enterModeOptions} onSelect={setEnterMode} />
            <input
                type="username"
                placeholder="username"
                value={username}
                onChange={(e) => setusername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <span onClick={onLogin} className="enter-button">{enterModeText[enterMode]}</span>
        </div>

        <div className="footer">
            <div className="google-button">
                <img src={logo} alt="Google" />
                <span >Sign in with Google</span>
            </div>
        </div>
    </div>
}

const LoginContainer: React.FC = () => {
    const { setUserData } = useUser();
    const [enterMode, setEnterMode] = useState<EneterModes>(EneterModes.LOGIN);
    console.log(enterMode, 'daiek')
    const navigate = useNavigate();
    const activeFetchByType = useMemo(() => fetchByType[enterMode], [enterMode])

    const onSubmit = useCallback(async (username: string, password: string) => {
        const userData = await activeFetchByType(username, password);
        if (!!userData) {
            setUserData(userData);
            navigate('/');
        }
    }, [navigate, setUserData, activeFetchByType]);

    return <LoginCard enterMode={enterMode} setEnterMode={setEnterMode} onSubmit={onSubmit} />
}

const fetchByType: Record<EneterModes, (username: string, password: string) => Promise<IUser | undefined>> = {
    [EneterModes.LOGIN]: getLogin,
    [EneterModes.REGISTER]: register
}

export const LoginScreen: React.FC = () => {
    return <div className="login-screen">
        <div className="login-container">
            <LoginContainer />
        </div>
    </div>
}