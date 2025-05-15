import Link from "next/link"
import { BarChart3, FileText, Home } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="inline-block font-bold">Project Management System</span>
          </Link>
          <nav className="flex gap-6">
            <Link href="/" className="flex items-center text-sm font-medium text-muted-foreground">
              <Home className="mr-1 h-4 w-4" />
              Home
            </Link>
            <Link href="/projects" className="flex items-center text-sm font-medium text-muted-foreground">
              <FileText className="mr-1 h-4 w-4" />
              Projects
            </Link>
            <Link href="/dashboard" className="flex items-center text-sm font-medium text-muted-foreground">
              <BarChart3 className="mr-1 h-4 w-4" />
              Dashboard
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}
