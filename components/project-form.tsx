"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"

// Define types for the reference data
type Country = { id: number; name: string }
type OrgUnit = { id: number; name: string }
type Theme = { id: number; name: string }
type ApprovalStatus = { id: number; name: string }
type Fund = { id: number; name: string }
type Donor = { id: number; name: string }

// Define the form schema
const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  paasCode: z.string().optional(),
  description: z.string().optional(),
  startDate: z.date(),
  endDate: z.date(),
  pagValue: z.coerce.number().optional(),
  totalExpenditure: z.coerce.number().optional(),
  totalContribution: z.coerce.number().optional(),
  totalPsc: z.coerce.number().optional(),
  approvalStatusId: z.coerce.number(),
  fundId: z.coerce.number().optional(),
  leadOrgUnitId: z.coerce.number(),
  countryIds: z.array(z.coerce.number()).min(1, {
    message: "Please select at least one country.",
  }),
  themeIds: z.array(z.coerce.number()).min(1, {
    message: "Please select at least one theme.",
  }),
  donorIds: z.array(z.coerce.number()).optional(),
})

type ProjectFormProps = {
  project?: any
  countries: Country[]
  orgUnits: OrgUnit[]
  themes: Theme[]
  approvalStatuses: ApprovalStatus[]
  funds: Fund[]
  donors: Donor[]
}

export function ProjectForm({
  project = null,
  countries,
  orgUnits,
  themes,
  approvalStatuses,
  funds,
  donors,
}: ProjectFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: project
      ? {
          title: project.title,
          paasCode: project.paasCode,
          description: project.description || "",
          startDate: new Date(project.startDate),
          endDate: new Date(project.endDate),
          pagValue: project.pagValue || 0,
          totalExpenditure: project.totalExpenditure || 0,
          totalContribution: project.totalContribution || 0,
          totalPsc: project.totalPsc || 0,
          approvalStatusId: project.approvalStatusId,
          fundId: project.fundId || undefined,
          leadOrgUnitId: project.leadOrgUnitId,
          countryIds: project.countries?.map((c: any) => c.countryId) || [],
          themeIds: project.themes?.map((t: any) => t.themeId) || [],
          donorIds: project.donors?.map((d: any) => d.donorId) || [],
        }
      : {
          title: "",
          paasCode: "",
          description: "",
          startDate: new Date(),
          endDate: new Date(),
          pagValue: 0,
          totalExpenditure: 0,
          totalContribution: 0,
          totalPsc: 0,
          approvalStatusId: approvalStatuses[0]?.id || 0,
          fundId: funds[0]?.id,
          leadOrgUnitId: orgUnits[0]?.id || 0,
          countryIds: [],
          themeIds: [],
          donorIds: [],
        },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    try {
      // API call to create or update project
      const response = await fetch("/api/projects", {
        method: project ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          id: project?.id,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to save project")
      }

      router.push("/projects")
      router.refresh()
    } catch (error) {
      console.error("Failed to save project:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-2xl">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter project title" {...field} />
              </FormControl>
              <FormDescription>The name of your project.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="paasCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>PAAS Code</FormLabel>
              <FormControl>
                <Input placeholder="Enter PAAS code" {...field} />
              </FormControl>
              <FormDescription>The PAAS code for the project.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter project description" className="min-h-[100px]" {...field} />
              </FormControl>
              <FormDescription>A detailed description of the project.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Start Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button variant={"outline"} className="w-full pl-3 text-left font-normal">
                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>End Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button variant={"outline"} className="w-full pl-3 text-left font-normal">
                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormField
            control={form.control}
            name="pagValue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>PAG Value</FormLabel>
                <FormControl>
                  <Input type="number" min="0" step="1000" {...field} />
                </FormControl>
                <FormDescription>The PAG value for the project.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="totalExpenditure"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total Expenditure</FormLabel>
                <FormControl>
                  <Input type="number" min="0" step="1000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="totalContribution"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total Contribution</FormLabel>
                <FormControl>
                  <Input type="number" min="0" step="1000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="totalPsc"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total PSC</FormLabel>
              <FormControl>
                <Input type="number" min="0" step="1000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormField
            control={form.control}
            name="approvalStatusId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Approval Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {approvalStatuses.map((status) => (
                      <SelectItem key={status.id} value={status.id.toString()}>
                        {status.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fundId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fund</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a fund" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {funds.map((fund) => (
                      <SelectItem key={fund.id} value={fund.id.toString()}>
                        {fund.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="leadOrgUnitId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lead Organization</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an organization" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {orgUnits.map((orgUnit) => (
                      <SelectItem key={orgUnit.id} value={orgUnit.id.toString()}>
                        {orgUnit.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="countryIds"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Countries</FormLabel>
              <FormDescription>Select all countries that apply to this project.</FormDescription>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                {countries.map((country) => (
                  <div key={country.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`country-${country.id}`}
                      checked={field.value?.includes(country.id)}
                      onCheckedChange={(checked) => {
                        const newValue = checked
                          ? [...field.value, country.id]
                          : field.value.filter((id) => id !== country.id)
                        field.onChange(newValue)
                      }}
                    />
                    <label htmlFor={`country-${country.id}`} className="text-sm font-medium">
                      {country.name}
                    </label>
                  </div>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="themeIds"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Themes</FormLabel>
              <FormDescription>Select all themes that apply to this project.</FormDescription>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                {themes.map((theme) => (
                  <div key={theme.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`theme-${theme.id}`}
                      checked={field.value?.includes(theme.id)}
                      onCheckedChange={(checked) => {
                        const newValue = checked
                          ? [...field.value, theme.id]
                          : field.value.filter((id) => id !== theme.id)
                        field.onChange(newValue)
                      }}
                    />
                    <label htmlFor={`theme-${theme.id}`} className="text-sm font-medium">
                      {theme.name}
                    </label>
                  </div>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="donorIds"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Donors</FormLabel>
              <FormDescription>Select all donors that apply to this project.</FormDescription>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                {donors.map((donor) => (
                  <div key={donor.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`donor-${donor.id}`}
                      checked={field.value?.includes(donor.id)}
                      onCheckedChange={(checked) => {
                        const newValue = checked
                          ? [...field.value, donor.id]
                          : field.value.filter((id) => id !== donor.id)
                        field.onChange(newValue)
                      }}
                    />
                    <label htmlFor={`donor-${donor.id}`} className="text-sm font-medium">
                      {donor.name}
                    </label>
                  </div>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={() => router.push("/projects")}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Project"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
