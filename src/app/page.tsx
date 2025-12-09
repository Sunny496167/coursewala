//import Image from "next/image";

//export default function Home() {
//  return (
//    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
//      <h1>Hello World</h1>
//    </div>
//  )
//}

import React, { useState, useEffect } from 'react';
import { 
  Play, Star, Award, Clock, Users, ArrowRight, CheckCircle, 
  Menu, X, ChevronLeft, ChevronRight, Search, Filter, 
  BookOpen, BarChart, Shield, Mail, Phone, MapPin, 
  Linkedin, Twitter, Facebook, Instagram, LogOut, User, Lock
} from 'lucide-react';

// --- MOCK DATA ---

const COURSES_DATA = [
  {
    id: 1,
    title: "Executive AI Strategy & Implementation",
    instructor: "Dr. Sarah Chen",
    role: "Ex-Google AI Lead",
    rating: 4.9,
    reviews: 1240,
    price: 2499,
    category: "Artificial Intelligence",
    level: "Executive",
    duration: "8 Weeks",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop",
    description: "A comprehensive guide for C-suite executives to integrate AI into their business strategy, covering ethics, ROI, and implementation frameworks.",
    syllabus: [
      "AI Landscape & Business Value",
      "Strategic Implementation Frameworks",
      "Ethics, Governance & Risk",
      "Building AI Teams & Culture"
    ]
  },
  {
    id: 2,
    title: "Advanced Financial Modeling for CFOs",
    instructor: "Marcus Reynolds",
    role: "Goldman Sachs Director",
    rating: 4.8,
    reviews: 850,
    price: 1899,
    category: "Finance",
    level: "Advanced",
    duration: "6 Weeks",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=800&auto=format&fit=crop",
    description: "Master complex financial modeling techniques, M&A valuation, and sensitivity analysis designed for high-level decision making.",
    syllabus: [
      "Advanced Excel & VBA",
      "M&A and LBO Modeling",
      "Risk Assessment Models",
      "Strategic Forecasting"
    ]
  },
  {
    id: 3,
    title: "Global Leadership & Negotiation",
    instructor: "Elena Vostrova",
    role: "UN Ambassador",
    rating: 4.9,
    reviews: 2100,
    price: 1599,
    category: "Leadership",
    level: "Intermediate",
    duration: "5 Weeks",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=800&auto=format&fit=crop",
    description: "Develop your negotiation skills for the global stage. Learn to navigate cultural differences and close high-stakes deals.",
    syllabus: [
      "Psychology of Negotiation",
      "Cross-Cultural Communication",
      "Crisis Management",
      "Conflict Resolution"
    ]
  },
  {
    id: 4,
    title: "Full Stack Blockchain Development",
    instructor: "David Kim",
    role: "Tech Innovator",
    rating: 4.7,
    reviews: 930,
    price: 1299,
    category: "Technology",
    level: "Advanced",
    duration: "10 Weeks",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=800&auto=format&fit=crop",
    description: "Build decentralized applications (DApps) from scratch. Smart contracts, Solidity, and Web3 integration.",
    syllabus: [
      "Blockchain Fundamentals",
      "Solidity & Smart Contracts",
      "Web3.js Integration",
      "DeFi Architecture"
    ]
  },
  {
    id: 5,
    title: "Digital Transformation Leadership",
    instructor: "Sarah Jenkins",
    role: "CIO @ TechGiant",
    rating: 4.6,
    reviews: 500,
    price: 1499,
    category: "Leadership",
    level: "Executive",
    duration: "6 Weeks",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800&auto=format&fit=crop",
    description: "Lead your organization through the digital age. Learn to manage change, adopt new tech, and drive innovation.",
    syllabus: [
      "Digital Maturity Assessment",
      "Change Management Strategies",
      "Agile Methodologies",
      "Innovation Ecosystems"
    ]
  },
  {
    id: 6,
    title: "Strategic Brand Management",
    instructor: "Alex Rivera",
    role: "CMO @ GlobalBrand",
    rating: 4.8,
    reviews: 720,
    price: 1199,
    category: "Marketing",
    level: "Intermediate",
    duration: "4 Weeks",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=800&auto=format&fit=crop",
    description: "Create and manage powerful brands. Learn brand positioning, equity measurement, and marketing strategies.",
    syllabus: [
      "Brand Identity & Positioning",
      "Consumer Psychology",
      "Digital Branding Strategy",
      "Brand Equity Metrics"
    ]
  }
];

// --- SHARED COMPONENTS ---

const Button = ({ children, variant = 'primary', className = '', loading = false, ...props }) => {
  const baseStyles = "px-6 py-3 rounded-full font-bold transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-r from-amber-400 to-amber-600 text-slate-900 shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 hover:scale-105",
    secondary: "bg-slate-800 text-white border border-slate-700 hover:bg-slate-700 hover:border-slate-500",
    outline: "bg-transparent border-2 border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-slate-900",
    danger: "bg-red-500/10 text-red-500 border border-red-500/50 hover:bg-red-500 hover:text-white",
    text: "bg-transparent text-slate-300 hover:text-white pl-0"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} disabled={loading} {...props}>
      {loading ? (
        <>
          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
          Processing...
        </>
      ) : children}
    </button>
  );
};

const SectionHeading = ({ title, subtitle, centered = false }) => (
  <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
    {subtitle && (
      <span className="text-amber-500 font-semibold tracking-wider uppercase text-sm mb-2 block animate-fade-in">
        {subtitle}
      </span>
    )}
    <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
      {title}
    </h2>
    <div className={`h-1 w-20 bg-amber-500 mt-6 rounded-full ${centered ? 'mx-auto' : ''}`}></div>
  </div>
);

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md p-6 relative shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white">
          <X size={24} />
        </button>
        <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
        {children}
      </div>
    </div>
  );
};

const Input = ({ label, type = "text", ...props }) => (
  <div className="mb-4">
    <label className="block text-slate-400 text-sm font-semibold mb-2">{label}</label>
    <input 
      type={type} 
      className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all placeholder:text-slate-600"
      {...props}
    />
  </div>
);

// --- PAGE COMPONENTS ---

const HomePage = ({ navigateTo, courses }) => (
  <>
    {/* Hero Section */}
    <header className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-950 z-10"></div>
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-600/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
      </div>

      <div className="container mx-auto px-6 relative z-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="lg:w-1/2 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700 text-amber-400 text-sm font-semibold mb-8">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              New Executive Course Available
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold text-white leading-[1.1] mb-6 tracking-tight">
              Master the Future <br />
              of <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Executive Skills</span>
            </h1>
            <p className="text-lg text-slate-400 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Elevate your career with world-class education designed for executives and leaders. Learn from industry pioneers.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Button onClick={() => navigateTo('courses')} className="w-full sm:w-auto px-8 py-4 text-lg">
                Explore Courses
              </Button>
              <Button variant="secondary" onClick={() => navigateTo('about')} className="w-full sm:w-auto px-8 py-4 text-lg">
                 Learn More
              </Button>
            </div>
          </div>
          <div className="lg:w-1/2 relative">
             <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-amber-900/10 border border-slate-700 bg-slate-800 group">
                <img 
                  src="https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=1000&auto=format&fit=crop" 
                  alt="Executive Student" 
                  className="w-full h-auto object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute bottom-8 left-8 right-8 bg-slate-900/90 backdrop-blur-md p-6 rounded-xl border border-slate-700 flex items-center gap-4 shadow-xl">
                  <div className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center shrink-0">
                    <Play fill="black" size={20} className="text-slate-900 ml-1" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-lg">Introduction to Neural Networks</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="h-1.5 w-24 bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full w-2/3 bg-amber-500 rounded-full"></div>
                      </div>
                      <span className="text-xs text-slate-400">Lesson 4 of 12</span>
                    </div>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </header>

    {/* Featured Courses Preview */}
    <section className="py-24 bg-slate-900/50">
      <div className="container mx-auto px-6">
        <SectionHeading title="Featured Programs" subtitle="Hand-picked for you" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.slice(0, 3).map((course) => (
            <div key={course.id} onClick={() => navigateTo('details', course)} className="group cursor-pointer bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl overflow-hidden hover:border-amber-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50">
               <div className="relative h-48 overflow-hidden">
                 <img src={course.image} alt={course.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                 <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-amber-400 border border-amber-500/30">
                   {course.category}
                 </div>
               </div>
               <div className="p-6">
                 <div className="flex items-center gap-2 mb-3">
                   <Star size={14} className="text-amber-400 fill-amber-400" />
                   <span className="text-slate-300 text-sm font-medium">{course.rating}</span>
                   <span className="text-slate-500 text-xs">({course.reviews} reviews)</span>
                 </div>
                 <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">{course.title}</h3>
                 <p className="text-slate-400 text-sm mb-4">by {course.instructor}</p>
                 <div className="flex items-center justify-between border-t border-slate-700 pt-4 mt-4">
                   <span className="text-2xl font-bold text-white">${course.price}</span>
                   <span className="text-amber-400 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                     Details <ArrowRight size={16} />
                   </span>
                 </div>
               </div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button variant="outline" onClick={() => navigateTo('courses')}>View All Courses</Button>
        </div>
      </div>
    </section>
  </>
);

const CoursesPage = ({ navigateTo, courses }) => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', ...new Set(courses.map(c => c.category))];

  const filteredCourses = filter === 'All' ? courses : courses.filter(c => c.category === filter);

  return (
    <div className="pt-32 pb-20 min-h-screen container mx-auto px-6">
      <SectionHeading title="Explore Our Curriculum" subtitle="World Class Education" />
      
      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-12">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-2 rounded-full border transition-all ${filter === cat ? 'bg-amber-500 border-amber-500 text-slate-900 font-bold' : 'bg-transparent border-slate-700 text-slate-400 hover:border-amber-500 hover:text-white'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCourses.map((course) => (
          <div key={course.id} onClick={() => navigateTo('details', course)} className="group cursor-pointer bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden hover:border-amber-500/50 transition-all hover:-translate-y-1 hover:shadow-xl">
             <div className="relative h-48 overflow-hidden">
               <img src={course.image} alt={course.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
               <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur px-2 py-1 rounded text-xs font-bold text-white flex items-center gap-1">
                 <Clock size={12} /> {course.duration}
               </div>
             </div>
             <div className="p-6">
               <div className="flex justify-between items-start mb-2">
                 <span className="text-amber-500 text-xs font-bold uppercase tracking-wider">{course.category}</span>
                 <span className="text-slate-500 text-xs bg-slate-800 px-2 py-1 rounded border border-slate-700">{course.level}</span>
               </div>
               <h3 className="text-xl font-bold text-white mb-2">{course.title}</h3>
               <p className="text-slate-400 text-sm mb-4">by {course.instructor}</p>
               <div className="flex items-center justify-between mt-6">
                 <span className="text-2xl font-bold text-white">${course.price}</span>
                 <Button variant="secondary" className="px-4 py-2 text-sm h-auto">View</Button>
               </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CourseDetailsPage = ({ course, navigateTo, onBuy, user, isEnrolled }) => {
  const [loading, setLoading] = useState(false);

  const handleEnroll = async () => {
    if (!user) {
      navigateTo('login');
      return;
    }
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      onBuy(course);
    }, 1500);
  };

  if (!course) return <div className="pt-40 text-center text-white">Course not found.</div>;

  return (
    <div className="pt-20 min-h-screen">
      {/* Hero Banner */}
      <div className="bg-slate-900 border-b border-slate-800 py-20">
        <div className="container mx-auto px-6 flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-2/3">
            <div className="flex items-center gap-2 text-amber-500 mb-4 font-semibold">
              <span className="uppercase tracking-widest text-xs">{course.category}</span>
              <span>•</span>
              <span className="uppercase tracking-widest text-xs">{course.level}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">{course.title}</h1>
            <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-2xl">{course.description}</p>
            
            <div className="flex items-center gap-8 mb-8 text-slate-300 text-sm">
              <div className="flex items-center gap-2">
                <img src={`https://ui-avatars.com/api/?name=${course.instructor}&background=random`} className="w-8 h-8 rounded-full" alt={course.instructor} />
                <span className="font-semibold text-white">{course.instructor}</span>
              </div>
              <div className="flex items-center gap-1"><Star size={16} className="text-amber-500 fill-amber-500" /> {course.rating} ({course.reviews} reviews)</div>
              <div className="flex items-center gap-1"><Users size={16} /> 12k+ Students</div>
              <div className="flex items-center gap-1"><Clock size={16} /> {course.duration}</div>
            </div>
          </div>
          <div className="md:w-1/3 w-full">
            <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-2xl sticky top-24">
               <img src={course.image} alt={course.title} className="w-full h-48 object-cover rounded-xl mb-6" />
               <div className="text-3xl font-bold text-white mb-6">${course.price} <span className="text-lg text-slate-500 font-normal line-through ml-2">${course.price + 500}</span></div>
               
               {isEnrolled ? (
                 <Button className="w-full bg-green-600 hover:bg-green-500 mb-4 cursor-default border-none text-white shadow-none" onClick={() => navigateTo('dashboard')}>
                   <CheckCircle size={20} /> Already Enrolled
                 </Button>
               ) : (
                 <Button onClick={handleEnroll} loading={loading} className="w-full mb-4">
                   Enroll Now
                 </Button>
               )}
               
               <p className="text-center text-slate-500 text-xs mb-4">30-Day Money-Back Guarantee</p>
               <div className="space-y-3">
                 <div className="flex items-center gap-3 text-slate-300 text-sm"><BookOpen size={16} className="text-amber-500"/> 24 Lessons</div>
                 <div className="flex items-center gap-3 text-slate-300 text-sm"><Award size={16} className="text-amber-500"/> Certificate of Completion</div>
                 <div className="flex items-center gap-3 text-slate-300 text-sm"><Shield size={16} className="text-amber-500"/> Full Lifetime Access</div>
               </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-20 grid md:grid-cols-3 gap-12">
        <div className="md:col-span-2 space-y-12">
          {/* Syllabus */}
          <section>
            <h3 className="text-2xl font-bold text-white mb-6">What you'll learn</h3>
            <div className="bg-slate-800/30 rounded-2xl p-8 border border-slate-800 grid md:grid-cols-2 gap-4">
              {course.syllabus.map((item, i) => (
                <div key={i} className="flex gap-3 text-slate-300">
                  <CheckCircle size={20} className="text-amber-500 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>
          
          {/* Instructor */}
          <section>
             <h3 className="text-2xl font-bold text-white mb-6">Your Instructor</h3>
             <div className="flex items-start gap-6">
                <img src={`https://ui-avatars.com/api/?name=${course.instructor}&background=0d9488&color=fff&size=128`} className="w-24 h-24 rounded-full border-4 border-slate-800" alt="Instructor" />
                <div>
                  <h4 className="text-xl font-bold text-white">{course.instructor}</h4>
                  <p className="text-amber-500 font-medium mb-4">{course.role}</p>
                  <p className="text-slate-400 leading-relaxed">
                    A pioneer in the field with over 15 years of experience leading global teams. 
                    Has published numerous papers and consulted for Fortune 500 companies.
                  </p>
                </div>
             </div>
          </section>
        </div>
      </div>
    </div>
  );
};

const AuthPage = ({ type, navigateTo, onLogin }) => {
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API
    setTimeout(() => {
      setLoading(false);
      // Dummy User Object
      const user = { 
        name: type === 'signup' ? formData.name : "Alex Morgan", 
        email: formData.email,
        id: "user_123" 
      };
      onLogin(user);
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-32 pb-20 flex items-center justify-center container mx-auto px-6">
      <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 w-full max-w-md shadow-2xl">
        <h2 className="text-3xl font-bold text-white mb-2 text-center">{type === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
        <p className="text-slate-400 text-center mb-8">{type === 'login' ? 'Enter your credentials to access your account' : 'Start your premium learning journey today'}</p>
        
        <form onSubmit={handleSubmit}>
          {type === 'signup' && (
            <Input 
              label="Full Name" 
              placeholder="John Doe" 
              required 
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          )}
          <Input 
            label="Email Address" 
            type="email" 
            placeholder="john@example.com" 
            required 
            value={formData.email}
            onChange={e => setFormData({...formData, email: e.target.value})}
          />
          <Input 
            label="Password" 
            type="password" 
            placeholder="••••••••" 
            required 
            value={formData.password}
            onChange={e => setFormData({...formData, password: e.target.value})}
          />
          
          <Button className="w-full mt-4" loading={loading}>
            {type === 'login' ? 'Sign In' : 'Create Account'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-slate-400 text-sm">
            {type === 'login' ? "Don't have an account? " : "Already have an account? "}
            <button 
              onClick={() => navigateTo(type === 'login' ? 'signup' : 'login')} 
              className="text-amber-500 font-bold hover:underline"
            >
              {type === 'login' ? 'Sign Up' : 'Log In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

const ContactPage = () => {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="pt-32 pb-20 container mx-auto px-6 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <SectionHeading title="Get in Touch" subtitle="We're here to help" centered />
        
        <div className="grid md:grid-cols-2 gap-12 bg-slate-800 rounded-3xl p-8 md:p-12 border border-slate-700 shadow-2xl mt-12">
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-slate-300">
                <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center text-amber-500"><Mail /></div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-bold">Email</p>
                  <p>support@premiumhub.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-slate-300">
                <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center text-amber-500"><Phone /></div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-bold">Phone</p>
                  <p>+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-slate-300">
                <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center text-amber-500"><MapPin /></div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-bold">Headquarters</p>
                  <p>100 Innovation Dr, Silicon Valley, CA</p>
                </div>
              </div>
            </div>
            
            <div className="mt-12">
              <h4 className="text-white font-bold mb-4">Follow Us</h4>
              <div className="flex gap-4">
                {[Linkedin, Twitter, Facebook, Instagram].map((Icon, i) => (
                  <button key={i} className="w-10 h-10 rounded-full bg-slate-700 hover:bg-amber-500 hover:text-slate-900 text-white flex items-center justify-center transition-all">
                    <Icon size={18} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800">
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center text-center animate-fade-in">
                <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle size={40} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-slate-400">Thank you for contacting us. We will get back to you within 24 hours.</p>
                <Button variant="outline" className="mt-8" onClick={() => setSent(false)}>Send Another</Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 className="text-xl font-bold text-white mb-6">Send us a message</h3>
                <Input label="Name" placeholder="Your name" required />
                <Input label="Email" type="email" placeholder="Your email" required />
                <div className="mb-6">
                  <label className="block text-slate-400 text-sm font-semibold mb-2">Message</label>
                  <textarea 
                    className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500 h-32 placeholder:text-slate-600"
                    placeholder="How can we help you?"
                    required
                  ></textarea>
                </div>
                <Button className="w-full">Send Message</Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const AboutPage = () => (
  <div className="pt-32 pb-20 container mx-auto px-6 min-h-screen">
    <div className="text-center max-w-3xl mx-auto mb-20">
      <SectionHeading title="Redefining Executive Education" subtitle="Our Mission" centered />
      <p className="text-lg text-slate-400 leading-relaxed">
        Premium Learning Hub was founded on a simple premise: Executives and leaders need education that moves as fast as the world does. We curate knowledge from the world's top minds to help you stay ahead.
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-8 mb-20">
      {[
        { title: "Excellence", text: "We only partner with the top 1% of instructors in their respective fields." },
        { title: "Innovation", text: "Our platform leverages the latest tech to provide an immersive learning experience." },
        { title: "Community", text: "Join a global network of over 50,000 leaders and changemakers." }
      ].map((item, i) => (
        <div key={i} className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
          <h3 className="text-xl font-bold text-amber-500 mb-4">{item.title}</h3>
          <p className="text-slate-300">{item.text}</p>
        </div>
      ))}
    </div>

    <div className="relative rounded-3xl overflow-hidden h-96">
      <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2000&auto=format&fit=crop" alt="Team" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center">Join the Revolution</h2>
      </div>
    </div>
  </div>
);

const DashboardPage = ({ user, enrolledCourses, navigateTo }) => {
  if (!user) {
    navigateTo('login');
    return null;
  }

  return (
    <div className="pt-32 pb-20 container mx-auto px-6 min-h-screen">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {user.name}</h1>
          <p className="text-slate-400">Track your progress and continue learning.</p>
        </div>
        <div className="hidden md:block">
           <div className="bg-slate-800 px-6 py-3 rounded-xl border border-slate-700 flex items-center gap-4">
              <div>
                <p className="text-xs text-slate-500 uppercase font-bold">Enrolled Courses</p>
                <p className="text-xl font-bold text-white">{enrolledCourses.length}</p>
              </div>
              <div className="h-8 w-px bg-slate-700"></div>
              <div>
                <p className="text-xs text-slate-500 uppercase font-bold">Certificates</p>
                <p className="text-xl font-bold text-white">0</p>
              </div>
           </div>
        </div>
      </div>

      <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <BookOpen className="text-amber-500" /> My Learning
      </h2>

      {enrolledCourses.length === 0 ? (
        <div className="bg-slate-800 rounded-2xl p-12 text-center border border-slate-700 border-dashed">
          <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-500">
            <BookOpen size={32} />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No courses yet</h3>
          <p className="text-slate-400 mb-6">Start your journey by enrolling in a premium course.</p>
          <Button onClick={() => navigateTo('courses')}>Browse Courses</Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {enrolledCourses.map(course => (
            <div key={course.id} className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden">
              <div className="h-40 relative">
                <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <Button variant="primary" className="scale-90">Continue</Button>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-white mb-2 line-clamp-1">{course.title}</h3>
                <div className="w-full bg-slate-900 h-2 rounded-full mb-2 overflow-hidden">
                  <div className="bg-amber-500 h-full w-[10%]"></div>
                </div>
                <div className="flex justify-between text-xs text-slate-400">
                  <span>10% Complete</span>
                  <span>2/24 Lessons</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// --- MAIN LAYOUT & APP ---

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // App State
  const [user, setUser] = useState(null); // { name: string, email: string }
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null); // 'success'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateTo = (page, data = null) => {
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
    if (page === 'details' && data) {
      setSelectedCourse(data);
    }
    setCurrentPage(page);
  };

  const handleLogin = (userData) => {
    setUser(userData);
    navigateTo('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    navigateTo('home');
  };

  const handleBuyCourse = (course) => {
    if (enrolledCourses.find(c => c.id === course.id)) {
      alert("You are already enrolled!");
      return;
    }
    setEnrolledCourses([...enrolledCourses, course]);
    setModalContent('success');
    setModalOpen(true);
  };

  const isEnrolled = selectedCourse && enrolledCourses.some(c => c.id === selectedCourse.id);

  return (
    <div className="min-h-screen bg-slate-950 font-sans selection:bg-amber-500 selection:text-slate-900 overflow-x-hidden text-slate-200">
      
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/90 backdrop-blur-md py-4 border-b border-slate-800' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigateTo('home')}>
            <div className="w-10 h-10 bg-gradient-to-tr from-amber-400 to-amber-600 rounded-lg flex items-center justify-center transform rotate-3 shadow-lg shadow-amber-500/20">
              <span className="text-slate-900 font-bold text-xl">P</span>
            </div>
            <span className="text-2xl font-bold text-white tracking-tight">PREMIUM<span className="text-amber-500">HUB</span></span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {['Home', 'Courses', 'About', 'Contact'].map((item) => (
              <button 
                key={item} 
                onClick={() => navigateTo(item.toLowerCase())}
                className={`text-sm font-medium transition-colors ${currentPage === item.toLowerCase() ? 'text-amber-500' : 'text-slate-300 hover:text-white'}`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <button onClick={() => navigateTo('dashboard')} className="flex items-center gap-2 text-white hover:text-amber-500 font-medium transition-colors">
                  <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center text-amber-500">
                    <User size={16} />
                  </div>
                  {user.name.split(' ')[0]}
                </button>
                <button onClick={handleLogout} className="text-slate-500 hover:text-white" title="Logout">
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <>
                <button onClick={() => navigateTo('login')} className="text-white hover:text-amber-400 font-medium transition-colors">Log In</button>
                <Button variant="primary" onClick={() => navigateTo('signup')}>Get Started</Button>
              </>
            )}
          </div>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-white">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-slate-900 border-b border-slate-800 p-6 flex flex-col gap-4 shadow-2xl animate-fade-in">
            {['Home', 'Courses', 'About', 'Contact'].map((item) => (
              <button 
                key={item} 
                onClick={() => navigateTo(item.toLowerCase())} 
                className="text-slate-300 hover:text-white font-medium text-left text-lg"
              >
                {item}
              </button>
            ))}
            <div className="h-px bg-slate-800 my-2"></div>
            {user ? (
              <>
                <button onClick={() => navigateTo('dashboard')} className="text-left text-white font-bold">Dashboard</button>
                <button onClick={handleLogout} className="text-left text-slate-400">Log Out</button>
              </>
            ) : (
              <>
                <button onClick={() => navigateTo('login')} className="text-white hover:text-amber-400 font-medium text-left">Log In</button>
                <Button variant="primary" className="w-full" onClick={() => navigateTo('signup')}>Get Started</Button>
              </>
            )}
          </div>
        )}
      </nav>

      {/* Main Content Router */}
      <main className="min-h-screen">
        {currentPage === 'home' && <HomePage navigateTo={navigateTo} courses={COURSES_DATA} />}
        {currentPage === 'courses' && <CoursesPage navigateTo={navigateTo} courses={COURSES_DATA} />}
        {currentPage === 'details' && (
          <CourseDetailsPage 
            course={selectedCourse} 
            navigateTo={navigateTo} 
            onBuy={handleBuyCourse}
            user={user}
            isEnrolled={isEnrolled}
          />
        )}
        {(currentPage === 'login' || currentPage === 'signup') && (
          <AuthPage type={currentPage} navigateTo={navigateTo} onLogin={handleLogin} />
        )}
        {currentPage === 'contact' && <ContactPage />}
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'dashboard' && (
          <DashboardPage user={user} enrolledCourses={enrolledCourses} navigateTo={navigateTo} />
        )}
      </main>

      {/* Success Modal */}
      <Modal 
        isOpen={modalOpen} 
        onClose={() => {
          setModalOpen(false);
          navigateTo('dashboard');
        }} 
        title="Purchase Successful!"
      >
        <div className="text-center">
          <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-green-500" />
          </div>
          <p className="text-slate-300 mb-6">You have successfully enrolled in <strong>{selectedCourse?.title}</strong>. Good luck!</p>
          <Button className="w-full" onClick={() => {
            setModalOpen(false);
            navigateTo('dashboard');
          }}>
            Go to Dashboard
          </Button>
        </div>
      </Modal>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 pt-20 pb-10">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6 cursor-pointer" onClick={() => navigateTo('home')}>
                <div className="w-8 h-8 bg-gradient-to-tr from-amber-400 to-amber-600 rounded-lg flex items-center justify-center">
                  <span className="text-slate-900 font-bold text-lg">P</span>
                </div>
                <span className="text-xl font-bold text-white">PREMIUM<span className="text-amber-500">HUB</span></span>
              </div>
              <p className="text-slate-400 leading-relaxed mb-6">
                Empowering the next generation of leaders with world-class education and mentorship.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6">Platform</h4>
              <ul className="space-y-4 text-slate-400">
                <li><button onClick={() => navigateTo('courses')} className="hover:text-amber-500 transition-colors">Browse Courses</button></li>
                <li><button className="hover:text-amber-500 transition-colors">Mentorship</button></li>
                <li><button className="hover:text-amber-500 transition-colors">Pricing</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Company</h4>
              <ul className="space-y-4 text-slate-400">
                <li><button onClick={() => navigateTo('about')} className="hover:text-amber-500 transition-colors">About Us</button></li>
                <li><button onClick={() => navigateTo('contact')} className="hover:text-amber-500 transition-colors">Contact</button></li>
                <li><button className="hover:text-amber-500 transition-colors">Careers</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Subscribe</h4>
              <p className="text-slate-400 mb-4">Get the latest updates and exclusive offers.</p>
              <div className="flex gap-2">
                <input type="email" placeholder="Email address" className="bg-slate-800 border border-slate-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-amber-500 w-full placeholder:text-slate-600" />
                <button className="bg-amber-500 text-slate-900 px-4 py-2 rounded-lg font-bold hover:bg-amber-400 transition-colors">
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm">
            <p>&copy; 2024 Premium Learning Hub. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <button className="hover:text-white">Privacy Policy</button>
              <button className="hover:text-white">Terms of Service</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}



