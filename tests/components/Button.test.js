const { Button } = require('../../src/components.js')
require('@testing-library/jest-dom')
const { fireEvent, render, waitFor } = require('@testing-library/react')
const React = require('react')

describe('Button', () => {
  it.each([
    ['', false, 'does not'],
    ['Lorem ipsum', true, 'does'],
  ])('$3 render a button element with label "$1"', (label, expected, _) => {
    const { queryByRole } = render(<Button label={label} />)
    const button = queryByRole('button')

    // Expect a <button> element or nothing.
    expect(button instanceof HTMLButtonElement).toBe(expected)

    // Expect that the label does or does not exist.
    if (expected) {
      expect(button?.textContent).toBe(label)
    } else {
      expect(button?.textContent).toBe(undefined)
    }
  })

  it('renders extra props', () => {
    const onClick = jest.fn()
    const { queryByRole } = render(
      <Button label='Lorem ipsum' onClick={onClick} />
    )

    // Click the button.
    fireEvent(queryByRole('button'), new MouseEvent('click', { bubbles: true }))

    // Expect that onClick was called once.
    expect(onClick.mock.calls.length).toBe(1)

  })
})
