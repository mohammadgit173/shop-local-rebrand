export default function EditProfilePage() {
    return (
      <div className="flex flex-col items-center px-4 py-8 space-y-6">
        <h1 className="text-2xl font-bold">Edit Profile</h1>
  
        <form className="w-full max-w-sm space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full p-3 border rounded-lg"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded-lg"
          />
          <button
            type="submit"
            className="w-full bg-black text-white p-3 rounded-lg"
          >
            Save Changes
          </button>
        </form>
      </div>
    );
  }
  