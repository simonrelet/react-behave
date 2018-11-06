// import { mount } from 'enzyme'
// import React from 'react'
// import ClickOutside from './ClickOutside'

describe('<ClickOutside />', () => {
  it('notifies on a click outside', () => {
  //   const cb = jest.fn()
  //   const wrapper = mount(
  //     <ClickOutside onClickOutside={cb}>
  //       {ref => <p ref={ref}>Hello</p>}
  //     </ClickOutside>,
  //   )
  //   const event = { target: document }
  //   wrapper.find(EventListener).prop('onClick')(event)
  //   expect(cb).toHaveBeenCalledWith(event)
  })

  it("doesn't notify on a click inside", () => {
  //   let insideRef
  //   const cb = jest.fn()
  //   const wrapper = mount(
  //     <ClickOutside onClickOutside={cb}>
  //       {ref => (
  //         <p ref={ref}>
  //           <span ref={inside => (insideRef = inside)}>inside</span> Hello
  //         </p>
  //       )}
  //     </ClickOutside>,
  //   )
  //   const event = { target: insideRef }
  //   wrapper.find(EventListener).prop('onClick')(event)
  //   expect(cb).not.toHaveBeenCalled()
  })

  it("doesn't notify if there is no ref", () => {
  //   const cb = jest.fn()
  //   const wrapper = mount(
  //     <ClickOutside onClickOutside={cb}>{() => <p>Hello</p>}</ClickOutside>,
  //   )
  //   const event = { target: document }
  //   wrapper.find(EventListener).prop('onClick')(event)
  //   expect(cb).not.toHaveBeenCalled()
  })
})
