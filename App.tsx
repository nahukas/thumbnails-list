import React, {FC} from 'react';
import AppContainer from './src/routes/routes';
import {Provider} from 'react-redux';
import store from './src/redux/store';

const App: FC = () => {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
};
export default App;
