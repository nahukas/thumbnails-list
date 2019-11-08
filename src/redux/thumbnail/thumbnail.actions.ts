import {Ithumbnail} from './../../config/models';
import {ThumbnailsTypes} from './thumbnail.types';

export const setThumbnails = (thumbnailsData: Ithumbnail[]) => ({
  type: ThumbnailsTypes.SET_THUMBNAIL_DATA,
  payload: thumbnailsData,
});
