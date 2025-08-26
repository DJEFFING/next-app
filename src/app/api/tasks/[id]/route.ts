import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../../lib/prisma'

/**
 * @swagger
 * /api/tasks/{id}:
 *   get:
 *     summary: Récupérer une tâche par son ID
 *     description: |
 *       Retourne une tâche unique en se basant sur son identifiant.
 *     tags:
 *       - Tâches
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: L'identifiant de la tâche.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Tâche trouvée avec succès
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
 *                   example: "tache trouvée !"
 *       404:
 *         description: Tâche non trouvée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               error: "Tache non trouvé"
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               error: "Erreur lors de la récupération des taches"
 */
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


/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Supprimer une tâche
 *     description: |
 *       Supprime une tâche spécifique en utilisant son ID.
 *     tags:
 *       - Tâches
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: L'identifiant de la tâche à supprimer.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Tâche supprimée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Tache 'Acheter du lait' supprimé avec succès"
 *       400:
 *         description: ID de tâche invalide
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               error: "ID de la tache invalide"
 *       404:
 *         description: Tâche non trouvée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               error: "tache non trouvé"
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               error: "Erreur lors de la suppression de la tache"
 */
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



/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Mettre à jour une tâche
 *     description: |
 *       Met à jour une tâche existante en utilisant son ID.
 *       Seuls les champs fournis dans le corps de la requête seront mis à jour.
 *     tags:
 *       - Tâches
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: L'identifiant de la tâche à mettre à jour.
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Acheter des œufs"
 *               description:
 *                 type: string
 *                 example: "Préparer un gâteau pour le weekend"
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-01-25T15:00:00.000Z"
 *               completed:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Tâche mise à jour avec succès
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
 *                   example: "Tache modifié avec succès"
 *       400:
 *         description: Données de mise à jour invalides
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               error: "Le titre est requis et doit être une chaîne non vide"
 *       404:
 *         description: Tâche non trouvée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               error: "Tache non trouvé"
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               error: "Erreur lors de la modification de la tache"
 */
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