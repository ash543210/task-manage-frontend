import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useRef } from "react";

const EditTask = (props) => {
  const title = useRef();
  const description = useRef();

  const saveEdit = async (event) => {
    event.preventDefault();
    const newTask = {
      title: title.current.value,
      description: description.current.value,
      _id: props.task._id,
    };
    props.updateTask(newTask);

    await fetch("https://task-manager-server-4tfz.onrender.com/", {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newTask),
    });
  };

  return (
    <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Task Title</Form.Label>
        <Form.Control
          ref={title}
          type="textarea"
          defaultValue={props.task.title}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Task description</Form.Label>
        <Form.Control
          ref={description}
          defaultValue={props.task.description}
          as="textarea"
          rows={3}
        />
      </Form.Group>
      <Button onClick={saveEdit} variant="primary" type="submit">
        Save
      </Button>
    </Form>
  );
};

export default EditTask;
