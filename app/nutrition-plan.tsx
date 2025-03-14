"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Utensils, Coffee, Sun, Moon, Plus, Info } from "lucide-react"

type NutritionPlanProps = {
  results: {
    tdee: number
    macros: {
      protein: number
      carbs: number
      fat: number
    }
    calorieAdjustment: number
  }
  preferences: string
  medicalConditions: string[]
}

export function NutritionPlan({ results, preferences, medicalConditions }: NutritionPlanProps) {
  const [mealPlanDay, setMealPlanDay] = useState("day1")

  // Générer des plans de repas en fonction des préférences
  const getMealPlan = () => {
    const totalCalories = results.tdee + results.calorieAdjustment

    // Plans de repas adaptés aux préférences
    const mealPlans = {
      balanced: {
        day1: [
          {
            name: "Petit-déjeuner",
            items: ["Porridge d'avoine avec fruits et noix", "Yaourt grec", "Café ou thé"],
            calories: Math.round(totalCalories * 0.25),
          },
          {
            name: "Déjeuner",
            items: ["Salade de quinoa avec poulet grillé", "Légumes de saison", "Fruit frais"],
            calories: Math.round(totalCalories * 0.35),
          },
          { name: "Collation", items: ["Poignée d'amandes", "Pomme"], calories: Math.round(totalCalories * 0.1) },
          {
            name: "Dîner",
            items: ["Saumon grillé", "Patate douce", "Légumes verts"],
            calories: Math.round(totalCalories * 0.3),
          },
        ],
        day2: [
          {
            name: "Petit-déjeuner",
            items: ["Œufs brouillés", "Pain complet", "Avocat", "Thé vert"],
            calories: Math.round(totalCalories * 0.25),
          },
          {
            name: "Déjeuner",
            items: ["Wrap au poulet et légumes", "Soupe de légumes", "Yaourt"],
            calories: Math.round(totalCalories * 0.35),
          },
          {
            name: "Collation",
            items: ["Smoothie protéiné", "Noix de cajou"],
            calories: Math.round(totalCalories * 0.1),
          },
          {
            name: "Dîner",
            items: ["Pâtes complètes", "Sauce tomate maison avec lentilles", "Salade verte"],
            calories: Math.round(totalCalories * 0.3),
          },
        ],
      },
      lowCarb: {
        day1: [
          {
            name: "Petit-déjeuner",
            items: ["Omelette aux épinards et fromage", "Avocat", "Thé sans sucre"],
            calories: Math.round(totalCalories * 0.25),
          },
          {
            name: "Déjeuner",
            items: ["Salade de thon avec œufs durs", "Huile d'olive", "Noix"],
            calories: Math.round(totalCalories * 0.35),
          },
          { name: "Collation", items: ["Fromage à pâte dure", "Olives"], calories: Math.round(totalCalories * 0.1) },
          {
            name: "Dîner",
            items: ["Steak grillé", "Brocoli rôti", "Champignons sautés"],
            calories: Math.round(totalCalories * 0.3),
          },
        ],
        day2: [
          {
            name: "Petit-déjeuner",
            items: ["Yaourt grec entier", "Graines de chia", "Baies (quantité limitée)"],
            calories: Math.round(totalCalories * 0.25),
          },
          {
            name: "Déjeuner",
            items: ["Poulet rôti", "Salade d'avocat", "Asperges grillées"],
            calories: Math.round(totalCalories * 0.35),
          },
          {
            name: "Collation",
            items: ["Bâtonnets de céleri", "Beurre d'amande"],
            calories: Math.round(totalCalories * 0.1),
          },
          {
            name: "Dîner",
            items: ["Saumon en papillote", "Courgettes", "Sauce à la crème"],
            calories: Math.round(totalCalories * 0.3),
          },
        ],
      },
      highProtein: {
        day1: [
          {
            name: "Petit-déjeuner",
            items: ["Shake protéiné", "Flocons d'avoine", "Blanc d'œuf"],
            calories: Math.round(totalCalories * 0.25),
          },
          {
            name: "Déjeuner",
            items: ["Poitrine de poulet grillée", "Riz brun", "Brocoli"],
            calories: Math.round(totalCalories * 0.35),
          },
          {
            name: "Collation",
            items: ["Yaourt grec", "Protéine en poudre"],
            calories: Math.round(totalCalories * 0.1),
          },
          {
            name: "Dîner",
            items: ["Steak de bœuf maigre", "Patate douce", "Haricots verts"],
            calories: Math.round(totalCalories * 0.3),
          },
        ],
        day2: [
          {
            name: "Petit-déjeuner",
            items: ["Omelette (6 blancs, 2 jaunes)", "Flocons d'avoine", "Fruits rouges"],
            calories: Math.round(totalCalories * 0.25),
          },
          {
            name: "Déjeuner",
            items: ["Thon en conserve", "Salade composée", "Quinoa"],
            calories: Math.round(totalCalories * 0.35),
          },
          { name: "Collation", items: ["Cottage cheese", "Noix"], calories: Math.round(totalCalories * 0.1) },
          {
            name: "Dîner",
            items: ["Filet de dinde", "Légumes rôtis", "Riz sauvage"],
            calories: Math.round(totalCalories * 0.3),
          },
        ],
      },
      vegetarian: {
        day1: [
          {
            name: "Petit-déjeuner",
            items: ["Smoothie protéiné aux fruits", "Toast à l'avocat", "Graines de chia"],
            calories: Math.round(totalCalories * 0.25),
          },
          {
            name: "Déjeuner",
            items: ["Buddha bowl (quinoa, pois chiches, avocat, légumes)", "Vinaigrette tahini"],
            calories: Math.round(totalCalories * 0.35),
          },
          { name: "Collation", items: ["Yaourt végétal", "Granola maison"], calories: Math.round(totalCalories * 0.1) },
          {
            name: "Dîner",
            items: ["Curry de lentilles", "Riz basmati", "Légumes rôtis"],
            calories: Math.round(totalCalories * 0.3),
          },
        ],
        day2: [
          {
            name: "Petit-déjeuner",
            items: ["Porridge protéiné", "Beurre d'amande", "Banane"],
            calories: Math.round(totalCalories * 0.25),
          },
          {
            name: "Déjeuner",
            items: ["Wrap aux haricots noirs", "Guacamole", "Salade"],
            calories: Math.round(totalCalories * 0.35),
          },
          {
            name: "Collation",
            items: ["Houmous", "Crudités", "Crackers de riz"],
            calories: Math.round(totalCalories * 0.1),
          },
          {
            name: "Dîner",
            items: ["Tofu grillé", "Quinoa", "Légumes sautés au wok"],
            calories: Math.round(totalCalories * 0.3),
          },
        ],
      },
    }

    // Adapter en fonction des conditions médicales
    let plan = mealPlans[preferences as keyof typeof mealPlans] || mealPlans.balanced

    // Ajuster pour les conditions médicales
    if (medicalConditions.includes("Diabète")) {
      // Réduire les glucides à index glycémique élevé
      plan = adjustPlanForDiabetes(plan)
    }

    if (medicalConditions.includes("Intolérance au gluten")) {
      // Remplacer les aliments contenant du gluten
      plan = adjustPlanForGlutenIntolerance(plan)
    }

    return plan
  }

  // Fonction pour ajuster le plan pour les diabétiques
  const adjustPlanForDiabetes = (plan: any) => {
    // Copie profonde du plan
    const newPlan = JSON.parse(JSON.stringify(plan))

    // Remplacer les aliments à index glycémique élevé
    Object.keys(newPlan).forEach((day) => {
      newPlan[day].forEach((meal: any) => {
        if (meal.items.includes("Pain blanc")) {
          meal.items = meal.items.map((item: string) => (item === "Pain blanc" ? "Pain complet à faible IG" : item))
        }
        if (meal.items.includes("Riz blanc")) {
          meal.items = meal.items.map((item: string) => (item === "Riz blanc" ? "Riz basmati complet" : item))
        }
        // Autres remplacements possibles...
      })
    })

    return newPlan
  }

  // Fonction pour ajuster le plan pour l'intolérance au gluten
  const adjustPlanForGlutenIntolerance = (plan: any) => {
    // Copie profonde du plan
    const newPlan = JSON.parse(JSON.stringify(plan))

    // Remplacer les aliments contenant du gluten
    Object.keys(newPlan).forEach((day) => {
      newPlan[day].forEach((meal: any) => {
        meal.items = meal.items.map((item: string) => {
          if (item.includes("Pain")) return "Pain sans gluten"
          if (item.includes("Pâtes")) return "Pâtes de riz ou quinoa"
          if (item.includes("Avoine")) return "Flocons de quinoa"
          return item
        })
      })
    })

    return newPlan
  }

  const mealPlan = getMealPlan()

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Utensils className="h-5 w-5" />
            Plan nutritionnel personnalisé
          </CardTitle>
          <CardDescription>
            Basé sur vos besoins caloriques de {results.tdee + results.calorieAdjustment} kcal/jour
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={mealPlanDay} onValueChange={setMealPlanDay}>
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="day1">Jour 1</TabsTrigger>
              <TabsTrigger value="day2">Jour 2</TabsTrigger>
            </TabsList>

            {["day1", "day2"].map((day) => (
              <TabsContent key={day} value={day} className="space-y-4">
                {mealPlan[day as keyof typeof mealPlan].map((meal, index) => (
                  <Card key={index}>
                    <CardHeader className="py-3">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-base flex items-center gap-2">
                          {meal.name === "Petit-déjeuner" && <Coffee className="h-4 w-4" />}
                          {meal.name === "Déjeuner" && <Sun className="h-4 w-4" />}
                          {meal.name === "Dîner" && <Moon className="h-4 w-4" />}
                          {meal.name}
                        </CardTitle>
                        <span className="text-sm font-medium">{meal.calories} kcal</span>
                      </div>
                    </CardHeader>
                    <CardContent className="py-2">
                      <ul className="space-y-1">
                        {meal.items.map((item, i) => (
                          <li key={i} className="text-sm flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}

                <Button variant="outline" className="w-full flex items-center gap-2">
                  <Plus className="h-4 w-4" /> Ajouter un repas
                </Button>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5" />
            Conseils nutritionnels
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium">Répartition des macronutriments</h4>
            <p className="text-sm text-muted-foreground">
              Votre plan est conçu pour fournir environ {results.macros.protein}g de protéines, {results.macros.carbs}g
              de glucides et {results.macros.fat}g de lipides par jour.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium">Timing des repas</h4>
            <p className="text-sm text-muted-foreground">
              Pour optimiser votre métabolisme, essayez de manger à des heures régulières et d'espacer vos repas de 3-4
              heures.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium">Hydratation</h4>
            <p className="text-sm text-muted-foreground">
              N'oubliez pas de boire suffisamment d'eau tout au long de la journée, idéalement 30-35ml par kg de poids
              corporel.
            </p>
          </div>

          {medicalConditions.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium">Adaptations spécifiques</h4>
              <p className="text-sm text-muted-foreground">
                Ce plan a été adapté pour prendre en compte vos conditions médicales: {medicalConditions.join(", ")}.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

