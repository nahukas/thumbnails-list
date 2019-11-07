import {ThumbnailsTypes} from './thumbnail.types';

export const setThumbnails = thumbnailsData => ({
  type: ThumbnailsTypes.SET_THUMBNAIL_DATA,
  payload: thumbnailsData,
});
