import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { ReduxStore } from './Redux/store.js'
import { PersistGate } from 'redux-persist/integration/react'
import { persistedstore } from './Redux/store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={ReduxStore}>
      <PersistGate loading={null} persistor={persistedstore}>
        <App />
      </PersistGate>
    </Provider>
)
