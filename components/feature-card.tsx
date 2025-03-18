import type { LucideIcon } from "lucide-react"

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
}

export default function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-[#001208] p-8 rounded-xl border border-[#00FF66]/10 hover:border-[#00FF66]/30 transition-all group shadow-lg">
      <div className="h-16 w-16 rounded-full bg-[#00FF66]/10 flex items-center justify-center mb-6 group-hover:bg-[#00FF66]/20 transition-colors">
        <Icon className="h-8 w-8 text-[#00FF66]" />
      </div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-white/70">{description}</p>
    </div>
  )
}

