import { createRoot } from 'react-dom/client'
import { Button } from './components'

const root = createRoot(document.getElementById('root')!)

function App() {
  return <div>
    <Button type="primary"/>
  </div>
}

root.render(<App />)

export default {
  name: 'Plugin',
}
