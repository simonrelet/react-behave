import React from 'react';
import TestRenderer from 'react-test-renderer';
import toInnerRef from './toInnerRef';

describe('toInnerRef', () => {
  it('passes the `ref` under the name `innerRef`', () => {
    const Test = jest.fn(() => <p />);
    const TestComponent = toInnerRef(Test);

    const ref = {
      current: 'my-ref',
    };

    const props = {
      prop1: true,
      prop2: true,
    };

    TestRenderer.create(<TestComponent ref={ref} {...props} />);

    expect(Test).toHaveBeenCalledWith(
      { innerRef: ref, ...props },
      expect.anything(),
    );
  });
});
