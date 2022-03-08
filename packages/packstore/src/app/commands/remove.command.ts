import { removePackage } from '../services/api.service';
import { readConfigAndValidate } from '../services/file.service';
import { Store } from '../models/store.model';

export const removeCmd = async (packageName: string): Promise<void> => {
  const store: Store | never = await readConfigAndValidate();

  await removePackage(store.user!.id, packageName)
    .then((success: boolean) => console.log('success', success))
    .catch((error) => console.error('error adding package', error));
};
