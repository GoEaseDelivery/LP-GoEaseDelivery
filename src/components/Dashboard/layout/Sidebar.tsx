import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ChefHat, 
  LayoutDashboard, 
  FileText, 
  Ticket, 
  UtensilsCrossed,
  ChevronLeft,
  ChevronRight,
  Tag
} from 'lucide-react';
import { cn } from '../../../app/utils/cn';

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: FileText, label: "Relatório", path: "/relatorio" },
  { icon: Ticket, label: "Cupons", path: "/cupons" },
  { icon: UtensilsCrossed, label: "Cardápio", path: "/cardapio" },
  { icon: Tag, label: "Categorias", path: "/categorias" },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div
      className={cn(
        "bg-white border-r border-gray-200 h-screen transition-all duration-150",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="p-4 flex items-center justify-between border-b">
        <div
          className={cn(
            "flex items-center gap-3",
            collapsed && "justify-center"
          )}
        >
          <ChefHat className="h-8 w-8 text-blue-600  block" />
          {!collapsed && (
            <span className={`font-semibold text-lg  `}>
              Pizzaria Luigi's
            </span>
          )}
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                    "hover:bg-gray-100",
                    isActive && "bg-blue-50 text-blue-600",
                    collapsed && "justify-center"
                  )}
                >
                  <Icon size={20} />
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}