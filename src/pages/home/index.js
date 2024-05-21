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
    const username = 'barbeiro_jardel1'; // Substitua 'nomedeusuario' pelo nome de usuário do perfil que deseja abrir
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
      source={require('../../../assets/back.png')} // substitua pelo caminho da sua imagem de fundo
      style={styles.container}
    >
      <StatusBar hidden />
      <View
        style={{
          alignItems: 'center',
          width: '100%',
          height: 200,
        }}
      >
        <Image
          source={require('../../../assets/logoSemFundo.png')}
          style={styles.logo}
        />
      </View>

      <View
        style={{
          marginTop: 25,
          width: '100%',
          height: 200,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 25,
          marginBottom: 55,
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
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
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
});
