import {appSchema, tableSchema} from '@nozbe/watermelondb';

const schema = appSchema({
  version: 6,
  tables: [
    tableSchema({
      name: 'patients',
      columns: [
        {name: 'name', type: 'string'},
        {name: 'dateofBirth', type: 'string'},
        {name: 'contactInformation', type: 'string'},
        {name: 'age', type: 'number'},
        {name: 'gender', type: 'string'},
        {name: 'height', type: 'number'},
        {name: 'weight', type: 'number'},
      ],
    }),

    tableSchema({
      name: 'visits',
      columns: [
        {name: 'patient_id', type: 'string', isIndexed: true},
        {name: 'visitDate', type: 'string'},
        {name: 'isClinicalCollected', type: 'boolean'},
        {name: 'isDataCollected', type: 'boolean'},
        {name: 'visitNotes', type: 'string'},
      ],
    }),

    tableSchema({
      name: 'clinics',
      columns: [
        {name: 'visit_id', type: 'string'},
        {name: 'bloodGroup', type: 'string'},
        {name: 'antigenStatus', type: 'string'},
        {name: 'systolic', type: 'number'},
        {name: 'diastolic', type: 'number'},
        {name: 'temperature', type: 'number'},
        {name: 'smokingType', type: 'string'},
        {name: 'overAllYearOfSmoking', type: 'number'},
        {name: 'dailyConsumption', type: 'number'},
        {name: 'smokingIndex', type: 'number'},
        {name: 'alcoholFreeDays', type: 'number'},
        {name: 'alcoholType', type: 'string'},
        {name: 'alcoholConsumption', type: 'number'},
        {name: 'homoglobin', type: 'number'},
        {name: 'reacentHealthIssue', type: 'string'},
        {name: 'hereditaryHistory', type: 'string'},
      ],
    }),
    tableSchema({
      name: 'batches',
      columns: [
        {name: 'visit_id', type: 'string', isIndexed: true},
        {name: 'sensorType', type: 'string'},
      ],
    }),
    tableSchema({
      name: 'BIA',
      columns: [
        {name: 'batch_id', type: 'string', isIndexed: true},
        {name: 'phaseAngle', type: 'number'},
        {name: 'bioimpedance', type: 'number'},
        {name: 'timestamp', type: 'number'},
      ],
    }),
  ],
});

export default schema;
