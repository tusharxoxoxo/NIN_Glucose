import * as React from 'react';
import {View, StyleSheet, SafeAreaView, Alert} from 'react-native';
import {Card, Text, Button} from 'react-native-paper';
import GraphScreen from '../components/graph';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {Theme} from '../theme/theme';
import MqttClient, {
  ConnectionOptions,
  ClientEvent,
  MQTTEventHandler,
} from '@ko-developerhong/react-native-mqtt';
import {
  addTempurature,
  addGlucose,
  addGsr,
} from '../redux/features/sensorSlice';
import {addBio} from '../redux/features/graphSlice';

interface DataWithTopic {
  topic: string;
  message: string;
}

interface Data {
  sensor: string;
  batch: string;
  data: JSON[];
}

const options: ConnectionOptions = {
  clientId: 'myClientId',
  cleanSession: true,
  keepAlive: 60,
  timeout: 60,
  maxInFlightMessages: 1,
  autoReconnect: true,
  protocol: 'mqtt',
};

const DataCollectionScreen: React.FC = () => {
  let intervalIdTemp: any = null;
  let intervalIdGsr: any = null;
  let intervalIdGlu: any = null;

  const dispatch = useAppDispatch();
  const temperature = useAppSelector(state => state.sensor.temperature);
  const glucose = useAppSelector(state => state.sensor.glucose);
  const gsr = useAppSelector(state => state.sensor.gsr);

  const stringToJson = (message: any): Data => {
    return JSON.parse(message.toString());
  };

  const handleAction = (action: DataWithTopic) => {
    switch (action.topic) {
      case 'TEM':
        const temp = stringToJson(action.message);
        dispatch(addTempurature(temp.data[0]));
        break;
      case 'GSR':
        const gsr = stringToJson(action.message);
        dispatch(addGsr(gsr.data[0]));
        break;
      case 'GLU':
        const glucose = stringToJson(action.message);
        dispatch(addGlucose(glucose.data[0]));
        break;
      case 'BIO':
        const bio = stringToJson(action.message);
        dispatch(addBio(bio.data));
      case 'ECG':
        const ecg = stringToJson(action.message);
        break;
      default:
        console.log('No action found');
        break;
    }
  };

  const subscribeTopic = (topics: string[]): void => {
    topics.forEach(topic => {
      MqttClient.subscribe(topic);
    });
  };

  const clientInt = async () => {
    console.log('Connnecting...');
    try {
      await MqttClient.connect('mqtt://192.168.167.226', {});
      MqttClient.on(ClientEvent.Connect, (reconnect: any) => {
        console.log('Connected');
      });
      MqttClient.on(ClientEvent.Error, (error: any) => {
        console.log('error : ', error);
      });
      MqttClient.on(ClientEvent.Disconnect, (cause: any) => {
        console.log('Disconnect cause : ', cause);
      });
      MqttClient.on(ClientEvent.Message, (topic: any, message: any) => {
        const dataWithTopic = {topic: topic, message: message};
        handleAction(dataWithTopic);

        // if (topic.toString() === 'BioImpedance') {
        //   const messageString = message.toString('utf-8').trim();
        //   console.log('Message:', messageString);
        //   const Data = JSON.parse(messageString);
        //   console.log('Message:', Data.data);
        //   dispatch(setgraphdata(Data.data));
        //   addSensor(messageString);
        // }
      });
      subscribeTopic(['BIO', 'TEM', 'GSR', 'GLU']);
    } catch (err) {
      console.error('catch error: ', err);
    }
  };

  const publishMessageToTopic = (topic: string, message: any) => {
    MqttClient.publish(topic, message);
  };

  const stopInterval = () => {
    if (intervalIdGlu && intervalIdGsr && intervalIdTemp) {
      clearInterval(intervalIdGlu);
      clearInterval(intervalIdGsr);
      clearInterval(intervalIdTemp);
    }
  };

  const startInterval = () => {
    if (!intervalIdTemp && !intervalIdGsr && !intervalIdGlu) {
      intervalIdGlu = setInterval(() => {
        publishMessageToTopic('GLUCON', 'START');
      }, 2000);

      intervalIdGsr = setInterval(() => {
        publishMessageToTopic('GSRCON', 'START');
      }, 3000);

      intervalIdTemp = setInterval(() => {
        publishMessageToTopic('TEMCON', 'START');
      }, 4000);
    }
  };

  const start = () => {
    publishMessageToTopic('BIOCON', 'START');
    startInterval();
  };

  React.useEffect(() => {
    return () => {
      stopInterval();
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.sensorRow}>
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="bodyLarge" style={styles.cardText}>
              GLU
            </Text>
            <Text variant="titleLarge" style={styles.cardTitle}>
              {glucose.Glucose}
            </Text>
            <Text variant="bodySmall" style={styles.cardText}>
              {glucose.time}
            </Text>
          </Card.Content>
        </Card>
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="bodyLarge" style={styles.cardText}>
              TEM
            </Text>
            <Text variant="titleLarge" style={styles.cardTitle}>
              {temperature.Temperature}
            </Text>
            <Text variant="bodySmall" style={styles.cardText}>
              {temperature.time}
            </Text>
          </Card.Content>
        </Card>
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="bodyLarge" style={styles.cardText}>
              GSR
            </Text>
            <Text variant="titleLarge" style={styles.cardTitle}>
              {gsr.Gsr}
            </Text>
            <Text variant="bodySmall" style={styles.cardText}>
              {gsr.time}
            </Text>
          </Card.Content>
        </Card>
      </View>
      <Card style={styles.graphCard}>
        <Card.Content>
          <GraphScreen />
        </Card.Content>
      </Card>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          style={[styles.button, {backgroundColor: Theme.colors.primary}]}
          onPress={clientInt}>
          Connect
        </Button>
        <Button
          mode="contained"
          style={[styles.button, {backgroundColor: Theme.colors.primary}]}
          onPress={start}>
          Start
        </Button>
        <Button
          mode="contained"
          style={[styles.button, {backgroundColor: Theme.colors.primary}]}
          onPress={() => {
            publishMessageToTopic('BIOCON', 'STOP');
          }}>
          Stop
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: Theme.colors.background,
  },
  sensorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  card: {
    flex: 1,
    marginHorizontal: 8,
    elevation: 4,
    borderRadius: 8,
    backgroundColor: Theme.colors.surface,
  },
  graphCard: {
    borderRadius: 8,
    elevation: 4,
    backgroundColor: Theme.colors.surface,
    flex: 1,
  },
  cardText: {
    color: Theme.colors.onSurface,
  },
  cardTitle: {
    color: Theme.colors.primary,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
    marginBottom: 24, // Added margin to ensure space between buttons and other content
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 8,
    elevation: 2,
  },
});

export default DataCollectionScreen;
