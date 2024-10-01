import {
  NewNewsletterItemPhoto,
  NewNewsletterItemVideo,
  NewNewsletterItemText,
} from './db';

export interface UserSession {
  email: string;
  userId: number;
  accessToken: string;
  refreshToken: string;
}

export interface UploadRequest {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

export type ItemDetailsInput =
  | PhotoDetailsInput
  | VideoDetailsInput
  | TextDetailsInput;

export function isPhotoItem(
  details: ItemDetailsInput
): details is PhotoDetailsInput {
  return (details as PhotoDetailsInput).detailsType === 'photo';
}

export function isVideoItem(
  details: ItemDetailsInput
): details is VideoDetailsInput {
  return (details as VideoDetailsInput).detailsType === 'video';
}

export function isTextItem(
  details: ItemDetailsInput
): details is TextDetailsInput {
  return (details as TextDetailsInput).detailsType === 'text';
}

export type PhotoDetailsInput = NewNewsletterItemPhoto & {
  file: UploadRequest;
  detailsType: 'photo';
};

export type VideoDetailsInput = NewNewsletterItemVideo & {
  file: UploadRequest;
  detailsType: 'video';
};

export type TextDetailsInput = NewNewsletterItemText & {
  detailsType: 'text';
};
