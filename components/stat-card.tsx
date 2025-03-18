import type { LucideIcon } from "lucide-react"

interface StatCardProps {
  value: string
  label: string
  icon: LucideIcon
}

export default function StatCard({ value, label, icon: Icon }: StatCardProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="h-14 w-14 rounded-full bg-[#00FF66]/10 flex items-center justify-center">
        <Icon className="h-7 w-7 text-[#00FF66]" />
      </div>
      <div>
        <div className="text-2xl font-bold text-white">{value}</div>
        <div className="text-sm text-white/70">{label}</div>
      </div>
    </div>
  )
}

