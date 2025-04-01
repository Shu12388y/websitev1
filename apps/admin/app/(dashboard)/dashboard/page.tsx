"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import {
  Users,
  ShoppingCart,
  PackageOpen,
  CreditCard,
  Activity,
  TrendingUp,
  DollarSign,
} from "lucide-react";

// Sample data - in a real application, this would come from an API
const data = {
  stats: {
    totalOrders: 1243,
    totalUsers: 4582,
    liveUsers: 342,
    totalInventory: 8654,
    totalProducts: 532,
    totalPayments: 1125,
    revenue: 124350,
  },
  revenueData: [
    { name: "Jan", total: 8400 },
    { name: "Feb", total: 7300 },
    { name: "Mar", total: 9200 },
    { name: "Apr", total: 10400 },
    { name: "May", total: 11700 },
    { name: "Jun", total: 12500 },
    { name: "Jul", total: 13200 },
  ],
  ordersData: [
    { name: "Jan", total: 123 },
    { name: "Feb", total: 98 },
    { name: "Mar", total: 142 },
    { name: "Apr", total: 156 },
    { name: "May", total: 189 },
    { name: "Jun", total: 204 },
    { name: "Jul", total: 231 },
  ],
};

const StatCard = ({ title, value, description, icon, className }) => {
  const Icon = icon;

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

const BusinessDashboard = () => {
  return (
    <div className="flex flex-col p-6 space-y-6 bg-background w-full relative">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <div className="h-2 w-2 rounded-full bg-green-500"></div>
          <span className="text-sm font-medium">System Online</span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <StatCard
            title="Total Orders"
            value={data.stats.totalOrders}
            description="Total orders placed"
            icon={ShoppingCart}
            className="bg-white"
          />
          <StatCard
            title="Total Users"
            value={data.stats.totalUsers}
            description="Registered users"
            icon={Users}
            className="bg-white"
          />
          <StatCard
            title="Live Users"
            value={data.stats.liveUsers}
            description="Currently online"
            icon={Activity}
            className="bg-white"
          />
          <StatCard
            title="Total Inventory"
            value={data.stats.totalInventory}
            description="Items in stock"
            icon={PackageOpen}
            className="bg-white"
          />
          <StatCard
            title="Total Products"
            value={data.stats.totalProducts}
            description="Unique products"
            icon={ShoppingCart}
            className="bg-white"
          />
          <StatCard
            title="Total Payments"
            value={data.stats.totalPayments}
            description="Completed transactions"
            icon={CreditCard}
            className="bg-white"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
              <CardDescription>Monthly revenue in dollars</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={data.revenueData}>
                  <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip formatter={(value) => [`$${value}`, "Revenue"]} />
                  <Bar dataKey="total" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Order Trends</CardTitle>
              <CardDescription>Monthly order count</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={data.ordersData}>
                  <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip formatter={(value) => [`${value}`, "Orders"]} />
                  <Bar dataKey="total" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BusinessDashboard;
