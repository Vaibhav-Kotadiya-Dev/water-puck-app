import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomDrawerContent = (props) => {
  const navigation=useNavigation()
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <LinearGradient
        colors={['#0f2027', '#203a43', '#2c5364']}
        style={styles.gradientContainer}
      >
        <View style={styles.drawerHeader}>
          <Icon onPress={()=>navigation.navigate('Home')} name="water" size={80} color="#fff" />
          <Text style={styles.drawerTitle}>Water Puck App</Text>
        </View>

        <View style={styles.drawerItems}>
          <DrawerItemList {...props} />
        </View>

        <TouchableOpacity
          style={styles.footer}
          onPress={() =>
            Alert.alert('Logout', 'Are you sure you want to logout?', [
              { text: 'Cancel', style: 'cancel' },
              { text: 'OK', onPress: () => console.log('Logged out!') },
            ])
          }
        >
          <Icon name="logout" size={20} color="#fff" />
          <Text style={styles.footerText}>Logout</Text>
        </TouchableOpacity>
      </LinearGradient>
    </DrawerContentScrollView>
  );
};
const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  headerContainer: {
    height: 60,
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    marginRight: 10,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  drawerHeader: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  drawerTitle: {
    color: '#fff',
    fontSize: 20,
    marginTop: 10,
    fontWeight: 'bold',
  },
  drawerItems: {
    flex: 1,
    paddingVertical: 10,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#203a43',
    borderRadius: 8,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  footerText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
  },
});
export default CustomDrawerContent