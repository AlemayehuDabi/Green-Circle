// REMOVE THIS LINE: "use client"

import { notFound } from "next/navigation"
import { mockStartups } from "@/lib/data"
import Link from "next/link"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { MapPin, Users, Calendar, Globe, Mail, Phone, ArrowLeft, Heart, DollarSign, UserPlus } from "lucide-react"
import { ImageWithFallback } from "@/components/image-withfallback" // This is a Client Component

interface PageProps {
  params: { id: string }
}

export default async function StartupDetailPage({ params }: PageProps) {
  const { id } = params
  const startup = mockStartups.find((s) => s.id === Number.parseInt(id))

  if (!startup) notFound()

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Button asChild variant="ghost" className="mb-6 text-gray-700 hover:text-gray-900">
          <Link href="/startups">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Directory
          </Link>
        </Button>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <Card>
              <CardContent className="p-8">
                <div className="flex items-start space-x-6">
                  <ImageWithFallback
                    src={startup.logo || "/placeholder.svg"}
                    alt={startup.name}
                    width={80}
                    height={80}
                    className="h-20 w-20 rounded-xl"
                  />
                  <div className="flex-1">
                    <div className="mb-2 flex items-center space-x-3">
                      <h1 className="text-3xl font-bold text-gray-900">{startup.name}</h1>
                      {startup.verified && <Badge className="bg-emerald-100 text-emerald-700">Verified</Badge>}
                    </div>
                    <div className="mb-4 flex items-center space-x-4 text-gray-700 text-sm">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{startup.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{startup.employees} employees</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>Founded {startup.foundedYear}</span>
                      </div>
                    </div>
                    <Badge variant="outline" className="mb-4 text-gray-700">
                      {startup.sector}
                    </Badge>
                    <p className="text-gray-800 text-base leading-relaxed">{startup.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-gray-900">Company Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed text-gray-800 text-base">{startup.pitch}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-gray-900">Key Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {startup.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-center space-x-2">
                      <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                      <span className="text-gray-800 text-base">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-gray-900">Meet the Founders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {startup.founders.map((founder, i) => (
                    <div key={i} className="flex items-start space-x-4">
                      <ImageWithFallback
                        src={founder.image || "/placeholder.svg"}
                        alt={founder.name}
                        width={64}
                        height={64}
                        className="h-16 w-16 rounded-full"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-900">{founder.name}</h4>
                        <p className="mb-2 text-sm text-emerald-700">{founder.role}</p>
                        <p className="text-sm text-gray-800">{founder.bio}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-gray-900">Support This Startup</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-emerald-500 hover:bg-emerald-600">
                  <DollarSign className="mr-2 h-4 w-4" />
                  Invest
                </Button>
                <Button variant="outline" className="w-full bg-transparent text-gray-800 hover:bg-gray-100">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Become a Mentor
                </Button>
                <Button variant="outline" className="w-full bg-transparent text-gray-800 hover:bg-gray-100">
                  <Heart className="mr-2 h-4 w-4" />
                  Donate
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-gray-900">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {startup.website && (
                  <div className="flex items-center space-x-3">
                    <Globe className="h-4 w-4 text-gray-700" />
                    <Link href={startup.website} className="text-emerald-600 hover:text-emerald-700 text-base">
                      {startup.website}
                    </Link>
                  </div>
                )}
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-gray-700" />
                  <Link
                    href={`mailto:${startup.contact.email}`}
                    className="text-emerald-600 hover:text-emerald-700 text-base"
                  >
                    {startup.contact.email}
                  </Link>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-gray-700" />
                  <Link
                    href={`tel:${startup.contact.phone}`}
                    className="text-emerald-600 hover:text-emerald-700 text-base"
                  >
                    {startup.contact.phone}
                  </Link>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-gray-900">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-base">
                  <span className="text-gray-800">Sector</span>
                  <span className="font-medium text-gray-900">{startup.sector}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-base">
                  <span className="text-gray-800">Founded</span>
                  <span className="font-medium text-gray-900">{startup.foundedYear}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-base">
                  <span className="text-gray-800">Team Size</span>
                  <span className="font-medium text-gray-900">{startup.employees}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-base">
                  <span className="text-gray-800">Location</span>
                  <span className="font-medium text-gray-900">{startup.location}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
