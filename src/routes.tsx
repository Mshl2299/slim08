import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Projects from './pages/Projects/Projects'
import SoundDesign from './pages/SoundDesign/SoundDesign'
import About from './pages/About/About'
import Contact from './pages/Contact/Contact'

function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Projects />} />
        <Route path="/sound-design" element={<SoundDesign />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
