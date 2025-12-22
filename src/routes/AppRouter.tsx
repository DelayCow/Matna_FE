import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import MainLayout from "../shared/components/layout/MainLayout";
import MobileLayout from "../shared/components/layout/MobileLayout";
import RecipeHome from "../pages/RecipeHome";
import GroupBuyHome from "../pages/GroupBuyHome";
import MyPage from "../pages/MyPage";

export default function AppRouter(){
    return(
        <BrowserRouter>
            <Routes>
                <Route element={<MobileLayout />}>
                    <Route element={<MainLayout />}>
                        <Route path="/" element={<Home />}/>
                        <Route path="/recipe" element={<RecipeHome />}/>
                        <Route path="/groupBuy" element={<GroupBuyHome />}/>
                        <Route path="/mypage" element={<MyPage />}/>
                    </Route>
                    
                    <Route path="/login" element={<Login />} /> 
                </Route>
            </Routes>
        </BrowserRouter>
   )
}