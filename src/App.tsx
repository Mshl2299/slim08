import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes'

function App() {
  return (
    <BrowserRouter basename="/slim08">
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
