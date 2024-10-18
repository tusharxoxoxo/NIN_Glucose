import {Model} from '@nozbe/watermelondb';
import {field, relation} from '@nozbe/watermelondb/decorators';

export default class BIA extends Model {
  static table = 'BIA';
  static associations = {
    visit: {type: 'belongs_to', key: 'visit_id'},
  };

  @field('time') time;
  @field('config') config;
  @field('freq') freq;
  @field('data') data;
  @relation('visit', 'visit_id') visit;
}
