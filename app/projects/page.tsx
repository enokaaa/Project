import Link from "next/link"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProjectsTable } from "@/components/projects-table"
import prisma from "@/lib/prisma"

export const dynamic = "force-dynamic"

export default async function ProjectsPage() {
  const projectCount = await prisma.project.count()

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
        <Button asChild>
          <Link href="/projects/new">
            <Plus className="mr-2 h-4 w-4" /> Add Project
          </Link>
        </Button>
      </div>

      <ProjectsTable totalProjects={projectCount} />
    </div>
  )
}
