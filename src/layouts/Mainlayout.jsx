import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const MainLayout = ({ children }) => {
  return (
    <div className="bg-[#0f0f0f] text-white min-h-screen">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 px-6 py-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;