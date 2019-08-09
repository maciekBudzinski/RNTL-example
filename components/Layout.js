import React from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';

const Layout = ({children}) => (
  <SafeAreaView style={styles.safeArea}>
    <View style={styles.wrapper}>
      {children}
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  wrapper: {
    padding: 16,
    flex: 1,
  },
});

export default Layout;
