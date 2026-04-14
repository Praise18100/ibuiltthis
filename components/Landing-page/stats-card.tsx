import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react"

export default function StatsCard(
  {
    icon: Icon, value, label, hasborder,
  }: {
    icon: LucideIcon;
    value: string;
    label: string;
    hasborder?: boolean;
  }) {
    return (
      <div className={cn("space-y-2", hasborder && "border-x border-muted/50")}>
        <div className="flex item-center gap-2">
          <Icon className="size-5 text-primary/70" />
          <p className="text-3xl font-bold">{value}</p>
        </div>
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
    )
}