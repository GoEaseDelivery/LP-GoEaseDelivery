import { Star } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  role: string;
  content: string;
}

export function TestimonialCard({ name, role, content }: TestimonialCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <Star className="w-5 h-5 text-yellow-400" />
        <Star className="w-5 h-5 text-yellow-400" />
        <Star className="w-5 h-5 text-yellow-400" />
        <Star className="w-5 h-5 text-yellow-400" />
        <Star className="w-5 h-5 text-yellow-400" />
      </div>
      <p className="text-gray-600 mb-4">{content}</p>
      <div>
        <p className="font-semibold text-gray-900">{name}</p>
        <p className="text-sm text-gray-600">{role}</p>
      </div>
    </div>
  );
}
