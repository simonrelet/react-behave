import { Component } from 'react';
import getDisplayName from './getDisplayName';

describe('getDisplayName', () => {
  describe('using a defined `displayName`', () => {
    it('gets the name of a component', () => {
      class Test extends Component {
        static displayName = 'NotTest';
      }

      expect(getDisplayName(Test)).toBe('NotTest');
    });

    it('gets the name of a lambda component', () => {
      const Test = () => {};
      Test.displayName = 'NotTest';

      expect(getDisplayName(Test)).toBe('NotTest');
    });

    it('gets the name of a functional component', () => {
      function Test() {}
      Test.displayName = 'NotTest';

      expect(getDisplayName(Test)).toBe('NotTest');
    });
  });

  describe('using the computed name', () => {
    it('gets the name of a component', () => {
      class Test extends Component {}

      expect(getDisplayName(Test)).toBe('Test');
    });

    it('gets the name of a lambda component', () => {
      const Test = () => {};

      expect(getDisplayName(Test)).toBe('Test');
    });

    it('gets the name of a functional component', () => {
      function Test() {}

      expect(getDisplayName(Test)).toBe('Test');
    });
  });

  it("returns `'Component'` by default", () => {
    expect(getDisplayName('')).toBe('Component');
  });
});
