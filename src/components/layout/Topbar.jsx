import {
  Bell,
  Search,
  Home,
  Briefcase,
  Info,
  Mail,
  ShieldAlert,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const Topbar = () => {
  const { user } = useAuth();

  return (
    <header className="h-16 border-b bg-card flex items-center justify-between px-6">
      <div className="flex items-center gap-6">
        <Link to="/" className="flex items-center gap-2">
          <ShieldAlert className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold">SafetyMS</span>
        </Link>
        <Link
          to="/"
          className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
        >
          <Home className="h-4 w-4" />
          <span>Home</span>
        </Link>
        {/* <Link
          to="#services"
          className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
        >
          <Briefcase className="h-4 w-4" />
          <span>Services</span>
        </Link>
        <Link
          to="#about"
          className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
        >
          <Info className="h-4 w-4" />
          <span>About</span>
        </Link>
        <Link
          to="#contact"
          className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
        >
          <Mail className="h-4 w-4" />
          <span>Contact</span>
        </Link> */}
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 hover:bg-accent rounded-lg transition-colors">
          <Bell className="h-5 w-5" />
          <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-destructive text-xs">
            3
          </Badge>
        </button>

        <div className="flex items-center gap-3 pl-4 border-l">
          <div className="text-right">
            <p className="text-sm font-medium">{user?.name}</p>
            <p className="text-xs text-muted-foreground capitalize">
              {user?.role?.replace("_", " ")}
            </p>
          </div>
          <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">
            {user?.name.charAt(0)}
          </div>
        </div>
      </div>
    </header>
  );
};
