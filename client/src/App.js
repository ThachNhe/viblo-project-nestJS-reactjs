
import { Provider as StoreProvider } from 'react-redux';
import store from '../src/redux/store';
import TestRedux from './TestRedux';
import './App.css';
function App() {
 return (
  <StoreProvider store={store}>
      <h1 className="text-3xl font-bold underline">
      Hello wor
    </h1>
    <TestRedux/>
  </StoreProvider>
    
  )
}

export default App;
