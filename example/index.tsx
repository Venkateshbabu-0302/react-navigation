import shortid from 'shortid';
import * as React from 'react';
import { render } from 'react-dom';
import { NavigationContainer, Screen, CompositeNavigationProp } from '../src';
import StackNavigator, { StackNavigationProp } from './StackNavigator';
import TabNavigator, { TabNavigationProp } from './TabNavigator';

type StackParamList = {
  first: { author: string };
  second: void;
  third: void;
};

type TabParamList = {
  fourth: void;
  fifth: void;
};

const First = ({
  navigation,
}: {
  navigation: StackNavigationProp<StackParamList, 'first'>;
}) => (
  <div>
    <h1>First, {navigation.state.params.author}</h1>
    <button type="button" onClick={() => navigation.push('second')}>
      Push second
    </button>
    <button type="button" onClick={() => navigation.push('third')}>
      Push third
    </button>
    <button
      type="button"
      onClick={() => navigation.navigate('first', { author: 'John' })}
    >
      Navigate with params
    </button>
    <button type="button" onClick={() => navigation.pop()}>
      Go back
    </button>
  </div>
);

const Second = ({
  navigation,
}: {
  navigation: StackNavigationProp<StackParamList, 'second'>;
}) => (
  <div>
    <h1>Second</h1>
    <button
      type="button"
      onClick={() => navigation.push('first', { author: 'Joel' })}
    >
      Push first
    </button>
    <button type="button" onClick={() => navigation.pop()}>
      Go back
    </button>
  </div>
);

const Fourth = ({
  navigation,
}: {
  navigation: CompositeNavigationProp<
    TabNavigationProp<TabParamList, 'fourth'>,
    StackNavigationProp<StackParamList>
  >;
}) => (
  <div>
    <h1>Fourth</h1>
    <button type="button" onClick={() => navigation.jumpTo('fifth')}>
      Jump to fifth
    </button>
    <button
      type="button"
      onClick={() => navigation.push('first', { author: 'Jake' })}
    >
      Push first
    </button>
    <button type="button" onClick={() => navigation.pop()}>
      Go back
    </button>
  </div>
);

const Fifth = ({
  navigation,
}: {
  navigation: CompositeNavigationProp<
    TabNavigationProp<TabParamList, 'fifth'>,
    StackNavigationProp<StackParamList>
  >;
}) => (
  <div>
    <h1>Fifth</h1>
    <button type="button" onClick={() => navigation.jumpTo('fourth')}>
      Jump to fourth
    </button>
    <button type="button" onClick={() => navigation.navigate('fifth')}>
      Push second
    </button>
    <button type="button" onClick={() => navigation.pop()}>
      Go back
    </button>
  </div>
);

const routes =
  location.pathname !== '/'
    ? location.pathname
        .slice(1)
        .split('/')
        .map(name => ({ name, key: `${name}-${shortid()}` }))
    : [];

const initialState = routes.length
  ? {
      index: routes.length - 1,
      routes,
    }
  : undefined;

function App() {
  return (
    <NavigationContainer initialState={initialState}>
      <StackNavigator>
        <Screen
          name="first"
          component={First}
          options={{ title: 'Foo' }}
          initialParams={{ author: 'Jane' }}
        />
        <Screen name="second" component={Second} options={{ title: 'Bar' }} />
        <Screen name="third" options={{ title: 'Baz' }}>
          {() => (
            <TabNavigator initialRouteName="fifth">
              <Screen name="fourth" component={Fourth} />
              <Screen name="fifth" component={Fifth} />
            </TabNavigator>
          )}
        </Screen>
      </StackNavigator>
    </NavigationContainer>
  );
}

render(<App />, document.getElementById('root'));
