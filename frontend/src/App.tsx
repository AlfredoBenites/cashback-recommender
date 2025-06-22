import { Routes, Route } from 'react-router-dom'
import NavigationTabs from './components/NavigationTabs'
import Dashboard from './pages/Dashboard'
import AddTransaction from './pages/AddTransaction'
import History from './pages/History'
import CardRules from './pages/CardRules'
import './App.css'

function App() {
  return (
    <>
      <NavigationTabs />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add" element={<AddTransaction />} />
        <Route path="/history" element={<History />} />
        <Route path="/cards" element={<CardRules />} />
      </Routes>
    </>
  )
}

export default App
