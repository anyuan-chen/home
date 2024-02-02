import { QuoteSubmission } from "@prisma/client";
import { colorMap } from "./LyricCard";
import { Card, CardContent } from "@/components/ui/card";

interface QuoteCardProps {
  data: QuoteSubmission;
  color?: string;
}
export default function QuoteCard({ data, color = "purple" }: QuoteCardProps) {
  const { content, author, dateCreated } = data;

  return (
    <Card
      className={"rounded-lg border-gray-600 " + " " + colorMap[color]}
    >
      <CardContent className="p-4 flex flex-col gap-4">
        <blockquote className="font-medium text-xl">{content}</blockquote>
        <div>{author}</div>
      </CardContent>
    </Card>
  );
}
