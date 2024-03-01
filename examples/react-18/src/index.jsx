import { createRoot } from 'react-dom/client'
import { Button } from './components/index.jsx'

const root = createRoot(document.getElementById('root'))
function App() {
  return <div>
    <Button/>
  </div>
}

root.render(<App/>)

export default {
  name: 'Plugin',
}
