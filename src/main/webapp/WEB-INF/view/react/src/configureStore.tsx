import { createStore } from 'redux'
import { rootReducer } from './reducers'

// и нам нужны initialState каждого редьюсера.
// Это будет сделано автоматически.
export const store = createStore(rootReducer)