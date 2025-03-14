import { HealthAssessment } from "./health-assessment"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary/20 p-4 md:p-8">
      <div className="mx-auto max-w-5xl">
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Programme Nutrition & Fitness Avancé</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Obtenez un plan personnalisé basé sur une analyse complète de votre profil, métabolisme et objectifs
          </p>
        </div>
        <HealthAssessment />
      </div>
    </main>
  )
}

