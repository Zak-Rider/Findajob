import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { MapPin, DollarSign, Clock, Star } from "lucide-react";

export default function Home() {
  const [, setLocation] = useLocation();

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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-oxford-blue to-rich-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Find Your Next <span className="text-ut-orange">Opportunity</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300">
              Discover jobs across Bangladesh or offer your skills as freelance tasks
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-ut-orange hover:bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold"
                onClick={() => setLocation("/jobs")}
              >
                Browse Jobs
              </Button>
              <Button 
                variant="outline"
                className="border-2 border-ut-orange text-ut-orange hover:bg-ut-orange hover:text-white px-8 py-4 rounded-lg text-lg font-semibold"
                onClick={() => setLocation("/tasks")}
              >
                Explore Tasks
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-4xl font-bold text-oxford-blue mb-2">1000+</h3>
              <p className="text-text-secondary text-lg">Active Jobs</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-oxford-blue mb-2">500+</h3>
              <p className="text-text-secondary text-lg">Freelance Tasks</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-oxford-blue mb-2">5000+</h3>
              <p className="text-text-secondary text-lg">Happy Users</p>
            </div>
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

      {/* Featured Jobs */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-rich-black mb-4">
              Featured Jobs
            </h2>
            <p className="text-lg text-text-secondary">
              Discover the latest job opportunities across Bangladesh
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredJobs.map((job: any) => (
              <Card key={job.id} className="hover:shadow-lg transition-shadow duration-200">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-rich-black mb-1">{job.title}</h3>
                      <p className="text-text-secondary">{job.company}</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">{job.type}</Badge>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-text-secondary text-sm">
                      <MapPin className="h-4 w-4 mr-2" />
                      {job.location}
                    </div>
                    <div className="flex items-center text-text-secondary text-sm">
                      <DollarSign className="h-4 w-4 mr-2" />
                      {job.salary}
                    </div>
                  </div>
                  
                  <p className="text-gray-700 text-sm line-clamp-2 mb-4">{job.description}</p>
                  
                  <Button 
                    className="w-full bg-ut-orange hover:bg-orange-600 text-white"
                    onClick={() => setLocation("/jobs")}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <Button 
              onClick={() => setLocation("/jobs")}
              className="bg-oxford-blue hover:bg-blue-800 text-white px-8 py-3 rounded-lg font-semibold"
            >
              View All Jobs
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Tasks */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-rich-black mb-4">
              Popular Tasks
            </h2>
            <p className="text-lg text-text-secondary">
              Find skilled freelancers for your projects
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredTasks.map((task: any) => (
              <Card key={task.id} className="hover:shadow-lg transition-shadow duration-200 overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-oxford-blue to-rich-black flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-4xl mb-2">🎨</div>
                    <div className="text-sm opacity-80">{task.category}</div>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-rich-black mb-2 line-clamp-2">
                    {task.title}
                  </h3>
                  
                  <p className="text-text-secondary text-sm mb-4 line-clamp-2">
                    {task.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-ut-orange font-bold text-lg">
                      From ৳{task.price.toLocaleString()}
                    </span>
                    <span className="text-sm text-text-secondary flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {task.deliveryTime} days
                    </span>
                  </div>
                  
                  <div className="flex items-center mb-4">
                    <div className="flex items-center mr-2">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    </div>
                    <span className="text-sm text-text-secondary">(4.9)</span>
                  </div>
                  
                  <Button 
                    className="w-full bg-ut-orange hover:bg-orange-600 text-white"
                    onClick={() => setLocation("/tasks")}
                  >
                    View Task
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <Button 
              onClick={() => setLocation("/tasks")}
              className="bg-oxford-blue hover:bg-blue-800 text-white px-8 py-3 rounded-lg font-semibold"
            >
              Explore All Tasks
            </Button>
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-16 bg-gradient-to-br from-oxford-blue to-rich-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Dashboards</h2>
            <p className="text-xl text-gray-300">Manage your jobs and tasks efficiently</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Job Seeker Dashboard */}
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-ut-orange">Job Seeker Dashboard</h3>
              <div className="space-y-4">
                <div className="bg-white bg-opacity-20 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">Applications Sent</span>
                    <span className="text-ut-orange font-bold">Track Progress</span>
                  </div>
                  <div className="bg-white bg-opacity-30 rounded-full h-2">
                    <div className="bg-ut-orange h-2 rounded-full w-3/4"></div>
                  </div>
                </div>
                <div className="bg-white bg-opacity-20 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">Interview Schedule</span>
                    <span className="text-ut-orange font-bold">Manage</span>
                  </div>
                  <div className="bg-white bg-opacity-30 rounded-full h-2">
                    <div className="bg-ut-orange h-2 rounded-full w-1/4"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Freelancer Dashboard */}
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-ut-orange">Freelancer Dashboard</h3>
              <div className="space-y-4">
                <div className="bg-white bg-opacity-20 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">Active Orders</span>
                    <span className="text-ut-orange font-bold">Manage</span>
                  </div>
                  <div className="bg-white bg-opacity-30 rounded-full h-2">
                    <div className="bg-ut-orange h-2 rounded-full w-1/2"></div>
                  </div>
                </div>
                <div className="bg-white bg-opacity-20 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">Monthly Earnings</span>
                    <span className="text-ut-orange font-bold">Track Income</span>
                  </div>
                  <div className="bg-white bg-opacity-30 rounded-full h-2">
                    <div className="bg-ut-orange h-2 rounded-full w-4/5"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Button 
              className="bg-ut-orange hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold"
              onClick={() => setLocation("/dashboard")}
            >
              Access Dashboard
            </Button>
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
