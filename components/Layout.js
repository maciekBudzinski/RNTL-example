import React from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';

const Layout = ({children}) => (
  <SafeAreaView>
    <View style={styles.wrapper}>
      {children}
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  wrapper: {
    padding: 16,
  },
});

export default Layout;
