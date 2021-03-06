import Ember from 'ember';
import { module, test } from 'qunit';
import { rejectFromCollectionByValue } from 'ember-macaroni';

const {
  Object: EmberObject,
  get
} = Ember;

module('ember-macaroni/collection - rejectFromCollectionByValue');

test('#rejectFromCollectionByValue rejects an item from a collection with a value', (assert) => {
  assert.expect(1);

  const expectedResult = [
    { id: 1, name: 'Tom Smykowski' },
    { id: 2, name: 'Peter Gibbons' }
  ];
  const Department = EmberObject.extend({
    remainingEmployees: rejectFromCollectionByValue('employees', 'name', 'Michael Bolton')
  });
  const subject = Department.create({
    employees: [
      { id: 0, name: 'Michael Bolton' },
      { id: 1, name: 'Tom Smykowski' },
      { id: 2, name: 'Peter Gibbons' }
    ]
  });
  const result = get(subject, 'remainingEmployees');

  assert.deepEqual(result, expectedResult, 'it returns the collection without the rejected item');
});
