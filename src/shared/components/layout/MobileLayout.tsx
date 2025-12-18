import { Outlet } from 'react-router-dom';

const MobileLayout = () => {
  return (
    <div className="mobile-layout">
        <Outlet />
    </div>
  );
};

export default MobileLayout;