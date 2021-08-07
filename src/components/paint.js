import React ,{useState,useEffect,useRef,useCallback,useMemo} from 'react'
import Name from './name'
import ColorPicker from './ColorPicker';
import randomColor from 'randomcolor';
import useWindowSize from './WindowSize';
import Canvas from './Canvas';
import RefreshButton from './RefreshButton';
import Stroke from './Stroke';

function Paint() {
const [colors,setColors] =useState([])
const [activeColor,setActiveColor] =useState(null)
const [strokeSize,setStrokeSize]=useState(10)

const boxref =useRef({offsetHeight:0 ,offsetWidth:0})
console.log(boxref.current.offsetHeight)


    const getColors =useCallback(() => {
        const baseColor = randomColor().slice(1);
        fetch(`https://www.thecolorapi.com/scheme?hex=${baseColor}&mode=monochrome`)
        .then(res => res.json())
        .then(res => {
          setColors(res.colors.map(color => color.hex.value))
          setActiveColor(res.colors[0].hex.value)
        })
      },[])
    useEffect(getColors,[])

    const [visible, setVisible] = useState(false)
    let timeoutId = useRef()
    const [windowWidth, windowHeight] = useWindowSize(() => {
      setVisible(true)
      clearTimeout(timeoutId.current)
      timeoutId.current = setTimeout(() => setVisible(false), 500)
    })
 
    return (
        <>
        <div ref={boxref} className="box" style={{ border:`10px solid ${activeColor}`}}>
            <Name/>
        <div style={{ marginTop: 10 }}>
        <ColorPicker
          colors={colors}
          activeColor={activeColor}
          setActiveColor={setActiveColor}
        />
        <RefreshButton cb={getColors}/>
      </div>
      <Stroke strokeSize={strokeSize} setStrokeSize={setStrokeSize}color={activeColor}/>
      {activeColor && (
        <Canvas
          color={activeColor}
          height={window.innerHeight - boxref.current.offsetHeight}
          width={window.innerWidth - boxref.current.offsetWidth}
          strokeSize={strokeSize}
        />
      )}
      <div className={`window-size ${visible ? '' : 'hidden'}`}>
        {windowWidth} x {windowHeight}
      </div>
      </div>
        </>
    )
}

export default Paint
