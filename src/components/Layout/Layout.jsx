import Navbar from './Navbar';
import '../../styles/Layout.css';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Navbar />
      <main className="layout-main">
        {children}
      </main>
    </div>
  );
};

export default Layout; 