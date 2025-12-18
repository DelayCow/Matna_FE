import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../features/home/pages/Home";
import Login from "../features/auth/pages/Login";
import MainLayout from "../shared/components/layout/MainLayout";
import MobileLayout from "../shared/components/layout/MobileLayout";

export default function AppRouter(){
    return(
        <BrowserRouter>
            <Routes>
                <Route element={<MobileLayout />}>
                    <Route element={<MainLayout />}>
                        <Route path="/" element={<Home />}/>
                    </Route>
                    
                    <Route path="/login" element={<Login />} /> 
                </Route>
            </Routes>
        </BrowserRouter>
   )
}