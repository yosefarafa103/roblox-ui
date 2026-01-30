import AppPage from "./AppPage";
import { PackagesProvider } from "./PackagesContext";

const BodyContent = () => {
  return (
    <section className="p-5 max-h-screen h-screen bg-[#cce9fa]">
      <PackagesProvider>
        <AppPage />
      </PackagesProvider>
    </section>
  );
};

export default BodyContent;
