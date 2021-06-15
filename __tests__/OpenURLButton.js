import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'

import { OpenURLButton } from '../components/OpenURLButton'

it('renders correctly', () => {
  const { toJSON } = render(
    <OpenURLButton url="https://google.com" title="visit google" />
  )
  expect(toJSON()).toMatchSnapshot()
})
