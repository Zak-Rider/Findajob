import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { MapPin, DollarSign, Clock, Star, Search } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("jobs");

  // Fetch featured jobs and tasks
  const { data: jobs = [] } = useQuery({
    queryKey: ["/api/jobs"],
  });

  const { data: tasks = [] } = useQuery({
    queryKey: ["/api/tasks"],
  });

  // Get first 3 jobs and tasks for featured sections
  const featuredJobs = (jobs as any[]).slice(0, 3);
  const featuredTasks = (tasks as any[]).slice(0, 3);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      const searchParams = new URLSearchParams({ search: searchTerm.trim() });
      setLocation(`/${searchType}?${searchParams.toString()}`);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Modern Split Design */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-oxford-blue via-rich-black to-oxford-blue"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-ut-orange/10 to-transparent"></div>
        
        {/* Animated Background Shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-ut-orange/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-32 right-20 w-48 h-48 bg-ut-orange/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white/5 rounded-full blur-lg animate-pulse delay-500"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="text-white space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                Your <span className="text-ut-orange">Career</span><br />
                Starts <span className="bg-gradient-to-r from-ut-orange to-orange-400 bg-clip-text text-transparent">Here</span>
              </h1>
              <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed">
                Bangladesh's premier platform connecting talent with opportunities through jobs and freelance services
              </p>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 py-6">
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-ut-orange">1000+</div>
                <div className="text-sm text-gray-400">Active Jobs</div>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-ut-orange">500+</div>
                <div className="text-sm text-gray-400">Freelancers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-ut-orange">50+</div>
                <div className="text-sm text-gray-400">Cities</div>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="bg-ut-orange hover:bg-orange-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                onClick={() => setLocation("/jobs")}
              >
                Find Jobs →
              </Button>
              <Button 
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-oxford-blue px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300"
                onClick={() => setLocation("/tasks")}
              >
                Hire Talent
              </Button>
            </div>
          </div>
          
          {/* Right Column - Interactive Search */}
          <div className="lg:pl-8">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Start Your Search</h3>
              
              <form onSubmit={handleSearch} className="space-y-6">
                {/* Search Input */}
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search jobs, tasks, skills..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 pr-4 py-4 text-lg rounded-2xl border-0 bg-white/90 backdrop-blur-sm focus:bg-white focus:ring-2 focus:ring-ut-orange transition-all duration-300"
                  />
                </div>
                
                {/* Search Type Toggle */}
                <div className="flex bg-white/20 backdrop-blur-sm rounded-2xl p-1">
                  <button
                    type="button"
                    onClick={() => setSearchType("jobs")}
                    className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300 ${
                      searchType === "jobs"
                        ? "bg-ut-orange text-white shadow-lg"
                        : "text-white/80 hover:text-white"
                    }`}
                  >
                    Jobs
                  </button>
                  <button
                    type="button"
                    onClick={() => setSearchType("tasks")}
                    className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300 ${
                      searchType === "tasks"
                        ? "bg-ut-orange text-white shadow-lg"
                        : "text-white/80 hover:text-white"
                    }`}
                  >
                    Tasks
                  </button>
                </div>
                
                {/* Search Button */}
                <Button 
                  type="submit"
                  className="w-full bg-ut-orange hover:bg-orange-600 text-white py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Search Now
                </Button>
              </form>
              
              {/* Popular Searches */}
              <div className="mt-6 pt-6 border-t border-white/20">
                <p className="text-white/60 text-sm mb-3">Popular searches:</p>
                <div className="flex flex-wrap gap-2">
                  {["Web Developer", "Logo Design", "Marketing", "Data Entry"].map((term) => (
                    <button
                      key={term}
                      onClick={() => {
                        setSearchTerm(term);
                        handleSearch({ preventDefault: () => {} } as any);
                      }}
                      className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white/80 text-sm rounded-full transition-all duration-300"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60">
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Cards Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-rich-black mb-6">
              Explore by <span className="text-ut-orange">Category</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover opportunities across diverse industries in Bangladesh
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              { name: "Technology", icon: "💻", jobs: 250 },
              { name: "Design", icon: "🎨", jobs: 180 },
              { name: "Marketing", icon: "📈", jobs: 150 },
              { name: "Business", icon: "💼", jobs: 200 },
              { name: "Writing", icon: "✍️", jobs: 120 },
              { name: "Sales", icon: "🤝", jobs: 160 }
            ].map((category, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100 hover:border-ut-orange/30">
                  <div className="text-center">
                    <div className="text-4xl mb-4 group-hover:scale-125 transition-transform duration-300">
                      {category.icon}
                    </div>
                    <h3 className="font-bold text-rich-black mb-2 text-sm lg:text-base">{category.name}</h3>
                    <p className="text-gray-500 text-xs lg:text-sm">{category.jobs}+ Jobs</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-rich-black mb-4">
              Why Choose KajBD?
            </h2>
            <p className="text-lg text-text-secondary">
              The most trusted platform for jobs and freelance work in Bangladesh
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-ut-orange rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-search text-white text-2xl"></i>
                </div>
                <h3 className="text-xl font-semibold text-rich-black mb-2">
                  City-Based Search
                </h3>
                <p className="text-text-secondary">
                  Find opportunities in your city with our advanced location-based filtering
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-oxford-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-shield-alt text-white text-2xl"></i>
                </div>
                <h3 className="text-xl font-semibold text-rich-black mb-2">
                  Secure Platform
                </h3>
                <p className="text-text-secondary">
                  Safe and secure environment for both employers and freelancers
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-ut-orange rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-users text-white text-2xl"></i>
                </div>
                <h3 className="text-xl font-semibold text-rich-black mb-2">
                  Local Community
                </h3>
                <p className="text-text-secondary">
                  Connect with professionals and businesses across Bangladesh
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Jobs - Modern Design */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-16">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-rich-black mb-4">
                Latest <span className="text-ut-orange">Jobs</span>
              </h2>
              <p className="text-xl text-gray-600">
                Handpicked opportunities from top companies in Bangladesh
              </p>
            </div>
            <Button 
              onClick={() => setLocation("/jobs")}
              className="hidden lg:flex bg-oxford-blue hover:bg-blue-800 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              View All Jobs →
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {featuredJobs.map((job: any, index: number) => (
              <div key={job.id} className="group cursor-pointer">
                <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 relative overflow-hidden">
                  {/* Background Pattern */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-ut-orange/10 to-transparent rounded-bl-full"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex-1">
                        <Badge className={`mb-3 ${index % 2 === 0 ? 'bg-oxford-blue text-white' : 'bg-ut-orange text-white'}`}>
                          {job.type}
                        </Badge>
                        <h3 className="text-xl font-bold text-rich-black mb-2 group-hover:text-ut-orange transition-colors duration-300">
                          {job.title}
                        </h3>
                        <p className="text-gray-600 font-medium">{job.company}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-5 w-5 mr-3 text-ut-orange" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <DollarSign className="h-5 w-5 mr-3 text-ut-orange" />
                        <span className="font-semibold">{job.salary}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 line-clamp-3 mb-6 leading-relaxed">
                      {job.description}
                    </p>
                    
                    <Button 
                      className="w-full bg-gradient-to-r from-ut-orange to-orange-500 hover:from-orange-600 hover:to-orange-700 text-white py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:scale-105"
                      onClick={() => setLocation("/jobs")}
                    >
                      Apply Now
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12 lg:hidden">
            <Button 
              onClick={() => setLocation("/jobs")}
              className="bg-oxford-blue hover:bg-blue-800 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              View All Jobs →
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Tasks - Modern Design */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-16">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-rich-black mb-4">
                Popular <span className="text-ut-orange">Tasks</span>
              </h2>
              <p className="text-xl text-gray-600">
                Discover talented freelancers for your next project
              </p>
            </div>
            <Button 
              onClick={() => setLocation("/tasks")}
              className="hidden lg:flex bg-oxford-blue hover:bg-blue-800 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Explore All Tasks →
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {featuredTasks.map((task: any, index: number) => (
              <div key={task.id} className="group cursor-pointer">
                <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 overflow-hidden relative">
                  {/* Task Category Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <Badge className={`${index % 2 === 0 ? 'bg-ut-orange' : 'bg-oxford-blue'} text-white`}>
                      {task.category}
                    </Badge>
                  </div>
                  
                  {/* Task Image Placeholder */}
                  <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-ut-orange/20 to-oxford-blue/20"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-6xl opacity-60">
                        {index % 3 === 0 ? '🎨' : index % 3 === 1 ? '💻' : '📝'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <h3 className="text-xl font-bold text-rich-black mb-3 line-clamp-2 group-hover:text-ut-orange transition-colors duration-300">
                      {task.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-6 line-clamp-3 leading-relaxed">
                      {task.description}
                    </p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-ut-orange font-bold text-2xl">
                        ৳{task.price.toLocaleString()}
                      </span>
                      <span className="text-sm text-gray-500 flex items-center bg-gray-100 px-3 py-1 rounded-full">
                        <Clock className="h-4 w-4 mr-1" />
                        {task.deliveryTime} days
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center">
                        <div className="flex items-center mr-2">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">(4.9)</span>
                      </div>
                      <span className="text-sm text-gray-500">156 reviews</span>
                    </div>
                    
                    <Button 
                      className="w-full bg-gradient-to-r from-ut-orange to-orange-500 hover:from-orange-600 hover:to-orange-700 text-white py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:scale-105"
                      onClick={() => setLocation("/tasks")}
                    >
                      Order Now
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12 lg:hidden">
            <Button 
              onClick={() => setLocation("/tasks")}
              className="bg-oxford-blue hover:bg-blue-800 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Explore All Tasks →
            </Button>
          </div>
        </div>
      </section>

      {/* Interactive Success Metrics & Value Proposition */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-ut-orange/5 rounded-full -translate-x-48 -translate-y-48"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-oxford-blue/5 rounded-full translate-x-48 translate-y-48"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-ut-orange/10 to-oxford-blue/10 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Main Heading */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-gradient-to-r from-ut-orange to-orange-500 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6">
              🇧🇩 Made for Bangladesh
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold text-rich-black mb-6">
              Why Choose <span className="text-transparent bg-gradient-to-r from-oxford-blue to-ut-orange bg-clip-text">KajBD</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Bangladesh's most trusted employment platform connecting talent with opportunities through innovative job matching and freelance marketplace
            </p>
          </div>

          {/* Interactive Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {[
              { number: "5000+", label: "Active Users", icon: "👥", color: "from-oxford-blue to-blue-600" },
              { number: "1200+", label: "Job Postings", icon: "💼", color: "from-ut-orange to-orange-600" },
              { number: "800+", label: "Freelance Tasks", icon: "🎯", color: "from-purple-500 to-purple-600" },
              { number: "50+", label: "Cities Covered", icon: "🏙️", color: "from-green-500 to-green-600" }
            ].map((stat, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100 hover:border-ut-orange/30 relative overflow-hidden">
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  
                  <div className="relative z-10 text-center">
                    <div className="text-4xl mb-4 transform group-hover:scale-125 transition-transform duration-300">
                      {stat.icon}
                    </div>
                    <div className="text-3xl lg:text-4xl font-bold text-rich-black mb-2 group-hover:text-ut-orange transition-colors duration-300">
                      {stat.number}
                    </div>
                    <div className="text-gray-600 font-medium">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Innovative Feature Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
            {/* Card 1 - Local Focus */}
            <div className="group cursor-pointer">
              <div className="bg-gradient-to-br from-oxford-blue to-blue-800 rounded-3xl p-8 text-white shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-ut-orange/20 rounded-full translate-y-12 -translate-x-12"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center mb-6">
                    <div className="bg-ut-orange rounded-2xl p-4 mr-4">
                      <MapPin className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold">Local Excellence</h3>
                  </div>
                  <p className="text-blue-100 text-lg leading-relaxed mb-6">
                    Tailored specifically for Bangladesh with smart city-based filtering from Dhaka to Chittagong, ensuring you find opportunities in your preferred location.
                  </p>
                  <div className="flex items-center text-ut-orange font-semibold">
                    <span>Explore Local Jobs</span>
                    <div className="ml-2 transform group-hover:translate-x-2 transition-transform duration-300">→</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 - Quality & Trust */}
            <div className="group cursor-pointer">
              <div className="bg-gradient-to-br from-ut-orange to-orange-600 rounded-3xl p-8 text-white shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-oxford-blue/20 rounded-full translate-y-12 -translate-x-12"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center mb-6">
                    <div className="bg-oxford-blue rounded-2xl p-4 mr-4">
                      <Star className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold">Quality Assured</h3>
                  </div>
                  <p className="text-orange-100 text-lg leading-relaxed mb-6">
                    Verified employers and skilled freelancers undergo rigorous screening to ensure high-quality opportunities and professional service delivery.
                  </p>
                  <div className="flex items-center text-oxford-blue font-semibold">
                    <span>View Success Stories</span>
                    <div className="ml-2 transform group-hover:translate-x-2 transition-transform duration-300">→</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3 - Smart Technology */}
            <div className="group cursor-pointer">
              <div className="bg-gradient-to-br from-rich-black to-gray-800 rounded-3xl p-8 text-white shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-ut-orange/10 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-oxford-blue/20 rounded-full translate-y-12 -translate-x-12"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-r from-ut-orange to-oxford-blue rounded-2xl p-4 mr-4">
                      <Clock className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold">Smart Matching</h3>
                  </div>
                  <p className="text-gray-300 text-lg leading-relaxed mb-6">
                    Advanced algorithms match skills with opportunities, ensuring faster hiring processes and optimal project-freelancer combinations.
                  </p>
                  <div className="flex items-center text-ut-orange font-semibold">
                    <span>See How It Works</span>
                    <div className="ml-2 transform group-hover:translate-x-2 transition-transform duration-300">→</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action with Dual Path */}
          <div className="relative">
            <div className="bg-gradient-to-r from-oxford-blue via-rich-black to-oxford-blue rounded-3xl p-12 lg:p-16 text-white relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-ut-orange/20 to-transparent"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-ut-orange/10 rounded-full translate-x-48 translate-y-48"></div>
              </div>
              
              <div className="relative z-10 text-center">
                <h3 className="text-4xl lg:text-5xl font-bold mb-6">
                  Ready to <span className="text-ut-orange">Transform</span> Your Career?
                </h3>
                <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
                  Join thousands of professionals who have found their dream jobs and ideal clients through KajBD's innovative platform
                </p>
                
                {/* Dual CTA Buttons */}
                <div className="flex flex-col lg:flex-row gap-6 justify-center items-center">
                  <div className="group cursor-pointer">
                    <Button 
                      className="bg-ut-orange hover:bg-orange-600 text-white px-10 py-6 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 flex items-center"
                      onClick={() => setLocation("/auth")}
                    >
                      <div className="mr-3 text-2xl">🔍</div>
                      <div>
                        <div className="text-lg font-bold">Find Your Dream Job</div>
                        <div className="text-sm opacity-90">Join as Job Seeker</div>
                      </div>
                    </Button>
                  </div>
                  
                  <div className="text-blue-200 font-semibold text-lg">OR</div>
                  
                  <div className="group cursor-pointer">
                    <Button 
                      className="bg-white hover:bg-gray-100 text-oxford-blue px-10 py-6 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 flex items-center"
                      onClick={() => setLocation("/auth")}
                    >
                      <div className="mr-3 text-2xl">💼</div>
                      <div>
                        <div className="text-lg font-bold">Offer Your Skills</div>
                        <div className="text-sm opacity-70">Join as Freelancer</div>
                      </div>
                    </Button>
                  </div>
                </div>
                
                <div className="mt-8 text-blue-200 text-sm">
                  ✨ Free to join • No setup fees • Start earning today
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-rich-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-ut-orange mb-4">KajBD</h3>
              <p className="text-gray-300 mb-4">
                Connecting talent with opportunities across Bangladesh through jobs and freelance tasks.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-ut-orange transition-colors duration-200">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="text-gray-300 hover:text-ut-orange transition-colors duration-200">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="text-gray-300 hover:text-ut-orange transition-colors duration-200">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="#" className="text-gray-300 hover:text-ut-orange transition-colors duration-200">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">For Job Seekers</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-ut-orange transition-colors duration-200">Browse Jobs</a></li>
                <li><a href="#" className="text-gray-300 hover:text-ut-orange transition-colors duration-200">Career Advice</a></li>
                <li><a href="#" className="text-gray-300 hover:text-ut-orange transition-colors duration-200">Resume Builder</a></li>
                <li><a href="#" className="text-gray-300 hover:text-ut-orange transition-colors duration-200">Job Alerts</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">For Employers</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-ut-orange transition-colors duration-200">Post a Job</a></li>
                <li><a href="#" className="text-gray-300 hover:text-ut-orange transition-colors duration-200">Browse Resumes</a></li>
                <li><a href="#" className="text-gray-300 hover:text-ut-orange transition-colors duration-200">Hiring Solutions</a></li>
                <li><a href="#" className="text-gray-300 hover:text-ut-orange transition-colors duration-200">Pricing Plans</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-ut-orange transition-colors duration-200">Help Center</a></li>
                <li><a href="#" className="text-gray-300 hover:text-ut-orange transition-colors duration-200">Contact Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-ut-orange transition-colors duration-200">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-300 hover:text-ut-orange transition-colors duration-200">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2024 KajBD. All rights reserved. Made with ❤️ in Bangladesh.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
