import { TaskItem } from "../taskItem/TaskItem";
import styles from "./TaskList.module.css";

export const TaskList = ({
  taskList,
  isLoading,
  editTask,
  deleteTask,
  uncompletedTask,
}) => {
  
  if (isLoading) {
    return (
    <div className="box">
      <p className={styles.title}>Chargement......</p>
    </div>);
  }

  
  const tasksList = taskList.map((task) => (
    <TaskItem
      key={task.id}
      task={task}
      editTask={editTask}
      deleteTask={deleteTask}
    />
  ));

  if (!isLoading && taskList.length == 0) {
    return (
      <div className="box">
        <h2 className={styles.title}>
          🖖Salut ! tu n'as rien à faire pour le moment, tu peux te reposer.
        </h2>
      </div>
    );
  }

  if (taskList && taskList.length > 0) {
    return (
      <div className="box">
        <h2 className={styles.title}>
          {uncompletedTask > 0 && (
            <>
              {" "}
              Il te reste encore {uncompletedTask} taches à faire ou a acomplir
            </>
          )}

          {uncompletedTask === 0 && (
            <> 👍 Bravo Tu as accomplir toute tes taches !</>
          )}
        </h2>
        {taskList && taskList.length > 0 && (
          <ul className={styles.container}> {tasksList} </ul>
        )}
      </div>
    );
  }
};
