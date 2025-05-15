import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    // Get countries with their projects
    const countries = await prisma.country.findMany({
      include: {
        projects: {
          include: {
            project: {
              select: {
                pagValue: true,
              },
            },
          },
        },
      },
    })

    // Get org units with their projects
    const orgUnits = await prisma.orgUnit.findMany({
      include: {
        projects: {
          select: {
            pagValue: true,
          },
        },
      },
    })

    // Get themes with their projects
    const themes = await prisma.theme.findMany({
      include: {
        projects: {
          include: {
            project: {
              select: {
                pagValue: true,
              },
            },
          },
        },
      },
    })

    // Format data for charts
    const countryData = countries.map((country) => {
      const totalBudget = country.projects.reduce((sum, pc) => sum + (pc.project.pagValue?.toNumber() || 0), 0)

      return {
        name: country.name,
        projects: country.projects.length,
        budget: totalBudget,
      }
    })

    const orgData = orgUnits.map((org) => {
      const totalBudget = org.projects.reduce((sum, project) => sum + (project.pagValue?.toNumber() || 0), 0)

      return {
        name: org.name,
        projects: org.projects.length,
        budget: totalBudget,
      }
    })

    const themeData = themes.map((theme) => {
      const totalBudget = theme.projects.reduce((sum, pt) => sum + (pt.project.pagValue?.toNumber() || 0), 0)

      return {
        name: theme.name,
        projects: theme.projects.length,
        budget: totalBudget,
      }
    })

    return NextResponse.json({
      countryData,
      orgData,
      themeData,
    })
  } catch (error) {
    console.error("Error fetching chart data:", error)
    return NextResponse.json({ error: "Failed to fetch chart data" }, { status: 500 })
  }
}
