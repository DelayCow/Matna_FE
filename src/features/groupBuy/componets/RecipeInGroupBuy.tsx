import { useNavigate } from 'react-router-dom';

// 레시피 타입 정의
export interface Recipe {
    recipeNo: number;
    imageUrl?: string;
    title: string;
    authorNickname?: string;
}

interface RecipeInGroupBuyProps {
    recipes: Recipe[];
}

export default function RecipeInGroupBuy({ recipes }: RecipeInGroupBuyProps) {
    const navigate = useNavigate();

    // 레시피 카드 클릭 핸들러
    const handleRecipeClick = (recipeNo: number) => {
        navigate(`/recipe/detail/${recipeNo}`);
    };

    // 이미지 에러 핸들러
    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
        e.currentTarget.src = 'https://placehold.co/150x100/A0B2C9/ffffff?text=Recipe';
    };

    return (
        <>
            <hr className="m-0" style={{ height: '8px', backgroundColor: '#f8f9fa' }} />

            <div className="recipe-suggestion p-3">
                <h5 className="fw-bold mb-3">이 상품으로 만들 레시피 추천</h5>
                
                <div id="data-recipe-list" className="recipe-cards-scroll d-flex">
                    {/* 레시피가 있는 경우 */}
                    {recipes && recipes.length > 0 ? (
                        recipes.map((recipe) => {
                            return (
                                <div key={recipe.recipeNo} className="card card-custom card-wide me-3 flex-shrink-0" style={{ cursor: 'pointer' }} 
                                    onClick={() => handleRecipeClick(recipe.recipeNo)}>
                                <img src={recipe.imageUrl} className="card-img-top" alt="레시피 이미지" onError={handleImageError} />
                                    <div className="card-body px-2 py-2">
                                        <p className="card-text fw-bold text-truncate mb-1">
                                            {recipe.title}
                                        </p>
                                        <small className="text-muted d-block">
                                            작성자 | {recipe.authorNickname}
                                        </small>
                                    </div>
                                </div>
                            );
                        })
                    ) : (

                        <p className="text-muted small">
                            이 상품과 관련된 추천 레시피가 없습니다.
                        </p>
                    )}
                </div>
            </div>
        </>
    );
}