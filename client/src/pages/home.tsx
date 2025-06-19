import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "wouter";

export default function Home() {
  const [, setLocation] = useLocation();

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
