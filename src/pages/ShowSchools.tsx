import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Mail, Phone, School } from "lucide-react";
import Navigation from "@/components/Navigation";
import heroImage from "@/assets/hero-education.jpg";

// Mock data for demonstration
const mockSchools = [
  {
    id: 1,
    name: "Greenwood International School",
    address: "123 Education Street, Knowledge Park",
    city: "Mumbai",
    state: "Maharashtra",
    contact: "9876543210",
    email_id: "info@greenwood.edu",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=400&h=300"
  },
  {
    id: 2,
    name: "St. Mary's Convent School",
    address: "456 Learning Avenue, Education Hub",
    city: "Delhi",
    state: "Delhi",
    contact: "8765432109",
    email_id: "admissions@stmarys.edu",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=400&h=300"
  },
  {
    id: 3,
    name: "Riverside Public School",
    address: "789 Academic Road, Scholar City",
    city: "Bangalore",
    state: "Karnataka",
    contact: "7654321098",
    email_id: "contact@riverside.edu",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=400&h=300"
  },
  {
    id: 4,
    name: "Bright Future Academy",
    address: "321 Future Lane, Innovation District",
    city: "Pune",
    state: "Maharashtra",
    contact: "6543210987",
    email_id: "hello@brightfuture.edu",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=400&h=300"
  },
  {
    id: 5,
    name: "Excellence High School",
    address: "654 Excellence Blvd, Success Valley",
    city: "Chennai",
    state: "Tamil Nadu",
    contact: "5432109876",
    email_id: "info@excellence.edu",
    image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?auto=format&fit=crop&w=400&h=300"
  },
  {
    id: 6,
    name: "Golden Gate School",
    address: "987 Golden Street, Prosperity Area",
    city: "Kolkata",
    state: "West Bengal",
    contact: "4321098765",
    email_id: "admissions@goldengate.edu",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=400&h=300"
  }
];

const ShowSchools = () => {
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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">All Schools</h2>
            <p className="text-muted-foreground">
              {mockSchools.length} schools found
            </p>
          </div>
          
          <Badge variant="secondary" className="px-4 py-2">
            <School className="h-4 w-4 mr-2" />
            Total: {mockSchools.length}
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockSchools.map((school) => (
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
                
                <Button 
                  className="w-full bg-gradient-primary hover:opacity-90 transition-all shadow-sm"
                  size="sm"
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {mockSchools.length === 0 && (
          <div className="text-center py-12">
            <School className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No schools found</h3>
            <p className="text-muted-foreground mb-4">
              Be the first to add a school to our directory.
            </p>
            <Button asChild className="bg-gradient-primary">
              <a href="/add-school">Add First School</a>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowSchools;