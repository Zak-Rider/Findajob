import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { getQueryFn, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [location, setLocation] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: user } = useQuery({
    queryKey: ["/api/auth/me"],
    queryFn: getQueryFn({ on401: "returnNull" }),
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/auth/logout");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/auth/me"] });
      toast({
        title: "Logged out",
        description: "You have been logged out successfully.",
      });
      setLocation("/");
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/jobs", label: "Jobs" },
    { href: "/tasks", label: "Tasks" },
  ];

  return (
    <nav className="bg-oxford-blue text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-ut-orange">KajBD</h1>
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`hover:bg-ut-orange hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      location === link.href ? "bg-ut-orange" : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6 space-x-4">
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    className="hover:bg-ut-orange hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    Dashboard
                  </Link>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-ut-orange text-white">
                            {user.fullName.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                      <DropdownMenuItem disabled>
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">{user.fullName}</p>
                          <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setLocation("/dashboard")}>
                        Dashboard
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleLogout}>
                        Log out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    onClick={() => setLocation("/auth")}
                    className="text-white hover:bg-ut-orange hover:text-white"
                  >
                    Sign In
                  </Button>
                  <Button
                    onClick={() => setLocation("/auth")}
                    className="bg-ut-orange hover:bg-orange-600 text-white"
                  >
                    Join Now
                  </Button>
                </>
              )}
            </div>
          </div>
          
          <div className="md:hidden">
            <Button
              variant="ghost"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white hover:text-ut-orange"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-rich-black">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`hover:bg-ut-orange text-white block px-3 py-2 rounded-md text-base font-medium ${
                  location === link.href ? "bg-ut-orange" : ""
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="hover:bg-ut-orange text-white block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="hover:bg-ut-orange text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium"
                >
                  Log out
                </button>
              </>
            ) : (
              <div className="pt-4 pb-3 border-t border-gray-700">
                <Button
                  onClick={() => {
                    setLocation("/auth");
                    setMobileMenuOpen(false);
                  }}
                  className="bg-ut-orange text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium mb-2"
                >
                  Sign In
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setLocation("/auth");
                    setMobileMenuOpen(false);
                  }}
                  className="border border-ut-orange text-ut-orange block w-full text-left px-3 py-2 rounded-md text-base font-medium"
                >
                  Join Now
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
