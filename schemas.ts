export const ListItemSchema = {
  name: 'list_items',
  properties: {
    _id: 'objectId',
    _partition: 'string?',
    description: 'string',
  },
  primaryKey: '_id',
};
