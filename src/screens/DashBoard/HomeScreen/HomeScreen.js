import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  FlatList,
} from 'react-native';
import {connect, useDispatch} from 'react-redux';
import {Divider} from 'react-native-elements';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {secondaryColor, primaryColor} from '../../../colors';
import {RFPercentage} from 'react-native-responsive-fontsize';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useNavigation} from '@react-navigation/native';
import {ON_LOGOUT_SUCC} from '../../../actions/types';

function HomeScreen(props) {
  const [search, setSearch] = useState('');
  const [searching, setSearching] = useState(false);
  const [emails, setEmails] = useState([
    {email: 'test@test.com', status: 'Order Bekra'},
    {email: 'email.14201@in.parseur.com', status: 'Pakke Klar til'},
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const refRBSheet = useRef();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {generatedEmail} = props.userReducer;

  const renderEmails = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedIndex(index);
          refRBSheet.current.open();
        }}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 15,
          paddingVertical: 15,
          borderBottomWidth: 0.8,
          borderBottomColor: '#ddd',
        }}>
        <Text style={styles.emailStatusText}> {item.email}</Text>
        <Text style={styles.emailStatusText}> {item.status} </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{flexGrow: 1}} bounces={false}>
        <ImageBackground
          style={styles.header}
          source={require('../../../assets/home/header.png')}>
          <View style={styles.navHeader}>
            <TouchableOpacity
              style={{marginBottom: 4}}
              onPress={() => {
                navigation.navigate('WelcomeScreen');
              }}>
              <Image
                source={require('../../../assets/home/menu.png')}
                style={{height: 16, width: 22}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{flexDirection: 'row'}}
              onPress={() => {
                navigation.navigate('Auth');
                dispatch({
                  type: ON_LOGOUT_SUCC,
                });
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: RFPercentage(2.7),
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontWeight: '300',
                }}>
                Logout
              </Text>
              <MaterialCommunityIcons
                style={{marginLeft: 8, marginTop: 2}}
                size={RFPercentage(2.7)}
                color="#fff"
                name="logout"
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.headerText}> Dashboard </Text>
          <View style={styles.emailHeaderContainer}>
            <Text style={styles.emailText}> {generatedEmail} </Text>
          </View>
        </ImageBackground>
        <View style={styles.whiteBackground} />
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <TextInput
              style={styles.textInput}
              placeholder="Search"
              value={search}
              onChangeText={(text) => setSearch(text)}
            />
            <TouchableOpacity>
              <AntDesign color="#999" name="search1" size={RFPercentage(2.9)} />
            </TouchableOpacity>
          </View>
          <View style={styles.search}>
            <Text style={styles.searchHeaderText}> Recipient</Text>
            <Text style={styles.searchHeaderText}> Status</Text>
          </View>
          {emails.length <= 0 ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: RFPercentage(3),
                  color: '#999',
                  textAlign: 'center',
                  paddingTop: hp('10%'),
                }}>
                No records to display
              </Text>
            </View>
          ) : (
            <FlatList
              contentContainerStyle={{marginTop: 22}}
              data={emails}
              extraData={emails}
              renderItem={renderEmails}
              keyExtractor={(item, index) => `${index}quickout`}
              scrollEnabled={false}
            />
          )}
        </View>
        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={false}
          closeOnPressMask={false}
          height={hp('70%')}
          customStyles={{
            wrapper: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            },
            container: {
              borderTopLeftRadius: 50,
            },
            draggableIcon: {
              backgroundColor: '#000',
            },
          }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            // bounces={false}
            style={styles.sheetContainer}>
            <View style={styles.sheetHeaderContainer}>
              <Text style={styles.headerSheetText}> Details </Text>
              <TouchableOpacity
                onPress={() => {
                  refRBSheet.current.close();
                  setSelectedIndex(0);
                }}>
                <Fontisto
                  color="#454545"
                  name="close-a"
                  size={RFPercentage(2.6)}
                  style={{fontWeight: '900'}}
                />
              </TouchableOpacity>
            </View>
            <View
              style={[styles.search, {marginTop: 0, paddingHorizontal: 15}]}>
              <Text style={styles.searchHeaderText}> Recipient</Text>
              <Text style={styles.searchHeaderText}> Status</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 15,
                paddingVertical: 15,
                paddingHorizontal: 15,
              }}>
              <Text style={styles.emailStatusText}>
                {emails[selectedIndex].email}
              </Text>
              <Text style={styles.emailStatusText}>
                {emails[selectedIndex].status}
              </Text>
            </View>
            <View style={styles.invoiceContainer}>
              <View style={styles.invoiceData}>
                <Text style={styles.invoiceHeaderText}> History </Text>
                <Divider style={styles.divider} />
              </View>
              <View style={styles.invoiceData}>
                <Text style={styles.invoiceText}>29 November 2019 | 10:04</Text>
                <Text style={styles.invoiceHeaderText}> Kvitering</Text>
                <Divider style={styles.divider} />
              </View>

              <View style={styles.invoiceData}>
                <Text style={styles.invoiceText}>29 November 2019 | 10:04</Text>
                <Text style={styles.invoiceHeaderText}> Pakke Sendt</Text>
                <Divider style={styles.divider} />
              </View>

              <View style={styles.invoiceData}>
                <Text style={styles.invoiceText}>29 November 2019 | 10:04</Text>
                <Text style={styles.invoiceHeaderText}>
                  {' '}
                  Pakke Klar tiil afhentning
                </Text>
                <Divider style={styles.divider} />
              </View>
            </View>
          </ScrollView>
        </RBSheet>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: hp('28%'),
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  navHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('3%'),
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: RFPercentage(3.2),
    fontWeight: '800',
  },
  emailHeaderContainer: {
    height: hp('5.5%'),
    backgroundColor: '#fff',
    marginTop: 25,
    borderRadius: 5,
    justifyContent: 'center',
    marginBottom: 15,
  },
  emailText: {
    paddingHorizontal: 20,
    color: secondaryColor,
    fontSize: RFPercentage(2.2),
    fontWeight: '500',
  },
  whiteBackground: {
    backgroundColor: '#fff',
    height: hp('5%'),
  },
  searchContainer: {
    backgroundColor: '#F9F9F9',
    flex: 1,
    paddingHorizontal: 10,
  },
  searchBar: {
    flexDirection: 'row',
    padding: 20,
    paddingVertical: 14,
    backgroundColor: '#F3F3F3',
    marginTop: 30,
    borderWidth: 0.7,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  textInput: {
    fontSize: RFPercentage(2.2),
    color: '#999',
    flex: 1,
  },
  search: {
    marginTop: hp('3%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchHeaderText: {
    fontSize: RFPercentage(2.5),
    color: secondaryColor,
    fontWeight: '600',
  },
  emailStatusText: {
    fontSize: RFPercentage(2.2),
    fontWeight: '500',
    color: '#454545',
  },
  sheetContainer: {
    backgroundColor: '#fff',
    flex: 1,
  },
  sheetHeaderContainer: {
    marginVertical: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  headerSheetText: {
    fontSize: RFPercentage(3.2),
    fontWeight: '600',
    color: '#454545',
  },
  invoiceContainer: {
    backgroundColor: 'rgba(0,41,144,0.1)',
    paddingVertical: 30,
    paddingHorizontal: 15,
    flex: 1,
  },
  invoiceHeaderText: {
    fontSize: RFPercentage(3.2),
    fontWeight: '600',
    color: '#454545',
  },
  invoiceText: {
    fontSize: RFPercentage(2),
    fontWeight: '600',
    color: '#454545',
    marginBottom: 7,
    marginLeft: 5,
  },
  divider: {
    marginVertical: 20,
  },
});

const mapStateToProps = (state) => {
  return {
    userReducer: state.userReducer,
  };
};

export default connect(mapStateToProps)(HomeScreen);
