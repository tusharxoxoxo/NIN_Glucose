import {Model} from '@nozbe/watermelondb';
import {field, action, writer, children} from '@nozbe/watermelondb/decorators';
import {relation} from '@nozbe/watermelondb/decorators';

export default class Visit extends Model {
  static table = 'visits';

  static associations = {
    patients: {type: 'belongs_to', key: 'patient_id'},
    clinical: {type: 'belongs_to', key: 'visit_id'},
    batches: {type: 'has_many', foreignKey: 'visit_id'},
  };

  @field('patient_id') patient_id;
  @field('visitDate') visitDate;
  @field('visitNotes') visitNotes;
  @field('isClinicalCollected') isclinicalCollected;
  @field('isDataCollected') isDataCollected;
  @relation('patient', 'patient_id') patient;
  @relation('clinics', 'visit_id') clinic;
  @children('batches') batches;

  @writer async addClinical(clinicalInfo) {
    return await this.collections.get('clinics').create(clinic => {
      clinic.visit.id = this._raw.id;
      clinic.bloodGroup = clinicalInfo.bloodGroup;
      clinic.antigenStatus = clinicalInfo.antigenStatus;
      clinic.systolic = clinicalInfo.systolic;
      clinic.diastolic = clinicalInfo.diastolic;
      clinic.temperature = clinicalInfo.temperature;
      clinic.smokingType = clinicalInfo.smokingType;
      clinic.overAllYearOfSmoking = clinicalInfo.overAllYearOfSmoking;
      clinic.dailyConsumption = clinicalInfo.dailyConsumption;
      clinic.smokingIndex = clinicalInfo.smokingIndex;
      clinic.alcoholFreeDays = clinicalInfo.alcoholFreeDays;
      clinic.alcoholType = clinicalInfo.alcoholType;
      clinic.alcoholConsumption = clinicalInfo.alcoholConsumption;
      clinic.homoglobin = clinicalInfo.homoglobin;
      clinic.reacentHealthIssue = clinicalInfo.reacentHealthIssue;
      clinic.hereditaryHistory = clinicalInfo.hereditaryHistory;
    });
  }

  @writer async ClinicalDataCollected() {
    await this.update(clinic => {
      clinic.isClinicalCollected = true;
    });
  }

  @writer async DataCollected() {
    await this.update(clinic => {
      clinic.isDataCollected = true;
    });
  }
}
