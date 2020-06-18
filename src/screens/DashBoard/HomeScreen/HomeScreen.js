import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  RefreshControl,
  FlatList,
} from 'react-native';
import {connect, useDispatch} from 'react-redux';
import {Divider} from 'react-native-elements';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {secondaryColor, primaryColor} from '../../../colors';
import {RFPercentage} from 'react-native-responsive-fontsize';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import OneSignal from 'react-native-onesignal';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useNavigation} from '@react-navigation/native';
import {ON_LOGOUT_SUCC, ON_STATUS_BAR_CHANGE} from '../../../actions/types';
import {GET_MAILS} from '../../../../Apis';
import _ from 'lodash';
import {isEven} from '../../../utils/constant';

function HomeScreen(props) {
  const [search, setSearch] = useState('');
  const [searching, setSearching] = useState(false);
  const [emails, setEmails] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const refRBSheet = useRef();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {token, loginId, userDetails} = props.userReducer;

  useEffect(() => {
    dispatch({type: ON_STATUS_BAR_CHANGE, payload: secondaryColor});
    getInvoice();
    subscribeToNotification();
    getPermissionSubscriptionState();
  }, []);

  const subscribeToNotification = () => {
    let externalUserId = userDetails[0]._id;
    OneSignal.setExternalUserId(externalUserId, (results) => {
      // The results will contain push and email success statuses
      console.log('Results of setting external user id');
      console.log(results);
      console.log(externalUserId);

      // Push can be expected in almost every situation with a success status, but
      // as a pre-caution its good to verify it exists
      if (results.push && results.push.success) {
        console.log('Results of setting external user id push status:');
        console.log(results.push.success);
      }

      // Verify the email is set or check that the results have an email success status
      if (results.email && results.email.success) {
        console.log('Results of setting external user id email status:');
        console.log(results.email.success);
      }
    });
  };

  const getPermissionSubscriptionState = () => {
    OneSignal.getPermissionSubscriptionState((status) => {
      if (status.hasPrompted == false) {
        OneSignal.addTrigger('prompt_ios', 'true');
      }
    });
  };

  const unsusbscribeNotification = () => {};

  const getInvoice = async () => {
    try {
      const mails = await axios.get(GET_MAILS, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });

      // Dev data
      const devEmail = [...mails.data.data];
      const devData = {
        item: 'TAP3749394',
        orderId: 'TAP3749394',
        carrier: 'DHL',
        trackingId: 'LBRIDJF4759474',
        destination: 'Test 485 Lorem Ipsum Yueesd peirt',
      };

      const addDev = devEmail.map((item) => {
        return {
          ...item,
          ...devData,
        };
      });
      setEmails(addDev);
      console.log(addDev, 'devData');
      // Ends Here

      // Prod
      // setEmails(mails.data.data);
      setRefreshing(false);
    } catch (error) {
      console.log(error, 'response_fetching');
      setRefreshing(false);
    }
  };

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
        <Text style={styles.emailStatusText}> {item.vendor}</Text>
        <Text style={styles.emailStatusText}> {item.status} </Text>
      </TouchableOpacity>
    );
  };

  const renderHistory = () => {
    if (emails.length > 0) {
      const history = emails[selectedIndex].history.map((data, index) => {
        return (
          <View style={styles.invoiceData} key={`${index}`}>
            <Text style={[styles.invoiceText, {marginLeft: 5}]}>
              {data.orderdate}
            </Text>
            {/* <Text style={styles.invoiceDelivery}> {data.delivery}</Text> */}
            <Text style={styles.invoiceHeaderText}> {data.status}</Text>
            <Divider style={styles.divider} />
          </View>
        );
      });

      return history;
    }
  };

  const logout = () => {
    setLoggingOut(true);

    OneSignal.removeExternalUserId((results) => {
      // The results will contain push and email success statuses
      console.log('Results of removing external user id');
      console.log(results);
      // Push can be expected in almost every situation with a success status, but
      // as a pre-caution its good to verify it exists
      if (results.push && results.push.success) {
        console.log('Results of removing external user id push status:');
        console.log(results.push.success);
        setLoggingOut(false);
        navigation.navigate('Auth');
        dispatch({
          type: ON_LOGOUT_SUCC,
        });
      }

      // Verify the email is set or check that the results have an email success status
      if (results.email && results.email.success) {
        console.log('Results of removoing external user id email status:');
        console.log(results.email.success);
      }
    });
    // setTimeout(() => {
    //   setLoggingOut(false);
    // }, 1000);
    // navigation.navigate('Auth');
    // dispatch({
    //   type: ON_LOGOUT_SUCC,
    // });
  };

  const renderRow = React.useCallback((selectedData) => {
    const dataToRender = [
      'status',
      'carrier',
      'trackingId',
      'vendor',
      'item',
      'orderId',
      'destination',
    ];

    const data = _.map(selectedData, (val, key) => {
      if (dataToRender.includes(key)) {
        return {val, key};
      } else {
        return null;
      }
    });

    const filteredData = data.filter((item) => (item ? item : null));

    const rowData = filteredData.map((item, index) => {
      return (
        <View
          style={[
            styles.dataRow,
            {alignItems: isEven(index) ? 'flex-start' : 'flex-end'},
          ]}
          key={`${index}rowData`}>
          <View
            style={[
              styles.search,
              {
                marginTop: 0,
                marginBottom: 0,
                marginHorizontal: 15,
              },
            ]}>
            <Text style={styles.searchHeaderText}>
              {_.capitalize(item.key.replace(/Id/g, ' #'))}
            </Text>
          </View>
          <View style={styles.emailStatusContainer}>
            <Text style={styles.emailStatusText}>{item.val}</Text>
          </View>
        </View>
      );
    });

    return <View style={styles.rowContainer}>{rowData}</View>;
  }, []);

  // console.log(emails, 'emails');

  return (
    <View style={styles.container}>
      <Spinner
        visible={loggingOut}
        textContent={'Logging Out...'}
        textStyle={styles.spinnerTextStyle}
        overlayColor="rgba(0, 0, 0, 0.6)"
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}
        // bounces={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              setTimeout(() => {
                getInvoice();
              }, 1000);
            }}
          />
        }>
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
                logout();
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
        {/* <View style={styles.whiteBackground} /> */}
        <View style={styles.searchContainer}>
          {/* <View style={styles.searchBar}>
            <TextInput
              style={styles.textInput}
              placeholder="Search"
              value={search}
              onChangeText={(text) => setSearch(text)}
            />
            <TouchableOpacity>
              <AntDesign color="#999" name="search1" size={RFPercentage(2.9)} />
            </TouchableOpacity>
          </View> */}
          <View style={styles.search}>
            <Text style={styles.searchHeaderText}> Vendor</Text>
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
        {emails.length > 0 && (
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

              {renderRow(emails[selectedIndex])}

              <View style={styles.invoiceContainer}>
                <View
                // style={styles.invoiceData}
                >
                  <Text style={styles.invoiceHeaderText}> History </Text>
                  <Divider style={styles.divider} />
                </View>
                {renderHistory()}
              </View>
            </ScrollView>
          </RBSheet>
        )}
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
    backgroundColor: '#F9F9F9',
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
    marginHorizontal: 15,
    marginLeft: 13,
  },
  headerSheetText: {
    fontSize: RFPercentage(3.2),
    fontWeight: '600',
    color: '#454545',
  },
  invoiceContainer: {
    backgroundColor: 'rgba(0,41,144,0.1)',
    paddingVertical: 30,
    paddingHorizontal: 17,
    flex: 1,
    minHeight: hp('50%'),
  },
  invoiceHeaderText: {
    fontSize: RFPercentage(3.2),
    fontWeight: '600',
    color: '#454545',
    // backgroundColor: 'red',
    margin: 0,
  },
  invoiceText: {
    fontSize: RFPercentage(2),
    fontWeight: '600',
    color: '#454545',
    marginBottom: 7,
    // marginLeft: 5,
  },
  invoiceDelivery: {
    fontSize: RFPercentage(2),
    fontWeight: '600',
    color: '#454545',
    marginBottom: 7,
    // marginLeft: 5,
  },
  divider: {
    marginVertical: 20,
  },
  invoiceData: {
    // marginHorizontal: 15,
  },
  spinnerTextStyle: {
    color: '#FFF',
    fontWeight: '600',
  },
  dataRow: {
    width: '50%',
  },
  rowContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  emailStatusContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    paddingVertical: 15,
    marginHorizontal: 14.5,
    paddingTop: 5,
  },
});

const mapStateToProps = (state) => {
  return {
    userReducer: state.userReducer,
  };
};

export default connect(mapStateToProps)(HomeScreen);
