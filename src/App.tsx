import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Camera, 
  Calendar, 
  MapPin, 
  Phone, 
  Mail, 
  Instagram, 
  Facebook, 
  Menu, 
  X, 
  ChevronRight,
  Check,
  Plus,
  Minus,
  Download,
  ExternalLink,
  Heart,
  Sparkles,
  Gift,
  Clock,
  Image as ImageIcon,
  Briefcase,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import type { Package, AddOn, BookingForm } from '@/types';
import { 
  allPackages, 
  weddingPackages, 
  maternityPackages, 
  birthdayPackages,
  corporatePackages,
  weddingAddOns,
  maternityAddOns,
  birthdayAddOns,
  corporateAddOns,
  galleryItems,
  serviceCategories 
} from '@/data/packages';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quoteDialogOpen, setQuoteDialogOpen] = useState(false);
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [selectedAddOns, setSelectedAddOns] = useState<AddOn[]>([]);
  const [extraHours, setExtraHours] = useState(0);
  const [extraImages, setExtraImages] = useState(0);
  const [activeCategory, setActiveCategory] = useState('weddings');
  const [bookingForm, setBookingForm] = useState<BookingForm>({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    location: '',
    message: '',
    packageInterest: '',
  });

  const heroRef = useRef<HTMLDivElement>(null);
  const portfolioRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const bookingRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // Initialize GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.fromTo('.hero-title span', 
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out', delay: 0.3 }
      );

      gsap.fromTo('.hero-subtitle',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', delay: 0.8 }
      );

      gsap.fromTo('.hero-cta',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out', delay: 1 }
      );

      // Scroll-triggered animations
      gsap.utils.toArray<HTMLElement>('.section-animate').forEach((section: HTMLElement) => {
        gsap.fromTo(section,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Stagger animations for cards
      gsap.utils.toArray<HTMLElement>('.stagger-container').forEach((container: HTMLElement) => {
        const items = container.querySelectorAll('.stagger-item');
        gsap.fromTo(items,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: container,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  // Calculate quote total
  const calculateTotal = () => {
    let total = 0;
    if (selectedPackage) {
      total += selectedPackage.price;
    }
    selectedAddOns.forEach(addon => {
      if (addon.price > 0) {
        total += addon.price;
      }
    });
    // Extra hours for weddings
    if (extraHours > 0 && selectedPackage?.category.includes('wedding')) {
      total += extraHours * 1200;
    }
    // Extra images for birthdays
    if (extraImages > 0 && selectedPackage?.category === 'birthday') {
      total += extraImages * 700;
    }
    return total;
  };

  const toggleAddOn = (addon: AddOn) => {
    setSelectedAddOns(prev => {
      const exists = prev.find(a => a.id === addon.id);
      if (exists) {
        return prev.filter(a => a.id !== addon.id);
      }
      return [...prev, addon];
    });
  };

  const getRelevantAddOns = () => {
    if (!selectedPackage) return [];
    const category = selectedPackage.category;
    if (category.includes('wedding')) return weddingAddOns;
    if (category === 'maternity') return maternityAddOns;
    if (category === 'birthday') return birthdayAddOns;
    if (category === 'corporate') return corporateAddOns;
    return [];
  };

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send to a backend
    alert('Thank you for your booking request! We will contact you within 24 hours.');
    setBookingDialogOpen(false);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-[#0B0C0F] text-[#F4F2EE] overflow-x-hidden">
      {/* Grain Overlay */}
      <div className="grain-overlay" />
      
      {/* Vignette */}
      <div className="vignette" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center bg-gradient-to-b from-black/50 to-transparent">
        <a href="/" className="flex items-center">
          <img 
            src="/images/logo-white.png" 
            alt="FalTakesFotos" 
            className="h-10 w-auto object-contain"
          />
        </a>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => scrollToSection(portfolioRef)} className="text-sm hover:text-[#E46E58] transition-colors">Work</button>
          <button onClick={() => scrollToSection(servicesRef)} className="text-sm hover:text-[#E46E58] transition-colors">Services</button>
          <button onClick={() => scrollToSection(quoteRef)} className="text-sm hover:text-[#E46E58] transition-colors">Quote</button>
          <button onClick={() => scrollToSection(bookingRef)} className="text-sm hover:text-[#E46E58] transition-colors">Book</button>
          <button onClick={() => scrollToSection(contactRef)} className="text-sm hover:text-[#E46E58] transition-colors">Contact</button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu fixed inset-0 z-40 bg-[#0B0C0F] flex flex-col items-center justify-center gap-8 ${mobileMenuOpen ? 'open' : ''}`}>
        <button onClick={() => scrollToSection(portfolioRef)} className="text-2xl font-display">Work</button>
        <button onClick={() => scrollToSection(servicesRef)} className="text-2xl font-display">Services</button>
        <button onClick={() => scrollToSection(quoteRef)} className="text-2xl font-display">Quote</button>
        <button onClick={() => scrollToSection(bookingRef)} className="text-2xl font-display">Book</button>
        <button onClick={() => scrollToSection(contactRef)} className="text-2xl font-display">Contact</button>
      </div>

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/images/hero-sunset.jpg" 
            alt="Johannesburg sunset" 
            className="w-full h-full object-cover hero-image-animate"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0F] via-[#0B0C0F]/40 to-transparent" />
        </div>
        
        <div className="relative z-10 h-full flex flex-col justify-center items-center px-6 text-center">
          <h1 className="hero-title font-display font-black text-5xl md:text-7xl lg:text-8xl tracking-tight leading-none mb-6">
            <span className="block">CAPTURING</span>
            <span className="block text-[#E46E58]">MOMENTS</span>
          </h1>
          <p className="hero-subtitle text-lg md:text-xl text-[#F4F2EE]/80 max-w-xl mb-8">
            Professional photography & videography for weddings, maternity, and celebrations in Johannesburg
          </p>
          <div className="hero-cta flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={() => scrollToSection(portfolioRef)}
              className="bg-[#E46E58] hover:bg-[#d55d47] text-white px-8 py-6 text-sm font-medium tracking-wide"
            >
              Explore Work
            </Button>
            <Button 
              onClick={() => setQuoteDialogOpen(true)}
              variant="outline"
              className="border-[#F4F2EE]/30 hover:border-[#E46E58] hover:text-[#E46E58] px-8 py-6 text-sm font-medium tracking-wide"
            >
              Get a Quote
            </Button>
          </div>
        </div>

        <div className="absolute bottom-8 left-6 right-6 flex justify-between items-end text-xs text-[#F4F2EE]/60">
          <div className="font-mono tracking-wider">
            <p>Johannesburg, South Africa</p>
            <p>Available Worldwide</p>
          </div>
          <div className="font-mono tracking-wider text-right">
            <p>© FALTAKESFOTOS</p>
            <p>Est. 2020</p>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section ref={portfolioRef} className="py-20 px-6">
        <div className="section-animate max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
            <div>
              <p className="font-mono text-xs tracking-widest text-[#E46E58] mb-2">PORTFOLIO</p>
              <h2 className="font-display font-black text-4xl md:text-5xl">SELECTED WORK</h2>
            </div>
            <a 
              href="https://faltakesfotos.pixieset.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-4 md:mt-0 flex items-center gap-2 text-sm hover:text-[#E46E58] transition-colors"
            >
              View Full Gallery <ExternalLink size={16} />
            </a>
          </div>

          <div className="stagger-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {galleryItems.map((item) => (
              <a 
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="stagger-item group relative aspect-[4/3] overflow-hidden bg-[#0B0C0F]"
              >
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="font-mono text-xs text-[#E46E58] mb-1">{item.date}</p>
                  <h3 className="font-display font-bold text-lg">{item.title}</h3>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className="py-20 px-6 bg-[#F4F2EE] text-[#0B0C0F]">
        <div className="section-animate max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-mono text-xs tracking-widest text-[#E46E58] mb-2">SERVICES</p>
            <h2 className="font-display font-black text-4xl md:text-5xl mb-4">WHAT WE CREATE</h2>
            <p className="text-[#0B0C0F]/70 max-w-2xl mx-auto">
              From intimate portraits to grand celebrations—clear planning, consistent delivery, 
              and a calm presence on every shoot.
            </p>
          </div>

          {/* Service Category Tabs */}
          <div className="flex justify-center gap-4 mb-12">
            {serviceCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-6 py-3 font-mono text-xs tracking-wider transition-all ${
                  activeCategory === cat.id 
                    ? 'bg-[#E46E58] text-white' 
                    : 'bg-[#0B0C0F]/10 hover:bg-[#0B0C0F]/20'
                }`}
              >
                {cat.title.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Active Service Display */}
          {serviceCategories.map((category) => (
            activeCategory === category.id && (
              <div key={category.id} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="font-display font-black text-3xl mb-4">{category.title}</h3>
                  <p className="text-[#0B0C0F]/70 mb-8">{category.description}</p>
                  
                  <div className="space-y-4">
                    {category.packages.map((pkg) => (
                      <div 
                        key={pkg.id}
                        className="p-4 border border-[#0B0C0F]/20 hover:border-[#E46E58] transition-colors cursor-pointer"
                        onClick={() => {
                          setSelectedPackage(pkg);
                          setQuoteDialogOpen(true);
                        }}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-display font-bold">{pkg.name}</h4>
                              {pkg.popular && (
                                <span className="px-2 py-0.5 bg-[#E46E58] text-white text-xs font-mono">POPULAR</span>
                              )}
                            </div>
                            <p className="text-sm text-[#0B0C0F]/60">{pkg.description}</p>
                            <p className="text-xs text-[#0B0C0F]/50 mt-1">{pkg.duration}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-display font-bold text-xl text-[#E46E58]">
                              {formatPrice(pkg.price)}
                            </p>
                          </div>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {pkg.features.slice(0, 3).map((feature, idx) => (
                            <span key={idx} className="text-xs text-[#0B0C0F]/60 flex items-center gap-1">
                              <Check size={12} /> {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <Button 
                    onClick={() => setQuoteDialogOpen(true)}
                    className="mt-8 bg-[#0B0C0F] hover:bg-[#0B0C0F]/80 text-white w-full md:w-auto"
                  >
                    Build Your Quote <ChevronRight size={16} />
                  </Button>
                </div>
              </div>
            )
          ))}
        </div>
      </section>

      {/* Quote Builder Section */}
      <section ref={quoteRef} className="py-20 px-6">
        <div className="section-animate max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-mono text-xs tracking-widest text-[#E46E58] mb-2">QUOTE BUILDER</p>
            <h2 className="font-display font-black text-4xl md:text-5xl mb-4">BUILD YOUR QUOTE</h2>
            <p className="text-[#F4F2EE]/70 max-w-2xl mx-auto">
              Pick a base package, add what you need, and get an estimate instantly.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Package Selection */}
            <div className="lg:col-span-2 space-y-8">
              {/* Wedding Packages */}
              <div>
                <h3 className="font-display font-bold text-xl mb-4 flex items-center gap-2">
                  <Heart size={20} className="text-[#E46E58]" /> Wedding Packages
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {weddingPackages.map((pkg) => (
                    <div
                      key={pkg.id}
                      onClick={() => setSelectedPackage(pkg)}
                      className={`p-4 border cursor-pointer transition-all ${
                        selectedPackage?.id === pkg.id 
                          ? 'border-[#E46E58] bg-[#E46E58]/10' 
                          : 'border-[#F4F2EE]/20 hover:border-[#F4F2EE]/40'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-display font-bold">{pkg.name}</h4>
                          <p className="text-xs text-[#F4F2EE]/60">{pkg.duration}</p>
                        </div>
                        <p className="font-display font-bold text-[#E46E58]">{formatPrice(pkg.price)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Maternity Packages */}
              <div>
                <h3 className="font-display font-bold text-xl mb-4 flex items-center gap-2">
                  <Sparkles size={20} className="text-[#E46E58]" /> Maternity Packages
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {maternityPackages.map((pkg) => (
                    <div
                      key={pkg.id}
                      onClick={() => setSelectedPackage(pkg)}
                      className={`p-4 border cursor-pointer transition-all ${
                        selectedPackage?.id === pkg.id 
                          ? 'border-[#E46E58] bg-[#E46E58]/10' 
                          : 'border-[#F4F2EE]/20 hover:border-[#F4F2EE]/40'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-display font-bold">{pkg.name}</h4>
                          <p className="text-xs text-[#F4F2EE]/60">{pkg.duration}</p>
                        </div>
                        <p className="font-display font-bold text-[#E46E58]">{formatPrice(pkg.price)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Birthday Packages */}
              <div>
                <h3 className="font-display font-bold text-xl mb-4 flex items-center gap-2">
                  <Gift size={20} className="text-[#E46E58]" /> Birthday Packages
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {birthdayPackages.map((pkg) => (
                    <div
                      key={pkg.id}
                      onClick={() => setSelectedPackage(pkg)}
                      className={`p-4 border cursor-pointer transition-all ${
                        selectedPackage?.id === pkg.id 
                          ? 'border-[#E46E58] bg-[#E46E58]/10' 
                          : 'border-[#F4F2EE]/20 hover:border-[#F4F2EE]/40'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-display font-bold">{pkg.name}</h4>
                          <p className="text-xs text-[#F4F2EE]/60">{pkg.duration}</p>
                        </div>
                        <p className="font-display font-bold text-[#E46E58]">{formatPrice(pkg.price)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Corporate Packages */}
              <div>
                <h3 className="font-display font-bold text-xl mb-4 flex items-center gap-2">
                  <Briefcase size={20} className="text-[#E46E58]" /> Corporate Packages
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {corporatePackages.map((pkg) => (
                    <div
                      key={pkg.id}
                      onClick={() => setSelectedPackage(pkg)}
                      className={`p-4 border cursor-pointer transition-all ${
                        selectedPackage?.id === pkg.id 
                          ? 'border-[#E46E58] bg-[#E46E58]/10' 
                          : 'border-[#F4F2EE]/20 hover:border-[#F4F2EE]/40'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-display font-bold">{pkg.name}</h4>
                          <p className="text-xs text-[#F4F2EE]/60">{pkg.duration}</p>
                        </div>
                        <p className="font-display font-bold text-[#E46E58]">{formatPrice(pkg.price)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add-ons */}
              {selectedPackage && (
                <div className="pt-8 border-t border-[#F4F2EE]/20">
                  <h3 className="font-display font-bold text-xl mb-4 flex items-center gap-2">
                    <Plus size={20} className="text-[#E46E58]" /> Add-ons
                  </h3>
                  
                  {/* Wedding Add-ons */}
                  {selectedPackage.category.includes('wedding') && (
                    <div className="space-y-4">
                      {weddingAddOns.filter(a => a.price > 0).map((addon) => (
                        <div key={addon.id} className="flex items-center justify-between p-3 border border-[#F4F2EE]/10">
                          <div className="flex items-center gap-3">
                            <Checkbox 
                              checked={selectedAddOns.some(a => a.id === addon.id)}
                              onCheckedChange={() => toggleAddOn(addon)}
                            />
                            <div>
                              <p className="font-medium">{addon.name}</p>
                              <p className="text-xs text-[#F4F2EE]/60">{addon.description}</p>
                            </div>
                          </div>
                          <p className="font-display font-bold text-[#E46E58]">
                            {addon.unit ? `${formatPrice(addon.price)} ${addon.unit}` : formatPrice(addon.price)}
                          </p>
                        </div>
                      ))}
                      
                      {/* Extra Hours Counter */}
                      <div className="flex items-center justify-between p-3 border border-[#F4F2EE]/10">
                        <div>
                          <p className="font-medium">Additional Hours</p>
                          <p className="text-xs text-[#F4F2EE]/60">R1,200 per hour</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={() => setExtraHours(Math.max(0, extraHours - 1))}
                            className="p-1 border border-[#F4F2EE]/20 hover:border-[#E46E58]"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-8 text-center font-display">{extraHours}</span>
                          <button 
                            onClick={() => setExtraHours(extraHours + 1)}
                            className="p-1 border border-[#F4F2EE]/20 hover:border-[#E46E58]"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Birthday Add-ons */}
                  {selectedPackage.category === 'birthday' && (
                    <div className="space-y-4">
                      {birthdayAddOns.filter(a => a.price > 0).map((addon) => (
                        <div key={addon.id} className="flex items-center justify-between p-3 border border-[#F4F2EE]/10">
                          <div className="flex items-center gap-3">
                            <Checkbox 
                              checked={selectedAddOns.some(a => a.id === addon.id)}
                              onCheckedChange={() => toggleAddOn(addon)}
                            />
                            <div>
                              <p className="font-medium">{addon.name}</p>
                              <p className="text-xs text-[#F4F2EE]/60">{addon.description}</p>
                            </div>
                          </div>
                          <p className="font-display font-bold text-[#E46E58]">{formatPrice(addon.price)}</p>
                        </div>
                      ))}
                      
                      {/* Extra Images Counter */}
                      <div className="flex items-center justify-between p-3 border border-[#F4F2EE]/10">
                        <div>
                          <p className="font-medium">Additional Edited Images</p>
                          <p className="text-xs text-[#F4F2EE]/60">R700 per 10 images</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={() => setExtraImages(Math.max(0, extraImages - 1))}
                            className="p-1 border border-[#F4F2EE]/20 hover:border-[#E46E58]"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-8 text-center font-display">{extraImages}</span>
                          <button 
                            onClick={() => setExtraImages(extraImages + 1)}
                            className="p-1 border border-[#F4F2EE]/20 hover:border-[#E46E58]"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Maternity Add-ons */}
                  {selectedPackage.category === 'maternity' && (
                    <div className="space-y-4">
                      {maternityAddOns.map((addon) => (
                        <div key={addon.id} className="flex items-center justify-between p-3 border border-[#F4F2EE]/10">
                          <div className="flex items-center gap-3">
                            <Checkbox 
                              checked={selectedAddOns.some(a => a.id === addon.id)}
                              onCheckedChange={() => toggleAddOn(addon)}
                            />
                            <div>
                              <p className="font-medium">{addon.name}</p>
                              <p className="text-xs text-[#F4F2EE]/60">{addon.description}</p>
                            </div>
                          </div>
                          <p className="font-display font-bold text-[#E46E58]">
                            {addon.price > 0 ? formatPrice(addon.price) : 'Custom'}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Corporate Add-ons */}
                  {selectedPackage.category === 'corporate' && (
                    <div className="space-y-4">
                      {corporateAddOns.filter(a => a.price > 0).map((addon) => (
                        <div key={addon.id} className="flex items-center justify-between p-3 border border-[#F4F2EE]/10">
                          <div className="flex items-center gap-3">
                            <Checkbox 
                              checked={selectedAddOns.some(a => a.id === addon.id)}
                              onCheckedChange={() => toggleAddOn(addon)}
                            />
                            <div>
                              <p className="font-medium">{addon.name}</p>
                              <p className="text-xs text-[#F4F2EE]/60">{addon.description}</p>
                            </div>
                          </div>
                          <p className="font-display font-bold text-[#E46E58]">
                            {addon.unit ? `${formatPrice(addon.price)} ${addon.unit}` : formatPrice(addon.price)}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Quote Summary */}
            <div className="lg:sticky lg:top-24 h-fit">
              <div className="p-6 border border-[#F4F2EE]/20 bg-[#0B0C0F]/50">
                <h3 className="font-display font-bold text-lg mb-4">Quote Summary</h3>
                
                {selectedPackage ? (
                  <>
                    <div className="mb-4 pb-4 border-b border-[#F4F2EE]/10">
                      <p className="text-sm text-[#F4F2EE]/60">Selected Package</p>
                      <p className="font-display font-bold">{selectedPackage.name}</p>
                      <p className="text-[#E46E58] font-display">{formatPrice(selectedPackage.price)}</p>
                    </div>

                    {selectedAddOns.length > 0 && (
                      <div className="mb-4 pb-4 border-b border-[#F4F2EE]/10">
                        <p className="text-sm text-[#F4F2EE]/60 mb-2">Add-ons</p>
                        {selectedAddOns.map((addon) => (
                          <div key={addon.id} className="flex justify-between text-sm">
                            <span>{addon.name}</span>
                            <span className="text-[#E46E58]">
                              {addon.price > 0 ? formatPrice(addon.price) : 'Custom'}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {extraHours > 0 && (
                      <div className="mb-4 pb-4 border-b border-[#F4F2EE]/10">
                        <div className="flex justify-between text-sm">
                          <span>Extra Hours ({extraHours})</span>
                          <span className="text-[#E46E58]">{formatPrice(extraHours * 1200)}</span>
                        </div>
                      </div>
                    )}

                    {extraImages > 0 && (
                      <div className="mb-4 pb-4 border-b border-[#F4F2EE]/10">
                        <div className="flex justify-between text-sm">
                          <span>Extra Images ({extraImages * 10})</span>
                          <span className="text-[#E46E58]">{formatPrice(extraImages * 700)}</span>
                        </div>
                      </div>
                    )}

                    <div className="pt-4">
                      <div className="flex justify-between items-center">
                        <span className="font-display font-bold text-xl">Total</span>
                        <span className="font-display font-black text-3xl text-[#E46E58] quote-total">
                          {formatPrice(calculateTotal())}
                        </span>
                      </div>
                    </div>

                    <div className="mt-6 space-y-3">
                      <Button 
                        onClick={() => setBookingDialogOpen(true)}
                        className="w-full bg-[#E46E58] hover:bg-[#d55d47] text-white"
                      >
                        Book This Package
                      </Button>
                      <Button 
                        variant="outline"
                        className="w-full border-[#F4F2EE]/20 hover:border-[#E46E58]"
                        onClick={() => {
                          alert('Quote saved! In a production app, this would generate a PDF.');
                        }}
                      >
                        <Download size={16} className="mr-2" /> Save Quote
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8 text-[#F4F2EE]/40">
                    <Camera size={48} className="mx-auto mb-4 opacity-50" />
                    <p>Select a package to see your quote</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section ref={bookingRef} className="py-20 px-6 bg-[#F4F2EE] text-[#0B0C0F]">
        <div className="section-animate max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="font-mono text-xs tracking-widest text-[#E46E58] mb-2">BOOKING</p>
              <h2 className="font-display font-black text-4xl md:text-5xl mb-4">RESERVE A DATE</h2>
              <p className="text-[#0B0C0F]/70 mb-8">
                Tell us what you're planning. We'll confirm availability and next steps within 24 hours.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#0B0C0F] text-[#F4F2EE]">
                    <Calendar size={24} />
                  </div>
                  <div>
                    <h4 className="font-display font-bold">Flexible Scheduling</h4>
                    <p className="text-sm text-[#0B0C0F]/60">We work around your timeline and event needs.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#0B0C0F] text-[#F4F2EE]">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4 className="font-display font-bold">Quick Response</h4>
                    <p className="text-sm text-[#0B0C0F]/60">Get a response within 24 hours of your inquiry.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#0B0C0F] text-[#F4F2EE]">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-display font-bold">Johannesburg & Beyond</h4>
                    <p className="text-sm text-[#0B0C0F]/60">Based in Johannesburg, available worldwide.</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-[#0B0C0F]/20">
                <p className="text-sm text-[#0B0C0F]/60">Or contact us directly:</p>
                <div className="mt-2 space-y-1">
                  <a href="tel:+270815519543" className="flex items-center gap-2 hover:text-[#E46E58] transition-colors">
                    <Phone size={16} /> +27 081 551 9543
                  </a>
                  <a href="mailto:faltakesfotos@gmail.com" className="flex items-center gap-2 hover:text-[#E46E58] transition-colors">
                    <Mail size={16} /> faltakesfotos@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="p-8 bg-white shadow-xl">
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input 
                      id="name"
                      value={bookingForm.name}
                      onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email"
                      type="email"
                      value={bookingForm.email}
                      onChange={(e) => setBookingForm({...bookingForm, email: e.target.value})}
                      required
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input 
                      id="phone"
                      value={bookingForm.phone}
                      onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="eventType">Event Type</Label>
                    <Select 
                      value={bookingForm.eventType} 
                      onValueChange={(value) => setBookingForm({...bookingForm, eventType: value})}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select event type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="wedding">Wedding</SelectItem>
                        <SelectItem value="bridal-shower">Bridal Shower</SelectItem>
                        <SelectItem value="traditional-wedding">Traditional Wedding</SelectItem>
                        <SelectItem value="maternity">Maternity</SelectItem>
                        <SelectItem value="birthday">Birthday</SelectItem>
                        <SelectItem value="corporate">Corporate Event</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="eventDate">Event Date</Label>
                    <Input 
                      id="eventDate"
                      type="date"
                      value={bookingForm.eventDate}
                      onChange={(e) => setBookingForm({...bookingForm, eventDate: e.target.value})}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input 
                      id="location"
                      value={bookingForm.location}
                      onChange={(e) => setBookingForm({...bookingForm, location: e.target.value})}
                      required
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="packageInterest">Package Interest (Optional)</Label>
                  <Select 
                    value={bookingForm.packageInterest} 
                    onValueChange={(value) => setBookingForm({...bookingForm, packageInterest: value})}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select a package" />
                    </SelectTrigger>
                    <SelectContent>
                      {allPackages.map((pkg) => (
                        <SelectItem key={pkg.id} value={pkg.id}>
                          {pkg.name} - {formatPrice(pkg.price)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message"
                    value={bookingForm.message}
                    onChange={(e) => setBookingForm({...bookingForm, message: e.target.value})}
                    placeholder="Tell us about your event..."
                    className="mt-1"
                    rows={4}
                  />
                </div>

                <Button 
                  type="submit"
                  className="w-full bg-[#E46E58] hover:bg-[#d55d47] text-white py-6"
                >
                  Check Availability
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Contact / Footer Section */}
      <section ref={contactRef} className="py-20 px-6">
        <div className="section-animate max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display font-black text-5xl md:text-6xl lg:text-7xl mb-4">
              LET'S CREATE
            </h2>
            <h2 className="font-display font-black text-5xl md:text-6xl lg:text-7xl text-[#E46E58]">
              SOMETHING REAL
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            <div className="text-center">
              <Phone size={24} className="mx-auto mb-4 text-[#E46E58]" />
              <p className="font-mono text-xs tracking-widest text-[#F4F2EE]/60 mb-2">PHONE</p>
              <a href="tel:+270815519543" className="text-lg hover:text-[#E46E58] transition-colors">
                +27 081 551 9543
              </a>
            </div>

            <div className="text-center">
              <Mail size={24} className="mx-auto mb-4 text-[#E46E58]" />
              <p className="font-mono text-xs tracking-widest text-[#F4F2EE]/60 mb-2">EMAIL</p>
              <a href="mailto:faltakesfotos@gmail.com" className="text-lg hover:text-[#E46E58] transition-colors">
                faltakesfotos@gmail.com
              </a>
            </div>

            <div className="text-center">
              <MapPin size={24} className="mx-auto mb-4 text-[#E46E58]" />
              <p className="font-mono text-xs tracking-widest text-[#F4F2EE]/60 mb-2">LOCATION</p>
              <p className="text-lg">Johannesburg, South Africa</p>
            </div>
          </div>

          <div className="hairline mb-8" />

          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <img 
              src="/images/logo-white.png" 
              alt="FalTakesFotos" 
              className="h-12 w-auto object-contain"
            />
            
            <div className="flex items-center gap-6">
              <a 
                href="https://www.instagram.com/faltakesfotos" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-[#E46E58] transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://www.facebook.com/faltakesfotos" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-[#E46E58] transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://faltakesfotos.pixieset.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-[#E46E58] transition-colors"
              >
                <ImageIcon size={20} />
              </a>
            </div>

            <p className="text-sm text-[#F4F2EE]/40">
              © {new Date().getFullYear()} FalTakesFotos. All rights reserved.
            </p>
          </div>
        </div>
      </section>

      {/* Quote Dialog */}
      <Dialog open={quoteDialogOpen} onOpenChange={setQuoteDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0B0C0F] border-[#F4F2EE]/20 text-[#F4F2EE]">
          <DialogHeader>
            <DialogTitle className="font-display font-black text-2xl">Build Your Quote</DialogTitle>
            <DialogDescription className="text-[#F4F2EE]/60">
              Select a package and add-ons to get an instant estimate.
            </DialogDescription>
          </DialogHeader>
          
          <div className="mt-6 space-y-6">
            {/* Quick Package Selection */}
            <div>
              <h4 className="font-display font-bold mb-3">Select a Package</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {allPackages.map((pkg) => (
                  <div
                    key={pkg.id}
                    onClick={() => setSelectedPackage(pkg)}
                    className={`p-3 border cursor-pointer transition-all ${
                      selectedPackage?.id === pkg.id 
                        ? 'border-[#E46E58] bg-[#E46E58]/10' 
                        : 'border-[#F4F2EE]/20 hover:border-[#F4F2EE]/40'
                    }`}
                  >
                    <div className="flex justify-between">
                      <span className="font-medium">{pkg.name}</span>
                      <span className="text-[#E46E58] font-display">{formatPrice(pkg.price)}</span>
                    </div>
                    <p className="text-xs text-[#F4F2EE]/60">{pkg.duration}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Add-ons in Dialog */}
            {selectedPackage && (
              <div className="pt-4 border-t border-[#F4F2EE]/20">
                <h4 className="font-display font-bold mb-3">Add-ons</h4>
                <div className="space-y-2">
                  {getRelevantAddOns().filter(a => a.price > 0).map((addon) => (
                    <div key={addon.id} className="flex items-center justify-between p-2 border border-[#F4F2EE]/10">
                      <div className="flex items-center gap-2">
                        <Checkbox 
                          checked={selectedAddOns.some(a => a.id === addon.id)}
                          onCheckedChange={() => toggleAddOn(addon)}
                        />
                        <span className="text-sm">{addon.name}</span>
                      </div>
                      <span className="text-sm text-[#E46E58]">{formatPrice(addon.price)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Total */}
            {selectedPackage && (
              <div className="pt-4 border-t border-[#F4F2EE]/20">
                <div className="flex justify-between items-center">
                  <span className="font-display font-bold">Total Estimate</span>
                  <span className="font-display font-black text-2xl text-[#E46E58]">
                    {formatPrice(calculateTotal())}
                  </span>
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <Button 
                onClick={() => {
                  setQuoteDialogOpen(false);
                  setBookingDialogOpen(true);
                }}
                className="flex-1 bg-[#E46E58] hover:bg-[#d55d47] text-white"
                disabled={!selectedPackage}
              >
                Proceed to Booking
              </Button>
              <Button 
                variant="outline"
                onClick={() => setQuoteDialogOpen(false)}
                className="border-[#F4F2EE]/20"
              >
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Booking Dialog */}
      <Dialog open={bookingDialogOpen} onOpenChange={setBookingDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0B0C0F] border-[#F4F2EE]/20 text-[#F4F2EE]">
          <DialogHeader>
            <DialogTitle className="font-display font-black text-2xl">Book Your Session</DialogTitle>
            <DialogDescription className="text-[#F4F2EE]/60">
              Fill in your details and we'll get back to you within 24 hours.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleBookingSubmit} className="mt-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="dialog-name">Name</Label>
                <Input 
                  id="dialog-name"
                  value={bookingForm.name}
                  onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})}
                  required
                  className="mt-1 bg-[#0B0C0F] border-[#F4F2EE]/20"
                />
              </div>
              <div>
                <Label htmlFor="dialog-email">Email</Label>
                <Input 
                  id="dialog-email"
                  type="email"
                  value={bookingForm.email}
                  onChange={(e) => setBookingForm({...bookingForm, email: e.target.value})}
                  required
                  className="mt-1 bg-[#0B0C0F] border-[#F4F2EE]/20"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="dialog-phone">Phone</Label>
                <Input 
                  id="dialog-phone"
                  value={bookingForm.phone}
                  onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
                  required
                  className="mt-1 bg-[#0B0C0F] border-[#F4F2EE]/20"
                />
              </div>
              <div>
                <Label htmlFor="dialog-eventType">Event Type</Label>
                <Select 
                  value={bookingForm.eventType} 
                  onValueChange={(value) => setBookingForm({...bookingForm, eventType: value})}
                >
                  <SelectTrigger className="mt-1 bg-[#0B0C0F] border-[#F4F2EE]/20">
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0B0C0F] border-[#F4F2EE]/20">
                    <SelectItem value="wedding">Wedding</SelectItem>
                    <SelectItem value="bridal-shower">Bridal Shower</SelectItem>
                    <SelectItem value="traditional-wedding">Traditional Wedding</SelectItem>
                    <SelectItem value="maternity">Maternity</SelectItem>
                    <SelectItem value="birthday">Birthday</SelectItem>
                    <SelectItem value="corporate">Corporate Event</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="dialog-eventDate">Event Date</Label>
                <Input 
                  id="dialog-eventDate"
                  type="date"
                  value={bookingForm.eventDate}
                  onChange={(e) => setBookingForm({...bookingForm, eventDate: e.target.value})}
                  required
                  className="mt-1 bg-[#0B0C0F] border-[#F4F2EE]/20"
                />
              </div>
              <div>
                <Label htmlFor="dialog-location">Location</Label>
                <Input 
                  id="dialog-location"
                  value={bookingForm.location}
                  onChange={(e) => setBookingForm({...bookingForm, location: e.target.value})}
                  required
                  className="mt-1 bg-[#0B0C0F] border-[#F4F2EE]/20"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="dialog-message">Message</Label>
              <Textarea 
                id="dialog-message"
                value={bookingForm.message}
                onChange={(e) => setBookingForm({...bookingForm, message: e.target.value})}
                placeholder="Tell us about your event..."
                className="mt-1 bg-[#0B0C0F] border-[#F4F2EE]/20"
                rows={4}
              />
            </div>

            {selectedPackage && (
              <div className="p-4 bg-[#E46E58]/10 border border-[#E46E58]/30">
                <p className="text-sm text-[#F4F2EE]/60">Selected Package</p>
                <p className="font-display font-bold">{selectedPackage.name}</p>
                <p className="text-[#E46E58]">{formatPrice(calculateTotal())}</p>
              </div>
            )}

            <div className="flex gap-3">
              <Button 
                type="submit"
                className="flex-1 bg-[#E46E58] hover:bg-[#d55d47] text-white"
              >
                Submit Booking Request
              </Button>
              <Button 
                type="button"
                variant="outline"
                onClick={() => setBookingDialogOpen(false)}
                className="border-[#F4F2EE]/20"
              >
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default App;
