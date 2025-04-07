
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function UserProfileCard() {
  return (
    <Card className="border-none shadow-md">
      <CardContent className="flex flex-col items-center p-6 space-y-4">
        {/* Avatar */}
        <Avatar className="h-24 w-24 border-2 border-primary">
          <AvatarImage src="/assets/profile-placeholder.jpg" alt="User profile" />
          <AvatarFallback className="bg-muted">
            <User className="h-12 w-12 text-muted-foreground" />
          </AvatarFallback>
        </Avatar>

        {/* Name and Email */}
        <div className="text-center">
          <h1 className="text-xl font-semibold">John Doe</h1>
          <p className="text-muted-foreground text-sm">john.doe@example.com</p>
        </div>
      </CardContent>
    </Card>
  );
}
