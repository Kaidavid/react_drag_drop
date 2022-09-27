import React, { useState } from 'react';

import './Item.css';
import { Card, Button, Navbar } from 'react-bootstrap';
import OurFunctions from './OurFunctions';

// Given a list of objects, add an incoming object into it or 
// replace the already existing object
function filterArr(arr, selected) {
    if (arr.length === 0) {
        return [...arr, selected]
    }

    else if (arr.length === 1) {
        if (arr[0].category === selected.category) {
        	arr.splice(0,1)
        }
        return [...arr, selected]

    }
    else {
        if (arr[0].category === selected.category) {
        	arr.splice(0,1)   
        }
        else {
            arr.splice(1,1)
        }
		return [...arr, selected]
    }
}

// Extract cards of the data and function blocks that are not
// dropped in the boxes
function remaining_data(data, selected) {
    let arr = []
    if (selected.length === 0) {
        return data
    }
    else {
        for (let x of data) {
            if (selected.filter(obj => obj.name === x.name).length === 0) {
                arr.push(x)
            }
        }
    }
    return arr
}


function MainBoard(props) {

    const [selected, setSelected] = useState([])
    const [dragged, setDragged] = useState({})
    const [newdata, setNewData] = useState({})

    // Implementation of the boxes where drop occurs
    function Box (props) {

        const [border, setBorder] = useState("");
         
        const onDragLeave = () => setBorder("")
        const onDragOver = (e) => e.preventDefault();
    
        const onDragEnter = () => {
            if ((props.category === "data" && props.title === "Input") || (props.category === "func" && props.title === "Function")) {
                setBorder("3px solid green")
            }
            else if ((props.category === "data" && props.title === "Function") || (props.category === "func" && props.title === "Input")) {
                setBorder("3px solid red")
            }
            
        }

        // Remove the dropped item from the board and hold it as selected item
        const onDrop = () => {
            if (border === "3px solid green") {
                setSelected(filterArr(selected, dragged))
            }
            setBorder("")
        }

        var dragged_item = selected.length !== 0 ? selected[selected.length - 1] : {};
        
        return (      
            <div className="boxes col-md-2 offset-sm-1 offset-md-0" style={{border: border, backgroundColor: "lightslategray"}} onDragOver={onDragOver} onDragEnter={onDragEnter} onDragLeave={onDragLeave} onDrop={onDrop}>
                {props.title}
                {props.title === dragged_item.title &&

                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16" style={{float: "right"}}>
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
                    
                    <div className="inserted d-flex justify-content-center">
                        {dragged_item.name}
                    </div>
                </div>
                }
            </div>
        )
    }
    
    // Separate your remaining data and function items after dropping one 
    const input_data = remaining_data([...props.data, newdata], selected).filter(obj => (obj.category === "data"));
    const func_names = remaining_data([...props.data, newdata], selected).filter(obj => (obj.category === "func"));

    // Capture the dragged item
    const onDragStart = (e) => {
        if ((input_data.filter(obj => obj.name === e.target.innerText).length !== 0)) {
            setDragged({name: `${e.target.innerText}`, category: "data", title:"Input"})
        }
        else {
            setDragged({name: `${e.target.innerText}`, category: "func", title:"Function"})
        }
        
    }

    // Define each item as a card which is draggable
    const Items = (name) => {
        return (
            <Card className="card_" draggable="true" onDragStart={onDragStart}>
                <Card.Body>
                    {name}
                </Card.Body>
            </Card>
        )
    }

    // Implementation of a board containin each group of items
    const Board = (data, title) => {
        return (
            <div>
                <div className="title d-flex justify-content-center">
                    {title}
                </div>
                <ul style={{listStyleType: "none", marginBottom: "20px"}}>
                    {
                        data.map((item) => (
                            <div className="d-flex justify-content-center">
                                {Items(item.name)}
                            </div>
                        ))
                    }
                </ul>
                
            </div>
        )
    }
    return (
        <div>
            <Navbar className="bg-light fixed-top">
                <div style={{marginLeft: "70%"}}>
                    <input className="my_input" type="text" placeholder="New data..." onChange={event => setNewData({name: event.target.value, category: "data"})} />
                    <Button className="my_button mx-3 my-2" onClick={() => {setSelected([])}}>Reset</Button>
                </div>
            </Navbar>
            <div className="row d-flex align-items-center" style={{marginTop: "90px"}}>
                <div className="col-md-3 col-sm-12 mt-2">
                    {Board(input_data, "Data Block")}
                    {Board(func_names, "Function Block")}  
                </div>

                <div style={{width: "10%"}}></div>
                
                < Box name={dragged.name} category={dragged.category} title="Input" />
                <span className="line"></span> 
                
                < Box name={dragged.name} category={dragged.category} title="Function" />
                <span className="line"></span>  
                
                <div className="boxes col-md-2 offset-sm-1 offset-md-0" style={{backgroundColor: "lightslategray"}}>
                    Output
                    {(selected.length === 2) &&
                        <div className="inserted d-flex justify-content-center">
                            {/* Automatically execute output once sufficient inputs are selected */}
                            <OurFunctions first_elt={selected[0]} second_elt={selected[1]} />
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}


export default MainBoard

