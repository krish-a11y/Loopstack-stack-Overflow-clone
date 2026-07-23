import HeroSection from "./components/HeroSection";
import LatestQuestions from "./components/LatestQuestions";
import TopContributers from "./components/TopContributers";

export default function Home() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(255,145,77,0.18),_transparent_35%),linear-gradient(135deg,_rgba(20,20,20,0.95),_rgba(8,8,8,1))] px-4 pb-24 pt-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <HeroSection />

        <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-orange-400">
                  Community feed
                </p>
                <h2 className="text-2xl font-semibold text-white">
                  Latest questions
                </h2>
              </div>
            </div>
            <LatestQuestions />
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.3em] text-orange-400">
              Top contributors
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-white">
              Rising voices
            </h2>
            <div className="mt-6">
              <TopContributers />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
