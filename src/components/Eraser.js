import React from 'react'

function Eraser({activeColor,setActiveColor}) {
    return (
        <fieldset className="eraser">
              <label htmlFor="bar">Eraser
            <input
              name="color"
              type="radio"
              value="rgb(194, 194, 194)"
              checked={activeColor === "rgb(194, 194, 194)"}
              onChange={() => setActiveColor("rgb(194, 194, 194)")}
            />
            <span style={{ background: "whitesmoke"}} />
          </label>
      </fieldset>
    )
}

export default Eraser
