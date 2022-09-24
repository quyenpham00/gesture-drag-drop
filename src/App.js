import { useDrag } from '@use-gesture/react'
import { animated, useSpring, config } from '@react-spring/web'
import Content1 from './components/Content1'
import './App.css'
import { useState } from 'react'

const HEIGHT = window.innerHeight
const HIGHEST_POINT = HEIGHT / 2
const MIDDLE_POINT = HIGHEST_POINT + 150

function App() {
  const [content, setContent] = useState(Content1)
  const [active, setActive] = useState(false)
  const posHandle = useSpring({
    y: active ? MIDDLE_POINT : HEIGHT,
    config: config.wobbly,
  })

  const bindHandle = useDrag(({ dragging, xy: [, xyy] }) => {
    if (dragging) {
      if (xyy > 0 && xyy < HEIGHT) {
        posHandle.y.set(xyy)
      }
    } else {
      if (xyy < HIGHEST_POINT) {
        if (xyy < HIGHEST_POINT / 2) {
          posHandle.y.start(0)
        } else {
          posHandle.y.start(HIGHEST_POINT)
        }
      } else if (xyy < MIDDLE_POINT) {
        if (xyy < (HIGHEST_POINT + MIDDLE_POINT) / 2) {
          posHandle.y.start(HIGHEST_POINT)
        } else {
          posHandle.y.start(MIDDLE_POINT)
        }
      } else {
        if (xyy < (HEIGHT + MIDDLE_POINT) / 2) {
          posHandle.y.start(MIDDLE_POINT)
        } else {
          setActive(false)
          posHandle.y.start(HEIGHT)
        }
      }
    }
  })
  const handleButton1 = () => {
    setActive(!active)
    setContent(Content1)
  }

  return (
    <div className='App'>
      {active && (
        <animated.div
          {...bindHandle()}
          style={{
            y: posHandle.y,
            touchAction: 'none',
          }}
          className='App-handle-container'
        >
          <div className='App-handle' />
        </animated.div>
      )}
      <div className='App-bg' />
      <animated.div
        className='App-overlay'
        style={{
          y: posHandle.y,
          height: posHandle.y.to([0, HEIGHT], ['100vh', '0']),
        }}
      >
        {content}
      </animated.div>
      <div className='App-menu'>
        <button onClick={handleButton1}>Button 1</button>
      </div>
    </div>
  )
}

export default App
