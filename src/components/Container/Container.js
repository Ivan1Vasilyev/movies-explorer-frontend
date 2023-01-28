import './Container.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const Container = ({ children, loggedIn }) => {
  return (
    <>
      <Header loggedIn={loggedIn} />
      {children}
      <Footer />
    </>
  );
};

export default Container;
