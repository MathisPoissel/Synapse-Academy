import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

export default function RootTemplate({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
