import React, { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../../assets/images/google.png';
import { enterModeOptions, enterModeText, fetchByType } from "../../consts/login";
import { useUser } from "../../contexts/userContext";
import { EneterModes } from "../../enums/login";
import { EnterMode } from "./EnterMode";
import './index.scss';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { showToast } from "../../consts/toast";

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
    }, [username, password, onSubmit])


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

        try {
            await activeFetchByType(username, password);
            navigate('/');
            showToast(`successfully ${enterModeText[enterMode]}`, "success")

        }
        catch (error) {
            showToast(`failed to ${enterModeText[enterMode]}`, "error")
        }
    }
        , [navigate, setUserData, activeFetchByType, enterMode]);

    return <LoginCard enterMode={enterMode} setEnterMode={setEnterMode} onSubmit={onSubmit} />
}

export const LoginScreen: React.FC = () => {
    return <div className="login-screen">
        <div className="login-container">
            <LoginContainer />
        </div>
    </div>
}