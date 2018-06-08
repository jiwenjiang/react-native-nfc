import React, {
	Component
} from 'react'
import { Provider } from 'react-redux'
import store from './redux/store'
import Navigation from './containers/Navigation'


class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    )
  }
}

export default App