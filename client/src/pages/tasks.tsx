import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import TaskCard from "@/components/task-card";
import { Skeleton } from "@/components/ui/skeleton";

const categories = [
  "All Tasks",
  "Graphics & Design",
  "Writing & Translation",
  "Programming & Tech",
  "Digital Marketing",
  "Business",
  "Music & Audio",
  "Video & Animation",
];

export default function Tasks() {
  const [selectedCategory, setSelectedCategory] = useState("");

  const { data: tasks, isLoading } = useQuery({
    queryKey: ["/api/tasks", { category: selectedCategory }],
  });

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-rich-black mb-4">Freelance Tasks</h1>
          <p className="text-lg text-text-secondary">Discover skilled freelancers or offer your services</p>
        </div>

        {/* Task Categories */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          {categories.map((category) => {
            const isActive = (category === "All Tasks" && !selectedCategory) || 
                           category.toLowerCase() === selectedCategory.toLowerCase();
            
            return (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category === "All Tasks" ? "" : category)}
                className={`px-6 py-3 rounded-full font-medium transition-colors duration-200 ${
                  isActive
                    ? "bg-ut-orange text-white hover:bg-orange-600"
                    : "bg-gray-200 text-rich-black hover:bg-gray-300"
                }`}
              >
                {category}
              </Button>
            );
          })}
        </div>

        {/* Task Listings */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl overflow-hidden">
                <Skeleton className="w-full h-48" />
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <Skeleton className="w-10 h-10 rounded-full mr-3" />
                    <div>
                      <Skeleton className="h-4 w-24 mb-1" />
                      <Skeleton className="h-3 w-32" />
                    </div>
                  </div>
                  <Skeleton className="h-5 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4 mb-4" />
                  <div className="flex justify-between items-center mb-4">
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : tasks && tasks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task: any) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-text-secondary text-lg mb-4">No tasks found in this category</div>
            <Button onClick={() => setSelectedCategory("")} variant="outline">
              View All Tasks
            </Button>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-oxford-blue to-rich-black text-white rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-4">Ready to Start Selling?</h2>
            <p className="text-lg mb-6">Join thousands of freelancers earning money on KajBD</p>
            <Button className="bg-ut-orange hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold">
              Start Selling
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
