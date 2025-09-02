import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Mail, Phone, School, Search, Filter, Trash2, Plus } from "lucide-react";
import Navigation from "@/components/Navigation";
import heroImage from "@/assets/hero-education.jpg";
import { useSchools } from "@/contexts/SchoolContext";
import { toast } from "@/hooks/use-toast";

const ShowSchools = () => {
  const { schools, deleteSchool } = useSchools();
  const [searchTerm, setSearchTerm] = useState("");
  const [stateFilter, setStateFilter] = useState("");

  // Filter schools based on search term and state
  const filteredSchools = schools.filter(school => {
    const matchesSearch = 
      school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.address.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesState = !stateFilter || school.state === stateFilter;
    
    return matchesSearch && matchesState;
  });

  // Get unique states for filter
  const uniqueStates = [...new Set(schools.map(school => school.state))].sort();

  const handleDeleteSchool = (schoolId: string, schoolName: string) => {
    if (window.confirm(`Are you sure you want to delete "${schoolName}"?`)) {
      deleteSchool(schoolId);
      toast({
        title: "School Deleted",
        description: `${schoolName} has been removed successfully.`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative h-64 bg-gradient-primary overflow-hidden">
        <img 
          src={heroImage} 
          alt="Educational institutions"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-primary/70"></div>
        <div className="relative container mx-auto px-4 h-full flex items-center justify-center text-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Discover Schools
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Explore educational institutions in your area and find the perfect school for your needs
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">All Schools</h2>
            <p className="text-muted-foreground">
              {filteredSchools.length} of {schools.length} schools found
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search schools..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full sm:w-64"
              />
            </div>
            
            <select
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
              className="px-3 py-2 border border-input bg-background text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">All States</option>
              {uniqueStates.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
            
            <Badge variant="secondary" className="px-4 py-2 whitespace-nowrap">
              <School className="h-4 w-4 mr-2" />
              Total: {schools.length}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchools.map((school) => (
            <Card 
              key={school.id} 
              className="group hover:shadow-hover transition-all duration-300 border-0 shadow-card hover:-translate-y-1"
            >
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={school.image}
                  alt={school.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-white/90 text-primary border-0">
                    {school.state}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-3 text-foreground group-hover:text-primary transition-colors">
                  {school.name}
                </h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-start space-x-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                    <span>{school.address}, {school.city}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                    <span>{school.contact}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="truncate">{school.email_id}</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    className="flex-1 bg-gradient-primary hover:opacity-90 transition-all shadow-sm"
                    size="sm"
                  >
                    View Details
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteSchool(school.id, school.name)}
                    className="text-destructive hover:text-destructive-foreground hover:bg-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredSchools.length === 0 && schools.length > 0 && (
          <div className="text-center py-12">
            <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No matching schools</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or filters.
            </p>
            <Button 
              onClick={() => {
                setSearchTerm("");
                setStateFilter("");
              }}
              variant="outline"
            >
              Clear Filters
            </Button>
          </div>
        )}

        {schools.length === 0 && (
          <div className="text-center py-12">
            <School className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No schools found</h3>
            <p className="text-muted-foreground mb-4">
              Be the first to add a school to our directory.
            </p>
            <Button asChild className="bg-gradient-primary">
              <a href="/add-school">
                <Plus className="h-4 w-4 mr-2" />
                Add First School
              </a>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowSchools;