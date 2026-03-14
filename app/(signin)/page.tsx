import LoginForm from "@/components/login-form";
import Navbar from "@/components/navbar";

export default function SignIn() {
  return (
    <main className="min-h-screen bg-black text-white px-4 sm:px-6 md:px-12 py-10">
      {/* Header */}
      <Navbar />

      {/* Login Section */}
      <section className="flex items-center justify-center mt-16 md:mt-20">
        <LoginForm />
      </section>
    </main>
  );
}
