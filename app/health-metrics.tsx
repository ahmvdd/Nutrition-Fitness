"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Scale, Heart, Droplet, Target, Salad } from "lucide-react"

type HealthMetricsProps = {
  results: {
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
  formData: {
    weight: string
    height: string
    bodyFat: string
    [key: string]: any
  }
}

export function HealthMetrics({ results, formData }: HealthMetricsProps) {
  // Fonction pour déterminer la catégorie d'IMC
  const getBmiCategory = (bmi: number) => {
    if (bmi < 18.5) return { name: "Insuffisance pondérale", color: "text-blue-500" }
    if (bmi < 25) return { name: "Poids normal", color: "text-green-500" }
    if (bmi < 30) return { name: "Surpoids", color: "text-yellow-500" }
    if (bmi < 35) return { name: "Obésité modérée", color: "text-orange-500" }
    return { name: "Obésité sévère", color: "text-red-500" }
  }

  // Calculer le pourcentage de l'IMC sur l'échelle
  const bmiPercentage = Math.min(Math.max(((results.bmi - 15) / 25) * 100, 0), 100)

  // Déterminer la catégorie d'IMC
  const bmiCategory = getBmiCategory(results.bmi)

  // Calculer les pourcentages de macronutriments
  const totalMacros = results.macros.protein + results.macros.carbs + results.macros.fat
  const proteinPercentage = (results.macros.protein / totalMacros) * 100
  const carbsPercentage = (results.macros.carbs / totalMacros) * 100
  const fatPercentage = (results.macros.fat / totalMacros) * 100

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Scale className="h-5 w-5" />
              Indice de Masse Corporelle (IMC)
            </CardTitle>
            <CardDescription>Évaluation du poids par rapport à la taille</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">{results.bmi}</div>
            <div className={`text-sm font-medium mb-4 ${bmiCategory.color}`}>{bmiCategory.name}</div>
            <div className="h-2 bg-secondary rounded-full mb-2">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-blue-500 via-green-500 to-red-500"
                style={{ width: `${bmiPercentage}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>15</span>
              <span>20</span>
              <span>25</span>
              <span>30</span>
              <span>40</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Heart className="h-5 w-5" />
              Métabolisme
            </CardTitle>
            <CardDescription>Dépense énergétique quotidienne</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Métabolisme de base (BMR)</span>
                <span className="font-medium">{results.bmr} kcal</span>
              </div>
              <Progress value={70} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Dépense totale (TDEE)</span>
                <span className="font-medium">{results.tdee} kcal</span>
              </div>
              <Progress value={100} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Objectif calorique</span>
                <span className="font-medium">{results.tdee + results.calorieAdjustment} kcal</span>
              </div>
              <Progress value={((results.tdee + results.calorieAdjustment) / results.tdee) * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="h-5 w-5" />
              Poids idéal estimé
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-1">
              {results.idealWeight.min} - {results.idealWeight.max} kg
            </div>
            <div className="text-sm text-muted-foreground mb-3">Basé sur votre taille et votre morphologie</div>
            {formData.weight && (
              <div className="flex items-center gap-2">
                <div className="text-sm">Poids actuel:</div>
                <div className="font-medium">{formData.weight} kg</div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Droplet className="h-5 w-5" />
              Hydratation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-1">{results.waterIntake} ml</div>
            <div className="text-sm text-muted-foreground mb-3">Apport quotidien recommandé</div>
            <div className="text-sm">Équivalent à environ {Math.round(results.waterIntake / 250)} verres d'eau</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Salad className="h-5 w-5" />
              Composition corporelle
            </CardTitle>
          </CardHeader>
          <CardContent>
            {formData.bodyFat ? (
              <>
                <div className="text-2xl font-bold mb-1">{formData.bodyFat}% de graisse</div>
                <div className="text-sm text-muted-foreground mb-3">Catégorie: {results.bodyFatCategory}</div>
              </>
            ) : (
              <div className="text-sm text-muted-foreground mb-3">Pourcentage de graisse non renseigné</div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Répartition des macronutriments</CardTitle>
          <CardDescription>Basée sur votre profil et vos objectifs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex h-4 mb-4">
            <div className="bg-blue-500 h-4 rounded-l-full" style={{ width: `${proteinPercentage}%` }}></div>
            <div className="bg-green-500 h-4" style={{ width: `${carbsPercentage}%` }}></div>
            <div className="bg-yellow-500 h-4 rounded-r-full" style={{ width: `${fatPercentage}%` }}></div>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="flex items-center justify-center gap-1">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="font-medium">Protéines</span>
              </div>
              <div className="text-2xl font-bold">{results.macros.protein}g</div>
              <div className="text-xs text-muted-foreground">{Math.round(proteinPercentage)}% des macros</div>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="font-medium">Glucides</span>
              </div>
              <div className="text-2xl font-bold">{results.macros.carbs}g</div>
              <div className="text-xs text-muted-foreground">{Math.round(carbsPercentage)}% des macros</div>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span className="font-medium">Lipides</span>
              </div>
              <div className="text-2xl font-bold">{results.macros.fat}g</div>
              <div className="text-xs text-muted-foreground">{Math.round(fatPercentage)}% des macros</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Recommandations personnalisées</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{results.recommendation}</p>
        </CardContent>
      </Card>
    </div>
  )
}

