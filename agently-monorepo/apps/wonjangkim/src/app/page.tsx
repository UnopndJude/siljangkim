import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import SearchSection from '@/components/SearchSection'
import DoctorGrid from '@/components/DoctorGrid'
import ReviewSection from '@/components/ReviewSection'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-soft">
      <Header />
      <main>
        <HeroSection />
        <SearchSection />
        <DoctorGrid />
        <ReviewSection />
      </main>
      <Footer />
    </div>
  )
}