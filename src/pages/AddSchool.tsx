import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { Upload, School, MapPin, Mail, Phone, CheckCircle } from "lucide-react";
import Navigation from "@/components/Navigation";
import { useSchools } from "@/contexts/SchoolContext";

const schoolFormSchema = z.object({
  name: z.string().min(2, "School name must be at least 2 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City name must be at least 2 characters"),
  state: z.string().min(2, "State name must be at least 2 characters"),
  contact: z.string().regex(/^\d{10}$/, "Contact number must be exactly 10 digits"),
  email_id: z.string().email("Please enter a valid email address"),
  image: z.any().optional(),
});

type SchoolFormData = z.infer<typeof schoolFormSchema>;

const AddSchool = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addSchool } = useSchools();
  const navigate = useNavigate();

  const form = useForm<SchoolFormData>({
    resolver: zodResolver(schoolFormSchema),
    defaultValues: {
      name: "",
      address: "",
      city: "",
      state: "",
      contact: "",
      email_id: "",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: SchoolFormData) => {
    setIsSubmitting(true);
    
    try {
      // Prepare school data
      const schoolData = {
        name: data.name,
        address: data.address,
        city: data.city,
        state: data.state,
        contact: data.contact,
        email_id: data.email_id,
        image: imagePreview || `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000000)}?auto=format&fit=crop&w=400&h=300`,
      };

      // Add school to context/localStorage
      addSchool(schoolData);
      
      console.log("School data saved:", schoolData);
      
      toast({
        title: "Success!",
        description: (
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>School has been added successfully!</span>
          </div>
        ),
      });
      
      // Reset form
      form.reset();
      setImagePreview(null);
      
      // Navigate to schools list after a short delay
      setTimeout(() => {
        navigate('/schools');
      }, 1500);
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add school. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Add New School</h1>
            <p className="text-muted-foreground">Fill in the details below to register a new school</p>
          </div>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <School className="h-5 w-5 text-primary" />
                <span>School Information</span>
              </CardTitle>
              <CardDescription>
                Please provide accurate information about the school
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>School Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter school name"
                            {...field}
                            className="transition-all focus:shadow-hover"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>Address</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter complete address"
                            {...field}
                            className="transition-all focus:shadow-hover"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter city"
                              {...field}
                              className="transition-all focus:shadow-hover"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter state"
                              {...field}
                              className="transition-all focus:shadow-hover"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="contact"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center space-x-1">
                          <Phone className="h-4 w-4" />
                          <span>Contact Number</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="10-digit contact number"
                            type="tel"
                            {...field}
                            className="transition-all focus:shadow-hover"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center space-x-1">
                          <Mail className="h-4 w-4" />
                          <span>Email Address</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="school@example.com"
                            type="email"
                            {...field}
                            className="transition-all focus:shadow-hover"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-2">
                    <Label htmlFor="image" className="flex items-center space-x-1">
                      <Upload className="h-4 w-4" />
                      <span>School Image</span>
                    </Label>
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                    />
                    
                    {imagePreview && (
                      <div className="mt-4">
                        <img
                          src={imagePreview}
                          alt="School preview"
                          className="w-full max-w-md mx-auto rounded-lg shadow-card"
                        />
                      </div>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-primary hover:opacity-90 transition-all shadow-card hover:shadow-hover"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Adding School..." : "Add School"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AddSchool;