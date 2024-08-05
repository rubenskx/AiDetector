import { View, StyleSheet } from "react-native";

function BaseContainer({ children }){
    return (
        <>
            <View style={styles.container}>
                {children}
            </View>
        </>
    )
}

export default BaseContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1d3557",
  }
});