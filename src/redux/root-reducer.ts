import {combineReducers} from 'redux';
import thumbnailReducer from './thumbnail/thumbnail.reducer';

export default combineReducers({
  thumbnail: thumbnailReducer,
});
