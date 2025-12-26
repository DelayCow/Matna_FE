import { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginApi from "../services/LoginApi";
import axios from "axios";

interface LoginResponse {
    message: string;
    redirectUrl?: string;
    error?: string;
}

export const useLogin = () => {
    const navigate = useNavigate();
    const [memberId, setMemberId] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [message, setMessage] = useState<string>("ㅤ");

    const handleLogin = async () => {
        try {
            const result = await loginApi(memberId, password);
            if (result.message === 'loginOk') {
                navigate(result.redirectUrl);
            }
        } catch (e:unknown){
            if (axios.isAxiosError<LoginResponse>(e)) {
                setMessage(e.response?.data?.error || "아이디/비밀번호가 일치하지 않습니다.");
            }else{
                setMessage("네트워크 오류가 발생했습니다.")
            }
            setMemberId("");
            setPassword("");
        }
    };

    return {
        memberId, setMemberId,
        password, setPassword,
        message, handleLogin
    };
};