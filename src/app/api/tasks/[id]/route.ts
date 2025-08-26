import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../../lib/prisma'

export async function GET(
    request: NextRequest,
    {params}: {params:{id: string}}
){

    try{
        const id = parseInt(params.id);
        const task =  await findTaskById(id);

        if (!task) {
            return NextResponse.json(
              {
                success: false,
                error: 'Tache non trouvé'
              },
              { status: 404 }
            )
        }

        return NextResponse.json({
            success: true,
            data: task,
            message: ` tache trouvée !`
        })

    }catch(err){
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

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id)

        // Validation de l'ID
        if (isNaN(id) || id <= 0) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'ID de la tache invalide'
                },
                { status: 400 }
            )
        }

        // Vérifier si la tache existe
        const existingTask = await prisma.task.findUnique({
            where: { id }
        })

        if (!existingTask) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'tache non trouvé'
                },
                { status: 404 }
            )
        }

        // Supprimer la tache
        await prisma.task.delete({
            where: { id }
        })

        return NextResponse.json({
            success: true,
            message: `Tache "${existingTask.title}" supprimé avec succès`
        })
    } catch (error) {
        console.error('Erreur lors de la suppression de la tache:', error)
        return NextResponse.json(
            {
                success: false,
                error: 'Erreur lors de la suppression de la tache'
            },
            { status: 500 }
        )
    }
}


export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
  ) {
    try {
      const id = parseInt(params.id)
  
      // Validation de l'ID
      if (isNaN(id) || id <= 0) {
        return NextResponse.json(
          {
            success: false,
            error: 'ID de la tache invalide'
          },
          { status: 400 }
        )
      }
  
      // Vérifier si la tache existe
      const task = await findTaskById(id);
  
      if (!task) {
        return NextResponse.json(
          {
            success: false,
            error: 'Tache non trouvé'
          },
          { status: 404 }
        )
      }
  
      const body = await request.json()
      const { title, description, dueDate, completed } = body
  
      // Validation des données
      if (title && (typeof title !== 'string' || title.trim().length === 0) ) {
        return NextResponse.json(
          {
            success: false,
            error: 'Le titre est requis et doit être une chaîne non vide'
          },
          { status: 400 }
        )
      }
  
      if (description && (typeof description !== 'string' || description.trim().length === 0)) {
        return NextResponse.json(
          {
            success: false,
            error: 'La descript est requis et doit être une chaîne non vide'
          },
          { status: 400 }
        )
      }
  
      // Mettre à jour le produit
      const newDate = (dueDate)? new Date(dueDate) : dueDate;
      const updatedTask = await prisma.task.update({
        where: { id },
        data: {
          title: (title) ? title.trim() : task?.title,
          description: (description)? description.trim() : task?.description,
          dueDate : (newDate) ? newDate : task?.dueDate,
          completed: (completed) ? completed : task?.completed
        }
      })
  
      return NextResponse.json({
        success: true,
        data: updatedTask,
        message: 'Tache modifié avec succès'
      })
    } catch (error) {
      console.error('Erreur lors de la modification de la tache:', error)
      return NextResponse.json(
        {
          success: false,
          error: 'Erreur lors de la modification de la tache'
        },
        { status: 500 }
      )
    }
}

async function  findTaskById(taskId: number){
    try{
        const task = await prisma.task.findUnique({
            where: {id: taskId}
        });
        return task;
    }catch(err){
        console.error('Erreur lors de la recherche de la tâche:', err);
    return null; // Retourne null en cas d'erreur pour une gestion plus simple
    }
}