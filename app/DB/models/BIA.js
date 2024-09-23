import {Model} from '@nozbe/watermelondb';
import {field, relation} from '@nozbe/watermelondb/decorators';

export default class BIA extends Model {
  static table = 'BIA';
  static associations = {
    batches: {type: 'belongs_to', key: 'batch_id'},
  };
  @field('phaseAngle') phaseAngle;
  @field('bioimpedance') bioimpedance;
  @field('timestamp') timestamp;
  @relation('batches', 'batch_id') batch;
}
