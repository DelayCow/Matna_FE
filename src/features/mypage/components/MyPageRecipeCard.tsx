import { useNavigate } from "react-router-dom";
import { SpicyLevelFormat } from "@/shared/services/data/SpicyLevelFormat";
// import { DifficultyFormat } from "@/shared/services/data/DifficultyFormat";
import {getDifficultyText} from "@/shared/services/data/DifficultyText";


export interface MyPageRecipe {
    id: number;
    title: string;
    rating: number;
    image: string;
    reviewCount: number;
    difficulty: string;
    time: number;       
    serving: number;    
    spicy: number;        
}



interface MyPageRecipeCardProps {
  item: MyPageRecipe;
  isOwner: boolean;
  onDelete: (recipeNo: number) => void;
}

export const MyPageRecipeCard = ({ item, isOwner, onDelete }: MyPageRecipeCardProps) => {
    const navigate = useNavigate();

    //기본 음식 이미지는 로컬 데이터쓰나
    const imgUrl = item.image || '/img/default_food.jpg';

    return (
        <div className="recipe-card mb-4 col-12" style={{ cursor: 'pointer' }}>
            {/* 이미지 영역: 상세 페이지 이동 (recipeNo -> id 사용) */}
            <div className="card-img-wrap" onClick={() => navigate(`/recipe/detail/${item.id}`)}>
                <img 
                    src={imgUrl} 
                    alt={item.title} 
                    className="w-100 h-100 object-fit-cover rounded"
                    onError={(e) => (e.currentTarget.src = '/img/default_food.jpg')}
                />
            </div>

            {/* 정보 영역 */}
            <div className="card-info mt-2 p-2">
                <h5 className="card-title fw-bold">{item.title}</h5>
                
                <div className="d-flex align-items-center mb-2">
                    <span className="text-warning me-1"><i className="bi bi-star-fill"></i></span>
                    <span className="fw-bold me-1">
                        {/* 🛠️ averageRating -> rating으로 변경 */}
                        {item.rating != null ? Number(item.rating).toFixed(1) : "0.0"}
                    </span>
                    <span className="text-muted small">({item.reviewCount || 0})</span>

                    {/* 케밥 메뉴 (본인 확인) */}
                    {isOwner && (
                        <div className="dropdown ms-auto" onClick={(e) => e.stopPropagation()}>
                            <button 
                                className="btn btn-link text-secondary p-0 border-0" 
                                type="button" 
                                data-bs-toggle="dropdown"
                            >
                                <i className="bi bi-three-dots-vertical"></i>
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end shadow border-0">
                                <li>
                                    <button className="dropdown-item small" onClick={() => navigate(`/recipe/edit/${item.id}`)}>
                                        수정
                                    </button>
                                </li>
                                <li><hr className="dropdown-divider my-1" /></li>
                                <li>
                                    <button 
                                        className="dropdown-item small text-danger" 
                                        onClick={() => onDelete(item.id)}
                                    >
                                        삭제
                                    </button>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>

                {/* 태그 영역: MyPageRecipe 인터페이스 필드 적용 */}
                <div className="d-flex flex-wrap gap-2 text-secondary" style={{ fontSize: '0.8rem' }}>
                    {/* prepTime -> time */}
                    <span className="bg-light px-2 py-1 rounded-pill border">
                        <i className="bi bi-clock me-1"></i>{item.time}분
                    </span>
                    {/* 난이도 */}
                    <span className="bg-light px-2 py-1 rounded-pill border">
                        <i className="bi bi-bar-chart me-1"></i>{getDifficultyText(item.difficulty)}
                    </span>
                    {/* spicyLevel -> spicy */}
                    {item.spicy !== undefined && (
                        <span className="bg-danger-subtle text-danger px-2 py-1 rounded-pill border border-danger-subtle">
                            <i className="bi bi-fire me-1"></i>{SpicyLevelFormat(item.spicy)}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};