import Hero from "../components/common/Hero";
import TrustedCompanies from "../components/common/TrustedCompanies";
import Features from "../components/common/Features";
import HowItWorks from "../components/common/HowItWorks";
import CTA from "../components/common/CTA";

export default function Home() {
  return (
    <>
      <Hero />

      <TrustedCompanies />

      <div id="features">
        <Features />
      </div>

      <div id="workflow">
        <HowItWorks />
      </div>

      <div id="assistant">
        <CTA />
      </div>

      <div id="pricing">
        {/* Add pricing section later */}
      </div>
    </>
  );
}