import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Laboratoire 2 - API REST',
      version: '1.0.0',
      description: 'Documentation des services web REST pour la gestion des Taches',
      contact: {
        name: 'Équipe de développement',
        email: 'tsafackjefferson2001@exemple.com'
      }
    },
    servers: [
      {
        url: process.env.NODE_ENV === 'production' 
          ? 'https://custom-nextapp-service-828991456458.us-central1.run.app'
          : 'http://localhost:3000',
        description: process.env.NODE_ENV === 'production' 
          ? 'Serveur de production' 
          : 'Serveur de développement'
      }
    ],
    components: {
      schemas: {
        Task: {
          type: 'object',
          required: ['id', 'title', 'description', 'completed', 'dueDate', 'createdAt', 'updatedAt'],
          properties: {
            id: {
              type: 'integer',
              description: 'Identifiant unique de la tâche',
              example: 1
            },
            title: {
              type: 'string',
              description: 'Titre de la tâche',
              example: 'Acheter des courses'
            },
            description: {
              type: 'string',
              description: 'Description de la tâche',
              example: 'Acheter du lait, du pain et des œufs'
            },
            completed: {
              type: 'boolean',
              description: 'Statut de la tâche (complétée ou non)',
              example: false
            },
            dueDate: {
              type: 'string',
              format: 'date-time',
              description: 'Date limite pour compléter la tâche',
              example: '2024-01-20T10:30:00.000Z'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Date de création de la tâche',
              example: '2024-01-15T10:30:00.000Z'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Date de dernière modification de la tâche',
              example: '2024-01-15T11:45:00.000Z'
            }
          }
        },
        TaskInput: {
          type: 'object',
          required: ['title', 'description'],
          properties: {
            title: {
              type: 'string',
              description: 'Titre de la tâche',
              example: 'Acheter des courses',
              minLength: 1
            },
            description: {
              type: 'string',
              description: 'Description de la tâche',
              example: 'Acheter du lait, du pain et des œufs',
              minLength: 1
            },
            completed: {
              type: 'boolean',
              description: 'Statut de la tâche (complétée ou non)',
              example: false
            },
            dueDate: {
              type: 'string',
              format: 'date-time',
              description: 'Date limite pour compléter la tâche',
              example: '2024-01-20T10:30:00.000Z'
            }
          }
        },
        SuccessResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true
            },
            data: {
              type: 'object',
              description: 'Données de la réponse'
            },
            message: {
              type: 'string',
              description: 'Message descriptif',
              example: 'Opération réussie'
            }
          }
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false
            },
            error: {
              type: 'string',
              description: 'Message d\'erreur',
              example: 'Une erreur est survenue'
            }
          }
        }
      }
    }
  },
  apis: [
    './src/app/api/**/*.ts',  // pour dev
    './src/app/api/**/*.js',
    './app/api/**/*.js',
    './src/pages/api/**/*.js'
  ]
};

export const swaggerSpec = swaggerJSDoc(options)