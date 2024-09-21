import 'react-native-gesture-handler';
import * as React from 'react';
import {PaperProvider} from 'react-native-paper';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import {StatusBar} from 'react-native';
import MainNavigator from './navigation/appNavigation';
import {Theme} from './theme/theme';
import {DatabaseProvider} from '@nozbe/watermelondb/react';
import {database} from './DB/database';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const App: React.FC = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <DatabaseProvider database={database}>
        <Provider store={store}>
          <PaperProvider theme={Theme}>
            <StatusBar
              barStyle="light-content"
              backgroundColor="rgb(120, 69, 172)"
            />
            <MainNavigator />
          </PaperProvider>
        </Provider>
      </DatabaseProvider>
    </GestureHandlerRootView>
  );
};

export default App;
