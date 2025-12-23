import { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginApi from "../services/LoginApi";

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
        } catch {
            setMessage('아이디/비밀번호를 다시 입력해주세요');
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