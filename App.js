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
import {Colors,} from 'react-native/Libraries/NewAppScreen';

import {Extole} from '@extole/extole-mobile-sdk';

const dimensions = Dimensions.get('window');
const imageWidth = dimensions.width - 50;

/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */
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

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  // eslint-disable-next-line prettier/prettier
  let [cta, setCta] = React.useState({});
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
    extole.sendEvent(cta?.touch_event, {extole_zone_name: 'microsite'});
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
              extole.fetchZone('cta_prefetch')
              .then((result) => setCta(result.zone.data))
            </Text>
          </Section>
          <Section title="CTA Result">
            <View>
              <Image
                style={styles.cta_image}
                source={{
                  uri: cta?.image || 'https://origin.xtlo.net/type=creativeArchive:clientId=1106500674:creativeArchiveId=7153594407382986000:version=2:coreAssetsVersion=67/images/generic-social.jpgr',
                }}
              />
            </View>
            <View style={styles.cta_image}>
              <Button
                style={styles.cta_image}
                title={cta?.title || ''}
                onPress={onCtaButtonPress}
              />
            </View>
          </Section>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

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
    alignSelf: 'stretch',
  },
  space: {
    marginTop: 10,
  },
});

export default App;
