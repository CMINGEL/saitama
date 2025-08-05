import { screen, waitFor } from '@testing-library/react'
import { describe, it } from 'vitest'
import { trans } from '../config/i18n'
import './mocks/FirestoreMemoryMock'
import { ejecAllMocks, renderAppWithRoute } from './helpers'
import store from '../redux/store'
import { getWords } from '../redux/actions'
import { setGroupHashWordsByNumberWords, setStudiedhashWords } from '../redux/config.slice'
ejecAllMocks()

describe('App', () => {
  beforeEach(async () => {
    await store.dispatch(getWords())
    store.dispatch(setGroupHashWordsByNumberWords(10))
    store.dispatch(setStudiedhashWords(['word1', 'word2']))
    renderAppWithRoute()
  })

  it('should work as expected', () => {
    expect(screen.getByText(trans('label.logoTextBar'))).toBeInTheDocument()
  })

  it('should show total words in memory', async () => {
    await waitFor(() => {
      // expect(screen.getByText(`${trans('label.totalWords')} ${3}`)).toBeInTheDocument()
      expect(screen.getByText(/Total de oraciones: 3/)).toBeInTheDocument()
    })
  })

    it('should show 2 studied words', () => {
    expect(screen.getByText(/Total palabras estudiadas 2/i)).toBeInTheDocument()
  })


})
