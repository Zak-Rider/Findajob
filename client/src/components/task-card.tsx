import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/api";
import { Star, Clock, User } from "lucide-react";

interface TaskCardProps {
  task: any;
}

export default function TaskCard({ task }: TaskCardProps) {
  const [requirements, setRequirements] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const orderMutation = useMutation({
    mutationFn: async (data: { requirements: string }) => {
      const response = await apiRequest("POST", `/api/tasks/${task.id}/order`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/my-orders"] });
      toast({
        title: "Order placed!",
        description: "Your order has been sent to the freelancer.",
      });
      setDialogOpen(false);
      setRequirements("");
    },
    onError: (error: Error) => {
      toast({
        title: "Order failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleOrder = () => {
    orderMutation.mutate({ requirements });
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 overflow-hidden">
      <div className="aspect-video bg-gradient-to-br from-oxford-blue to-rich-black flex items-center justify-center">
        <div className="text-white text-center">
          <div className="text-4xl mb-2">🎨</div>
          <div className="text-sm opacity-80">{task.category}</div>
        </div>
      </div>
      
      <CardContent className="p-6">
        <div className="flex items-center mb-3">
          <Avatar className="w-10 h-10 mr-3">
            <AvatarFallback className="bg-ut-orange text-white">
              {task.freelancer?.fullName?.charAt(0)?.toUpperCase() || "F"}
            </AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-semibold text-rich-black">
              {task.freelancer?.fullName || "Freelancer"}
            </h4>
            <div className="flex items-center">
              <div className="flex items-center mr-2">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
              </div>
              <span className="text-sm text-text-secondary">(4.9) 127 reviews</span>
            </div>
          </div>
        </div>
        
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
            {task.deliveryTime} days delivery
          </span>
        </div>
        
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full bg-ut-orange hover:bg-orange-600 text-white">
              Order Now
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Order: {task.title}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="bg-light-gray p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">Total Price:</span>
                  <span className="text-ut-orange font-bold text-lg">
                    ৳{task.price.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm text-text-secondary">
                  <span>Delivery Time:</span>
                  <span>{task.deliveryTime} days</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="requirements">Project Requirements</Label>
                <Textarea
                  id="requirements"
                  placeholder="Describe your project requirements in detail..."
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  rows={4}
                />
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleOrder}
                  disabled={orderMutation.isPending || !requirements.trim()}
                  className="bg-ut-orange hover:bg-orange-600"
                >
                  {orderMutation.isPending ? "Placing Order..." : "Place Order"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
