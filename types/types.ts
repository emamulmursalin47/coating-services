// types.ts
export interface Customer {
    id: number;
    name: string;
    email: string;
    phone: string;
    location: string;
    totalSpent: number;
    lastVisit: string;
    status: "active" | "inactive" | "vip";
    vehicleInfo: {
      make: string;
      model: string;
      year: string;
    };
    serviceHistory: Service[];
    notes?: string;
  }
  
  export interface Service {
    id: number;
    date: string;
    service: string;
    amount: number;
    notes?: string;
  }