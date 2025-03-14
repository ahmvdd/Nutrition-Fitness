"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar, TrendingUp, TrendingDown, Scale, Target } from "lucide-react"

type ProgressTrackerProps = {
  history: { date: string; weight: number }[]
  goal: string
  currentWeight: number
}

export function ProgressTracker({ history, goal, currentWeight }: ProgressTrackerProps) {
  const [newWeight, setNewWeight] = useState("")

  // Trier l'historique par date
  const sortedHistory = [...history].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  // Calculer les statistiques
  const calculateStats = () => {
    if (sortedHistory.length < 2) return { change: 0, weekly: 0, trend: "stable" }

    const firstWeight = sortedHistory[0].weight
    const lastWeight = sortedHistory[sortedHistory.length - 1].weight
    const totalChange = lastWeight - firstWeight

    // Calculer le changement hebdomadaire moyen
    const firstDate = new Date(sortedHistory[0].date)
    const lastDate = new Date(sortedHistory[sortedHistory.length - 1].date)
    const weeksDiff = Math.max(1, Math.round((lastDate.getTime() - firstDate.getTime()) / (7 * 24 * 60 * 60 * 1000)))
    const weeklyChange = totalChange / weeksDiff

    // Déterminer la tendance
    let trend = "stable"
    if (weeklyChange > 0.2) trend = "up"
    else if (weeklyChange < -0.2) trend = "down"

    return {
      change: totalChange,
      weekly: weeklyChange,
      trend,
    }
  }

  const stats = calculateStats()

  // Déterminer si la tendance est alignée avec l'objectif
  const isTrendAligned = () => {
    if (goal === "lose" && stats.trend === "down") return true
    if (goal === "gain" && stats.trend === "up") return true
    if (goal === "maintain" && stats.trend === "stable") return true
    return false
  }

  // Ajouter une nouvelle entrée de poids
  const addWeightEntry = () => {
    if (!newWeight) return

    const today = new Date().toISOString().split("T")[0]
    const newEntry = {
      date: today,
      weight: Number.parseFloat(newWeight),
    }

    // Mettre à jour l'historique local
    const updatedHistory = [...history]
    const todayIndex = updatedHistory.findIndex((entry) => entry.date === today)

    if (todayIndex >= 0) {
      updatedHistory[todayIndex] = newEntry
    } else {
      updatedHistory.push(newEntry)
    }

    // Sauvegarder dans localStorage
    localStorage.setItem("weightHistory", JSON.stringify(updatedHistory))

    // Réinitialiser le champ
    setNewWeight("")

    // Recharger la page pour mettre à jour les statistiques
    window.location.reload()
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Scale className="h-5 w-5" />
            Suivi de poids
          </CardTitle>
          <CardDescription>Enregistrez votre poids pour suivre vos progrès</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 space-y-2">
                <Label htmlFor="weight">Poids actuel (kg)</Label>
                <div className="flex gap-2">
                  <Input
                    id="weight"
                    type="number"
                    placeholder="70"
                    value={newWeight}
                    onChange={(e) => setNewWeight(e.target.value)}
                  />
                  <Button onClick={addWeightEntry}>Enregistrer</Button>
                </div>
              </div>
              <div className="flex-1 space-y-2">
                <Label>Objectif</Label>
                <div className="flex items-center gap-2 h-10">
                  <Target className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">
                    {goal === "lose" ? "Perte de poids" : goal === "gain" ? "Prise de poids" : "Maintien du poids"}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <Card>
                <CardContent className="p-4 flex flex-col items-center justify-center">
                  <div className="text-sm text-muted-foreground mb-1">Changement total</div>
                  <div className="flex items-center gap-1">
                    {stats.change > 0 ? (
                      <TrendingUp className="h-4 w-4 text-red-500" />
                    ) : stats.change < 0 ? (
                      <TrendingDown className="h-4 w-4 text-green-500" />
                    ) : (
                      <div className="h-4 w-4" />
                    )}
                    <span className="text-2xl font-bold">
                      {stats.change > 0 ? "+" : ""}
                      {stats.change.toFixed(1)} kg
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 flex flex-col items-center justify-center">
                  <div className="text-sm text-muted-foreground mb-1">Changement hebdo</div>
                  <div className="flex items-center gap-1">
                    {stats.weekly > 0 ? (
                      <TrendingUp className="h-4 w-4 text-red-500" />
                    ) : stats.weekly < 0 ? (
                      <TrendingDown className="h-4 w-4 text-green-500" />
                    ) : (
                      <div className="h-4 w-4" />
                    )}
                    <span className="text-2xl font-bold">
                      {stats.weekly > 0 ? "+" : ""}
                      {stats.weekly.toFixed(1)} kg
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 flex flex-col items-center justify-center">
                  <div className="text-sm text-muted-foreground mb-1">Tendance</div>
                  <div className="flex items-center gap-1">
                    {stats.trend === "up" ? (
                      <TrendingUp className={`h-4 w-4 ${goal === "gain" ? "text-green-500" : "text-red-500"}`} />
                    ) : stats.trend === "down" ? (
                      <TrendingDown className={`h-4 w-4 ${goal === "lose" ? "text-green-500" : "text-red-500"}`} />
                    ) : (
                      <div className="h-4 w-4" />
                    )}
                    <span className={`text-lg font-bold ${isTrendAligned() ? "text-green-500" : "text-red-500"}`}>
                      {isTrendAligned() ? "Conforme à l'objectif" : "Non conforme à l'objectif"}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Historique de poids
          </CardTitle>
        </CardHeader>
        <CardContent>
          {sortedHistory.length > 0 ? (
            <div className="space-y-4">
              <div className="relative h-40 w-full">
                <WeightChart history={sortedHistory} goal={goal} />
              </div>

              <div className="space-y-2 mt-4">
                <div className="text-sm font-medium">Dernières entrées</div>
                <div className="space-y-2">
                  {sortedHistory
                    .slice(-5)
                    .reverse()
                    .map((entry, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b">
                        <div className="text-sm">{formatDate(entry.date)}</div>
                        <div className="font-medium">{entry.weight} kg</div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              Aucune donnée d'historique disponible. Commencez à enregistrer votre poids pour voir votre progression.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

// Fonction pour formater la date
function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString("fr-FR", { day: "numeric", month: "short" })
}

// Composant de graphique simplifié
function WeightChart({ history, goal }: { history: { date: string; weight: number }[]; goal: string }) {
  if (history.length < 2) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        Pas assez de données pour afficher un graphique
      </div>
    )
  }

  // Trouver les valeurs min et max pour l'échelle
  const weights = history.map((entry) => entry.weight)
  const minWeight = Math.min(...weights)
  const maxWeight = Math.max(...weights)
  const range = maxWeight - minWeight

  // Ajouter une marge pour la visualisation
  const yMin = Math.max(0, minWeight - range * 0.1)
  const yMax = maxWeight + range * 0.1

  return (
    <div className="h-full w-full">
      <div className="relative h-full w-full">
        {/* Axe Y */}
        <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-muted-foreground">
          <span>{yMax.toFixed(1)}</span>
          <span>{((yMax + yMin) / 2).toFixed(1)}</span>
          <span>{yMin.toFixed(1)}</span>
        </div>

        {/* Lignes de grille */}
        <div className="absolute left-8 right-0 top-0 bottom-0 flex flex-col justify-between">
          <div className="border-t border-dashed border-muted h-0"></div>
          <div className="border-t border-dashed border-muted h-0"></div>
          <div className="border-t border-dashed border-muted h-0"></div>
        </div>

        {/* Points et lignes du graphique */}
        <div className="absolute left-8 right-0 top-0 bottom-0">
          <svg className="w-full h-full">
            <polyline
              points={history
                .map((entry, index) => {
                  const x = (index / (history.length - 1)) * 100 + "%"
                  const y = ((yMax - entry.weight) / (yMax - yMin)) * 100 + "%"
                  return `${x},${y}`
                })
                .join(" ")}
              fill="none"
              stroke={goal === "lose" ? "#10b981" : goal === "gain" ? "#3b82f6" : "#6b7280"}
              strokeWidth="2"
            />
            {history.map((entry, index) => {
              const x = (index / (history.length - 1)) * 100 + "%"
              const y = ((yMax - entry.weight) / (yMax - yMin)) * 100 + "%"
              return (
                <circle
                  key={index}
                  cx={x}
                  cy={y}
                  r="3"
                  fill={goal === "lose" ? "#10b981" : goal === "gain" ? "#3b82f6" : "#6b7280"}
                />
              )
            })}
          </svg>
        </div>

        {/* Axe X */}
        <div className="absolute left-8 right-0 bottom-0 flex justify-between text-xs text-muted-foreground">
          {history.length > 5
            ? [0, Math.floor(history.length / 2), history.length - 1].map((index) => (
                <span key={index}>{formatDate(history[index].date)}</span>
              ))
            : history.map((entry, index) => <span key={index}>{formatDate(entry.date)}</span>)}
        </div>
      </div>
    </div>
  )
}

