import React from 'react'

function Stroke(props) {
    return (
        <div className="stroke">
            <label htmlFor="bar">Stroke Size: </label>
            <input
            name="bar"
            type="range"
            onChange={e => props.setStrokeSize(e.target.value)} 
            value={props.strokeSize}
            onMouseDown={e => props.setStrokeSize(e.target.value)} 
            />
        </div>
    )
}

export default Stroke
