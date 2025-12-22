import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../features/home/pages/Home";
import Login from "../features/auth/pages/Login";
import MainLayout from "../shared/components/layout/MainLayout";
import MobileLayout from "../shared/components/layout/MobileLayout";
import RecipeHome from "../features/recipe/pages/recipeHome";
import GroupBuyHome from "../features/groupBuy/pages/groupBuyHome";
import MyPage from "../features/mypage/pages/MyPage";

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