import React from 'react'
import ReactDOM from 'react-dom'
import AppStore from './AppStore'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'
import './styles/index.css'
import 'semantic-ui-css/semantic.min.css'

ReactDOM.render(
  <AppStore>{(store) => <App {...store} />}</AppStore>,
  document.getElementById('root')
)
registerServiceWorker()
