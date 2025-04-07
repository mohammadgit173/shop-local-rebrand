export default function SettingsPage() {
    return (
      <div className="px-4 py-8 space-y-6">
        <h1 className="text-2xl font-bold">Settings</h1>
  
        <div className="space-y-4">
          <button className="w-full text-left p-4 border rounded-lg">
            Change Theme
          </button>
          <button className="w-full text-left p-4 border rounded-lg">
            Log Out
          </button>
        </div>
      </div>
    );
  }
  