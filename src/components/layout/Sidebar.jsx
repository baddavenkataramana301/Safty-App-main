import { NavLink } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import ProfileEditDialog from "@/components/ProfileEditDialog";
import {
  LayoutDashboard,
  AlertTriangle,
  CheckSquare,
  Bell,
  AlertCircle,
  FileText,
  GraduationCap,
  BarChart3,
  Users,
  Settings,
  ShieldAlert,
  LogOut,
  Edit,
  User,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const getProfileIcon = (profileIcon) => {
  switch (profileIcon) {
    case "Shield":
      return Shield;
    case "Settings":
      return Settings;
    default:
      return User;
  }
};

export const Sidebar = () => {
  const { user, logout } = useAuth();

  const getNavItems = () => {
    switch (user?.role) {
      case "admin":
        return [
          { to: "/admin-dashboard", icon: LayoutDashboard, label: "Dashboard" },
          { to: "/users", icon: Users, label: "User Management" },
          { to: "/hazards", icon: AlertTriangle, label: "Hazards" },
          { to: "/training", icon: GraduationCap, label: "Training" },
          { to: "/checklists", icon: CheckSquare, label: "Checklists" },
          { to: "/notifications", icon: Bell, label: "Notifications" },
          { to: "/analytics", icon: BarChart3, label: "Reports" },
          { to: "/settings", icon: Settings, label: "System Settings" },
        ];
      case "safety_manager":
        return [
          {
            to: "/manager-dashboard",
            icon: LayoutDashboard,
            label: "Dashboard",
          },
          { to: "/hazards", icon: AlertTriangle, label: "Hazards" },
          { to: "/checklists", icon: CheckSquare, label: "Checklists" },
          { to: "/notifications", icon: Bell, label: "Notifications" },
          { to: "/analytics", icon: BarChart3, label: "Analytics" },
          { to: "/alerts", icon: ShieldAlert, label: "Alerts" },
        ];
      case "supervisor":
        return [
          {
            to: "/supervisor-dashboard",
            icon: LayoutDashboard,
            label: "Dashboard",
          },
          { to: "/hazards", icon: AlertTriangle, label: "Hazards" },
          { to: "/checklists", icon: CheckSquare, label: "Checklists" },
          { to: "/notifications", icon: Bell, label: "Notifications" },
          { to: "/analytics", icon: BarChart3, label: "Analytics" },
          { to: "/alerts", icon: ShieldAlert, label: "Alerts" },
        ];
      case "employee":
        return [
          {
            to: "/employee-dashboard",
            icon: LayoutDashboard,
            label: "Dashboard",
          },
          { to: "/hazards", icon: AlertTriangle, label: "Report Hazard" },
          { to: "/alerts", icon: ShieldAlert, label: "Alerts" },
          { to: "/notifications", icon: Bell, label: "Notifications" },
          {
            to: user?.approved ? "/checklists" : null,
            icon: CheckSquare,
            label: user?.approved ? "My Checklists" : "My Checklists (Pending)",
            disabled: !user?.approved,
          },
          { to: "/training", icon: GraduationCap, label: "Training" },
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  return (
    <aside className="w-64 min-h-screen bg-sidebar border-r border-sidebar-border flex flex-col">
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <ShieldAlert className="h-8 w-8 text-sidebar-foreground" />
          <div>
            <h1 className="text-xl font-bold text-sidebar-foreground">
              SafetyMS
            </h1>
            <p className="text-xs text-sidebar-foreground/80 capitalize">
              {user?.role?.replace("_", " ")}
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                "text-sidebar-foreground/90 hover:bg-sidebar-accent hover:text-sidebar-foreground",
                isActive &&
                  "bg-sidebar-accent text-sidebar-foreground font-medium"
              )
            }
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3 mb-4">
          <Avatar>
            <AvatarFallback className="bg-sidebar-accent text-sidebar-foreground">
              {(() => {
                const ProfileIcon = getProfileIcon(user?.profileIcon || "User");
                return <ProfileIcon className="h-6 w-6" />;
              })()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">
              {user?.name}
            </p>
            <p className="text-xs text-sidebar-foreground/80 truncate">
              {user?.email}
            </p>
          </div>
          <ProfileEditDialog>
            <Button variant="ghost" size="sm" className="text-sidebar-foreground/90 hover:bg-sidebar-accent">
              <Edit className="h-4 w-4" />
            </Button>
          </ProfileEditDialog>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 w-full text-sidebar-foreground/90 hover:bg-sidebar-accent hover:text-sidebar-foreground"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};
