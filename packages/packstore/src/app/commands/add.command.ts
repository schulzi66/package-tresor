import { readConfig } from '../file.service';
import { Store } from '../models/store.model';

export const addCmd = async (packageName: string) => {
  const store: Store = await readConfig();

  console.log(store);
};
