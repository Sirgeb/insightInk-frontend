import Navbar from "@/components/navbar";
import SignupForm from "@/components/signup-form";

function Signup() {
  return (
    <main className="min-h-screen bg-black text-white px-4 sm:px-6 md:px-12 py-10">
      {/* Header */}
      <Navbar />

      {/* Signup Section */}
      <section className="flex items-center justify-center mt-16 md:mt-10">
        <SignupForm />
      </section>
    </main>
  );
}

export default Signup;
