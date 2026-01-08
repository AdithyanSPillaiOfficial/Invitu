import { Hero } from "@/components/HomeComponents/sections/Hero";
import { Features } from "@/components/HomeComponents/sections/Features";
import { Impact } from "@/components/HomeComponents/sections/Impact";
import { Testimonials } from "@/components/HomeComponents/sections/Testimonials";
import { Footer } from "@/components/HomeComponents/layout/Footer"; // Need to create this
import { Navbar } from "@/components/HomeComponents/layout/Navbar";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col" suppressContentEditableWarning>
      {/* Blocking script to avoid "Flash of Incorrect Theme" (FOUC). */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var savedTheme = localStorage.getItem('theme');
                  var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (savedTheme === 'dark' || (!savedTheme && systemDark)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      <Navbar />
      <Hero />
      <Features />
      <Impact />
      <Testimonials />
      <Footer />
    </main>
  );
}
