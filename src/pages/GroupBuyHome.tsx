import PeriodGroupBuyCard from "../shared/components/PeriodGroupBuyCard";
import QuantityGroupBuyCard from "../shared/components/QuantityGroupBuyCard";
import SearchBar from "../shared/components/SearchBar";
import SortDropdown, { type SortOption } from "../shared/components/SortDropDown";
import { useGroupBuyHome } from "../shared/hooks/useGroupBuyHome";
import "../features/groupBuy/styles/groupBuyHome.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js" //추후 삭제 예정


export default function GroupBuyHome(){
    //Custom Hook 사용
    const {
        activeTab,
        handleTabChange,
        
        periodList,
        quantityList,
        
        isPeriodLoading,
        isQuantityLoading,
        
        periodError,
        quantityError,
        
        handleSearch,
        handleSortChange
    } = useGroupBuyHome();


    const sortOptions: SortOption[] = [
        { label: "최신순", value: "recent" },
        { label: "마감임박순", value: "dueSoon" },
    ];

    return(
    <>
        <SearchBar type="groupbuy" onSearch={handleSearch} />
        <SortDropdown options={sortOptions} defaultValue="recent" onChange={handleSortChange} />
        
        <ul className="nav gb-nav-tabs bg-white mb-3 sticky-top" style={{top: '60px', zIndex: 100}} id="myTab" role="tablist">
            <li className="gb-nav-item" role="presentation">
                <button 
                    className={`gb-nav-link ${activeTab === 'period' ? 'active' : ''}`}
                    onClick={() => handleTabChange('period')}
                    type="button" 
                    role="tab" 
                    aria-controls="main-tab-pane" 
                    aria-selected={activeTab === 'period'}
                >기간공구</button>
            </li>
            <li className="gb-nav-item" role="presentation">
                <button 
                    className={`gb-nav-link ${activeTab === 'quantity' ? 'active' : ''}`}
                    onClick={() => handleTabChange('quantity')}
                    type="button" 
                    role="tab" 
                    aria-controls="quantity-tab-pane" 
                    aria-selected={activeTab === 'quantity'}
                >수량공구</button>
            </li>
        </ul>

        <div className="tab-content">
            {activeTab === 'period' && (
            <div className="tab-pane fade show active px-3" id="main-tab-pane" role="tabpanel" aria-labelledby="main-tab" tabIndex={0}>
                <div className="container-fluid py-2">
                    <div className="row row-cols-1 row-cols-md-2 g-3" id="periodBuyContainer">
                        {isPeriodLoading &&(
                            <div className="col-12 text-center py-5">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        )}
                        {periodError && !isPeriodLoading &&(
                            <div className="col-12 text-center py-5">
                                <p className="text-danger">{periodError}</p>
                            </div>
                        )}
                        {!isPeriodLoading && !periodError && periodList.length === 0 && (
                            <div className="col-12 text-center py-5">
                                <p className="text-muted">기간공구가 없습니다.</p>
                            </div>
                        )}
                        {!isPeriodLoading && !periodError && periodList.map((item) =>(
                            <div key={item.periodGroupBuyNo} className="col d-flex justify-content-center">
                                <PeriodGroupBuyCard data={item} />
                            </div>
                        ))}
                        
                    </div>
                </div>    
            </div>
            )}
            {activeTab === 'quantity' && (
            <div className="tab-pane fade show active px-3" id="quantity-tab-pane" role="tabpanel" aria-labelledby="quantity-tab" tabIndex={0}>
                <div className="container-fluid py-2">
                    <div className="row row-cols-1 row-cols-md-2 g-3" id="quantityBuyContainer">
                        {isQuantityLoading &&(
                            <div className="col-12 text-center py-5">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        )}
                        {quantityError && !isQuantityLoading &&(
                            <div className="col-12 text-center py-5">
                                <p className="text-danger">{quantityError}</p>
                            </div>
                        )}
                        {!isQuantityLoading && !quantityError && quantityList.map((item)=>(
                            <div key={item.quantityGroupBuyNo} className="col d-flex justify-content-center">
                                <QuantityGroupBuyCard data={item}/>
                            </div>
                        ))}
                        
                    </div>
                </div>
            </div>
            )}
        </div>
    </>)
}