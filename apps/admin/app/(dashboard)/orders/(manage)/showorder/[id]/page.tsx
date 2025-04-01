"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Clock,
  MoveLeftIcon,
  MapPin,
  Package,
  Phone,
  Printer,
  ShoppingBag,
  Truck,
  User,
} from "lucide-react";

const Page = () => {
  // Sample order data - in a real application, this would come from an API or props
  const order = {
    id: "ORD-12345",
    date: "March 28, 2025",
    status: "Processing",
    customer: {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
    },
    shippingAddress: {
      street: "123 Main Street",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "United States",
    },
    billingAddress: {
      street: "123 Main Street",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "United States",
    },
    paymentMethod: "Credit Card (ending in 4242)",
    shippingMethod: "Standard Shipping",
    items: [
      {
        id: "ITEM-001",
        name: "Wireless Bluetooth Headphones",
        image: "/api/placeholder/80/80",
        price: 79.99,
        quantity: 1,
        total: 79.99,
      },
      {
        id: "ITEM-002",
        name: "Smartphone Case (Black)",
        image: "/api/placeholder/80/80",
        price: 24.99,
        quantity: 2,
        total: 49.98,
      },
      {
        id: "ITEM-003",
        name: "USB-C Fast Charging Cable",
        image: "/api/placeholder/80/80",
        price: 12.99,
        quantity: 3,
        total: 38.97,
      },
    ],
    subtotal: 168.94,
    shipping: 5.99,
    tax: 13.52,
    total: 188.45,
    timeline: [
      {
        status: "Order Placed",
        date: "March 28, 2025 - 10:23 AM",
        description: "Your order has been received and is being processed.",
      },
      {
        status: "Payment Confirmed",
        date: "March 28, 2025 - 10:25 AM",
        description: "Payment has been successfully processed.",
      },
      {
        status: "Processing",
        date: "March 28, 2025 - 11:30 AM",
        description: "Your order is being prepared for shipping.",
      },
    ],
  };

  // Function to get status badge color
  const getStatusColor = (status:string) => {
    const statusColors = {
      Pending: "bg-yellow-100 text-yellow-800",
      Processing: "bg-blue-100 text-blue-800",
      Shipped: "bg-purple-100 text-purple-800",
      Delivered: "bg-green-100 text-green-800",
      Cancelled: "bg-red-100 text-red-800",
    };
    return statusColors[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <Link href={"/orders"}>
        <span className=" flex flex-row gap-2 mb-3">
          <MoveLeftIcon />
          <span>Go Back</span>
        </span>
      </Link>

      {/* Order Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Order {order.id}</h1>
          <p className="text-gray-500 flex items-center mt-1">
            <Clock className="h-4 w-4 mr-1" />
            Placed on {order.date}
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
          <Badge
            className={getStatusColor(order.status) + " text-sm py-1 px-3"}
          >
            {order.status}
          </Badge>
          <Button variant="outline" size="sm" className="flex items-center">
            <Printer className="h-4 w-4 mr-1" /> Print Order
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Items */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="h-5 w-5 mr-2" /> Order Items
              </CardTitle>
              <CardDescription>
                {order.items.length}{" "}
                {order.items.length === 1 ? "item" : "items"} in this order
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Qty</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order.items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-10 w-10 rounded object-cover"
                          />
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-500">{item.id}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        ${item.price.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right">
                        {item.quantity}
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        ${item.total.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="mt-6 border-t pt-4">
                <div className="flex justify-between py-1">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-600">Shipping</span>
                  <span>${order.shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-600">Tax</span>
                  <span>${order.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-2 font-bold text-lg">
                  <span>Total</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Details Sidebar */}
        <div className="space-y-6">
          {/* Customer Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" /> Customer Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-500 mb-1">
                  Name
                </h4>
                <p>{order.customer.name}</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-500 mb-1">
                  Email
                </h4>
                <p>{order.customer.email}</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-500 mb-1">
                  Phone
                </h4>
                <p className="flex items-center">
                  <Phone className="h-4 w-4 mr-1" />
                  {order.customer.phone}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Truck className="h-5 w-5 mr-2" /> Shipping Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-500 mb-1">
                  Shipping Method
                </h4>
                <p>{order.shippingMethod}</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-500 mb-1">
                  Shipping Address
                </h4>
                <div className="flex">
                  <MapPin className="h-4 w-4 mr-1 mt-1 flex-shrink-0" />
                  <p>
                    {order.shippingAddress.street}
                    <br />
                    {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                    {order.shippingAddress.zip}
                    <br />
                    {order.shippingAddress.country}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      {/* Payment Information */}
      <div className="pt-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ShoppingBag className="h-5 w-5 mr-2" /> Payment Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-gray-500 mb-1">
                Payment Method
              </h4>
              <p>{order.paymentMethod}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-500 mb-1">
                Billing Address
              </h4>
              <div className="flex">
                <MapPin className="h-4 w-4 mr-1 mt-1 flex-shrink-0" />
                <p>
                  {order.billingAddress.street}
                  <br />
                  {order.billingAddress.city}, {order.billingAddress.state}{" "}
                  {order.billingAddress.zip}
                  <br />
                  {order.billingAddress.country}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Page;
