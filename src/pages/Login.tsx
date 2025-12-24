import "../shared/styles/auth.css";
import logo from "../assets/matna_logo.png";
import AuthInput from "../shared/components/AuthInput";
import Divider from "../features/auth/components/Divider";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../features/auth/hooks/useLogin";


export default function Login(){
    const { memberId, setMemberId, password, setPassword, message, handleLogin } = useLogin();
    const navigate = useNavigate();

    const moveRegister = function(){
        navigate("/register")
    }

    return(
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100">
        <div className="text-center mb-5">
            <img className="logo-img" src={logo} alt="로고"/>
        </div>

        <AuthInput type='text' label='아이디' name='memberId' value={memberId} inputHandling={(e) => setMemberId(e.target.value)}/>
        <AuthInput type='password' label='비밀번호' name='password' value={password} inputHandling={(e) => setPassword(e.target.value)}/>

        <small className="text-danger mb-3">{message}</small>

        <button onClick={handleLogin} className="btn btn-warning auth-btn">로그인</button>
        <Divider text='회원 가입'/>
        <button onClick={moveRegister} className="btn btn-outline-warning auth-btn">회원가입</button>
    </div>
    )
}