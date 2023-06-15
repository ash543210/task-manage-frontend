import { useRef, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useLoaderData } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Task from "./Task";

const TasksList = () => {
  const data = useLoaderData();
  const [titleError, setTitleError] = useState(null);
  const [descriptionError, setDescriptionError] = useState(null);
  const [tasks, setTasks] = useState(data.tasks);
  const title = useRef();
  const description = useRef();

  const submitNewTask = async (event) => {
    event.preventDefault();
    if (
      title.current.value.length === 0 &&
      description.current.value.length === 0
    ) {
      setTitleError("Please enter valid title");
      setDescriptionError("Please enter valid description");
      return;
    } else if (title.current.value.length === 0) {
      setTitleError("Please enter valid title");
      setDescriptionError(null);
      return;
    } else if (description.current.value.length === 0) {
      setDescriptionError("Please enter valid description");
      setTitleError(null);

      return;
    }
    const newTask = {
      title: title.current.value,
      description: description.current.value,
      completed: false,
    };
    const result = await fetch(
      "https://648b5c578ff4be0008a27c29--sweet-valkyrie-facc31.netlify.app/.netlify/functions/api",
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newTask),
      }
    );
    const data = await result.json();
    title.current.value = "";
    description.current.value = "";
    setTasks((prevState) => [...prevState, data.task]);
    setTitleError(null);
    setDescriptionError(null);
  };
  return (
    <Container fluid className="px-0">
      <h1>{data.hello}</h1>

      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
        </Nav>
      </Navbar>
      <Card className="mx-auto my-4" style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>New Task</Card.Title>
          {/* <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle> */}
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Task Title</Form.Label>
              <Form.Control ref={title} type="textarea" placeholder="" />
              {titleError ? (
                <p className="text-danger">{titleError}</p>
              ) : (
                <p></p>
              )}
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1">
              <Form.Label>Task description</Form.Label>
              <Form.Control ref={description} as="textarea" rows={3} />
              {descriptionError ? (
                <p className="text-danger">{descriptionError}</p>
              ) : (
                <p></p>
              )}
            </Form.Group>
            <Button onClick={submitNewTask} variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <Task tasks={tasks} />
    </Container>
  );
};

export default TasksList;
