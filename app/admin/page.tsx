"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Eye, Check, X, Search } from "lucide-react"
import { mockSubmissions } from "@/lib/data"
import type { SubmissionStatus } from "@/types"

export default function AdminPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sectorFilter, setSectorFilter] = useState("all")

  const getStatusBadge = (status: SubmissionStatus["status"]) => {
    const statusConfig: Record<SubmissionStatus["status"], { variant: "default" | "secondary" | "destructive"; label: string; className: string }> = {
      pending: { variant: "secondary", label: "Pending", className: "" },
      under_review: { variant: "default", label: "Under Review", className: "bg-blue-100 text-blue-700" },
      approved: { variant: "default", label: "Approved", className: "bg-emerald-100 text-emerald-700" },
      rejected: { variant: "destructive", label: "Rejected", className: "" },
    }

    const config = statusConfig[status]
    return (
      <Badge variant={config.variant} className={config.className}>
        {config.label}
      </Badge>
    )
  }

  const filteredSubmissions = mockSubmissions.filter((submission) => {
    const matchesSearch =
      submission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.founder.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || submission.status === statusFilter
    const matchesSector = sectorFilter === "all" || submission.sector.toLowerCase() === sectorFilter

    return matchesSearch && matchesStatus && matchesSector
  })

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">Admin Review Panel</h1>
          <p className="text-gray-600">Review and manage startup submissions for Ethiopia Startup directory</p>
        </div>

        {/* Stats Cards */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-4">
          {[
            { value: "12", label: "Pending Review", color: "text-gray-900" },
            { value: "8", label: "Under Review", color: "text-blue-600" },
            { value: "150", label: "Approved", color: "text-emerald-600" },
            { value: "25", label: "Rejected", color: "text-red-600" },
          ].map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                <Input
                  placeholder="Search submissions..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="under_review">Under Review</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sectorFilter} onValueChange={setSectorFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="All Sectors" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sectors</SelectItem>
                  <SelectItem value="fintech">FinTech</SelectItem>
                  <SelectItem value="agriculture">Agriculture</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Submissions Table */}
        <Card>
          <CardHeader>
            <CardTitle>Startup Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Startup Name</TableHead>
                  <TableHead>Founder</TableHead>
                  <TableHead>Sector</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Fayda ID</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubmissions.map((submission) => (
                  <TableRow key={submission.id}>
                    <TableCell className="font-medium">{submission.name}</TableCell>
                    <TableCell>{submission.founder}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{submission.sector}</Badge>
                    </TableCell>
                    <TableCell>{submission.location}</TableCell>
                    <TableCell>{submission.submittedDate}</TableCell>
                    <TableCell>
                      {submission.fayda_verified ? (
                        <Badge className="bg-emerald-100 text-emerald-700">Verified</Badge>
                      ) : (
                        <Badge variant="destructive">Pending</Badge>
                      )}
                    </TableCell>
                    <TableCell>{getStatusBadge(submission.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600">
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="destructive">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
