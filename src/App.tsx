import './App.scss'
import Header from './components/Header/Header'
import Menu from './components/Menu/Menu'
import AppRouter from './routers/AppRouter'

function App() {

  return (
    <div className='main-container'>
      <Header />
      <div className='page-container'>
        <Menu />
        <div className="page-content">
          <AppRouter />
        </div>
      </div>
    </div>
  )
}

export default App
