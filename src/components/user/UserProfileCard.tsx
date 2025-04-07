
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User as UserIcon } from "lucide-react"; // Renamed to avoid conflict
import { Card, CardContent } from "@/components/ui/card";
import { useUser } from "@/contexts/UserContext";

export function UserProfileCard() {
  const { user } = useUser();

  return (
    <Card className="border-none shadow-md">
      <CardContent className="flex flex-col items-center p-6 space-y-4">
        {/* Avatar */}
        <Avatar className="h-24 w-24 border-2 border-primary">
          <AvatarImage
            src={user?.avatar_url || "/assets/profile-placeholder.jpg"}
            alt="User profile"
          />
          <AvatarFallback className="bg-muted">
            <UserIcon className="h-12 w-12 text-muted-foreground" />
          </AvatarFallback>
        </Avatar>

        {/* Name and Email */}
        <div className="text-center">
          <h1 className="text-xl font-semibold">
            {user?.full_name || "Anonymous"}
          </h1>
          <p className="text-muted-foreground text-sm">
            {user?.email || "No email available"}
          </p>
          {user?.phone && (
            <p className="text-muted-foreground text-sm mt-1">
              {user.phone}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
