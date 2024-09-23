import {Model} from '@nozbe/watermelondb';
import {children, relation, field} from '@nozbe/watermelondb/decorators';

export default class Batch extends Model {
  static table = 'batches';

  static associations = {
    visits: {type: 'belongs_to', key: 'visit_id'},
    BIA: {type: 'has_many', foreignKey: 'batch_id'},
  };

  @field('visit_id') visit_id;
  @field('sensorType') sensorType;
  @relation('visits', 'visit_id') visit;
  @children('BIA') BIA;
}
