import { useState } from 'react'
import { UserSettingContext } from './Contexts/UserSettings';
import Headers from './Components/Header';
import './App.css'

function App() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (<UserSettingContext.Provider value={{ theme, toggleTheme }}>
    {/* header */}
    <Headers />
  </UserSettingContext.Provider>
  )
}

export default App
