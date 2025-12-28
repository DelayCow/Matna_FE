import { useRef } from "react";
import { useHome } from "@/shared/hooks/useHome";
import { RecipeCard, type RecipeCardProps } from "@/shared/components/RecipeCard";
import QuantityGroupBuyCard, { type QuantityGroupBuy } from "@/shared/components/QuantityGroupBuyCard";
import PeriodGroupBuyCard, { type PeriodGroupBuy } from "@/shared/components/PeriodGroupBuyCard";
import { ReviewCard, type ReviewCardProps } from "@/shared/components/ReviewCard";
import "@/features/home/styles/home.css"


import cookingIcon from "@/assets/cooking.png";
import collisionIcon from "@/assets/collision.png";
import plateIcon from "@/assets/plate.png";
import { useNavigate } from "react-router-dom";

interface HomeSectionProps {
    title: string;
    subtitle?: string;
    icon: string;
    children: React.ReactNode;
    scrollRef: React.RefObject<HTMLDivElement | null>;
    onScroll: (direction: 'left' | 'right') => void;
}

export default function Home() {
    const navigate = useNavigate();
    const { recipes, quantityBuys, periodBuys, reviews, isLoading } = useHome();

    const recipeRef = useRef<HTMLDivElement>(null);
    const qtyRef = useRef<HTMLDivElement>(null);
    const periodRef = useRef<HTMLDivElement>(null);
    const reviewRef = useRef<HTMLDivElement>(null);


    const scroll = (ref: React.RefObject<HTMLDivElement>, direction: 'left' | 'right') => {
        if (ref.current) {
            const move = direction === 'left' ? -300 : 300;
            ref.current.scrollBy({ left: move, behavior: 'smooth' });
        }
    };

    if (isLoading) return <div className="p-5 text-center">맛나(Matna) 데이터를 불러오고 있어요!</div>;

    return (
        <div className="px-3 pb-5" id="main">
            {/* 레시피 섹션 */}
            <HomeSection
                title="많이 따라하는 레시피"
                icon={cookingIcon}
                scrollRef={recipeRef}
                onScroll={(dir) => scroll(recipeRef, dir)}
            >
                {recipes.map((item: Recipe) => (
                    
                    <div key={item.recipeNo} className="flex-shrink-0" style={{ width: '300px' }}>
                        <RecipeCard
                            recipe={item}
                            onClickDetail={() => navigate(`/recipe/detail/${item.recipeNo}`)}
                        />
                    </div>
                ))}
            </HomeSection>


            <HomeSection
                title="마감임박한 수량공구"
                subtitle="원하는 수량만큼 공구하고 싶어요"
                icon={collisionIcon}
                scrollRef={qtyRef}
                onScroll={(dir) => scroll(qtyRef, dir)}
            >
                {quantityBuys.map((item: QuantityGroupBuy) => (
                    <div key={item.quantityGroupBuyNo} className="flex-shrink-0" style={{ width: '300px' }}>
                        <QuantityGroupBuyCard data={item} />
                    </div>
                ))}
            </HomeSection>


            <HomeSection
                title="마감임박한 기간공구"
                subtitle="원하는 기간안에 공구하고 싶어요"
                icon={collisionIcon}
                scrollRef={periodRef}
                onScroll={(dir) => scroll(periodRef, dir)}
            >
                {periodBuys.map((item: PeriodGroupBuy) => (
                    <div key={item.periodGroupBuyNo} className="flex-shrink-0" style={{ width: '300px' }}>
                        <PeriodGroupBuyCard data={item} />
                    </div>
                ))}
            </HomeSection>


            <HomeSection
                title="최근 올라온 후기"
                icon={plateIcon}
                scrollRef={reviewRef}
                onScroll={(dir) => scroll(reviewRef, dir)}
            >
                {reviews.map((item: ReviewCardProps) => (
                    <div key={item.reviewNo} className="flex-shrink-0" style={{ width: '300px' }}>
                        <ReviewCard {...item} onClickDetail={(no) => console.log(no)} />
                    </div>
                ))}
            </HomeSection>
        </div>
    );
}

function HomeSection({ title, subtitle, icon, children, scrollRef, onScroll }: HomeSectionProps) {
    return (
        <section className="mb-5">

            <div className="section-title-wrapper">
                <div className="d-flex align-items-center">
                    <img src={icon} alt="icon" style={{ width: '24px', marginRight: '8px' }} />
                    <h5 className="section-title m-0">{title}</h5>
                </div>
                {subtitle && <p className="section-subtitle mb-0 mt-1">{subtitle}</p>}
            </div>

            <div className="position-relative">

                <button
                    className="btn btn-sm btn-light scroll-btn position-absolute top-50 start-0 translate-middle-y rounded-circle"
                    onClick={() => onScroll('left')}
                    style={{ marginLeft: '10px' }}
                >
                    <i className="bi bi-chevron-left"></i>
                </button>


                <div className="horizontal-scroll" ref={scrollRef}>
                    {children}
                </div>


                <button
                    className="btn btn-sm btn-light scroll-btn position-absolute top-50 end-0 translate-middle-y rounded-circle"
                    onClick={() => onScroll('right')}
                    style={{ marginRight: '10px' }}
                >
                    <i className="bi bi-chevron-right"></i>
                </button>
            </div>
        </section>
    );
}