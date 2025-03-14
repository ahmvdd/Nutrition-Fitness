"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Dumbbell, CheckCircle2, BarChart3 } from "lucide-react"

type WorkoutPlanProps = {
  fitnessLevel: string
  goal: string
  medicalConditions: string[]
}

export function WorkoutPlan({ fitnessLevel, goal, medicalConditions }: WorkoutPlanProps) {
  const [activeDay, setActiveDay] = useState("day1")
  const [completedExercises, setCompletedExercises] = useState<string[]>([])

  // Générer un programme d'entraînement en fonction du niveau et des objectifs
  const getWorkoutPlan = () => {
    // Plans d'entraînement adaptés au niveau et aux objectifs
    const workoutPlans = {
      beginner: {
        lose: {
          day1: {
            name: "Cardio & Corps Entier",
            exercises: [
              { name: "Marche rapide", sets: "1", reps: "20 min", type: "cardio" },
              { name: "Squats avec poids du corps", sets: "2", reps: "10", type: "force" },
              { name: "Pompes sur genoux", sets: "2", reps: "8", type: "force" },
              { name: "Planche", sets: "2", reps: "20 sec", type: "core" },
              { name: "Étirements", sets: "1", reps: "5 min", type: "mobilité" },
            ],
          },
          day2: {
            name: "Récupération Active",
            exercises: [
              { name: "Marche légère", sets: "1", reps: "30 min", type: "cardio" },
              { name: "Étirements complets", sets: "1", reps: "15 min", type: "mobilité" },
            ],
          },
          day3: {
            name: "Cardio & Bas du Corps",
            exercises: [
              { name: "Vélo stationnaire", sets: "1", reps: "15 min", type: "cardio" },
              { name: "Fentes", sets: "2", reps: "8 par jambe", type: "force" },
              { name: "Pont fessier", sets: "2", reps: "12", type: "force" },
              { name: "Planche latérale", sets: "2", reps: "15 sec par côté", type: "core" },
            ],
          },
        },
        maintain: {
          day1: {
            name: "Force & Équilibre",
            exercises: [
              { name: "Échauffement", sets: "1", reps: "5 min", type: "cardio" },
              { name: "Squats avec poids du corps", sets: "2", reps: "12", type: "force" },
              { name: "Pompes contre mur", sets: "2", reps: "10", type: "force" },
              { name: "Planche", sets: "2", reps: "20 sec", type: "core" },
              { name: "Équilibre sur une jambe", sets: "2", reps: "20 sec par jambe", type: "équilibre" },
            ],
          },
          day2: {
            name: "Cardio Léger & Mobilité",
            exercises: [
              { name: "Marche", sets: "1", reps: "20 min", type: "cardio" },
              { name: "Rotations des épaules", sets: "2", reps: "10 par direction", type: "mobilité" },
              { name: "Étirements des hanches", sets: "2", reps: "30 sec par côté", type: "mobilité" },
            ],
          },
          day3: {
            name: "Force & Stabilité",
            exercises: [
              { name: "Échauffement", sets: "1", reps: "5 min", type: "cardio" },
              { name: "Fentes statiques", sets: "2", reps: "8 par jambe", type: "force" },
              { name: "Élévations latérales avec bouteilles d'eau", sets: "2", reps: "12", type: "force" },
              { name: "Superman", sets: "2", reps: "10", type: "core" },
            ],
          },
        },
        gain: {
          day1: {
            name: "Introduction à la Force",
            exercises: [
              { name: "Échauffement", sets: "1", reps: "5 min", type: "cardio" },
              { name: "Squats avec poids du corps", sets: "3", reps: "12", type: "force" },
              { name: "Pompes sur genoux", sets: "3", reps: "10", type: "force" },
              { name: "Rowing avec bouteilles d'eau", sets: "3", reps: "12", type: "force" },
              { name: "Planche", sets: "2", reps: "30 sec", type: "core" },
            ],
          },
          day2: {
            name: "Récupération Active",
            exercises: [
              { name: "Marche légère", sets: "1", reps: "20 min", type: "cardio" },
              { name: "Étirements complets", sets: "1", reps: "15 min", type: "mobilité" },
            ],
          },
          day3: {
            name: "Force Progressive",
            exercises: [
              { name: "Échauffement", sets: "1", reps: "5 min", type: "cardio" },
              { name: "Fentes", sets: "3", reps: "10 par jambe", type: "force" },
              { name: "Élévations latérales", sets: "3", reps: "12", type: "force" },
              { name: "Crunchs", sets: "3", reps: "15", type: "core" },
            ],
          },
        },
      },
      intermediate: {
        lose: {
          day1: {
            name: "HIIT & Force",
            exercises: [
              { name: "Échauffement dynamique", sets: "1", reps: "5 min", type: "cardio" },
              { name: "Circuit HIIT (30s travail/30s repos)", sets: "3", reps: "4 exercices", type: "cardio" },
              { name: "Squats avec haltères", sets: "3", reps: "15", type: "force" },
              { name: "Pompes", sets: "3", reps: "12", type: "force" },
              { name: "Planche dynamique", sets: "3", reps: "45 sec", type: "core" },
            ],
          },
          day2: {
            name: "Cardio Steady-State",
            exercises: [
              { name: "Course à pied ou vélo", sets: "1", reps: "30 min", type: "cardio" },
              { name: "Étirements", sets: "1", reps: "10 min", type: "mobilité" },
            ],
          },
          day3: {
            name: "Force & Cardio",
            exercises: [
              { name: "Échauffement", sets: "1", reps: "5 min", type: "cardio" },
              { name: "Fentes avec haltères", sets: "3", reps: "12 par jambe", type: "force" },
              { name: "Rowing avec haltères", sets: "3", reps: "12", type: "force" },
              { name: "Mountain climbers", sets: "3", reps: "20 par jambe", type: "cardio" },
              { name: "Relevés de jambes", sets: "3", reps: "15", type: "core" },
            ],
          },
          day4: {
            name: "HIIT & Mobilité",
            exercises: [
              { name: "Tabata (20s travail/10s repos)", sets: "4", reps: "4 exercices", type: "cardio" },
              { name: "Yoga flow", sets: "1", reps: "15 min", type: "mobilité" },
            ],
          },
        },
        maintain: {
          day1: {
            name: "Force Haut du Corps",
            exercises: [
              { name: "Échauffement", sets: "1", reps: "5 min", type: "cardio" },
              { name: "Développé avec haltères", sets: "3", reps: "12", type: "force" },
              { name: "Rowing avec haltères", sets: "3", reps: "12", type: "force" },
              { name: "Élévations latérales", sets: "3", reps: "15", type: "force" },
              { name: "Dips sur chaise", sets: "3", reps: "10", type: "force" },
            ],
          },
          day2: {
            name: "Cardio & Core",
            exercises: [
              { name: "Cardio intervalle", sets: "1", reps: "20 min", type: "cardio" },
              { name: "Circuit abdos (4 exercices)", sets: "3", reps: "45 sec par exercice", type: "core" },
            ],
          },
          day3: {
            name: "Force Bas du Corps",
            exercises: [
              { name: "Échauffement", sets: "1", reps: "5 min", type: "cardio" },
              { name: "Squats avec haltères", sets: "3", reps: "15", type: "force" },
              { name: "Fentes bulgares", sets: "3", reps: "10 par jambe", type: "force" },
              { name: "Extensions des mollets", sets: "3", reps: "20", type: "force" },
              { name: "Pont fessier avec élévation de jambe", sets: "3", reps: "12 par jambe", type: "force" },
            ],
          },
          day4: {
            name: "Mobilité & Récupération",
            exercises: [{ name: "Yoga", sets: "1", reps: "30 min", type: "mobilité" }],
          },
        },
        gain: {
          day1: {
            name: "Force Haut du Corps",
            exercises: [
              { name: "Échauffement", sets: "1", reps: "5 min", type: "cardio" },
              { name: "Développé avec haltères", sets: "4", reps: "8-10", type: "force" },
              { name: "Rowing avec haltères", sets: "4", reps: "8-10", type: "force" },
              { name: "Élévations latérales", sets: "3", reps: "12", type: "force" },
              { name: "Pompes", sets: "3", reps: "max", type: "force" },
              { name: "Curl biceps", sets: "3", reps: "12", type: "force" },
            ],
          },
          day2: {
            name: "Cardio Léger & Récupération",
            exercises: [
              { name: "Cardio à faible intensité", sets: "1", reps: "20 min", type: "cardio" },
              { name: "Étirements", sets: "1", reps: "15 min", type: "mobilité" },
            ],
          },
          day3: {
            name: "Force Bas du Corps",
            exercises: [
              { name: "Échauffement", sets: "1", reps: "5 min", type: "cardio" },
              { name: "Squats avec haltères", sets: "4", reps: "10", type: "force" },
              { name: "Fentes avec haltères", sets: "3", reps: "10 par jambe", type: "force" },
              { name: "Extensions des mollets", sets: "4", reps: "15", type: "force" },
              { name: "Pont fessier", sets: "3", reps: "15", type: "force" },
            ],
          },
          day4: {
            name: "Force Complète",
            exercises: [
              { name: "Échauffement", sets: "1", reps: "5 min", type: "cardio" },
              { name: "Circuit full body (5 exercices)", sets: "3", reps: "12 par exercice", type: "force" },
              { name: "Circuit abdos", sets: "3", reps: "3 exercices", type: "core" },
            ],
          },
        },
      },
      advanced: {
        lose: {
          day1: {
            name: "HIIT & Force Supérieure",
            exercises: [
              { name: "Échauffement dynamique", sets: "1", reps: "8 min", type: "cardio" },
              { name: "HIIT (40s travail/20s repos)", sets: "5", reps: "4 exercices", type: "cardio" },
              { name: "Développé avec haltères", sets: "4", reps: "12", type: "force" },
              { name: "Rowing avec haltères", sets: "4", reps: "12", type: "force" },
              { name: "Dips", sets: "3", reps: "max", type: "force" },
              { name: "Circuit d'épaules (3 exercices)", sets: "3", reps: "15", type: "force" },
            ],
          },
          day2: {
            name: "Cardio & Core",
            exercises: [
              { name: "Course à pied intervalle", sets: "1", reps: "30 min", type: "cardio" },
              { name: "Circuit abdos avancé", sets: "4", reps: "5 exercices", type: "core" },
            ],
          },
          day3: {
            name: "Force Inférieure",
            exercises: [
              { name: "Échauffement", sets: "1", reps: "8 min", type: "cardio" },
              { name: "Squats avec haltères", sets: "4", reps: "15", type: "force" },
              { name: "Fentes bulgares avec poids", sets: "4", reps: "12 par jambe", type: "force" },
              { name: "Extensions des mollets", sets: "4", reps: "20", type: "force" },
              { name: "Hip thrusts", sets: "4", reps: "15", type: "force" },
            ],
          },
          day4: {
            name: "HIIT & Mobilité",
            exercises: [
              { name: "Tabata avancé", sets: "6", reps: "4 exercices", type: "cardio" },
              { name: "Yoga power", sets: "1", reps: "20 min", type: "mobilité" },
            ],
          },
          day5: {
            name: "Force Complète",
            exercises: [
              { name: "Échauffement", sets: "1", reps: "8 min", type: "cardio" },
              { name: "Circuit full body avancé", sets: "3", reps: "6 exercices", type: "force" },
              { name: "Finisher métabolique", sets: "3", reps: "3 min", type: "cardio" },
            ],
          },
        },
        maintain: {
          day1: {
            name: "Force Haut du Corps",
            exercises: [
              { name: "Échauffement", sets: "1", reps: "8 min", type: "cardio" },
              { name: "Développé avec haltères", sets: "4", reps: "10-12", type: "force" },
              { name: "Rowing avec haltères", sets: "4", reps: "10-12", type: "force" },
              { name: "Élévations latérales", sets: "4", reps: "15", type: "force" },
              { name: "Dips", sets: "3", reps: "max", type: "force" },
              { name: "Curl biceps", sets: "3", reps: "12", type: "force" },
              { name: "Extensions triceps", sets: "3", reps: "12", type: "force" },
            ],
          },
          day2: {
            name: "Cardio & Core",
            exercises: [
              { name: "Cardio intervalle", sets: "1", reps: "25 min", type: "cardio" },
              { name: "Circuit abdos (5 exercices)", sets: "3", reps: "1 min par exercice", type: "core" },
            ],
          },
          day3: {
            name: "Force Bas du Corps",
            exercises: [
              { name: "Échauffement", sets: "1", reps: "8 min", type: "cardio" },
              { name: "Squats avec haltères", sets: "4", reps: "12-15", type: "force" },
              { name: "Fentes bulgares", sets: "4", reps: "12 par jambe", type: "force" },
              { name: "Extensions des mollets", sets: "4", reps: "20", type: "force" },
              { name: "Hip thrusts", sets: "4", reps: "15", type: "force" },
              { name: "Abducteurs", sets: "3", reps: "20", type: "force" },
            ],
          },
          day4: {
            name: "Mobilité & Récupération",
            exercises: [
              { name: "Yoga", sets: "1", reps: "30 min", type: "mobilité" },
              { name: "Foam rolling", sets: "1", reps: "15 min", type: "récupération" },
            ],
          },
          day5: {
            name: "Force Complète",
            exercises: [
              { name: "Échauffement", sets: "1", reps: "8 min", type: "cardio" },
              { name: "Circuit full body (6 exercices)", sets: "3", reps: "12-15 par exercice", type: "force" },
              { name: "Finisher métabolique", sets: "2", reps: "4 min", type: "cardio" },
            ],
          },
        },
        gain: {
          day1: {
            name: "Force Haut du Corps",
            exercises: [
              { name: "Échauffement", sets: "1", reps: "8 min", type: "cardio" },
              { name: "Développé avec haltères", sets: "5", reps: "6-8", type: "force" },
              { name: "Rowing avec haltères", sets: "5", reps: "6-8", type: "force" },
              { name: "Élévations latérales", sets: "4", reps: "10-12", type: "force" },
              { name: "Dips lestés", sets: "4", reps: "8-10", type: "force" },
              { name: "Curl biceps", sets: "4", reps: "8-10", type: "force" },
              { name: "Extensions triceps", sets: "4", reps: "8-10", type: "force" },
            ],
          },
          day2: {
            name: "Cardio Léger & Récupération",
            exercises: [
              { name: "Cardio à faible intensité", sets: "1", reps: "20 min", type: "cardio" },
              { name: "Étirements", sets: "1", reps: "20 min", type: "mobilité" },
              { name: "Foam rolling", sets: "1", reps: "10 min", type: "récupération" },
            ],
          },
          day3: {
            name: "Force Bas du Corps",
            exercises: [
              { name: "Échauffement", sets: "1", reps: "8 min", type: "cardio" },
              { name: "Squats avec haltères", sets: "5", reps: "6-8", type: "force" },
              { name: "Fentes bulgares lestées", sets: "4", reps: "8 par jambe", type: "force" },
              { name: "Extensions des mollets", sets: "5", reps: "12-15", type: "force" },
              { name: "Hip thrusts lestés", sets: "4", reps: "8-10", type: "force" },
              { name: "Abducteurs", sets: "3", reps: "15", type: "force" },
            ],
          },
          day4: {
            name: "Force Complète",
            exercises: [
              { name: "Échauffement", sets: "1", reps: "8 min", type: "cardio" },
              { name: "Circuit full body (6 exercices)", sets: "4", reps: "8-10 par exercice", type: "force" },
              { name: "Circuit abdos", sets: "3", reps: "4 exercices", type: "core" },
            ],
          },
          day5: {
            name: "Force Ciblée & Récupération",
            exercises: [
              { name: "Échauffement", sets: "1", reps: "8 min", type: "cardio" },
              { name: "Travail des points faibles", sets: "4", reps: "4 exercices", type: "force" },
              { name: "Étirements", sets: "1", reps: "15 min", type: "mobilité" },
            ],
          },
        },
      },
    }

    // Adapter en fonction des conditions médicales
    let plan =
      workoutPlans[fitnessLevel as keyof typeof workoutPlans]?.[
        goal as keyof (typeof workoutPlans)[keyof typeof workoutPlans]
      ] || workoutPlans.beginner.maintain

    // Ajuster pour les conditions médicales
    if (medicalConditions.includes("Hypertension")) {
      plan = adjustPlanForHypertension(plan)
    }

    return plan
  }

  // Fonction pour ajuster le plan pour l'hypertension
  const adjustPlanForHypertension = (plan: any) => {
    // Copie profonde du plan
    const newPlan = JSON.parse(JSON.stringify(plan))

    // Modifier les exercices pour l'hypertension
    Object.keys(newPlan).forEach((day) => {
      newPlan[day].exercises = newPlan[day].exercises.map((exercise: any) => {
        // Remplacer les exercices à haute intensité
        if (exercise.name.includes("HIIT") || exercise.name.includes("Tabata")) {
          return {
            name: "Cardio à intensité modérée",
            sets: exercise.sets,
            reps: exercise.reps,
            type: "cardio",
          }
        }
        return exercise
      })
    })

    return newPlan
  }

  const workoutPlan = getWorkoutPlan()
  const availableDays = Object.keys(workoutPlan)

  const toggleExerciseCompletion = (exerciseName: string) => {
    setCompletedExercises((prev) =>
      prev.includes(exerciseName) ? prev.filter((name) => name !== exerciseName) : [...prev, exerciseName],
    )
  }

  // Calculer le pourcentage de complétion pour le jour actif
  const calculateCompletion = (day: string) => {
    if (!workoutPlan[day]) return 0

    const totalExercises = workoutPlan[day].exercises.length
    const completedCount = workoutPlan[day].exercises.filter((ex: any) => completedExercises.includes(ex.name)).length

    return (completedCount / totalExercises) * 100
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Dumbbell className="h-5 w-5" />
            Programme d'entraînement personnalisé
          </CardTitle>
          <CardDescription>
            Adapté à votre niveau{" "}
            {fitnessLevel === "beginner" ? "débutant" : fitnessLevel === "intermediate" ? "intermédiaire" : "avancé"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeDay} onValueChange={setActiveDay}>
            <TabsList className="grid grid-cols-5 mb-4">
              {availableDays.map((day, index) => (
                <TabsTrigger key={day} value={day} disabled={index >= 5}>
                  Jour {index + 1}
                </TabsTrigger>
              ))}
            </TabsList>

            {availableDays.map((day) => (
              <TabsContent key={day} value={day} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">{workoutPlan[day].name}</h3>
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-medium">{Math.round(calculateCompletion(day))}% complété</div>
                  </div>
                </div>

                {workoutPlan[day].exercises.map((exercise: any, index: number) => (
                  <Card key={index} className={completedExercises.includes(exercise.name) ? "bg-primary/5" : ""}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-start gap-3">
                          <Checkbox
                            checked={completedExercises.includes(exercise.name)}
                            onCheckedChange={() => toggleExerciseCompletion(exercise.name)}
                            className="mt-1"
                          />
                          <div>
                            <div className="font-medium">{exercise.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {exercise.sets} {exercise.sets === "1" ? "série" : "séries"} × {exercise.reps}
                            </div>
                          </div>
                        </div>
                        <div className="text-xs px-2 py-1 rounded-full bg-secondary">
                          {exercise.type === "cardio"
                            ? "Cardio"
                            : exercise.type === "force"
                              ? "Force"
                              : exercise.type === "core"
                                ? "Core"
                                : exercise.type === "mobilité"
                                  ? "Mobilité"
                                  : exercise.type === "équilibre"
                                    ? "Équilibre"
                                    : exercise.type === "récupération"
                                      ? "Récupération"
                                      : exercise.type}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <Button
                  variant={calculateCompletion(day) === 100 ? "default" : "outline"}
                  className="w-full mt-4"
                  disabled={calculateCompletion(day) !== 100}
                >
                  {calculateCompletion(day) === 100 ? (
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4" /> Séance terminée
                    </span>
                  ) : (
                    "Terminer la séance"
                  )}
                </Button>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Progression hebdomadaire
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: 7 }).map((_, i) => {
                const dayKey = `day${i + 1}` as keyof typeof workoutPlan
                const hasWorkout = workoutPlan[dayKey] !== undefined
                const completion = hasWorkout ? calculateCompletion(dayKey) : 0

                return (
                  <div key={i} className="flex flex-col items-center">
                    <div className="text-xs text-muted-foreground mb-1">J{i + 1}</div>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                        !hasWorkout
                          ? "bg-secondary text-muted-foreground"
                          : completion === 0
                            ? "bg-secondary/50"
                            : completion < 100
                              ? "bg-primary/30"
                              : "bg-primary text-primary-foreground"
                      }`}
                    >
                      {hasWorkout ? (
                        completion === 100 ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : (
                          `${Math.round(completion)}%`
                        )
                      ) : (
                        "-"
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
                <span>Complété</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary/30"></div>
                <span>En cours</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-secondary/50"></div>
                <span>À faire</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-secondary"></div>
                <span>Repos</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

