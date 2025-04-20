import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
}

const FeatureCard = ({
  title,
  description,
  icon: Icon,
  className,
}: FeatureCardProps) => {
  return (
    <div
      className={cn("bg-white rounded-xl p-6 shadow-md hover-scale", className)}
    >
      <div className="w-12 h-12 rounded-full bg-PMHS-purple/10 flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-PMHS-purple" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default FeatureCard;
