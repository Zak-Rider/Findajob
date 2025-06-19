import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocation } from "wouter";
import { getQueryFn } from "@/lib/queryClient";

export default function Dashboard() {
  const [, setLocation] = useLocation();
  
  const { data: user } = useQuery({
    queryKey: ["/api/auth/me"],
    queryFn: getQueryFn({ on401: "returnNull" }),
  });

  const { data: applications = [] } = useQuery({
    queryKey: ["/api/my-applications"],
    enabled: !!user && (user.role === "job_seeker"),
  });

  const { data: myJobs = [] } = useQuery({
    queryKey: ["/api/my-jobs"],
    enabled: !!user && (user.role === "employer"),
  });

  const { data: myTasks = [] } = useQuery({
    queryKey: ["/api/my-tasks"],
    enabled: !!user && (user.role === "freelancer"),
  });

  const { data: myOrders = [] } = useQuery({
    queryKey: ["/api/my-orders"],
    enabled: !!user,
  });

  const { data: mySales = [] } = useQuery({
    queryKey: ["/api/my-sales"],
    enabled: !!user && (user.role === "freelancer"),
  });

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="pt-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Please Sign In</h2>
            <p className="text-text-secondary mb-6">You need to be logged in to access your dashboard.</p>
            <Button onClick={() => setLocation("/auth")} className="bg-ut-orange hover:bg-orange-600">
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "accepted": case "in_progress": return "bg-blue-100 text-blue-800";
      case "completed": return "bg-green-100 text-green-800";
      case "rejected": case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-rich-black mb-2">Dashboard</h1>
          <p className="text-text-secondary">Welcome back, {user.fullName}!</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            {user.role === "job_seeker" && <TabsTrigger value="applications">Applications</TabsTrigger>}
            {user.role === "employer" && <TabsTrigger value="jobs">My Jobs</TabsTrigger>}
            {user.role === "freelancer" && (
              <>
                <TabsTrigger value="tasks">My Tasks</TabsTrigger>
                <TabsTrigger value="sales">Sales</TabsTrigger>
              </>
            )}
            <TabsTrigger value="orders">Orders</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {user.role === "job_seeker" && (
                <>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm font-medium">Applications Sent</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-oxford-blue">{applications.length}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm font-medium">Pending Applications</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-ut-orange">
                        {applications.filter((app: any) => app.status === "pending").length}
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
              
              {user.role === "employer" && (
                <>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-oxford-blue">
                        {myJobs.filter((job: any) => job.isActive).length}
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm font-medium">Total Jobs Posted</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-ut-orange">{myJobs.length}</div>
                    </CardContent>
                  </Card>
                </>
              )}
              
              {user.role === "freelancer" && (
                <>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm font-medium">Active Tasks</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-oxford-blue">
                        {myTasks.filter((task: any) => task.isActive).length}
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-ut-orange">{mySales.length}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm font-medium">Completed Orders</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-600">
                        {mySales.filter((order: any) => order.status === "completed").length}
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Orders Placed</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-oxford-blue">{myOrders.length}</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {user.role === "job_seeker" && (
            <TabsContent value="applications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>My Applications</CardTitle>
                </CardHeader>
                <CardContent>
                  {applications.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-text-secondary mb-4">You haven't applied to any jobs yet.</p>
                      <Button onClick={() => setLocation("/jobs")} className="bg-ut-orange hover:bg-orange-600">
                        Browse Jobs
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {applications.map((application: any) => (
                        <div key={application.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-semibold">{application.job?.title}</h3>
                              <p className="text-text-secondary">{application.job?.company}</p>
                            </div>
                            <Badge className={getStatusColor(application.status)}>
                              {application.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-text-secondary">
                            Applied {new Date(application.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {user.role === "employer" && (
            <TabsContent value="jobs" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>My Job Posts</CardTitle>
                </CardHeader>
                <CardContent>
                  {myJobs.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-text-secondary mb-4">You haven't posted any jobs yet.</p>
                      <Button className="bg-ut-orange hover:bg-orange-600">
                        Post a Job
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {myJobs.map((job: any) => (
                        <div key={job.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-semibold">{job.title}</h3>
                              <p className="text-text-secondary">{job.location}</p>
                            </div>
                            <Badge className={job.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                              {job.isActive ? "Active" : "Inactive"}
                            </Badge>
                          </div>
                          <p className="text-sm text-text-secondary">
                            Posted {new Date(job.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {user.role === "freelancer" && (
            <>
              <TabsContent value="tasks" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>My Tasks</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {myTasks.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-text-secondary mb-4">You haven't created any tasks yet.</p>
                        <Button className="bg-ut-orange hover:bg-orange-600">
                          Create a Task
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {myTasks.map((task: any) => (
                          <div key={task.id} className="border rounded-lg p-4">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="font-semibold">{task.title}</h3>
                                <p className="text-text-secondary">৳{task.price}</p>
                              </div>
                              <Badge className={task.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                                {task.isActive ? "Active" : "Inactive"}
                              </Badge>
                            </div>
                            <p className="text-sm text-text-secondary">
                              Created {new Date(task.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="sales" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>My Sales</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {mySales.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-text-secondary">No orders received yet.</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {mySales.map((order: any) => (
                          <div key={order.id} className="border rounded-lg p-4">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="font-semibold">{order.task?.title}</h3>
                                <p className="text-text-secondary">Buyer: {order.buyer?.fullName}</p>
                              </div>
                              <Badge className={getStatusColor(order.status)}>
                                {order.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-text-secondary">
                              Ordered {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </>
          )}

          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>My Orders</CardTitle>
              </CardHeader>
              <CardContent>
                {myOrders.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-text-secondary mb-4">You haven't placed any orders yet.</p>
                    <Button onClick={() => setLocation("/tasks")} className="bg-ut-orange hover:bg-orange-600">
                      Browse Tasks
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {myOrders.map((order: any) => (
                      <div key={order.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold">{order.task?.title}</h3>
                            <p className="text-text-secondary">Seller: {order.freelancer?.fullName}</p>
                          </div>
                          <Badge className={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-text-secondary">
                          Ordered {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
