import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/api";
import { MapPin, DollarSign, Briefcase, Clock } from "lucide-react";

interface JobCardProps {
  job: any;
}

export default function JobCard({ job }: JobCardProps) {
  const [coverLetter, setCoverLetter] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const applyMutation = useMutation({
    mutationFn: async (data: { coverLetter: string }) => {
      const response = await apiRequest("POST", `/api/jobs/${job.id}/apply`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/my-applications"] });
      toast({
        title: "Application submitted!",
        description: "Your application has been sent to the employer.",
      });
      setDialogOpen(false);
      setCoverLetter("");
    },
    onError: (error: Error) => {
      toast({
        title: "Application failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleApply = () => {
    applyMutation.mutate({ coverLetter });
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "full-time": return "bg-green-100 text-green-800";
      case "part-time": return "bg-blue-100 text-blue-800";
      case "contract": return "bg-yellow-100 text-yellow-800";
      case "remote": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-oxford-blue rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">
                {job.company.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-rich-black">{job.title}</h3>
              <p className="text-text-secondary">{job.company}</p>
            </div>
          </div>
          <Badge className={getTypeColor(job.type)}>
            {job.type}
          </Badge>
        </div>
        
        <div className="mb-4 space-y-2">
          <div className="flex items-center text-text-secondary text-sm">
            <MapPin className="h-4 w-4 mr-2" />
            {job.location}
          </div>
          <div className="flex items-center text-text-secondary text-sm">
            <DollarSign className="h-4 w-4 mr-2" />
            {job.salary}
          </div>
          <div className="flex items-center text-text-secondary text-sm">
            <Briefcase className="h-4 w-4 mr-2" />
            {job.experience}
          </div>
        </div>
        
        <p className="text-gray-700 mb-4 line-clamp-3">{job.description}</p>
        
        {job.skills && job.skills.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {job.skills.slice(0, 3).map((skill: string, index: number) => (
              <Badge key={index} variant="secondary" className="bg-oxford-blue text-white">
                {skill}
              </Badge>
            ))}
            {job.skills.length > 3 && (
              <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                +{job.skills.length - 3} more
              </Badge>
            )}
          </div>
        )}
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-text-secondary flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            Posted {new Date(job.createdAt).toLocaleDateString()}
          </span>
          
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-ut-orange hover:bg-orange-600 text-white">
                Apply Now
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Apply for {job.title}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cover-letter">Cover Letter</Label>
                  <Textarea
                    id="cover-letter"
                    placeholder="Tell the employer why you're the perfect fit for this role..."
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    rows={5}
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
                    onClick={handleApply}
                    disabled={applyMutation.isPending || !coverLetter.trim()}
                    className="bg-ut-orange hover:bg-orange-600"
                  >
                    {applyMutation.isPending ? "Submitting..." : "Submit Application"}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
}
