import QUnit from 'steal-qunit';
import value from '../can-value';

QUnit.module('can-value');

QUnit.test('Initialized the plugin', function(){
  QUnit.equal(typeof value, 'object');
});
