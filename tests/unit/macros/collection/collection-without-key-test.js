import Ember from 'ember';
import { module, test } from 'qunit';
import { collectionWithoutKey } from 'ember-macaroni';

const {
  Object: EmberObject,
  get
} = Ember;

module('ember-macaroni/collection - collectionWithoutKey');

test('#collectionWithoutKey returns the collection without the item by key', (assert) => {
  assert.expect(1);

  const employees = [
    { id: 0, name: 'Michael Bolton' },
    { id: 1, name: 'Tom Smykowski' },
    { id: 2, name: 'Peter Gibbons' }
  ];
  const expectedResult = [
    { id: 1, name: 'Tom Smykowski' },
    { id: 2, name: 'Peter Gibbons' }
  ];
  const Department = EmberObject.extend({
    remainingEmployees: collectionWithoutKey('employees', 'selectedEmployee')
  });
  const subject = Department.create({
    employees,
    selectedEmployee: employees[0]
  });
  const result = get(subject, 'remainingEmployees');

  assert.deepEqual(result, expectedResult, 'it returns the found item');
});
