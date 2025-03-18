import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface BrandCardProps {
  name: string
  logo: string
  description: string
  category: string
}

export default function BrandCard({ name, logo, description, category }: BrandCardProps) {
  return (
    <Card className="bg-[#001208] border-[#00FF66]/10 overflow-hidden hover:border-[#00FF66]/30 transition-all group shadow-lg">
      <CardContent className="p-8 flex flex-col items-center text-center">
        <div className="h-28 w-28 relative mb-6 group-hover:scale-105 transition-transform">
          <Image src={logo || "/placeholder.svg"} alt={name} fill className="object-contain" />
        </div>
        <Badge variant="outline" className="mb-4 bg-[#00FF66]/10 text-[#00FF66] border-[#00FF66]/20 px-3 py-1">
          {category}
        </Badge>
        <h3 className="text-xl font-bold text-white mb-3">{name}</h3>
        <p className="text-white/70">{description}</p>
      </CardContent>
    </Card>
  )
}

