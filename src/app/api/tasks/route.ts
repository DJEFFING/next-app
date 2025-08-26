import { NextResponse, NextRequest } from "next/server";
import { prisma } from "../../../../lib/prisma";


export async function GET() {
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


export async function POST(request: NextRequest) {
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
        // Créez un nouvel objet Date
        const newDate = (dueDate) ? new Date(dueDate) : dueDate;
        const task = await prisma.task.create({
            data: {
                title: title.trim(),
                description: description.trim(),
                dueDate: newDate
            }
        })

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

