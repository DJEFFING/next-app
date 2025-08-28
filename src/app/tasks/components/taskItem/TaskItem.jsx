import Styles from "./TaskItem.module.css";
// Ce composant est utilisé pour afficher une tâche
export const TaskItem = ({ task, editTask, deleteTask }) => {
  return (
    <li
      className={` ${Styles.container} ${
        task?.completed ? Styles.success : Styles.default
      }`}
      onClick={() => editTask(task.id, task.completed)}
    >
      <div className={Styles.item}>
        <div
          className={`${Styles.id} ${
            task?.completed ? Styles.idSuccess : Styles.idDefault
          }`}
        >
          {task.id}
        </div>
        <div
          className={
            task?.completed ? Styles.contentSuccess : Styles.contentDefault
          }
        >
          {task.title}
          <p className={Styles.description}>{task.description}</p>
        </div>
      </div>
      <button
        className="button-primary"
        onClick={(e) => {
          e.stopPropagation(); // Empêche l'événement de se propager à l'élément parent
          deleteTask(task.id);
        }}
      >
        X
      </button>
    </li>
  );
};
