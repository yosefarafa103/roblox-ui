import AppPage from "./AppPage";
import { PackagesProvider } from "../context/PackagesContext";

const BodyContent = () => {
  return (
    <section className="p-5 bg-[#cce9fa] min-h-screen">
      <PackagesProvider>
        <AppPage />
      </PackagesProvider>
    </section>
  );
};

export default BodyContent;
