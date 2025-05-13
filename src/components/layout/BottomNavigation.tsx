
import { Home, Search, Calendar, User, Menu } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const BottomNavigation = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { path: '/', icon: Home, label: 'الرئيسية' },
    { path: '/search', icon: Search, label: 'البحث' },
    { path: '/appointments', icon: Calendar, label: 'المواعيد' },
    { path: '/qa', icon: User, label: 'استشارات' },
    { path: '/menu', icon: Menu, label: 'القائمة' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-around items-center bg-white shadow-lg border-t border-gray-200 px-2 py-3 z-50">
      {navItems.map((item) => {
        const isActive = currentPath === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex flex-col items-center justify-center flex-1",
              isActive ? "text-medical-500" : "text-gray-500"
            )}
          >
            <item.icon
              size={20}
              className={cn(
                "mb-1",
                isActive ? "text-medical-500" : "text-gray-500"
              )}
            />
            <span className="text-xs">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default BottomNavigation;
