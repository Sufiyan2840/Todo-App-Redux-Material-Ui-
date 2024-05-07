import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import TextField from '@mui/material/TextField';
import Button from 'react-bootstrap/Button'; // Import Button component from Bootstrap
import Modal from 'react-bootstrap/Modal'; // Import Modal component from Bootstrap
import { useDispatch, useSelector } from 'react-redux';
import { Remove, Update_data } from "../redux/actions/action";
import 'bootstrap/dist/css/bootstrap.css';

const Todo = () => {
    const { User_data } = useSelector((state) => state.todoreducers);
    const dispatch = useDispatch();
    const [editedText, setEditedText] = useState("");
    const [editIndex, setEditIndex] = useState(null);
    const [update, setUpdate] = useState("");
    const [show, setShow] = useState(false);
    const [ind, setInd] = useState("");
    const [completedTasks, setCompletedTasks] = useState([]);

    const handleShow = (el) => {
        setShow(true);
        setUpdate(el);
    };

    const handleClose = () => setShow(false);

    const remove = (id) => {
        dispatch(Remove(id));
    };

    const handleEdit = (index) => {
        setEditIndex(index);
        setEditedText(User_data[index]);
    };

    const saveEdit = () => {
        setEditIndex(null);
        setEditedText("");
    };

    const usertask_update = () => {
        dispatch(Update_data(update, ind));
        handleClose();
    };

    const toggleCompletion = (index) => {
        const updatedTasks = [...completedTasks];
        if (updatedTasks.includes(index)) {
            updatedTasks.splice(updatedTasks.indexOf(index), 1);
        } else {
            updatedTasks.push(index);
        }
        setCompletedTasks(updatedTasks);
    };

    const isTaskCompleted = (index) => completedTasks.includes(index);

    return (
        <div className='todo_data col-lg-5 mx-auto'>
            {User_data.map((ele, k) => (
                <div className='todo_container mb-2 d-flex justify-content-between align-items-center px-2' key={k} style={{ background: "#dcdde1", borderRadius: "3px", height: "45px", marginBottom: "10px" }}>
                    {editIndex === k ? (
                        <TextField
                            value={editedText}
                            onChange={(e) => setEditedText(e.target.value)}
                            variant="outlined"
                            size="small"
                            fullWidth
                        />
                    ) : (
                        <div style={{ display: "flex", alignItems: "center", flex: "1" }}>
                            <li
                                style={{
                                    listStyle: "none",
                                    flex: "1",
                                    textDecoration: isTaskCompleted(k) ? "line-through" : "none",
                                    pointerEvents: isTaskCompleted(k) ? "none" : "auto" // Disable pointer events if task is completed
                                }}
                            >
                                {ele}
                            </li>
                            <div className='edit_dlt col-lg-3 d-flex justify-content-end'>
                                <TaskAltIcon
                                    style={{
                                        color: "green",
                                        cursor: "pointer",
                                        opacity: isTaskCompleted(k) ? 0.5 : 1
                                    }}
                                    onClick={() => toggleCompletion(k)}
                                />
                                <EditIcon
                                    onClick={() => {
                                        handleShow(ele);
                                        setInd(k);
                                    }}
                                    style={{ color: "#207db6", cursor: "pointer", marginLeft: "5px" }}
                                />
                                <DeleteIcon
                                    onClick={() => remove(k)}
                                    style={{ color: "red", cursor: "pointer", marginLeft: "5px" }}
                                />
                            </div>
                        </div>
                    )}
                </div>
            ))}

            {/* Modal component */}
            <Modal show={show} onHide={handleClose}>
                <h3 className='text-center mt-2'>Update Your Task</h3>
                <Modal.Header >
                    <div className="todo col-lg-5 mx-auto d-flex justify-content-between align align-items-center">
                        <input name="task" value={update} onChange={(e) => setUpdate(e.target.value)} className='form-control col-lg-5 mt-2' />
                    </div>
                </Modal.Header>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => usertask_update()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Todo;
