import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import MainLayout from "../shared/components/layout/MainLayout";
import MobileLayout from "../shared/components/layout/MobileLayout";
import RecipeHome from "../pages/RecipeHome";
import GroupBuyHome from "../pages/GroupBuyHome";
import MyPage from "../pages/MyPage";

const MemberRoute = function(){
    const token = sessionStorage.getItem('au');
    return token ? <Outlet /> : <Navigate to="/login" replace />
}

export default function AppRouter(){
    return(
        <BrowserRouter>
            <Routes>
                <Route element={<MobileLayout />}>
                    <Route element={<MemberRoute />}>
                        <Route element={<MainLayout />}>
                            <Route path="/" element={<Home />}/>
                            <Route path="/recipe" element={<RecipeHome />}/>
                            <Route path="/groupBuy" element={<GroupBuyHome />}/>
                            <Route path="/mypage" element={<MyPage />}/>
                        </Route>
                    </Route>
                    
                    <Route path="/login" element={<Login />} /> 
                </Route>
            </Routes>
        </BrowserRouter>
   )
}