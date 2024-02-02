import { Card, CardContent } from "@/components/ui/card";
import { LinkSubmission } from "@prisma/client";
import { colorMap } from "./LyricCard";

interface LinkCardProps {
  data: LinkSubmission;
  color?: string;
  className?: string;
}
const LinkCard = ({ data, className, color = "default" }: LinkCardProps) => {
  const { link, dateCreated, linkText } = data;
  const domain = link.split("/")[2];
  return (
    <Card
      className={
        " rounded-lg border-gray-600" +
        " " +
        className +
        " " +
        colorMap[color]
      }
    >
      <CardContent className="p-4 flex flex-col gap-4">
        <a href={link} className="underline">
          {linkText} <span>({domain})</span>
        </a>
      </CardContent>
    </Card>
  );
};

export default LinkCard;
