'use client'
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { 
  AlertTriangle,
  CheckCircle2,
  Clock, 
  Home, 
  MapPin, 
  Package, 
  PackageCheck,
  PackageOpen, 
  Truck,
  ClipboardCheck,
  LocateFixed,
  Calendar,
  RefreshCw
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const Page = () => {
  // Sample order and logistics data
  const [order, setOrder] = useState({
    id: "ORD-12345",
    date: "2025-03-28T10:23:00",
    status: "In Transit",
    estimatedDelivery: "2025-04-03T14:00:00",
    customer: {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567"
    },
    shippingAddress: {
      street: "123 Main Street",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "United States"
    },
    items: [
      {
        id: "ITEM-001",
        name: "Wireless Bluetooth Headphones",
        quantity: 1,
      },
      {
        id: "ITEM-002",
        name: "Smartphone Case (Black)",
        quantity: 2,
      },
      {
        id: "ITEM-003",
        name: "USB-C Fast Charging Cable",
        quantity: 3,
      }
    ],
    logistics: {
      trackingNumber: "TRK-9876543210",
      carrier: "Express Logistics",
      currentLocation: "Chicago Distribution Center",
      coordinatesLat: "41.8781",
      coordinatesLng: "-87.6298",
      departedFrom: "Los Angeles Warehouse",
      departureTime: "2025-03-30T08:15:00",
      nextStop: "New York Distribution Center",
      estimatedArrivalAtNextStop: "2025-04-01T16:30:00",
      deliveryProgress: 65,
      weatherDelay: false,
      priority: "Standard",
      packageWeight: "2.4 kg",
      packageDimensions: "30 x 25 x 15 cm"
    },
    timeline: [
      {
        status: "Order Placed",
        location: null,
        date: "2025-03-28T10:23:00",
        description: "Your order has been received and is being processed.",
        completed: true
      },
      {
        status: "Payment Confirmed",
        location: null,
        date: "2025-03-28T10:25:00",
        description: "Payment has been successfully processed.",
        completed: true
      },
      {
        status: "Order Processed",
        location: "Los Angeles Warehouse",
        date: "2025-03-29T14:10:00",
        description: "Your order has been packaged and is ready for shipping.",
        completed: true
      },
      {
        status: "Shipped",
        location: "Los Angeles Warehouse",
        date: "2025-03-30T08:15:00",
        description: "Your order has been handed to the carrier.",
        completed: true
      },
      {
        status: "In Transit",
        location: "Chicago Distribution Center",
        date: "2025-03-31T11:42:00",
        description: "Your package is on its way to the next facility.",
        completed: true
      },
      {
        status: "Out for Delivery",
        location: "New York Distribution Center",
        date: null,
        description: "Your package is out for delivery.",
        completed: false
      },
      {
        status: "Delivered",
        location: "New York, NY",
        date: null,
        description: "Your package has been delivered.",
        completed: false
      }
    ]
  });

  // State for update status dialog
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newNotes, setNewNotes] = useState("");

  // Function to update order status
  const updateOrderStatus = () => {
    // Find the index of the current status in the timeline
    const currentStatusIndex = order.timeline.findIndex(
      event => event.status === order.status
    );
    
    // Find the index of the new status in the timeline
    const newStatusIndex = order.timeline.findIndex(
      event => event.status === newStatus
    );
    
    if (newStatusIndex > -1) {
      // Update the timeline
      const updatedTimeline = [...order.timeline];
      
      // Mark all steps up to and including the new status as complete
      for (let i = 0; i <= newStatusIndex; i++) {
        updatedTimeline[i].completed = true;
        if (i === newStatusIndex) {
          updatedTimeline[i].date = new Date().toISOString();
          updatedTimeline[i].location = newLocation || updatedTimeline[i].location;
          if (newNotes) {
            updatedTimeline[i].description = newNotes;
          }
        }
      }
      
      // Mark steps after the new status as incomplete
      for (let i = newStatusIndex + 1; i < updatedTimeline.length; i++) {
        updatedTimeline[i].completed = false;
        if (i > currentStatusIndex) {
          updatedTimeline[i].date = null;
        }
      }
      
      // Update logistics info based on the new status
      const updatedLogistics = { ...order.logistics };
      
      if (newStatus === "In Transit") {
        updatedLogistics.currentLocation = newLocation;
      } else if (newStatus === "Out for Delivery") {
        updatedLogistics.currentLocation = "En route to " + order.shippingAddress.city;
        updatedLogistics.deliveryProgress = 85;
      } else if (newStatus === "Delivered") {
        updatedLogistics.currentLocation = `${order.shippingAddress.city}, ${order.shippingAddress.state}`;
        updatedLogistics.deliveryProgress = 100;
        updatedLogistics.estimatedArrivalAtNextStop = null;
        updatedLogistics.nextStop = null;
      }
      
      // Update the order
      setOrder({
        ...order,
        status: newStatus,
        timeline: updatedTimeline,
        logistics: updatedLogistics
      });
    }
    
    // Close the dialog
    setIsDialogOpen(false);
    setNewStatus("");
    setNewLocation("");
    setNewNotes("");
  };

  // Function to format date
  const formatDate = (dateString) => {
    if (!dateString) return "Pending";
    const date = new Date(dateString);
    return format(date, "MMM d, yyyy - h:mm a");
  };
  
  // Function to get status color
  const getStatusColor = (status) => {
    const statusColors = {
      "Order Placed": "bg-purple-100 text-purple-800",
      "Payment Confirmed": "bg-blue-100 text-blue-800",
      "Order Processed": "bg-indigo-100 text-indigo-800",
      "Shipped": "bg-cyan-100 text-cyan-800",
      "In Transit": "bg-amber-100 text-amber-800",
      "Out for Delivery": "bg-orange-100 text-orange-800",
      "Delivered": "bg-green-100 text-green-800",
      "Delayed": "bg-red-100 text-red-800",
    };
    return statusColors[status] || "bg-gray-100 text-gray-800";
  };

  // Calculate the current progress step
  const currentTimelineIndex = order.timeline.findIndex(event => event.status === order.status);
  
  return (
    <div className="container mx-auto py-8 px-4">
      {/* Breadcrumbs */}
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">
              <Home className="h-4 w-4 mr-1" />
              Dashboard
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/logistics">Logistics</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>{order.id}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Order Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <Package className="mr-2 h-8 w-8" /> 
            Order {order.id}
          </h1>
          <p className="text-gray-500 mt-1">
            Placed on {formatDate(order.date)}
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Badge className={`${getStatusColor(order.status)} px-3 py-1`}>
            {order.status}
          </Badge>
        </div>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Order tracking details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tracking information */}
          <Card>
            <CardHeader className="bg-slate-50 border-b">
              <CardTitle className="flex items-center">
                <Truck className="h-5 w-5 mr-2" /> 
                Shipment Tracking
              </CardTitle>
              <CardDescription>
                Track your order's journey from warehouse to delivery
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:justify-between mb-6">
                <div className="mb-4 md:mb-0">
                  <h3 className="text-sm font-medium text-gray-500">Tracking Number</h3>
                  <p className="text-lg font-semibold">{order.logistics.trackingNumber}</p>
                  <p className="text-sm text-gray-500">
                    Carrier: {order.logistics.carrier}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Estimated Delivery</h3>
                  <p className="text-lg font-semibold">{formatDate(order.estimatedDelivery)}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    {order.logistics.deliveryProgress === 100 
                      ? "Delivered" 
                      : `Delivery progress: ${order.logistics.deliveryProgress}%`}
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mb-6">
                <Progress value={order.logistics.deliveryProgress} className="h-2" />
              </div>

              {/* Current location */}
              <div className="p-4 bg-blue-50 rounded-lg mb-6">
                <div className="flex items-start">
                  <LocateFixed className="h-5 w-5 text-blue-500 mt-1 mr-3" />
                  <div>
                    <h3 className="font-medium">Current Location</h3>
                    <p className="text-gray-700">{order.logistics.currentLocation}</p>
                    {order.logistics.nextStop && (
                      <div className="mt-2">
                        <span className="text-sm text-gray-500">Next Stop:</span>
                        <p className="text-gray-700">{order.logistics.nextStop}</p>
                        <p className="text-sm text-gray-500">
                          Estimated arrival: {formatDate(order.logistics.estimatedArrivalAtNextStop)}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Package information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium mb-2 flex items-center">
                    <PackageOpen className="h-4 w-4 mr-1" /> Package Information
                  </h3>
                  <div className="space-y-1 text-sm">
                    <p><span className="text-gray-500">Weight:</span> {order.logistics.packageWeight}</p>
                    <p><span className="text-gray-500">Dimensions:</span> {order.logistics.packageDimensions}</p>
                    <p><span className="text-gray-500">Priority:</span> {order.logistics.priority}</p>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium mb-2 flex items-center">
                    <MapPin className="h-4 w-4 mr-1" /> Delivery Address
                  </h3>
                  <div className="space-y-1 text-sm">
                    <p>{order.customer.name}</p>
                    <p>{order.shippingAddress.street}</p>
                    <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}</p>
                    <p>{order.shippingAddress.country}</p>
                  </div>
                </div>
              </div>
              
              {/* Weather delay warning */}
              {order.logistics.weatherDelay && (
                <div className="p-4 bg-yellow-50 border border-yellow-100 rounded-lg flex items-start">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-yellow-700">Potential Delay Warning</h3>
                    <p className="text-yellow-600 text-sm">
                      Weather conditions may cause a delay in delivery. We're monitoring the situation closely.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="bg-slate-50 border-t px-6 py-4">
              <Button className="ml-auto" variant="outline" onClick={() => setIsDialogOpen(true)}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Update Status
              </Button>
            </CardFooter>
          </Card>

          {/* Shipment Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2" /> 
                Shipment Timeline
              </CardTitle>
              <CardDescription>
                Complete history of your order's journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="relative border-l border-gray-200 ml-3 space-y-6 py-2">
                {order.timeline.map((event, index) => (
                  <li key={index} className="ml-6">
                    <span className={cn(
                      "absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 ring-8 ring-white",
                      event.completed 
                        ? "bg-green-100" 
                        : "bg-gray-100"
                    )}>
                      {event.completed ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      ) : (
                        <Clock className="h-4 w-4 text-gray-400" />
                      )}
                    </span>
                    <div className={cn(
                      "p-4 rounded-lg",
                      event.completed 
                        ? index === currentTimelineIndex 
                          ? "bg-green-50 border border-green-100" 
                          : "bg-white"
                        : "bg-gray-50"
                    )}>
                      <div className="flex justify-between items-center flex-wrap">
                        <h3 className={cn(
                          "font-semibold",
                          event.completed 
                            ? index === currentTimelineIndex 
                              ? "text-green-800" 
                              : "text-gray-900"
                            : "text-gray-500"
                        )}>
                          {event.status}
                        </h3>
                        <time className={cn(
                          "text-sm",
                          event.completed 
                            ? "text-gray-700" 
                            : "text-gray-400"
                        )}>
                          {formatDate(event.date)}
                        </time>
                      </div>
                      {event.location && (
                        <div className="flex items-center mt-1 text-sm text-gray-600">
                          <MapPin className="h-3 w-3 mr-1" />
                          {event.location}
                        </div>
                      )}
                      <p className={cn(
                        "mt-2 text-sm",
                        event.completed 
                          ? "text-gray-600" 
                          : "text-gray-400"
                      )}>
                        {event.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </div>

        {/* Right column - Order details */}
        <div className="space-y-6">
          {/* Order Summary */}
          <Card>
            <CardHeader className="bg-slate-50 border-b">
              <CardTitle className="flex items-center">
                <ClipboardCheck className="h-5 w-5 mr-2" /> 
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Customer</h3>
                  <p className="font-medium">{order.customer.name}</p>
                  <p className="text-sm text-gray-600">{order.customer.email}</p>
                  <p className="text-sm text-gray-600">{order.customer.phone}</p>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Items in this order</h3>
                  <ul className="space-y-2">
                    {order.items.map((item) => (
                      <li key={item.id} className="flex justify-between text-sm">
                        <span>{item.name}</span>
                        <span className="text-gray-500">x{item.quantity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Separator />
                
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-500">Total Items:</span>
                  <span>{order.items.reduce((sum, item) => sum + item.quantity, 0)}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-slate-50 border-t px-6 py-4 flex justify-between">
              <Button variant="ghost" size="sm">View Full Order</Button>
              <Button variant="outline" size="sm">
                <PackageCheck className="h-4 w-4 mr-2" />
                Mark as Complete
              </Button>
            </CardFooter>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start" variant="outline">
                <Truck className="h-4 w-4 mr-2" />
                Generate Shipping Label
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <MapPin className="h-4 w-4 mr-2" />
                View on Map
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Report an Issue
              </Button>
            </CardContent>
          </Card>

          {/* Delivery Notes */}
          <Card>
            <CardHeader>
              <CardTitle>Delivery Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Leave package at the front door. Customer has been notified about potential weather delays.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Update Status Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Update Order Status</DialogTitle>
            <DialogDescription>
              Update the current status and location of the order.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={newStatus} onValueChange={setNewStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select new status" />
                </SelectTrigger>
                <SelectContent>
                  {order.timeline.map((event) => (
                    <SelectItem key={event.status} value={event.status}
                      disabled={event.status === order.status}>
                      {event.status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Current Location</Label>
              <Input 
                id="location" 
                value={newLocation} 
                onChange={(e) => setNewLocation(e.target.value)}
                placeholder="Enter current location"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea 
                id="notes" 
                value={newNotes} 
                onChange={(e) => setNewNotes(e.target.value)}
                placeholder="Add additional information"
                rows={3}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" onClick={updateOrderStatus} disabled={!newStatus}>
              Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Page;