import Hero from '../components/Hero.jsx'
import SummaryCards from '../components/SummaryCards.jsx'
import FeatureCards from '../components/FeatureCards.jsx'
import EncryptionSimulator from '../components/EncryptionSimulator.jsx'
import InfoCheckCard from '../components/InfoCheckCard.jsx'
import CIATriad from '../components/CIATriad.jsx'
import PrivacyPanel from '../components/PrivacyPanel.jsx'

export default function Dashboard() {
  return (
    <div className="container page">
      <Hero />
      <SummaryCards />
      <FeatureCards />
      <EncryptionSimulator />
      <InfoCheckCard />
      <CIATriad />
      <PrivacyPanel />
    </div>
  )
}
