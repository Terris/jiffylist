import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScreenWrapper, HideKeyboard, TextInput, Button, Alert, Text } from '../components';
import useMutation from '../hooks/useMutation';
import { useAuth } from '../context/AuthContext';
import type { RootTabsNavigationProps } from '../types/navigation.types';

function AddListItemScreen() {
  const navigation = useNavigation<RootTabsNavigationProps>();
  const { session } = useAuth();
  const [description, setDescription] = useState<string>('');
  const [validationError, setValidationError] = useState<string | null>(null);

  const { mutation, loading, error } = useMutation({
    table: 'list_items',
    values: {
      user_id: session?.user.id,
      description,
    },
  });

  const handleAddItem = async () => {
    if (!session?.user.id || !description) {
      setValidationError('Please enter a description');
    } else {
      setValidationError(null);
      await mutation();
      if (!error) {
        navigation.navigate('Home');
      }
    }
  };

  return (
    <ScreenWrapper>
      <HideKeyboard>
        {validationError && <Alert kind="error">{validationError}</Alert>}
        {error && <Alert kind="error">{error}</Alert>}
        <TextInput
          label="description"
          value={description}
          onChangeText={setDescription}
          disabled={loading}
        />
        <Button title="Save" onPress={() => handleAddItem()} disabled={loading} />
      </HideKeyboard>
    </ScreenWrapper>
  );
}

export default AddListItemScreen;
