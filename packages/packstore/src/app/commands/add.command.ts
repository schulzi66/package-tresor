import { addPackage } from '../services/api.service';
import { readConfig } from '../services/file.service';
import { Store } from '../models/store.model';

export const addCmd = async (packageName: string): Promise<void> => {
  const store: Store = readConfig();

  if (store.user?.id) {
    await addPackage(store.user.id, packageName)
      .then((success) => console.log('success', success))
      .catch((error) => console.log('error', error));
  } else {
    console.log('TODO: Register User First');
    // Register User first
  }
};
