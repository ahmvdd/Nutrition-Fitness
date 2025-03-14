import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Mail, User } from "lucide-react"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary/20 p-4 md:p-8">
      <div className="mx-auto max-w-3xl space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">À propos</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">Informations sur le développeur et l'application</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">FitTrack Pro</CardTitle>
            <CardDescription>Une application avancée de suivi de nutrition et fitness</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Fonctionnalités</h3>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                <li>Évaluation complète de santé et forme physique</li>
                <li>Plans nutritionnels personnalisés</li>
                <li>Programmes d'entraînement adaptés à votre niveau</li>
                <li>Suivi des progrès avec visualisations</li>
                <li>Mode sombre pour une utilisation confortable</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium">Développeur</h3>
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Ahmed Sayeh</p>
                  <p className="text-sm text-muted-foreground">Développeur Full Stack</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Link
                      href="https://ahmedsayehdev.vercel.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline flex items-center"
                    >
                      <ExternalLink className="h-3.5 w-3.5 mr-1" />
                      Portfolio
                    </Link>
                    <Link
                      href="https://github.com/ahmedsayeh"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline flex items-center"
                    >
                      <Github className="h-3.5 w-3.5 mr-1" />
                      GitHub
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-primary/5 p-4">
              <p className="text-sm">
                Cette application a été développée pour fournir une solution complète de suivi de santé et fitness. Elle
                utilise des algorithmes avancés pour calculer vos besoins nutritionnels et créer des plans
                d'entraînement personnalisés en fonction de vos objectifs.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:space-y-0">
            <Link href="/" passHref>
              <Button variant="outline">Retour à l'accueil</Button>
            </Link>
            <Link href="https://ahmedsayehdev.vercel.app" target="_blank" rel="noopener noreferrer">
              <Button className="w-full sm:w-auto">
                Visiter mon site web
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact</CardTitle>
            <CardDescription>Vous avez des questions ou des suggestions ?</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-2">
              <Link href="mailto:contact@ahmedsayeh.com" className="flex items-center text-primary hover:underline">
                <Mail className="mr-2 h-4 w-4" />
                contact@ahmedsayeh.com
              </Link>
              <p className="text-sm text-muted-foreground mt-2">
                N'hésitez pas à me contacter pour toute question concernant cette application ou pour discuter de
                projets de développement web.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

