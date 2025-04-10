import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import { store } from './context/store.js';
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')).render(
 <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
 </Provider>
)
