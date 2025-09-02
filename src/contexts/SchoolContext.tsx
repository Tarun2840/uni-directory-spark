import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface School {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  contact: string;
  email_id: string;
  image?: string;
  createdAt: string;
}

interface SchoolContextType {
  schools: School[];
  addSchool: (school: Omit<School, 'id' | 'createdAt'>) => void;
  updateSchool: (id: string, school: Partial<School>) => void;
  deleteSchool: (id: string) => void;
  getSchoolById: (id: string) => School | undefined;
  clearAllSchools: () => void;
}

const SchoolContext = createContext<SchoolContextType | undefined>(undefined);

const STORAGE_KEY = 'lovable_schools_data';

// Mock data for initial setup
const initialMockData: School[] = [
  {
    id: '1',
    name: "Greenwood International School",
    address: "123 Education Street, Knowledge Park",
    city: "Mumbai",
    state: "Maharashtra",
    contact: "9876543210",
    email_id: "info@greenwood.edu",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=400&h=300",
    createdAt: "2024-01-15T10:30:00Z"
  },
  {
    id: '2',
    name: "St. Mary's Convent School",
    address: "456 Learning Avenue, Education Hub",
    city: "Delhi",
    state: "Delhi",
    contact: "8765432109",
    email_id: "admissions@stmarys.edu",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=400&h=300",
    createdAt: "2024-01-10T14:20:00Z"
  },
  {
    id: '3',
    name: "Riverside Public School",
    address: "789 Academic Road, Scholar City",
    city: "Bangalore",
    state: "Karnataka",
    contact: "7654321098",
    email_id: "contact@riverside.edu",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=400&h=300",
    createdAt: "2024-01-08T09:15:00Z"
  }
];

export const SchoolProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [schools, setSchools] = useState<School[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const storedData = localStorage.getItem(STORAGE_KEY);
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setSchools(parsedData);
      } else {
        // If no data exists, use mock data
        setSchools(initialMockData);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialMockData));
      }
    } catch (error) {
      console.error('Error loading schools data:', error);
      setSchools(initialMockData);
    }
  }, []);

  // Save to localStorage whenever schools change
  useEffect(() => {
    if (schools.length > 0) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(schools));
      } catch (error) {
        console.error('Error saving schools data:', error);
      }
    }
  }, [schools]);

  const addSchool = (schoolData: Omit<School, 'id' | 'createdAt'>) => {
    const newSchool: School = {
      ...schoolData,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
    };
    
    setSchools(prev => [...prev, newSchool]);
  };

  const updateSchool = (id: string, updates: Partial<School>) => {
    setSchools(prev => 
      prev.map(school => 
        school.id === id ? { ...school, ...updates } : school
      )
    );
  };

  const deleteSchool = (id: string) => {
    setSchools(prev => prev.filter(school => school.id !== id));
  };

  const getSchoolById = (id: string) => {
    return schools.find(school => school.id === id);
  };

  const clearAllSchools = () => {
    setSchools([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  const value: SchoolContextType = {
    schools,
    addSchool,
    updateSchool,
    deleteSchool,
    getSchoolById,
    clearAllSchools,
  };

  return (
    <SchoolContext.Provider value={value}>
      {children}
    </SchoolContext.Provider>
  );
};

export const useSchools = () => {
  const context = useContext(SchoolContext);
  if (context === undefined) {
    throw new Error('useSchools must be used within a SchoolProvider');
  }
  return context;
};