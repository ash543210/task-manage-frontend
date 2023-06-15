import { ListGroup } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import TaskItem from "./TaskItem";

const Task = ({ tasks }) => {
  return (
    <Card className="mx-auto my-4" style={{ width: "90%" }}>
      <Card.Body>
        <Card.Title>Tasks</Card.Title>
        {tasks.length > 0 ? (
          <ListGroup>
            {tasks.map((x, i) => {
              return <TaskItem key={x._id} task={x} />;
            })}
          </ListGroup>
        ) : (
          <h1 className="text-danger">No tasks, please create a new task!</h1>
        )}
      </Card.Body>
    </Card>
  );
};

export default Task;
