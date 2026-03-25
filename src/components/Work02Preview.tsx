import { PortfolioNavbar } from "@/components/work/work_02/PortfolioNavbar"
import { ProductTeaserCard } from "@/components/work/work_02/ProductTeaserCard"
import { BankingScaleHero } from "@/components/work/work_02/BankingScaleHero"
import { CaseStudiesCarousel } from "@/components/work/work_02/CaseStudiesCarousel"
import { IntegrationCarousel } from "@/components/work/work_02/IntegrationCarousel"
import { PricingSection } from "@/components/work/work_02/PricingSection"
import { FAQSection } from "@/components/work/work_02/FAQSection"
import { Footer } from "@/components/work/work_02/Footer"

export default function Page() {
  return (
    <>
      <PortfolioNavbar />
      <ProductTeaserCard />
      <BankingScaleHero />
      <CaseStudiesCarousel />
      <IntegrationCarousel />
      <PricingSection />
      <FAQSection />
      <Footer />
    </>
  )
}
