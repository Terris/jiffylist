import { useCallback } from 'react';
import { FlatList, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Alert, ScreenWrapper, Text, Loading } from '../components';
import useListItems from '../hooks/useListItems';
import { colors } from '../styles/colors';

function HomeScreen() {
  const { refetch, data, error, loading } = useListItems();

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [])
  );

  return (
    <ScreenWrapper>
      {error && <Alert kind="error">{error}</Alert>}
      {loading && <Loading />}
      <FlatList
        style={{ width: '100%' }}
        data={data}
        renderItem={({ item }) => (
          <View
            style={{
              marginBottom: 12,
              paddingBottom: 12,
              borderBottomColor: colors.lightGreen,
              borderBottomWidth: 1,
            }}
          >
            <Text>{item.description}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </ScreenWrapper>
  );
}

export default HomeScreen;
