import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Header from '../../components/Header/Header';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import {connect} from 'react-redux';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {useNavigation} from '@react-navigation/native';
import {secondaryColor, tertiaryColor, primaryColor} from '../../colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Carousel from 'react-native-snap-carousel';

function HomeScreen(props) {
  const [currentDate, setCurrentDate] = useState(moment().format('YYYY-MM-DD'));
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigation = useNavigation();
  const {symtomps} = props;
  const carousel = useRef(null);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Header title="Corona Tracker" />
      <View style={styles.contentContainer}>
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}> Progress </Text>
          <Text style={styles.progressDay}>
            Day {symtomps[currentIndex].day}
          </Text>
        </View>

        <Carousel
          ref={carousel}
          data={symtomps}
          onSnapToItem={(item, index) => setCurrentIndex(item)}
          enableSnap={true}
          scrollEnabled={false}
          renderItem={({item, index}) => (
            <View style={styles.cicleContainer}>
              <View style={styles.circle}>
                <AntDesign
                  name="calendar"
                  color="#fff"
                  size={hp('5%')}
                  style={{marginBottom: 10}}
                />
                <Text style={styles.dayText}>
                  Day {symtomps[currentIndex].day}
                </Text>
              </View>
            </View>
          )}
          sliderWidth={wp('90%%')}
          itemWidth={wp('90%%')}
        />

        <View style={styles.controllerContainer}>
          <TouchableOpacity onPress={() => carousel.current.snapToPrev()}>
            <Ionicons name="ios-arrow-back" size={22} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => carousel.current.snapToNext()}>
            <Ionicons name="ios-arrow-forward" size={22} />
          </TouchableOpacity>
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.tabContainer}>
            <Text style={styles.headerText}> Symptops(Prediction)</Text>
            <Text style={styles.contentText}>
              {symtomps[currentIndex].name}
            </Text>
          </View>
          <View style={styles.tabContainer}>
            <Text style={styles.headerText}> Age</Text>
            <Text style={styles.contentText}> 20 </Text>
          </View>
          <View style={styles.tabContainer}>
            <Text style={styles.headerText}> Add Symtops (Notes) </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const mapStateToProps = state => {
  return {
    symtomps: state.symtompsReducer.symtomps,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    marginVertical: hp('4%'),
    marginHorizontal: wp('5%'),
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressText: {
    fontSize: RFPercentage(2.3),
    marginBottom: 9,
    fontWeight: '600',
  },
  progressDay: {
    fontSize: RFPercentage(2),
    marginLeft: 5,
  },
  cicleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    // width: '100%',
    flex: 1,
  },
  circle: {
    height: hp('22%'),
    width: hp('22%'),
    borderRadius: hp('22%') / 2,
    backgroundColor: primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayText: {
    color: '#fff',
    fontSize: RFPercentage(2),
    fontWeight: '700',
  },
  detailsContainer: {
    marginTop: 10,
  },
  tabContainer: {
    minHeight: hp('10%'),
    backgroundColor: primaryColor,
    marginVertical: hp('2%'),
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  headerText: {
    fontSize: RFPercentage(2.5),
    marginBottom: 10,
    color: '#fff',
  },
  contentText: {
    fontSize: RFPercentage(2.2),
    color: '#fff',
    fontWeight: '800',
  },
  controllerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
});

export default connect(mapStateToProps)(HomeScreen);
