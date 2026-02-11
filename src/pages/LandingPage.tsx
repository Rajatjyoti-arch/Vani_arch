import { DeviceRevealSection } from "@/components/landing/DeviceRevealSection";
import { ScrollytellingSection } from "@/components/landing/ScrollytellingSection";

const LandingPage = () => {
  return (
    <div className="bg-background text-foreground font-sans selection:bg-accent/20">
      <DeviceRevealSection />
      <ScrollytellingSection />
    </div>
  );
};

export default LandingPage;
