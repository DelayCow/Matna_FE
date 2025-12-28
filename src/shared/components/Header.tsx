import { useLocation, useNavigate } from 'react-router-dom';
import logo from "../../assets/matna_logo2.png";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const mainPaths = ['/', '/recipe', '/groupBuy'];
  const isMain = mainPaths.includes(location.pathname);

  const getPageName = () => {
    const path = location.pathname;
    switch (true) {
      case path == '/mypage': return '마이페이지';
      case path.startsWith('/recipe') : return '레시피 조회';
      case path.startsWith('/review/recipe') : return '레시피 후기';
    }
  };

  return (
    <>
      {isMain ? (
        /* 메인 헤더 */
        <header className="d-flex justify-content-between align-items-center p-3 bg-white sticky-top" style={{ zIndex: 1020 }}>
          <img className="logo-img" src={logo} alt="로고" style={{ width: '5rem' }} />
        </header>
      ) : (
        /* 페이지 헤더 */
        <header className="d-flex justify-content-between align-items-center p-3 bg-white sticky-top" style={{ zIndex: 1020 }}>
          <button onClick={() => navigate(-1)} className="btn p-0 border-0 text-dark">
            <i className="bi bi-chevron-left fs-4"></i>
          </button>
          <h4 className="m-0 fw-bold">{getPageName()}</h4>
          <div className="text-white"><i className="bi bi-bell fs-4"></i></div>
        </header>
      )}
    </>
  );
}