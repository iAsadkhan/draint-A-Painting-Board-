import React ,{useState,useEffect,useRef} from 'react'
import useWindowSize from './WindowSize'

function Canvas(props) {
const [drawing,setDrawing]=useState(false)
const [width,setWidth]=useState(window.innerWidth)
const [height,setHeight]=useState(window.innerHeight)
const [windowWidth, windowHeight] = useWindowSize(() => {
    setWidth(window.innerWidth)
    setHeight(window.innerHeight)
  })
  var lastPt = new Object();

const canvasRef=useRef(null)
const ctx = useRef()

useEffect(() => {
    ctx.current = canvasRef.current.getContext('2d')
  },[])
function startDrawing(e)
{
    ctx.current.lineJoin = 'round'
    ctx.current.lineCap = 'round'
    ctx.current.lineWidth = props.strokeSize
    ctx.current.strokeStyle = props.color
    ctx.current.beginPath();
    // actual coordinates
    ctx.current.moveTo(
      e.clientX - canvasRef.current.offsetLeft,
      e.clientY - canvasRef.current.offsetTop
    )
    setDrawing(true)
}

function mobileDrawing(e)
{
  setDrawing(true)
  for(var i=0;i<e.touches.length;i++) {
    var id = e.touches[i].identifier;   
    if(lastPt[id]) {
      ctx.current.beginPath();
      ctx.current.moveTo(lastPt[id].x, lastPt[id].y);
      ctx.current.lineTo(e.touches[i].clientX, e.touches[i].clientY);
      ctx.current.lineWidth=props.strokeSize;
      ctx.current.strokeStyle = props.color;
      ctx.current.stroke();

    }
    // Store last point
    lastPt[id] = {x:e.touches[i].clientX, y:e.touches[i].clientY};
  }

}

function stopDrawing()
{
    ctx.current.closePath()
    setDrawing(false)
}

function handleMouseMove(e) {
    // actual coordinates
    const coords = [
      e.clientX - canvasRef.current.offsetLeft,
      e.clientY - canvasRef.current.offsetTop
    ]    

    if (drawing) { 
        ctx.current.lineTo(...coords)
        ctx.current.stroke()
      }
      if (props.handleMouseMove) {
          props.handleMouseMove(...coords)
      }
    }

    return (
      <>
      <canvas 
      className="canvas"
          ref={canvasRef}
          width={props.width || width}
          height={props.height || height}
          onMouseDown={startDrawing}
          onMouseUp={stopDrawing}
          onMouseOut={stopDrawing}
          onMouseMove={handleMouseMove}
          onTouchStart={startDrawing}
          onTouchMove={mobileDrawing}
          onTouchEnd={stopDrawing}
        />
      </>
    )
}

export default Canvas
