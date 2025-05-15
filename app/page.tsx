import Link from "next/link"
import { ArrowRight, BarChart3, Database, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col items-center text-center mb-10">
        <h1 className="text-4xl font-bold tracking-tight">Project Management System</h1>
        <p className="text-muted-foreground mt-4 max-w-2xl">
          A comprehensive system to manage projects, track progress, and visualize data across countries, organizations,
          and themes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Project Management
            </CardTitle>
            <CardDescription>Create, view, edit, and delete projects with ease</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Manage all your projects in one place with a user-friendly interface. Add new projects, update existing
              ones, or remove outdated entries.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/projects">
                View Projects <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              API Access
            </CardTitle>
            <CardDescription>Access project data through RESTful API endpoints</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Integrate with other systems using our comprehensive API. Get projects filtered by country, status, or
              retrieve all projects at once.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link href="/api-docs">
                API Documentation <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Dashboard
            </CardTitle>
            <CardDescription>Visualize project data with interactive charts</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Get insights into your projects with visualizations by country, organization unit, and theme. Make
              data-driven decisions with our analytics dashboard.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/dashboard">
                View Dashboard <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
