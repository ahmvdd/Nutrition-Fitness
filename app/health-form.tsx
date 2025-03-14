"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Scale, Ruler, Salad } from "lucide-react"

export function HealthForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    weight: "",
    height: "",
    age: "",
    gender: "",
    activityLevel: "",
    goal: "",
  })
  const [results, setResults] = useState<{
    bmi: number
    calories: number
    recommendation: string
  } | null>(null)

  const calculateResults = () => {
    // Calculer l'IMC
    const heightInM = Number(formData.height) / 100
    const bmi = Number(formData.weight) / (heightInM * heightInM)

    // Calculer les besoins caloriques de base (formule de Harris-Benedict)
    let bmr
    if (formData.gender === "male") {
      bmr = 88.362 + 13.397 * Number(formData.weight) + 4.799 * Number(formData.height) - 5.677 * Number(formData.age)
    } else {
      bmr = 447.593 + 9.247 * Number(formData.weight) + 3.098 * Number(formData.height) - 4.33 * Number(formData.age)
    }

    // Ajuster selon le niveau d'activité
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      veryActive: 1.9,
    }
    const calories = bmr * activityMultipliers[formData.activityLevel as keyof typeof activityMultipliers]

    // Générer une recommandation
    let recommendation = ""
    if (bmi < 18.5) {
      recommendation =
        "Programme de prise de masse avec focus sur les protéines et les glucides complexes. Exercices de musculation recommandés."
    } else if (bmi < 25) {
      recommendation =
        "Programme de maintien équilibré. Mix d'exercices cardio et musculation pour maintenir votre forme."
    } else {
      recommendation =
        "Programme de perte de poids saine avec déficit calorique modéré. Commencez par de la marche et des exercices à faible impact."
    }

    setResults({ bmi: Math.round(bmi * 10) / 10, calories: Math.round(calories), recommendation })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step < 3) {
      setStep(step + 1)
    } else {
      calculateResults()
      setStep(4)
    }
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
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
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
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
                    onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </div>
        )
      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="age">Âge</Label>
              <Input
                id="age"
                type="number"
                placeholder="25"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Genre</Label>
              <RadioGroup
                value={formData.gender}
                onValueChange={(value) => setFormData({ ...formData, gender: value })}
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
          </div>
        )
      case 3:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Niveau d'activité</Label>
              <Select
                value={formData.activityLevel}
                onValueChange={(value) => setFormData({ ...formData, activityLevel: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez votre niveau d'activité" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentary">Sédentaire (peu ou pas d'exercice)</SelectItem>
                  <SelectItem value="light">Légèrement actif (exercice léger 1-3 fois/semaine)</SelectItem>
                  <SelectItem value="moderate">Modérément actif (exercice modéré 3-5 fois/semaine)</SelectItem>
                  <SelectItem value="active">Très actif (exercice intense 6-7 fois/semaine)</SelectItem>
                  <SelectItem value="veryActive">Extrêmement actif (exercice très intense)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Objectif principal</Label>
              <Select value={formData.goal} onValueChange={(value) => setFormData({ ...formData, goal: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez votre objectif" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lose">Perdre du poids</SelectItem>
                  <SelectItem value="maintain">Maintenir mon poids</SelectItem>
                  <SelectItem value="gain">Prendre du poids</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )
      case 4:
        return (
          results && (
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl">IMC</CardTitle>
                    <CardDescription>Indice de masse corporelle</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{results.bmi}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl">Calories</CardTitle>
                    <CardDescription>Besoins quotidiens estimés</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{results.calories} kcal</div>
                  </CardContent>
                </Card>
              </div>
              <Card>
                <CardHeader className="space-y-1">
                  <CardTitle className="flex items-center gap-2">
                    <Salad className="h-5 w-5" />
                    Recommandations personnalisées
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{results.recommendation}</p>
                </CardContent>
              </Card>
              <Button
                className="w-full"
                onClick={() => {
                  setStep(1)
                  setResults(null)
                  setFormData({
                    weight: "",
                    height: "",
                    age: "",
                    gender: "",
                    activityLevel: "",
                    goal: "",
                  })
                }}
              >
                Recommencer
              </Button>
            </div>
          )
        )
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{step < 4 ? `Étape ${step} sur 3` : "Vos résultats"}</CardTitle>
        <CardDescription>
          {step === 1 && "Commençons par vos mesures physiques"}
          {step === 2 && "Quelques informations personnelles"}
          {step === 3 && "Votre mode de vie et vos objectifs"}
          {step === 4 && "Voici votre programme personnalisé"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          {renderStep()}
          {step < 4 && (
            <div className="mt-6 flex gap-4">
              {step > 1 && (
                <Button type="button" variant="outline" onClick={() => setStep(step - 1)}>
                  Précédent
                </Button>
              )}
              <Button type="submit" className="ml-auto">
                {step === 3 ? "Voir les résultats" : "Suivant"}
              </Button>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  )
}

