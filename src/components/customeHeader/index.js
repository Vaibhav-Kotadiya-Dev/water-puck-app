import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const GradientHeader = ({ title, navigation, showMenu }) => {
  return (
    <LinearGradient
      colors={['#0f2027', '#203a43', '#2c5364']}
      style={styles.headerContainer}
    >
      <View style={styles.headerContent}>
        {showMenu && (
          <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.headerIcon}>
            <Icon name="menu" size={28} color="#fff" />
          </TouchableOpacity>
        )}
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
 
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
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#203a43',
    borderRadius: 8,
    marginHorizontal: 20,
    marginBottom: 10,
  },
 
});
export default GradientHeader;