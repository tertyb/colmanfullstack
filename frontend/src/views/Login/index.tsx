import React, { useState } from "react";
import { EneterModes } from "../../enums/login";
import { IEnterModeOption } from "../../interfaces/login";
import { EnterMode } from "./EnterMode";
import logo from '../../assets/images/google.png';
import './index.scss'


const enterModeText: Record<EneterModes, string> = {
    [EneterModes.LOGIN]:  'התחברות',
    [EneterModes.REGISTER]:  'הרשמה',
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

export const LoginCard: React.FC = () => {
    const [enterMode, setEnterMode] = useState<EneterModes>(EneterModes.LOGIN);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');    

    return <div className="login-card">

        <div className="header">
            <span className="title">Welcome to SocialNet</span>
            <span className="desc">Connect with friends and share your moments</span>
        </div>
        
        <div className="card-data">
            <EnterMode selected={enterMode} options={enterModeOptions} onSelect={setEnterMode}/>
            <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />
        <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
        <span className="enter-button">{enterModeText[enterMode]}</span>
        </div>

        <div className="footer">
        <div className="google-button">
    <img src={logo} alt="Google"/>
    <span>Sign in with Google</span>
    </div>
    </div> 
    </div>       
}

export const LoginScreen: React.FC = () => {
    return  <div className="login-screen">
         <div className="login-container">
        <LoginCard/>
        </div>
    </div>
}