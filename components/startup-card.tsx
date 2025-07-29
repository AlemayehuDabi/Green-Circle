import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users } from "lucide-react"
import type { Startup } from "@/types"
import Image from "next/image"


interface StartupCardProps {
  startup: Startup
}

export function StartupCard({ startup }: StartupCardProps) {
  return (
    <Card className="transition-shadow hover:shadow-lg">
      <CardContent className="p-6">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Image
  src={startup.logo || "/placeholder.svg"}
  alt={startup.name}
  width={48}
  height={48}
  className="rounded-lg"
/>

            <div>
              <h3 className="font-semibold text-gray-900">{startup.name}</h3>
              <div className="flex items-center space-x-1 text-sm text-gray-500">
                <MapPin className="h-3 w-3" />
                <span>{startup.location}</span>
              </div>
            </div>
          </div>
          {startup.verified && (
            <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
              Verified
            </Badge>
          )}
        </div>

        <Badge variant="outline" className="mb-3">
          {startup.sector}
        </Badge>

        <p className="mb-4 line-clamp-2 text-sm text-gray-600">{startup.description}</p>

        <div className="mb-4 flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-1">
            <Users className="h-3 w-3" />
            <span>{startup.employees}</span>
          </div>
          <span>Founded {startup.foundedYear}</span>
        </div>

        <Button asChild className="w-full bg-emerald-500 hover:bg-emerald-600">
          <Link href={`/startups/${startup.id}`}>View Details</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
