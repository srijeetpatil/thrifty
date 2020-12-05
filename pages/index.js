import Question from './question';
import {Provider} from 'react-redux';
import {ConfigureStore} from '../redux/configureStore';

const store = ConfigureStore();

export default function Home() {  
  return (
      <div>
        <Provider store={store}>
          <Question/>
        </Provider>          
      </div>    
  )
}
 