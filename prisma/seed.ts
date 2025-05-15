import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  // Clear existing data
  await prisma.projectDonor.deleteMany()
  await prisma.projectTheme.deleteMany()
  await prisma.projectCountry.deleteMany()
  await prisma.project.deleteMany()
  await prisma.donor.deleteMany()
  await prisma.theme.deleteMany()
  await prisma.country.deleteMany()
  await prisma.orgUnit.deleteMany()
  await prisma.approvalStatus.deleteMany()
  await prisma.fund.deleteMany()

  // Create approval statuses
  const approvedStatus = await prisma.approvalStatus.create({
    data: {
      name: "Approved",
      description: "Project has been approved",
    },
  })

  // Create funds
  const fnoFund = await prisma.fund.create({
    data: {
      name: "FNO",
      code: "FNO",
    },
  })

  const fneFund = await prisma.fund.create({
    data: {
      name: "FNE",
      code: "FNE",
    },
  })

  // Create countries
  const globalCountry = await prisma.country.create({
    data: {
      name: "GLOBAL",
      code: "GLO",
    },
  })

  const kenyaCountry = await prisma.country.create({
    data: {
      name: "Kenya",
      code: "KE",
    },
  })

  // Create org units
  const urbanEconomyOrgUnit = await prisma.orgUnit.create({
    data: {
      name: "Urban Economy",
      department: "Economy",
    },
  })

  const externalRelationsOrgUnit = await prisma.orgUnit.create({
    data: {
      name: "External Relations",
      department: "Relations",
    },
  })

  // Create themes
  const urbanEconomyTheme = await prisma.theme.create({
    data: {
      name: "Urban Economy",
      description: "Urban Economy related projects",
    },
  })

  const managementTheme = await prisma.theme.create({
    data: {
      name: "Management",
      description: "Management related projects",
    },
  })

  // Create donors
  const donors = [
    "BASF Stiftung",
    "PM of Norway to the United Nations",
    "The Palestinian Ministry of Public Works and Housing",
    "GROUP OF SPONSORS",
  ]

  const createdDonors = await Promise.all(
    donors.map((name) =>
      prisma.donor.create({
        data: { name },
      }),
    ),
  )

  // Create projects
  const project1 = await prisma.project.create({
    data: {
      title: "FSGLO10S05:Youth Empowerment for Urban Development",
      paasCode: "H139",
      approvalStatusId: approvedStatus.id,
      fundId: fnoFund.id,
      pagValue: 4218607,
      startDate: new Date("2012-01-01"),
      endDate: new Date("2013-12-31"),
      leadOrgUnitId: urbanEconomyOrgUnit.id,
      totalExpenditure: 4439757,
      totalContribution: 4329257,
      totalPsc: 316548,
    },
  })

  // Link project 1 to countries, themes, and donors
  await prisma.projectCountry.create({
    data: {
      projectId: project1.id,
      countryId: globalCountry.id,
    },
  })

  await prisma.projectTheme.create({
    data: {
      projectId: project1.id,
      themeId: urbanEconomyTheme.id,
    },
  })

  // Link project 1 to donors
  for (const donor of createdDonors) {
    await prisma.projectDonor.create({
      data: {
        projectId: project1.id,
        donorId: donor.id,
      },
    })
  }

  // Create project 2
  const project2 = await prisma.project.create({
    data: {
      title: "FDGLO11F05: Preparations for the 23rd Session of the Governing Council",
      paasCode: "A119",
      approvalStatusId: approvedStatus.id,
      fundId: fneFund.id,
      pagValue: 51549,
      startDate: new Date("2011-01-01"),
      endDate: new Date("2011-12-31"),
      leadOrgUnitId: externalRelationsOrgUnit.id,
      totalExpenditure: 51549,
      totalContribution: 0,
      totalPsc: 0,
    },
  })

  // Link project 2 to countries and themes
  await prisma.projectCountry.create({
    data: {
      projectId: project2.id,
      countryId: kenyaCountry.id,
    },
  })

  await prisma.projectTheme.create({
    data: {
      projectId: project2.id,
      themeId: managementTheme.id,
    },
  })

  console.log("Seed data created successfully")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
