import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const TaskMenu = (props) => {
  return (
    <DropdownButton className="my-1" title="Menu">
      <Dropdown.Item onClick={props.changeEditStatus}>Edit</Dropdown.Item>
      <Dropdown.Item onClick={props.changeCompleteStatus}>
        {props.completeStatus}
      </Dropdown.Item>
      <Dropdown.Item onClick={props.deleteTask}>Delete</Dropdown.Item>
    </DropdownButton>
  );
};

export default TaskMenu;
