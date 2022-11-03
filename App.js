import type {Node} from 'react';
import React from 'react';
import {
  Button,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import {Extole} from '@extole/extole-mobile-sdk';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const dimensions = Dimensions.get('window');
const imageWidth = dimensions.width - 50;

const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const extole = new Extole('mobile-monitor.extole.io', 'react-native');
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Promo" component={ExtoleScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function ExtoleScreen() {
  return extole.view;
}

function HomeScreen({navigation}: {navigation: any}) {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  let [cta, setCta] = React.useState({});
  const [extoleView, setExtoleView] = React.useState(<View />);
  extole.configureUIInteraction(extoleView, setExtoleView, () => {
    console.log('navigate');
    navigation.navigate('Promo');
  });
  React.useEffect(() => {
    extole
      .fetchZone('cta_prefetch')
      .then((result: Record<string, any>) => {
        setCta(result.zone.data);
      })
      .catch((error: Error) => {
        console.log(
          'There has been a problem with your fetch operation: ',
          error,
        );
      });
  }, []);
  const onCtaButtonPress = () => {
    extole.sendEvent(cta?.touch_event, {});
  };
  const onWebViewActionPress = () => {
    extole.sendEvent('promotion_link', {extole_zone_name: 'microsite'});
  };
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Install npm dependencies">
            npm install @extole/extole-mobile-sdk react-native-webview
          </Section>
          <Section title="Instrument your app">
            `extole.sendEvent('...', dataObject);`
          </Section>
          <Section title="CTA Fetch">
            <Text>
              extole.fetchZone('cta_prefetch').then((result) =>
              setCta(result.zone.data))
            </Text>
          </Section>
          <Section title="CTA Result">
            <View>
              <Image
                id={'cta_image'}
                style={styles.cta_image}
                source={{
                  uri:
                    cta?.image ||
                    'https://www.extole.com/wp-content/uploads/2022/10/header-logo.svg',
                }}
              />
            </View>
            <View style={styles.cta_image}>
              <Button
                id={'cta_button'}
                uppercase={false}
                style={styles.cta_button}
                title={cta?.title?.toUpperCase() || ''}
                onPress={onCtaButtonPress}
              />
              <Button
                id={'cta_web_view'}
                uppercase={false}
                style={styles.cta_button}
                title={'WebView Example'.toUpperCase()}
                onPress={onWebViewActionPress}
              />
            </View>
          </Section>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  cta_image: {
    width: imageWidth,
    height: 100,
    margin: 0,
    padding: 0,
  },
  cta_button: {
    width: imageWidth,
    height: 100,
    margin: 0,
    padding: 0,
    textTransform: 'lowercase',
  },
  space: {
    marginTop: 10,
  },
});
