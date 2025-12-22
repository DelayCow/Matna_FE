import { Outlet } from 'react-router-dom';
import Header from '../Header';
import Footer from '../MenuBar';


const MainLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;