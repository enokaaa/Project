"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function DeleteProjectPage({
  params,
}: {
  params: { id: string }
}) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)
  const [project, setProject] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const projectId = Number.parseInt(params.id)

  // Fetch project data
  useState(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`/api/projects/${projectId}`)
        if (!response.ok) {
          throw new Error("Failed to fetch project")
        }
        const data = await response.json()
        setProject(data)
      } catch (error) {
        setError("Failed to load project details")
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchProject()
  })

  const handleDelete = async () => {
    setIsDeleting(true)

    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete project")
      }

      router.push("/projects")
      router.refresh()
    } catch (error) {
      console.error("Failed to delete project:", error)
      setIsDeleting(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex items-center space-x-4 mb-6">
          <Button variant="outline" size="icon" asChild>
            <Link href="/projects">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back to projects</span>
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Delete Project</h1>
        </div>
        <div className="flex justify-center py-10">Loading project details...</div>
      </div>
    )
  }

  if (error || !project) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex items-center space-x-4 mb-6">
          <Button variant="outline" size="icon" asChild>
            <Link href="/projects">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back to projects</span>
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Delete Project</h1>
        </div>
        <Card className="max-w-md mx-auto">
          <CardContent className="pt-6">
            <p className="text-center text-red-500">{error || "Project not found"}</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => router.push("/projects")}>
              Back to Projects
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center space-x-4 mb-6">
        <Button variant="outline" size="icon" asChild>
          <Link href={`/projects/${project.id}`}>
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to project</span>
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Delete Project</h1>
      </div>

      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Confirm Deletion</CardTitle>
          <CardDescription>Are you sure you want to delete this project? This action cannot be undone.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="font-medium">{project.title}</p>
          <p className="text-sm text-muted-foreground mt-1">PAAS Code: {project.paasCode || "N/A"}</p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => router.push(`/projects/${project.id}`)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Delete Project"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
