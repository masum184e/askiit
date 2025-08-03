import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600" id="cta">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 animate-fade-in-up">
        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
          Ready to Transform Your Academic Journey?
        </h2>
        <p className="text-xl text-blue-100 mb-8">
          Join hundreds of NSTU students who are already benefiting from our
          comprehensive platform.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/chat"
            className="h-16 bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 font-[system-ui]"
          >
            Start Exploring Now
          </Link>
        </div>
      </div>
    </section>
  );
}