"use client"

import { useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield } from "lucide-react"

export default function SubmitStartupPage() {
  const [formData, setFormData] = useState({
    startupName: "",
    website: "",
    sector: "",
    location: "",
    foundedYear: "",
    employees: "",
    description: "",
    founderName: "",
    founderRole: "",
    founderEmail: "",
    founderPhone: "",
    founderBio: "",
    pitch: "",
    achievements: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-white">
      <Header currentPage="submit" />

      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-3xl font-bold text-gray-900">Submit Your Startup</h1>
         <p className="mx-auto max-w-2xl text-gray-600">
  Join Ethiopia&apos;s verified startup ecosystem. All submissions require Fayda ID verification and approval under
  the national Startup Law.
</p>

        </div>

        {/* Verification Alert */}
        <Alert className="mb-8 border-emerald-200 bg-emerald-50">
          <Shield className="h-4 w-4 text-emerald-600" />
          <AlertDescription className="text-emerald-800">
            <strong>Fayda ID Verification Required:</strong> You must complete Fayda ID verification before submitting
            your startup for review. This ensures all startups meet legal requirements.
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Startup Information</CardTitle>
                <CardDescription>Provide detailed information about your startup for review</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  {/* Basic Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="startupName">Startup Name *</Label>
                        <Input
                          id="startupName"
                          placeholder="EthioPay"
                          value={formData.startupName}
                          onChange={(e) => handleInputChange("startupName", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="website">Website</Label>
                        <Input
                          id="website"
                          type="url"
                          placeholder="https://yourstartu.com"
                          value={formData.website}
                          onChange={(e) => handleInputChange("website", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="sector">Sector *</Label>
                        <Select value={formData.sector} onValueChange={(value) => handleInputChange("sector", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select sector" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="fintech">FinTech</SelectItem>
                            <SelectItem value="agriculture">Agriculture</SelectItem>
                            <SelectItem value="education">Education</SelectItem>
                            <SelectItem value="healthcare">Healthcare</SelectItem>
                            <SelectItem value="energy">Clean Energy</SelectItem>
                            <SelectItem value="logistics">Logistics</SelectItem>
                            <SelectItem value="ecommerce">E-commerce</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location *</Label>
                        <Select
                          value={formData.location}
                          onValueChange={(value) => handleInputChange("location", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select location" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="addis-ababa">Addis Ababa</SelectItem>
                            <SelectItem value="bahir-dar">Bahir Dar</SelectItem>
                            <SelectItem value="mekelle">Mekelle</SelectItem>
                            <SelectItem value="hawassa">Hawassa</SelectItem>
                            <SelectItem value="dire-dawa">Dire Dawa</SelectItem>
                            <SelectItem value="adama">Adama</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Short Description *</Label>
                      <Textarea
                        id="description"
                        placeholder="Briefly describe what your startup does..."
                        rows={3}
                        value={formData.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* Founder Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Founder Information</h3>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="founderName">Full Name *</Label>
                        <Input
                          id="founderName"
                          placeholder="Meron Tadesse"
                          value={formData.founderName}
                          onChange={(e) => handleInputChange("founderName", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="founderRole">Role *</Label>
                        <Input
                          id="founderRole"
                          placeholder="CEO & Founder"
                          value={formData.founderRole}
                          onChange={(e) => handleInputChange("founderRole", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pitch">Detailed Pitch *</Label>
                      <Textarea
                        id="pitch"
                        placeholder="Provide a comprehensive description of your startup..."
                        rows={6}
                        value={formData.pitch}
                        onChange={(e) => handleInputChange("pitch", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* Legal Compliance */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Legal Compliance</h3>

                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="startup-law" />
                        <Label htmlFor="startup-law" className="text-sm">
  I confirm that my startup meets the requirements of Ethiopia&apos;s national Startup Law *
</Label>

                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="fayda-id" />
                        <Label htmlFor="fayda-id" className="text-sm">
                          I have completed Fayda ID verification *
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="terms" />
                        <Label htmlFor="terms" className="text-sm">
                          I agree to the{" "}
                          <Link href="#" className="text-emerald-600 hover:text-emerald-700">
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link href="#" className="text-emerald-600 hover:text-emerald-700">
                            Privacy Policy
                          </Link>{" "}
                          *
                        </Label>
                      </div>
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600" size="lg">
                    Submit for Review
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Review Process */}
            <Card>
              <CardHeader>
                <CardTitle>Review Process</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { step: 1, title: "Submission", desc: "Complete and submit your application" },
                  { step: 2, title: "Verification", desc: "Fayda ID and legal compliance check" },
                  { step: 3, title: "Review", desc: "Expert panel evaluates your startup" },
                  { step: 4, title: "Approval", desc: "Get listed in the directory" },
                ].map((item) => (
                  <div key={item.step} className="flex items-start space-x-3">
                    <div
                      className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white ${
                        item.step === 1 ? "bg-emerald-500" : "bg-gray-300"
                      }`}
                    >
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{item.title}</h4>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card>
              <CardHeader>
                <CardTitle>Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  {[
                    "Ethiopian-based startup",
                    "Fayda ID verification",
                    "Startup Law compliance",
                    "Innovative business model",
                    "Growth potential",
                  ].map((req, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
