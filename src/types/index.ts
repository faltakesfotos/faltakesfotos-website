export interface Package {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  features: string[];
  category: 'wedding' | 'maternity' | 'birthday' | 'bridal-shower' | 'traditional' | 'white-wedding' | 'corporate';
  popular?: boolean;
}

export interface AddOn {
  id: string;
  name: string;
  description: string;
  price: number;
  unit?: string;
  category: 'wedding' | 'maternity' | 'birthday' | 'corporate' | 'universal';
}

export interface QuoteItem {
  package?: Package;
  addOns: AddOn[];
  totalPrice: number;
}

export interface BookingForm {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  location: string;
  message: string;
  packageInterest?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  date: string;
  url: string;
  image: string;
}

export interface ServiceCategory {
  id: string;
  title: string;
  description: string;
  image: string;
  packages: Package[];
}
