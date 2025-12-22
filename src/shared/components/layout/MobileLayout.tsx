import { Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../../styles/mobileLayout.css';

const MobileLayout = () => {
  return (
    <div className="mobile-container position-relative">
        <Outlet />
    </div>
  );
};

export default MobileLayout;