import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap, Plus, List } from "lucide-react";

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="bg-card border-b shadow-card sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">SchoolHub</span>
          </div>
          
          <div className="flex space-x-4">
            <Button
              variant={location.pathname === "/" ? "default" : "ghost"}
              asChild
              className="flex items-center space-x-2"
            >
              <Link to="/">
                <List className="h-4 w-4" />
                <span>View Schools</span>
              </Link>
            </Button>
            
            <Button
              variant={location.pathname === "/add-school" ? "default" : "ghost"}
              asChild
              className="flex items-center space-x-2"
            >
              <Link to="/add-school">
                <Plus className="h-4 w-4" />
                <span>Add School</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;