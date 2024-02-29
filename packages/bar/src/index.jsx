import React from 'react'
import { createRoot } from 'react-dom/client'
import { Button } from './components/index'

const root = createRoot(document.getElementById('root'))
function App() {
  return <div>
    <Button/>
  </div>
}

root.render(<App/>)
