// Ce composant est utilisé pour afficher le champ de saisie de tâche.
import {useState} from 'react';
import styles from "./TaskInput.module.css";

export const TaskInput = ( {addTask})  => {
  const [taskTitle, setTaskTitle] = useState(""); // useState est un hook qui permet de gerer l'etat d'un composant
  const [taskDesciption, setTaskDesciption] = useState("");
  const [dueDate, setDueDate] =  useState("")
  
  // console.log(addTask);
  
  // Fonction pour gerer le changement de valeur de l'input
  // On recupere la valeur de l'input et on la met dans le state
  // On utilise la fonction setTaskTitle pour mettre à jour le state
  const handleInputChange = (e) =>{
    setTaskTitle(e.target.value);
  };

  const handletaskDesciptionChange = (e) =>{
    setTaskDesciption(e.target.value);
  };
  
  const handledueDateChange = (e) =>{
    setDueDate(e.target.value);
  };

  // Fonction pour ajouter une tache
  const handleAddTask = async (e) => {
    e.preventDefault();

    // On verifie si le titre de la tache n'est pas vide
    // Si il n'est pas vide, on ajoute la tache
    if(taskTitle.trim() && taskDesciption.trim()) {
      await addTask(taskTitle, taskDesciption, dueDate);
      // setTaskTitle("");
      // setTaskDesciption("")
      // setDueDate("")
    }
    
  }

  return (
    <div className={`box ${styles.element}`}>
      <h2 className={styles.title}>Ajouter la prochaine tache</h2>
      <form className={styles.container} onSubmit={handleAddTask}>
        <input
         type="text"
         className={styles.input}
         placeholder='Indiquez un titre de tache explicite.'
         onChange={handleInputChange}
         value={taskTitle}
        />
        <input
         type="text"
         className={styles.input}
         placeholder='Indiquez une Description'
         onChange={handletaskDesciptionChange}
         value={taskDesciption}
        />
        <input
         type="date"
         className={styles.input}
         placeholder='Indiquez une Date'
         onChange={handledueDateChange}
         value={dueDate}
         
        />
        <button type='submit' className='button-primary'>
          Ajouter
        </button>
      </form>
    </div>
  );
};
