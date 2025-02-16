import ReactDOM from 'react-dom/client'
import App from './App'
import { NotificationContextProvider } from './reducers/NotificationContext'
import { LoginContextProvider } from './reducers/LoginContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter as Router } from 'react-router-dom'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <NotificationContextProvider>
      <LoginContextProvider>
        <Router>
          <App />
        </Router>
      </LoginContextProvider>
    </NotificationContextProvider>
  </QueryClientProvider>
)
