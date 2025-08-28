"use client";

// Ce composant est utiliser pour afficher l'intergraliter des taches
import { useEffect, useState } from "react";
import { Footer } from "./footer/Footer";
import { Header } from "./header/Header";
import { TaskInput } from "./taskInput/taskInput";
import { TaskList } from "./taskList/TaskList";
import {Task} from "../../models/task"
import { POST } from "@/app/api/tasks/route";

export const TaskContainer = () => {
  const [taskList, setTaskList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Foncontion pour avoir la liste des taches
  const getTask = async () =>{
    setIsLoading(true);
    try{
      const response  = await fetch("/api/tasks", {cache:"no-store"});
      
      const json = await response.json();
      if(!response.ok || json.success !==true){
        throw new Error(json.error || "Erreur lors du chargement")
      }
      setTaskList(json.data)
      // console.log("Liste des tache response", json)

    }catch(err){
      setError(err.message);

    }finally{
      setIsLoading(false);
    }
  };

  // Chargement des taches
  useEffect(() => {
    getTask()
  }, [])

  // Fonction pour ajouter une tache
  // On recupere le titre de la tache et on l'ajoute à la liste des taches
  const addTask = async (title, description, dueDate) => {
    try{
      const newTask = {
        title: title.trim(),
        description: description.trim(),
        dueDate: dueDate,
        // completed: false,
    };

    // Correction : Utiliser JSON.stringify une seule fois sur l'objet newTask
    const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask)
    });
      
      const json = await res.json()
      if (!response.ok || json.success !== true) {
      throw new Error(json.error || "Création impossible")
    } 
  } catch (err) {
    setError(err.message)
  } finally {
    getTask();
  }


    //setTaskList([...taskList, newTask]);
  };

 

  // Fonction pour editer une tache
  // On recupere l'id de la tache et on la met à jour
  const editTask =  async (id, completedValue) => {
    try{
    const task = taskList.find(task => task.id = id);
    const response = await fetch(`/api/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({completed : !(task.completed)})
  });
  const json = await res.json()
      if (!response.ok || json.success !== true) {
      throw new Error(json.error || "Création impossible")
    } 
  } catch (err) {
    setError(err.message)
  } finally {
    getTask();
  }

    // setTaskList(
    //   taskList.map((task) => 
    //     task.id === id ? { ...task, completed: !completedValue } : task
    //   )
    // );
  };

  // Fonction pour supprimer une tache
  // On recupere l'id de la tache et on la supprime de la liste des taches
  // On utilise la fonction filter pour supprimer la tache
  const deleteTask = (id) => {
    setTaskList(taskList.filter((task) => task.id !== id));
  };

  // Fonction pour recuperer le nombre de taches completes et non completes
  // On utilise la fonction filter pour recuperer le nombre de taches completes et non completes
  // On utilise la fonction length pour recuperer le nombre de taches
  const getTaskCounts = () => {
    const completedTask = taskList.filter((task) => task.completed).length;
    const uncompletedTask = taskList.filter((task) => !task.completed).length;
    return {
      completedTask,
      uncompletedTask,
    };
  };

  const { completedTask, uncompletedTask } = getTaskCounts();
  // console.log("Taches completes : ", completedTask, "Taches non completes : ", uncompletedTask);

  return (
    <main>
      <Header />
      <TaskInput addTask={addTask} />

      <TaskList
        taskList={taskList}
        isLoading = {isLoading}
        editTask={editTask}
        deleteTask={deleteTask}
        completedTask ={completedTask}
        uncompletedTask={uncompletedTask}
      />

      <Footer completedTask={completedTask} />
    </main>
  );
};
