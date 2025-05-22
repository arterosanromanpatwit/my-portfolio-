interface SkillBadgeProps {
  name: string
}

export default function SkillBadge({ name }: SkillBadgeProps) {
  return (
    <div className="px-4 py-2 bg-accent rounded-full text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors cursor-default">
      {name}
    </div>
  )
}
