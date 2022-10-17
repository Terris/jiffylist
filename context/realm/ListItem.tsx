import { Realm, createRealmContext } from '@realm/react';

export class ListItem extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  uid!: Realm.BSON.ObjectId;
  description!: string;
  createdAt!: Date;
  updatedAt!: Date;

  static generate(description: string, uid: Realm.BSON.ObjectId) {
    return {
      _id: new Realm.BSON.ObjectId(),
      uid: new Realm.BSON.ObjectId(),
      description,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  static schema = {
    name: 'Task',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      uid: 'objectId',
      description: 'string',
      isComplete: { type: 'bool', default: false },
      createdAt: 'date',
    },
  };
}

const { RealmProvider, useRealm, useQuery } = createRealmContext({ schema: [ListItem] });
