export function UserProfileCard() {
    return (
      <div className="flex flex-col items-center bg-white p-6 rounded-xl shadow space-y-4">
        {/* Avatar */}
        <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-4xl">
          👤
        </div>
  
        {/* Name and Email */}
        <div className="text-center">
          <h1 className="text-xl font-semibold">John Doe</h1>
          <p className="text-gray-500 text-sm">john.doe@example.com</p>
        </div>
      </div>
    );
  }
  