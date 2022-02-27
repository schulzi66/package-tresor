import { addPackage } from '../services/api.service';
import { readConfigAndValidate } from '../services/file.service';
import { Store } from '../models/store.model';

export const addCmd = async (packageName: string): Promise<void> => {
  const store: Store | never = await readConfigAndValidate();

  await addPackage(store.user!.id, packageName)
    .then((success: boolean) => console.log('success', success))
    .catch((error) => console.error('error', error));
};
