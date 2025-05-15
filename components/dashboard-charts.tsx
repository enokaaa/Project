"use client"

import { useState, useEffect } from "react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type ChartData = {
  name: string
  projects: number
  budget: number
}

export function DashboardCharts() {
  const [activeTab, setActiveTab] = useState("countries")
  const [countryData, setCountryData] = useState<ChartData[]>([])
  const [orgData, setOrgData] = useState<ChartData[]>([])
  const [themeData, setThemeData] = useState<ChartData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchChartData = async () => {
      setLoading(true)
      try {
        const response = await fetch("/api/dashboard/charts")
        if (!response.ok) {
          throw new Error("Failed to fetch chart data")
        }
        const data = await response.json()
        setCountryData(data.countryData || [])
        setOrgData(data.orgData || [])
        setThemeData(data.themeData || [])
      } catch (error) {
        console.error("Error fetching chart data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchChartData()
  }, [])

  // Colors for pie chart
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

  if (loading) {
    return <div className="py-10 text-center">Loading dashboard data...</div>
  }

  return (
    <Tabs defaultValue="countries" value={activeTab} onValueChange={setActiveTab}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold tracking-tight">Project Analytics</h2>
        <TabsList>
          <TabsTrigger value="countries">By Country</TabsTrigger>
          <TabsTrigger value="organizations">By Organization</TabsTrigger>
          <TabsTrigger value="themes">By Theme</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="countries" className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Projects by Country</CardTitle>
              <CardDescription>Number of projects in each country</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={countryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="projects" fill="#8884d8" name="Projects" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Budget Allocation by Country</CardTitle>
              <CardDescription>Total budget allocated to each country</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={countryData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="budget"
                  >
                    {countryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="organizations" className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Projects by Organization</CardTitle>
              <CardDescription>Number of projects led by each organization</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={orgData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="projects" fill="#00C49F" name="Projects" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Budget Allocation by Organization</CardTitle>
              <CardDescription>Total budget managed by each organization</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={orgData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="budget"
                  >
                    {orgData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="themes" className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Projects by Theme</CardTitle>
              <CardDescription>Number of projects in each theme</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={themeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="projects" fill="#FFBB28" name="Projects" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Budget Allocation by Theme</CardTitle>
              <CardDescription>Total budget allocated to each theme</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={themeData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="budget"
                  >
                    {themeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  )
}
