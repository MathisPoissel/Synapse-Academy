import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

export default function ContactLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
