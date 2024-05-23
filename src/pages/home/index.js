import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ImageBackground,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

export default function HomePage({ navigation }) {
  const openInstagram = () => {
    const username = 'barbeiro_jardel1';
    const instagramURL = `instagram://user?username=${username}`;
    const fallbackURL = `https://www.instagram.com/${username}`;

    Linking.canOpenURL(instagramURL)
      .then((supported) => {
        if (supported) {
          Linking.openURL(instagramURL);
        } else {
          Linking.openURL(fallbackURL);
        }
      })
      .catch((err) => console.error('Erro ao tentar abrir o Instagram:', err));
  };

  const openWhatsApp = () => {
    const phoneNumber = '+55 83 9805-9479';
    const whatsappURL = `whatsapp://send?phone=${phoneNumber}`;
    const fallbackURL = `https://api.whatsapp.com/send?phone=${phoneNumber}`;

    Linking.canOpenURL(whatsappURL)
      .then((supported) => {
        if (supported) {
          Linking.openURL(whatsappURL);
        } else {
          Linking.openURL(fallbackURL);
        }
      })
      .catch((err) => console.error('Erro ao tentar abrir o WhatsApp:', err));
  };
  return (
    <ImageBackground
      source={require('../../../assets/homebanner.png')}
      style={styles.container}
    >
      <StatusBar backgroundColor="#FFEF" />

      <View
        style={{
          width: '100%',
          height: 'auto',
          padding: 50,
          position: 'absolute',
          bottom: 180,
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 25,
        }}
      >
        <Pressable style={styles.buttonLogin}>
          <Text
            style={styles.login}
            onPress={() => navigation.navigate('Login')}
          >
            Login
          </Text>
        </Pressable>
        <Pressable style={styles.buttonRegister}>
          <Text
            style={styles.register}
            onPress={() => navigation.navigate('Cadastro')}
          >
            Cadastre-se
          </Text>
        </Pressable>
        <View style={{ flexDirection: 'row', gap: 45, marginTop: 15 }}>
          <TouchableOpacity onPress={openInstagram}>
            <AntDesign name="instagram" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={openWhatsApp}>
            <FontAwesome name="whatsapp" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={{ color: '#FFEFC7' }}>Desenvolvido por @leofrs9</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
  },
  logo: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  buttonLogin: {
    borderWidth: 2,
    width: 300,
    paddingVertical: 5,
    borderRadius: 25,
    borderColor: '#FFEFC7',
    backgroundColor: '#FFEFC7',
    color: '#000000',
  },
  buttonRegister: {
    borderWidth: 2,
    width: 300,
    paddingVertical: 5,
    borderRadius: 25,
    borderColor: '#FFEFC7',
  },
  login: {
    color: '#000000',
    textDecorationLine: 'none',
    fontSize: 18,
    textAlign: 'center',
  },
  register: {
    color: '#ffffff',
    textDecorationLine: 'none',
    fontSize: 18,
    textAlign: 'center',
  },
  footer: {
    width: '100%',
    position: 'absolute',
    bottom: 15,
    alignItems: 'center',
  },
});
