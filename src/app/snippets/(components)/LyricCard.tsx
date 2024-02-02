import { Card, CardContent } from "@/components/ui/card";
import { LyricSubmissionWithSongData } from "../api/route";
import moment from "moment";

interface LyricCardProps {
  data: LyricSubmissionWithSongData;
  color?: string;
}
export const colorMap: Record<string, string> = {
  green: "bg-accent-green",
  purple: "bg-accent-purple",
  default: "bg-accent",
};
const LyricCard = ({ data, color = "green" }: LyricCardProps) => {
  const content = data.content;
  const name = data.song.name;
  const artist = data.song.SpotifyRelationship[0].SpotifyArtist.name;
  const image_url =
    data.song.SpotifyRelationship[0].SpotifyAlbum.SpotifyImage[0].url;
  const albumName = data.song.SpotifyRelationship[0].SpotifyAlbum.name;
  return (
    <Card className={"rounded-lg border-gray-600" + " " + colorMap[color]}>
      <CardContent className="p-4 flex flex-col gap-4 relative">
        <blockquote className="text-xl font-regular">
          &quot;{content}&quot;
        </blockquote>
        <div className="flex items-center gap-16">
          <div className="flex items-center gap-3">
            <img
              src={image_url}
              alt={albumName || ""}
              className="h-14 w-14 rounded-lg"
            />
            <div className="ml-2">
              <p className="text-md font-medium">{artist}</p>
              <p className="">{name}</p>
            </div>
          </div>
          <div className="ml-auto self-end text-background-superdark text-sm">
            sent {moment(data.dateCreated).fromNow()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LyricCard;
