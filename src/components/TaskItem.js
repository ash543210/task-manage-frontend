import TaskMenu from "./TaskMenu";
import React, { useReducer } from "react";
import { ListGroup } from "react-bootstrap";
import EditTask from "./EditTask";

const reducer = (state, action) => {
  if (action.type === "markComplete") {
    return {
      ...state,
      isComplete: true,
      completeStatus: "Mark as Incomplete",
    };
  } else if (action.type === "markIncomplete") {
    return {
      ...state,
      isComplete: false,
      completeStatus: "Mark as Complete",
    };
  } else if (action.type === "changeIsEditing") {
    return {
      ...state,
      isEditing: !state.isEditing,
    };
  } else if (action.type === "updateTask") {
    return {
      ...state,
      isEditing: !state.isEditing,
      task: action.task,
    };
  } else if (action.type === "deleteTask") {
    return {
      ...state,
      isEditing: !state.isEditing,
      task: action.task,
    };
  }
};

const TaskItem = (props) => {
  const [state, dispatch] = useReducer(reducer, {
    isComplete: props.task.completed,
    completeStatus: props.task.completed
      ? "Mark as Incomplete"
      : "Mark as Complete",
    isEditing: false,
    task: props.task,
  });
  const changeCompleteStatus = async (event) => {
    event.preventDefault();
    if (state.isComplete === false) {
      dispatch({ type: "markComplete" });
      await fetch("https://task-manager-server-4tfz.onrender.com/", {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ ...state.task, completed: true }),
      });
    } else {
      dispatch({ type: "markIncomplete" });
      await fetch("https://task-manager-server-4tfz.onrender.com/", {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ ...state.task, completed: false }),
      });
    }
  };

  const changeEditStatus = (event) => {
    event.preventDefault();
    dispatch({ type: "changeIsEditing" });
  };

  const updateTask = (newTask) => {
    dispatch({ type: "updateTask", task: newTask });
  };

  const deleteTask = async (event) => {
    event.preventDefault();
    dispatch({ type: "deleteTask", task: undefined });
    await fetch("https://task-manager-server-4tfz.onrender.com/", {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ _id: state.task._id }),
    });
  };

  return (
    <React.Fragment>
      {state.task && (
        <ListGroup.Item
          className={state.isComplete ? "bg-success-subtle" : ""}
          key={props.task._id}>
          {state.isEditing ? (
            <EditTask updateTask={updateTask} task={state.task} />
          ) : (
            <React.Fragment>
              <h3 className="text-primary">{state.task.title}</h3>
              <h6 className="text-info">{state.task.description}</h6>
            </React.Fragment>
          )}
          <TaskMenu
            changeCompleteStatus={changeCompleteStatus}
            completeStatus={state.completeStatus}
            changeEditStatus={changeEditStatus}
            deleteTask={deleteTask}
          />
        </ListGroup.Item>
      )}
    </React.Fragment>
  );
};

export default TaskItem;
