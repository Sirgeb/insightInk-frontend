import ProfileSection from "@/components/profile-section";
import Navbar from "@/components/navbar";

function Profile() {
  return (
    <main className="min-h-screen bg-black text-white px-4 sm:px-6 md:px-12 py-10">
      {/* Header */}
      <Navbar />

      <ProfileSection />
    </main>
  );
}

export default Profile;
