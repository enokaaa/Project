"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Edit, Eye, Trash2, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type Project = {
  id: number
  title: string
  approvalStatus: {
    name: string
  }
  leadOrgUnit: {
    name: string
  }
  countries: {
    country: {
      name: string
    }
  }[]
  pagValue: number | null
}

type PaginatedResponse = {
  projects: Project[]
  totalPages: number
}

export function ProjectsTable({ totalProjects }: { totalProjects: number }) {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [projects, setProjects] = useState<Project[]>([])
  const [totalPages, setTotalPages] = useState(Math.ceil(totalProjects / pageSize))
  const [loading, setLoading] = useState(false)

  const fetchProjects = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/projects?page=${currentPage}&pageSize=${pageSize}`)
      const data: PaginatedResponse = await response.json()
      setProjects(data.projects)
      setTotalPages(data.totalPages)
    } catch (error) {
      console.error("Failed to fetch projects:", error)
    } finally {
      setLoading(false)
    }
  }

  // Fetch projects when component mounts or when pagination changes
  useState(() => {
    fetchProjects()
  })

  const handlePageSizeChange = (value: string) => {
    setPageSize(Number(value))
    setCurrentPage(1) // Reset to first page when changing page size
    router.refresh()
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    router.refresh()
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Show</span>
          <Select value={pageSize.toString()} onValueChange={handlePageSizeChange}>
            <SelectTrigger className="w-[80px]">
              <SelectValue placeholder={pageSize.toString()} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value={totalProjects.toString()}>All</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm text-muted-foreground">entries</span>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Organization</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>PAG Value</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-10">
                  Loading...
                </TableCell>
              </TableRow>
            ) : projects.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-10">
                  No projects found
                </TableCell>
              </TableRow>
            ) : (
              projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>{project.id}</TableCell>
                  <TableCell className="font-medium">{project.title}</TableCell>
                  <TableCell>{project.countries.map((c) => c.country.name).join(", ")}</TableCell>
                  <TableCell>{project.leadOrgUnit.name}</TableCell>
                  <TableCell>{project.approvalStatus.name}</TableCell>
                  <TableCell>{project.pagValue ? `$${project.pagValue.toLocaleString()}` : "-"}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="icon" asChild>
                        <Link href={`/projects/${project.id}`}>
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View</span>
                        </Link>
                      </Button>
                      <Button variant="outline" size="icon" asChild>
                        <Link href={`/projects/${project.id}/edit`}>
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Link>
                      </Button>
                      <Button variant="outline" size="icon" asChild>
                        <Link href={`/projects/${project.id}/delete`}>
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Link>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {projects.length > 0 ? (currentPage - 1) * pageSize + 1 : 0} to{" "}
          {Math.min(currentPage * pageSize, totalProjects)} of {totalProjects} entries
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1 || loading}
          >
            <ChevronsLeft className="h-4 w-4" />
            <span className="sr-only">First page</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || loading}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous page</span>
          </Button>
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || loading}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next page</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages || loading}
          >
            <ChevronsRight className="h-4 w-4" />
            <span className="sr-only">Last page</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
