import { Store } from '../models/store.model';
import { listPackages } from '../services/api.service';
import { readConfigAndValidate } from '../services/file.service';

export const listCmd = async (): Promise<void> => {
  const store: Store | never = await readConfigAndValidate();

  await listPackages(store.user!.id)
    .then((packages: string[]) => console.log(packages))
    .catch((error) => console.log('error', error));
};
