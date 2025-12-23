import { useState } from "react";
import "../styles/searchBar.css";

interface SearchBarProps {
    type: 'groupbuy' | 'recipe';
    placeholder?: string;
    onSearch?: (keyword: string) => void;
}

export default function SearchBar({type, placeholder, onSearch}: SearchBarProps){
    const [searchKeyword, setSearchKeyword] = useState('');

    const defaultPlaceholder = type === 'groupbuy'
        ? '찾고 싶은 공동구매를 검색 해 주세요' : '찾고 싶은 레시피를 검색 해 주세요';
    const finalPlaceholder = placeholder || defaultPlaceholder;

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const keyword = e.target.value;
        setSearchKeyword(keyword);
        if(onSearch){
            onSearch(keyword);
        }
    };

    const [isEditBoxOpen, setIsEditBoxOpen] = useState(false);
    const toggleEditBox = () => {
        setIsEditBoxOpen(!isEditBoxOpen);
    }

    // 공동구매 타입일 때 드롭다운 렌더링
    const renderGroupBuyButton = () => (
        <div id="edit-box" className="position-relative me-3">
        <i className="bi bi-plus-square-fill header-icon" style={{color: '#495057'}} onClick={toggleEditBox}/>
        <div className={`edit-box text-center bg-white ${isEditBoxOpen ? 'show' : ''}`}>
            <a href="/periodGroupBuy/register" className="text-decoration-none text-dark">
            <div className="mb-2" id="addPeriodBuy">기간공구</div>
            </a>
            <a href="/quantityGroupBuy/register" className="text-decoration-none text-dark">
            <div className="mt-2" id="addQuantityBuy">수량공구</div>
            </a>
        </div>
        </div>
    );
    // 레시피 타입일 때 단순 링크 렌더링
    const renderRecipeButton = () => (
        <a href="/recipe/add" className="me-3">
        <i className="bi bi-plus-square-fill header-icon" style={{color: '#495057'}} />
        </a>
    );

    return(
        <div className="search-header d-flex flex-column">
            <div className="d-flex align-items-center mb-3">
                {type === 'groupbuy'? renderGroupBuyButton() : renderRecipeButton()}

                <div className="search-input-group d-flex align-items-center flex-grow-1 me-3">
                    <i className="bi bi-search me-2 text-muted" />
                    <input type="text" id="search-input" className="search-input"
                            placeholder={finalPlaceholder}
                            value={searchKeyword}
                            onChange={handleSearch}
                    />
                </div>
            </div>
        </div>
    );
}