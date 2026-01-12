import React, {ReactNode} from "react";
import { Link } from "react-router-dom";

interface Props{
    children: ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
    return(
    <div className="flex h-screen font-sans">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-8">Mi Sistema</h2>
        <nav className="flex flex-col gap-4">
            <Link to="/componentes/ProductTable" className="hover:bg-gray-700 px-3 py-2 rounded">Productos</Link>
        </nav>
      </div>

      {/* Contenido derecho */}
      <div className="flex-1 bg-gray-100 p-6 overflow-auto">{children}</div>
    </div>
  );
};

export default Layout;