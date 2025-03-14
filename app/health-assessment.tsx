"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { Scale, Ruler, Target, ChevronRight, ChevronLeft, BarChart3, Calendar, Utensils, Dumbbell } from "lucide-react"
import { NutritionPlan } from "./nutrition-plan"
import { WorkoutPlan } from "./workout-plan"
import { ProgressTracker } from "./progress-tracker"
import { HealthMetrics } from "./health-metrics"

// Types
type FormData = {
  weight: string
  height: string
  age: string
  gender: string
  activityLevel: string
  goal: string
  bodyFat: string
  sleepHours: string
  stressLevel: string
  dietaryPreference: string
  medicalConditions: string[]
  fitnessLevel: string
  weightHistory: string
}

type Results = {
  bmi: number
  bmr: number
  tdee: number
  macros: {
    protein: number
    carbs: number
    fat: number
  }
  waterIntake: number
  idealWeight: {
    min: number
    max: number
  }
  bodyFatCategory: string
  recommendation: string
  calorieAdjustment: number
}

export function HealthAssessment() {
  const [step, setStep] = useState(1)
  const [progress, setProgress] = useState(0)
  const [activeTab, setActiveTab] = useState("results")
  const [formData, setFormData] = useState<FormData>({
    weight: "",
    height: "",
    age: "",
    gender: "male",
    activityLevel: "moderate",
    goal: "maintain",
    bodyFat: "",
    sleepHours: "7",
    stressLevel: "medium",
    dietaryPreference: "balanced",
    medicalConditions: [],
    fitnessLevel: "intermediate",
    weightHistory: "stable",
  })
  const [results, setResults] = useState<Results | null>(null)
  const [userHistory, setUserHistory] = useState<{ date: string; weight: number }[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Récupérer les données sauvegardées au chargement
  useEffect(() => {
    const savedData = localStorage.getItem("healthData")
    const savedHistory = localStorage.getItem("weightHistory")

    if (savedData) {
      try {
        setFormData(JSON.parse(savedData))
      } catch (e) {
        console.error("Erreur lors du chargement des données:", e)
      }
    }

    if (savedHistory) {
      try {
        setUserHistory(JSON.parse(savedHistory))
      } catch (e) {
        console.error("Erreur lors du chargement de l'historique:", e)
      }
    }
  }, [])

  // Mettre à jour la progression
  useEffect(() => {
    setProgress((step / 5) * 100)
  }, [step])

  // Sauvegarder les données
  const saveData = () => {
    localStorage.setItem("healthData", JSON.stringify(formData))

    if (results && formData.weight) {
      const today = new Date().toISOString().split("T")[0]
      const newHistory = [...userHistory]

      // Vérifier si une entrée existe déjà pour aujourd'hui
      const todayIndex = newHistory.findIndex((entry) => entry.date === today)

      if (todayIndex >= 0) {
        newHistory[todayIndex].weight = Number.parseFloat(formData.weight)
      } else {
        newHistory.push({
          date: today,
          weight: Number.parseFloat(formData.weight),
        })
      }

      setUserHistory(newHistory)
      localStorage.setItem("weightHistory", JSON.stringify(newHistory))
    }
  }
  // csdcsdcsd
  const calculateResults = () => {
    setIsLoading(true)

    // Simuler un calcul complexe
    setTimeout(() => {
      // Calculer l'IMC
      const heightInM = Number(formData.height) / 100
      const bmi = Number(formData.weight) / (heightInM * heightInM)

      // Calculer le métabolisme de base (BMR) avec la formule de Mifflin-St Jeor
      let bmr
      if (formData.gender === "male") {
        bmr = 10 * Number(formData.weight) + 6.25 * Number(formData.height) - 5 * Number(formData.age) + 5
      } else {
        bmr = 10 * Number(formData.weight) + 6.25 * Number(formData.height) - 5 * Number(formData.age) - 161
      }

      // Facteurs d'activité
      const activityFactors = {
        sedentary: 1.2,
        light: 1.375,
        moderate: 1.55,
        active: 1.725,
        veryActive: 1.9,
      }

      // Calculer les dépenses énergétiques totales (TDEE)
      const tdee = bmr * activityFactors[formData.activityLevel as keyof typeof activityFactors]

      // Ajustement calorique selon l'objectif
      let calorieAdjustment = 0
      switch (formData.goal) {
        case "lose":
          calorieAdjustment = -500 // Déficit pour perdre ~0.5kg/semaine
          break
        case "gain":
          calorieAdjustment = 500 // Surplus pour gagner ~0.5kg/semaine
          break
        default:
          calorieAdjustment = 0 // Maintien
      }

      // Calculer les macronutriments
      const adjustedCalories = tdee + calorieAdjustment
      let proteinRatio, carbRatio, fatRatio

      switch (formData.dietaryPreference) {
        case "lowCarb":
          proteinRatio = 0.3 // 30% des calories
          fatRatio = 0.5 // 50% des calories
          carbRatio = 0.2 // 20% des calories
          break
        case "highProtein":
          proteinRatio = 0.4 // 40% des calories
          carbRatio = 0.3 // 30% des calories
          fatRatio = 0.3 // 30% des calories
          break
        case "vegetarian":
          proteinRatio = 0.25 // 25% des calories
          carbRatio = 0.55 // 55% des calories
          fatRatio = 0.2 // 20% des calories
          break
        default: // balanced
          proteinRatio = 0.3 // 30% des calories
          carbRatio = 0.45 // 45% des calories
          fatRatio = 0.25 // 25% des calories
      }

      const macros = {
        protein: Math.round((adjustedCalories * proteinRatio) / 4), // 4 calories par gramme de protéine
        carbs: Math.round((adjustedCalories * carbRatio) / 4), // 4 calories par gramme de glucide
        fat: Math.round((adjustedCalories * fatRatio) / 9), // 9 calories par gramme de lipide
      }

      // Calculer l'apport en eau recommandé (ml)
      const waterIntake = Math.round(Number(formData.weight) * 33)

      // Calculer le poids idéal (formule de Hamwi)
      let idealWeightBase
      if (formData.gender === "male") {
        idealWeightBase = 48 + (2.7 * (Number(formData.height) - 152.4)) / 2.54
      } else {
        idealWeightBase = 45.5 + (2.2 * (Number(formData.height) - 152.4)) / 2.54
      }

      const idealWeight = {
        min: Math.round(idealWeightBase * 0.9),
        max: Math.round(idealWeightBase * 1.1),
      }

      // Déterminer la catégorie de pourcentage de graisse corporelle
      let bodyFatCategory = ""
      const bodyFat = Number(formData.bodyFat)

      if (formData.gender === "male") {
        if (bodyFat < 6) bodyFatCategory = "Essentiel"
        else if (bodyFat < 14) bodyFatCategory = "Athlétique"
        else if (bodyFat < 18) bodyFatCategory = "Fitness"
        else if (bodyFat < 25) bodyFatCategory = "Acceptable"
        else bodyFatCategory = "Obésité"
      } else {
        if (bodyFat < 14) bodyFatCategory = "Essentiel"
        else if (bodyFat < 21) bodyFatCategory = "Athlétique"
        else if (bodyFat < 25) bodyFatCategory = "Fitness"
        else if (bodyFat < 32) bodyFatCategory = "Acceptable"
        else bodyFatCategory = "Obésité"
      }

      // Générer une recommandation personnalisée
      let recommendation = ""

      // Facteurs qui influencent la recommandation
      const highStress = formData.stressLevel === "high"
      const poorSleep = Number(formData.sleepHours) < 6
      const historyOfWeightFluctuation = formData.weightHistory === "fluctuating"

      if (bmi < 18.5) {
        recommendation = `Programme de prise de masse progressive avec focus sur les protéines de qualité et les glucides complexes. ${highStress ? "Intégrez des techniques de gestion du stress pour optimiser la récupération. " : ""}${poorSleep ? "Améliorez votre sommeil pour favoriser la récupération musculaire. " : ""}Exercices de musculation recommandés 3-4 fois par semaine avec intensité modérée.`
      } else if (bmi < 25) {
        recommendation = `Programme de maintien équilibré avec un mix d'exercices cardio et musculation. ${historyOfWeightFluctuation ? "Stabilisez votre alimentation avec des repas réguliers. " : ""}${highStress ? "Intégrez des exercices de relaxation comme le yoga. " : ""}Maintenez une activité physique régulière de 150-200 minutes par semaine.`
      } else if (bmi < 30) {
        recommendation = `Programme de perte de poids progressive avec déficit calorique modéré de 500 kcal/jour. ${poorSleep ? "Améliorez la qualité de votre sommeil pour optimiser la perte de graisse. " : ""}Commencez par 30 minutes d'activité cardio 3 fois par semaine et augmentez progressivement.`
      } else {
        recommendation = `Programme de perte de poids santé avec suivi médical recommandé. Commencez par de la marche quotidienne et des exercices à faible impact. ${highStress ? "La gestion du stress est prioritaire pour réduire les hormones de stress. " : ""}${poorSleep ? "Améliorez votre sommeil qui est crucial pour votre métabolisme. " : ""}Visez une perte de 0.5-1kg par semaine.`
      }

      setResults({
        bmi: Math.round(bmi * 10) / 10,
        bmr: Math.round(bmr),
        tdee: Math.round(tdee),
        macros,
        waterIntake,
        idealWeight,
        bodyFatCategory,
        recommendation,
        calorieAdjustment,
      })

      saveData()
      setIsLoading(false)
    }, 1500)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step < 5) {
      setStep(step + 1)
    } else {
      calculateResults()
      setStep(6)
    }
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleMultiSelectChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => {
      const currentValues = prev[field] as string[]
      if (currentValues.includes(value)) {
        return { ...prev, [field]: currentValues.filter((v) => v !== value) }
      } else {
        return { ...prev, [field]: [...currentValues, value] }
      }
    })
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Mesures physiques</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="weight">Poids (kg)</Label>
                <div className="relative">
                  <Scale className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="weight"
                    type="number"
                    placeholder="70"
                    className="pl-9"
                    value={formData.weight}
                    onChange={(e) => handleInputChange("weight", e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="height">Taille (cm)</Label>
                <div className="relative">
                  <Ruler className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="height"
                    type="number"
                    placeholder="175"
                    className="pl-9"
                    value={formData.height}
                    onChange={(e) => handleInputChange("height", e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bodyFat">Pourcentage de graisse corporelle (si connu)</Label>
                <Input
                  id="bodyFat"
                  type="number"
                  placeholder="15"
                  value={formData.bodyFat}
                  onChange={(e) => handleInputChange("bodyFat", e.target.value)}
                />
                <p className="text-xs text-muted-foreground">Laissez vide si inconnu</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="weightHistory">Historique de poids</Label>
                <Select
                  value={formData.weightHistory}
                  onValueChange={(value) => handleInputChange("weightHistory", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez une option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="stable">Stable depuis longtemps</SelectItem>
                    <SelectItem value="recentLoss">Perte de poids récente</SelectItem>
                    <SelectItem value="recentGain">Prise de poids récente</SelectItem>
                    <SelectItem value="fluctuating">Fluctuant (effet yoyo)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )
      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Informations personnelles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="age">Âge</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="25"
                  value={formData.age}
                  onChange={(e) => handleInputChange("age", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Genre</Label>
                <RadioGroup
                  value={formData.gender}
                  onValueChange={(value) => handleInputChange("gender", value)}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Homme</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Femme</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-2">
                <Label htmlFor="sleepHours">Heures de sommeil par nuit</Label>
                <div className="pt-6">
                  <Slider
                    id="sleepHours"
                    min={4}
                    max={10}
                    step={0.5}
                    value={[Number.parseFloat(formData.sleepHours)]}
                    onValueChange={(value) => handleInputChange("sleepHours", value[0].toString())}
                  />
                  <div className="flex justify-between mt-2">
                    <span className="text-xs">4h</span>
                    <span className="text-sm font-medium">{formData.sleepHours}h</span>
                    <span className="text-xs">10h</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="stressLevel">Niveau de stress</Label>
                <Select value={formData.stressLevel} onValueChange={(value) => handleInputChange("stressLevel", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez une option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Faible - Rarement stressé</SelectItem>
                    <SelectItem value="medium">Moyen - Occasionnellement stressé</SelectItem>
                    <SelectItem value="high">Élevé - Fréquemment stressé</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )
      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Mode de vie et activité</h3>
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <Label>Niveau d'activité quotidienne</Label>
                <Select
                  value={formData.activityLevel}
                  onValueChange={(value) => handleInputChange("activityLevel", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez votre niveau d'activité" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedentary">Sédentaire (peu ou pas d'exercice, travail de bureau)</SelectItem>
                    <SelectItem value="light">Légèrement actif (exercice léger 1-3 fois/semaine)</SelectItem>
                    <SelectItem value="moderate">Modérément actif (exercice modéré 3-5 fois/semaine)</SelectItem>
                    <SelectItem value="active">Très actif (exercice intense 6-7 fois/semaine)</SelectItem>
                    <SelectItem value="veryActive">
                      Extrêmement actif (exercice très intense, travail physique)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Niveau de fitness actuel</Label>
                <Select
                  value={formData.fitnessLevel}
                  onValueChange={(value) => handleInputChange("fitnessLevel", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez votre niveau" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Débutant - Peu ou pas d'expérience en fitness</SelectItem>
                    <SelectItem value="intermediate">
                      Intermédiaire - Pratique régulière depuis quelques mois
                    </SelectItem>
                    <SelectItem value="advanced">Avancé - Pratique régulière depuis plus d'un an</SelectItem>
                    <SelectItem value="athlete">Athlète - Niveau compétitif ou professionnel</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )
      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Préférences alimentaires</h3>
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <Label>Type d'alimentation préféré</Label>
                <Select
                  value={formData.dietaryPreference}
                  onValueChange={(value) => handleInputChange("dietaryPreference", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez votre préférence" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="balanced">Équilibrée - Répartition classique des macronutriments</SelectItem>
                    <SelectItem value="lowCarb">Faible en glucides - Plus de protéines et graisses</SelectItem>
                    <SelectItem value="highProtein">Riche en protéines - Pour développement musculaire</SelectItem>
                    <SelectItem value="vegetarian">Végétarienne - Sans viande</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Conditions médicales (sélectionnez toutes celles applicables)</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                  {[
                    "Diabète",
                    "Hypertension",
                    "Cholestérol élevé",
                    "Intolérance au gluten",
                    "Intolérance au lactose",
                  ].map((condition) => (
                    <div key={condition} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={condition}
                        checked={formData.medicalConditions.includes(condition)}
                        onChange={() => handleMultiSelectChange("medicalConditions", condition)}
                        className="rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <Label htmlFor={condition}>{condition}</Label>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Ces informations nous aident à adapter vos recommandations nutritionnelles
                </p>
              </div>
            </div>
          </div>
        )
      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Objectifs</h3>
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <Label>Objectif principal</Label>
                <Select value={formData.goal} onValueChange={(value) => handleInputChange("goal", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez votre objectif" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lose">Perdre du poids</SelectItem>
                    <SelectItem value="maintain">Maintenir mon poids</SelectItem>
                    <SelectItem value="gain">Prendre du poids/masse musculaire</SelectItem>
                    <SelectItem value="performance">Améliorer mes performances</SelectItem>
                    <SelectItem value="health">Améliorer ma santé générale</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="bg-primary/5 p-4 rounded-lg">
                <h4 className="font-medium flex items-center gap-2 mb-2">
                  <Target className="h-4 w-4" />
                  Prêt à obtenir votre plan personnalisé
                </h4>
                <p className="text-sm text-muted-foreground">
                  Nous avons collecté toutes les informations nécessaires pour créer votre programme sur mesure. Cliquez
                  sur "Générer mon plan" pour voir vos résultats détaillés.
                </p>
              </div>
            </div>
          </div>
        )
      case 6:
        return results ? (
          <div className="space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-4 mb-4">
                <TabsTrigger value="results" className="flex items-center gap-1">
                  <BarChart3 className="h-4 w-4" />
                  <span className="hidden sm:inline">Résultats</span>
                </TabsTrigger>
                <TabsTrigger value="nutrition" className="flex items-center gap-1">
                  <Utensils className="h-4 w-4" />
                  <span className="hidden sm:inline">Nutrition</span>
                </TabsTrigger>
                <TabsTrigger value="workout" className="flex items-center gap-1">
                  <Dumbbell className="h-4 w-4" />
                  <span className="hidden sm:inline">Exercices</span>
                </TabsTrigger>
                <TabsTrigger value="progress" className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span className="hidden sm:inline">Progrès</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="results" className="space-y-4">
                <HealthMetrics results={results} formData={formData} />
              </TabsContent>

              <TabsContent value="nutrition">
                <NutritionPlan
                  results={results}
                  preferences={formData.dietaryPreference}
                  medicalConditions={formData.medicalConditions}
                />
              </TabsContent>

              <TabsContent value="workout">
                <WorkoutPlan
                  fitnessLevel={formData.fitnessLevel}
                  goal={formData.goal}
                  medicalConditions={formData.medicalConditions}
                />
              </TabsContent>

              <TabsContent value="progress">
                <ProgressTracker
                  history={userHistory}
                  goal={formData.goal}
                  currentWeight={Number.parseFloat(formData.weight)}
                />
              </TabsContent>
            </Tabs>

            <Button
              className="w-full"
              variant="outline"
              onClick={() => {
                setStep(1)
                setActiveTab("results")
              }}
            >
              Modifier mes informations
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-lg font-medium">Analyse en cours...</p>
            <p className="text-sm text-muted-foreground mt-2">Nous calculons votre plan personnalisé</p>
          </div>
        )
    }
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{step < 6 ? `Étape ${step} sur 5` : "Votre plan personnalisé"}</CardTitle>
            <CardDescription>
              {step === 1 && "Mesures physiques essentielles"}
              {step === 2 && "Informations personnelles détaillées"}
              {step === 3 && "Évaluation de votre mode de vie"}
              {step === 4 && "Préférences et restrictions alimentaires"}
              {step === 5 && "Définition de vos objectifs"}
              {step === 6 && "Analyse complète basée sur votre profil"}
            </CardDescription>
          </div>
          {step < 6 && <div className="text-sm font-medium">{step}/5</div>}
        </div>
        {step < 6 && <Progress value={progress} className="h-2 mt-2" />}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          {renderStep()}
          {step < 6 && (
            <div className="mt-6 flex gap-4">
              {step > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(step - 1)}
                  className="flex items-center gap-1"
                >
                  <ChevronLeft className="h-4 w-4" /> Précédent
                </Button>
              )}
              <Button type="submit" className="ml-auto flex items-center gap-1">
                {step === 5 ? "Générer mon plan" : "Suivant"} {step < 5 && <ChevronRight className="h-4 w-4" />}
              </Button>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  )
}

