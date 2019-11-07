import {ThumbnailsTypes} from './thumbnail.types';

const INITIAL_STATE = {
  thumbnailsData: [],
};

const thumbnailReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ThumbnailsTypes.SET_THUMBNAIL_DATA:
      return {
        ...state,
        thumbnailsData: action.payload,
      };
    default:
      return state;
  }
};

export default thumbnailReducer;
