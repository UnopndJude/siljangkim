import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import SearchSection from '@/components/SearchSection'
import HospitalGrid from '@/components/HospitalGrid'
import ReviewSection from '@/components/ReviewSection'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-soft">
      <Header />
      <main>
        <HeroSection />
        <SearchSection />
        <HospitalGrid />
        <ReviewSection />
      </main>
      <Footer />
    </div>
  )
}