import type { Package, AddOn, GalleryItem } from '@/types';

// Wedding Packages
export const weddingPackages: Package[] = [
  // Bridal Shower
  {
    id: 'bridal-bliss',
    name: 'Bliss',
    description: 'Intimate Moments',
    price: 3500,
    duration: '2 hours',
    features: ['80 edited images', '1 min reel'],
    category: 'bridal-shower',
  },
  {
    id: 'bridal-golden',
    name: 'Golden Glow',
    description: 'Complete Bridal Shower Experience',
    price: 6000,
    duration: '4 hours',
    features: ['150 edited images', '2-3 min reel', 'Guest portraits & décor highlights'],
    category: 'bridal-shower',
    popular: true,
  },
  // Traditional Wedding
  {
    id: 'traditional-heritage',
    name: 'Heritage',
    description: 'Cultural Ceremony Coverage',
    price: 6000,
    duration: '3 hours',
    features: ['120 edited images', '2 min reel', 'Ceremony & key rituals'],
    category: 'traditional',
  },
  {
    id: 'traditional-legacy',
    name: 'Legacy',
    description: 'Full Traditional Wedding Experience',
    price: 10500,
    duration: '6-7 hours',
    features: ['250+ edited images', '5-7 min cultural highlight reel', 'Full-day coverage of rituals', 'Bonus: Family group portraits'],
    category: 'traditional',
    popular: true,
  },
  // White Wedding
  {
    id: 'white-essentials',
    name: 'Essentials',
    description: 'Ceremony Coverage',
    price: 7000,
    duration: '3 hours',
    features: ['150 professionally edited images', '2-3 min highlight reel', 'Ceremony coverage'],
    category: 'white-wedding',
  },
  {
    id: 'white-premium',
    name: 'Premium Story',
    description: 'Complete Wedding Day Coverage',
    price: 12000,
    duration: '6 hours',
    features: ['300+ edited images', '5-7 min cinematic highlight reel', 'Ceremony + Reception coverage', '1-hour couple session (pre or post wedding)'],
    category: 'white-wedding',
    popular: true,
  },
  {
    id: 'white-elite',
    name: 'Elite Experience',
    description: 'Luxury Full-Day Coverage',
    price: 18000,
    duration: '10-12 hours',
    features: ['500+ edited images', '10-12 min cinematic film', 'Personalized photobook (quoted on demand)', '20% holiday discount (3+ hrs bookings)'],
    category: 'white-wedding',
  },
];

// Maternity Packages
export const maternityPackages: Package[] = [
  {
    id: 'maternity-studio',
    name: 'In-Studio Package',
    description: 'Professional studio session in a cozy environment',
    price: 2200,
    duration: '1.5 hours',
    features: ['Couple-focused portraits', 'Two outfit changes', 'Professional lighting & guidance', '25 edited images', 'Private online gallery'],
    category: 'maternity',
  },
  {
    id: 'maternity-outdoor',
    name: 'Outdoor Package',
    description: 'Natural light in beautiful outdoor settings',
    price: 2800,
    duration: '2 hours',
    features: ['Natural light storytelling', 'Couple + solo portraits', '25 edited images', 'Private online gallery'],
    category: 'maternity',
    popular: true,
  },
  {
    id: 'maternity-event',
    name: 'Event Package',
    description: 'Maternity event documentary coverage',
    price: 3500,
    duration: 'Up to 3 hours',
    features: ['Documentary-style photography', 'Couple & mommy-to-be focus', '40+ edited images', 'Private online gallery'],
    category: 'maternity',
  },
];

// Birthday Packages
export const birthdayPackages: Package[] = [
  {
    id: 'birthday-classic',
    name: 'Classic',
    description: 'Essential Birthday Coverage',
    price: 1800,
    duration: '1 hour',
    features: ['20 edited images', '1 location', 'Online gallery'],
    category: 'birthday',
  },
  {
    id: 'birthday-signature',
    name: 'Signature',
    description: 'Most Booked Package',
    price: 2500,
    duration: '1.5 hours',
    features: ['30 edited images', '1-2 locations', 'Priority editing'],
    category: 'birthday',
    popular: true,
  },
  {
    id: 'birthday-legacy',
    name: 'Legacy',
    description: 'Complete Birthday Experience',
    price: 3500,
    duration: '2 hours',
    features: ['40 edited images', 'Multiple setups', 'Highlight reel', 'Sneak peeks'],
    category: 'birthday',
  },
];

// Corporate Packages
export const corporatePackages: Package[] = [
  {
    id: 'corporate-headshots',
    name: 'Professional Headshots',
    description: 'Corporate Profile Updates',
    price: 3500,
    duration: '2 hours',
    features: ['Up to 10 employees', '5 edited images per person', 'Professional studio lighting', 'Same-day previews', 'Online gallery for selection'],
    category: 'corporate',
  },
  {
    id: 'corporate-event-standard',
    name: 'Event Coverage',
    description: 'Gala Dinners, Awards & Conferences',
    price: 6500,
    duration: '4 hours',
    features: ['100+ edited images', 'Candid & posed shots', 'Keynote & presentation coverage', 'Networking moments', 'Quick turnaround (48 hours)'],
    category: 'corporate',
    popular: true,
  },
  {
    id: 'corporate-event-premium',
    name: 'Full-Day Corporate',
    description: 'Complete Business Event Documentation',
    price: 12000,
    duration: '8 hours',
    features: ['250+ edited images', 'Full event coverage', 'Team & group photos', 'Branding & detail shots', 'Highlight reel (3-5 min)', 'Priority delivery'],
    category: 'corporate',
  },
];

// All Packages Combined
export const allPackages: Package[] = [
  ...weddingPackages,
  ...maternityPackages,
  ...birthdayPackages,
  ...corporatePackages,
];

// Add-ons
export const weddingAddOns: AddOn[] = [
  {
    id: 'wedding-extra-hour',
    name: 'Additional Hour(s)',
    description: 'Extend your coverage time',
    price: 1200,
    unit: 'per hour',
    category: 'wedding',
  },
  {
    id: 'wedding-reel-upgrade',
    name: 'Highlight Reel Upgrade',
    description: 'Extra 2-3 minutes of cinematic footage',
    price: 2000,
    category: 'wedding',
  },
  {
    id: 'wedding-photobook',
    name: 'Photobook',
    description: 'Luxury printed photobook (quoted separately)',
    price: 0,
    category: 'wedding',
  },
  {
    id: 'wedding-photo-enhancement',
    name: 'Photo Enhancement',
    description: 'Professional editing of client-supplied images',
    price: 500,
    unit: 'per 10 photos',
    category: 'wedding',
  },
];

export const maternityAddOns: AddOn[] = [
  {
    id: 'maternity-reel',
    name: 'Cinematic Maternity Reel',
    description: 'Beautiful short film telling your journey (custom quote)',
    price: 0,
    category: 'maternity',
  },
  {
    id: 'maternity-quotes',
    name: 'Custom Quotes',
    description: 'Personalized quotes added to your images',
    price: 0,
    category: 'maternity',
  },
  {
    id: 'maternity-photobook',
    name: 'Photobook',
    description: 'Stunning keepsake photobook (custom quote)',
    price: 0,
    category: 'maternity',
  },
];

export const birthdayAddOns: AddOn[] = [
  {
    id: 'birthday-extra-30',
    name: 'Extra 30 Minutes',
    description: 'Extend your session time',
    price: 500,
    category: 'birthday',
  },
  {
    id: 'birthday-extra-images',
    name: 'Additional 10 Edited Images',
    description: 'More memories to cherish',
    price: 700,
    category: 'birthday',
  },
  {
    id: 'birthday-reel',
    name: 'Birthday Highlight Reel (Extended)',
    description: 'Cinematic video of your celebration',
    price: 900,
    category: 'birthday',
  },
  {
    id: 'birthday-family',
    name: 'Family Portraits Add-on',
    description: 'Dedicated family portrait session',
    price: 600,
    category: 'birthday',
  },
  {
    id: 'birthday-photobook',
    name: 'Custom Photo Book',
    description: 'Beautiful printed photo book (quoted separately)',
    price: 0,
    category: 'birthday',
  },
];

// Corporate Add-ons
export const corporateAddOns: AddOn[] = [
  {
    id: 'corporate-extra-hour',
    name: 'Additional Hour(s)',
    description: 'Extend your event coverage',
    price: 1500,
    unit: 'per hour',
    category: 'corporate',
  },
  {
    id: 'corporate-extra-headshots',
    name: 'Additional Headshots',
    description: 'More team members',
    price: 300,
    unit: 'per person',
    category: 'corporate',
  },
  {
    id: 'corporate-same-day',
    name: 'Same-Day Delivery',
    description: 'Rush editing for urgent needs',
    price: 2500,
    category: 'corporate',
  },
  {
    id: 'corporate-video',
    name: 'Event Highlight Video',
    description: 'Cinematic recap of your event',
    price: 4500,
    category: 'corporate',
  },
  {
    id: 'corporate-photobook',
    name: 'Company Yearbook',
    description: 'Premium printed yearbook (custom quote)',
    price: 0,
    category: 'corporate',
  },
];

// All Add-ons
export const allAddOns: AddOn[] = [
  ...weddingAddOns,
  ...maternityAddOns,
  ...birthdayAddOns,
  ...corporateAddOns,
];

// Gallery Items (from Pixieset)
export const galleryItems: GalleryItem[] = [
  {
    id: '1',
    title: 'Biggest Loser Challenge 2026',
    date: '6th February, 2026',
    url: 'https://faltakesfotos.pixieset.com/biggestloserchallenge2026/',
    image: '/images/gallery-biggest-loser.jpg',
  },
  {
    id: '2',
    title: 'The Velvet Table',
    date: '19th December, 2025',
    url: 'https://faltakesfotos.pixieset.com/thevelvettable/',
    image: '/images/gallery-velvet-table.jpg',
  },
  {
    id: '3',
    title: 'Suzan Mokwena\' 45th Birthday Shoot',
    date: '17th December, 2025',
    url: 'https://faltakesfotos.pixieset.com/suzanmokwena45thbirthdayshoot/',
    image: '/images/gallery-suzan-birthday.jpg',
  },
  {
    id: '4',
    title: 'Vopak Year End Gala Dinner 2025',
    date: '13th December, 2025',
    url: 'https://faltakesfotos.pixieset.com/vopakgaladinneryearend2025/',
    image: '/images/gallery-vopak-gala.jpg',
  },
  {
    id: '5',
    title: 'MVSH Matric Banquet 2025',
    date: '25th November, 2025',
    url: 'https://faltakesfotos.pixieset.com/mvshmatricbanquet2025/',
    image: '/images/gallery-mvhs-banquet.jpg',
  },
  {
    id: '6',
    title: 'INSIKA Women',
    date: '19th November, 2025',
    url: 'https://faltakesfotos.pixieset.com/insikawomen/',
    image: '/images/gallery-insika-women.jpg',
  },
];

// Service Categories
export const serviceCategories = [
  {
    id: 'weddings',
    title: 'Weddings',
    description: 'From bridal showers to traditional and white weddings, we capture every precious moment of your special day.',
    image: '/images/wedding-bride.jpg',
    packages: weddingPackages,
  },
  {
    id: 'maternity',
    title: 'Maternity',
    description: 'Celebrate the beauty of motherhood with our intimate maternity sessions, both in-studio and outdoor.',
    image: '/images/maternity-golden.jpg',
    packages: maternityPackages,
  },
  {
    id: 'birthdays',
    title: 'Birthdays',
    description: 'From first birthdays to milestone celebrations, we capture the joy and personality of every chapter.',
    image: '/images/birthday-kids.jpg',
    packages: birthdayPackages,
  },
  {
    id: 'corporate',
    title: 'Corporate',
    description: 'Professional headshots, gala dinners, awards ceremonies, conferences, and complete business event documentation.',
    image: '/images/corporate-event.jpg',
    packages: corporatePackages,
  },
];
