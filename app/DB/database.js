import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import schema from './schema';
import {Database} from '@nozbe/watermelondb';
import migrations from './migrations';

import Patient from './models/patient';
import Visit from './models/visit';
import Clinical from './models/clinical';
import BIA from './models/BIA';
import GLU from './models/GLU';
import GSR from './models/GSR';
import TEM from './models/TEM';

const adapter = new SQLiteAdapter({
  schema: schema,
  jsi: true,
});

export const database = new Database({
  adapter,
  modelClasses: [Patient, Visit, Clinical, BIA, GLU, GSR, TEM],
  actionEnabled: true,
});
