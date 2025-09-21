import { NextResponse, NextRequest } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { auth } from "@clerk/nextjs/server";

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Récupérer la liste de toutes les tâches
 *     description: |
 *       Retourne la liste complète de toutes les tâches enregistrées en base de données,
 *       triées par date de création décroissante (plus récent en premier).
 *     tags:
 *       - Tâches
 *     responses:
 *       200:
 *         description: Liste des tâches récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Task'
 *                 message:
 *                   type: string
 *                   example: "3 tâche(s) trouvée(s)"
 *             examples:
 *               liste_vide:
 *                 summary: Liste vide
 *                 value:
 *                   success: true
 *                   data: []
 *                   message: "0 tâche(s) trouvée(s)"
 *               liste_avec_taches:
 *                 summary: Liste avec tâches
 *                 value:
 *                   success: true
 *                   data:
 *                     - id: 1
 *                       title: "Acheter du lait"
 *                       description: "Aller au supermarché pour acheter du lait"
 *                       dueDate: "2024-01-20T10:00:00.000Z"
 *                       createdAt: "2024-01-15T10:30:00.000Z"
 *                       updatedAt: "2024-01-15T10:30:00.000Z"
 *                     - id: 2
 *                       title: "Préparer la réunion"
 *                       description: "Créer une présentation pour la réunion de lundi"
 *                       dueDate: "2024-01-22T09:00:00.000Z"
 *                       createdAt: "2024-01-15T10:25:00.000Z"
 *                       updatedAt: "2024-01-15T10:25:00.000Z"
 *                   message: "2 tâche(s) trouvée(s)"
 *       500:
 *         description: Erreur serveur lors de la récupération
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               error: "Erreur lors de la récupération des tâches"
 *   post:
 *     summary: Créer une nouvelle tâche
 *     description: |
 *       Permet de créer une nouvelle tâche en fournissant un titre, une description,
 *       et éventuellement une date d'échéance.
 *     tags:
 *       - Tâches
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Le titre de la tâche
 *                 example: "Acheter du lait"
 *               description:
 *                 type: string
 *                 description: La description de la tâche
 *                 example: "Aller au supermarché pour acheter du lait"
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *                 description: La date d'échéance de la tâche
 *                 example: "2024-01-20T10:00:00.000Z"
 *     responses:
 *       201:
 *         description: Tâche créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Task'
 *                 message:
 *                   type: string
 *                   example: "Tâche créée avec succès"
 *       400:
 *         description: Erreur de validation des données
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               titre_manquant:
 *                 summary: Titre manquant
 *                 value:
 *                   success: false
 *                   error: "Le titre de la tâche est requis et doit être une chaîne non vide"
 *               description_manquante:
 *                 summary: Description manquante
 *                 value:
 *                   success: false
 *                   error: "La description de la tâche est obligatoire"
 *       500:
 *         description: Erreur serveur lors de la création
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               error: "Erreur lors de la création de la tâche"
 */
export async function GET() {
    const { userId } = await auth(); // côté serveur
    if (!userId) return new Response("Unauthorized", { status:401 });

    try {

        const tasks = await prisma.task.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        })

        return NextResponse.json({
            success: true,
            data: tasks,
            message: `${tasks.length} tache(s) trouvée(s)`
        })
    } catch (err) {
        console.error('Erreur lors de la récupération des taches : ', err)
        return NextResponse.json(
            {
                success: false,
                error: 'Erreur lors de la récupération des taches'
            },
            { status: 500 }
        )
    }
}



/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Créer une nouvelle tâche
 *     description: |
 *       Permet de créer une nouvelle tâche en fournissant un titre, une description,
 *       et éventuellement une date d'échéance.
 *     tags:
 *       - Tâches
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *                 description: Le titre de la tâche.
 *                 example: "Acheter du lait"
 *               description:
 *                 type: string
 *                 description: La description de la tâche.
 *                 example: "Aller au supermarché pour acheter du lait"
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *                 description: La date d'échéance de la tâche (facultatif).
 *                 example: "2024-01-20T10:00:00.000Z"
 *     responses:
 *       201:
 *         description: Tâche créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Task'
 *                 message:
 *                   type: string
 *                   example: "tache créée avec succès"
 *       400:
 *         description: Erreur de validation des données
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Le titre de la tache est requis et doit être une chaîne non vide"
 *       500:
 *         description: Erreur serveur lors de la création
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Erreur lors de la création du tache"
 */
export async function POST(request: NextRequest) {
    const { userId } = await auth(); // côté serveur
    if (!userId) return new Response("Unauthorized", { status:401 });
    
    try {
        const body = await request.json()
        const { title, description, dueDate } = body


        // Validation des données
        if (!title || typeof title !== 'string' || title.trim().length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Le titre de la tache est requis et doit être une chaîne non vide'
                },
                { status: 400 }
            )
        }

        if (!description || typeof description !== 'string' || description.trim().length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'La description de la tache est obligatoire'
                },
                { status: 400 }
            )
        }


        // Créer le tache
        // Correction pour la date d'échéance
        let newDate: Date | undefined = undefined;
        if (dueDate) {
            // Vérifier si la chaîne est valide avant de créer un objet Date
            const parsedDate = new Date(dueDate);
            if (!isNaN(parsedDate.getTime())) {
                newDate = parsedDate;
            } else {
                return NextResponse.json(
                    {
                        success: false,
                        error: "Format de date d'échéance invalide"
                    },
                    { status: 400 }
                );
            }
        }

        // Créer la tache
        const task = await prisma.task.create({
            data: {
                title: title.trim(),
                description: description.trim(),
                dueDate: newDate,
            }
        });

        return NextResponse.json(
            {
                success: true,
                data: task,
                message: 'tache créé avec succès'
            },
            { status: 201 }
        )

    } catch (error) {
        console.error('Erreur lors de la création du tache:', error)
        return NextResponse.json(
            {
                success: false,
                error: 'Erreur lors de la création du tache'
            },
            { status: 500 }
        )
    }
}

