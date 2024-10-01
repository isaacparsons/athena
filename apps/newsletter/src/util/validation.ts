/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request } from 'express';
import { NewsletterItemType } from '../types/api';

import {
  UploadRequest,
  PhotoDetailsInput,
  VideoDetailsInput,
  TextDetailsInput,
} from '../types/server';

function validateString(name: string, value: any) {
  if (typeof value !== 'string') {
    throw new Error(`${name} Must be a string`);
  }
  return value as string;
}

function validateInt(name: string, value: any) {
  if (typeof value !== 'string') {
    throw new Error(`${name} Must be a number`);
  }
  return parseInt(value) as number;
}

function validateFloat(name: string, value: any) {
  if (typeof value !== 'string') {
    throw new Error(`${name} Must be a number`);
  }
  return parseFloat(value) as number;
}

export const validateNewsletterItemCreateRequest = (req: Request) => {
  const newsletterId = validateInt('newsletterId', req.params.newsletterId);
  const date = req.body.date ? validateString('date', req.body.date) : null;

  const title = req.body.title ? validateString('title', req.body.title) : null;
  const locationName = req.body.locationName
    ? validateString('locationName', req.body.locationName)
    : null;
  const countryCode = req.body.countryCode
    ? validateString('countryCode', req.body.countryCode)
    : null;
  const longitude = req.body.longitude
    ? validateFloat('longitude', req.body.longitude)
    : null;
  const lattitude = req.body.lattitude
    ? validateFloat('lattitude', req.body.lattitude)
    : null;

  if (!title) throw new Error('A newsletter item must have a title');

  const details = validateItemDetails(req);
  return {
    newsletterItem: {
      newsletterId,
      date,
      title,
      detailsType: details.detailsType,
    },
    details,
    location: {
      name: locationName,
      countryCode: countryCode,
      longitude: longitude,
      lattitude: lattitude,
    },
  };
};

export const validateItemDetailsType = (
  detailsType: string | undefined | null
) => {
  if (!detailsType)
    throw new Error('A newsletter item must have a detailsType');

  if (
    detailsType !== 'text' &&
    detailsType !== 'photo' &&
    detailsType !== 'video'
  )
    throw new Error('detailsType is invalid');

  return detailsType as NewsletterItemType;
};

const validateItemDetails = (req: Request) => {
  const detailsType = validateItemDetailsType(req.params.detailsType);

  if (detailsType === 'text') {
    return validateNewsletterItemTextCreateRequest(req);
  } else if (detailsType === 'photo') {
    return validateNewsletterItemPhotoUploadRequest(req);
  } else if (detailsType === 'video') {
    return validateNewsletterItemVideoUploadRequest(req);
  } else {
    throw new Error('detailsType is invalid');
  }
};

export const validateNewsletterItemPhotoUploadRequest = (req: Request) => {
  const _name = req.body.name ? validateString('name', req.body.name) : null;
  const title = req.body.title ? validateString('title', req.body.title) : null;

  const name = _name ?? title;
  if (!name) {
    throw new Error('name must be specified');
  }
  const caption = req.body.caption
    ? validateString('caption', req.body.caption)
    : null;
  const format = req.body.format
    ? validateString('format', req.body.format)
    : null;
  const size = req.body.size ? validateInt('size', req.body.size) : null;

  if (!req.file) {
    throw new Error('a file must be include');
  }
  const file = req.file as UploadRequest;

  const details: PhotoDetailsInput = {
    detailsType: 'photo',
    caption: caption,
    name: name,
    size: size,
    format: format,
    file,
  };

  return details;
};

export const validateNewsletterItemVideoUploadRequest = (req: Request) => {
  const _name = req.body.name ? validateString('name', req.body.name) : null;
  const title = req.body.title ? validateString('title', req.body.title) : null;
  const name = _name ?? title;
  if (!name) {
    throw new Error('name must be specified');
  }
  const caption = req.body.caption
    ? validateString('caption', req.body.caption)
    : null;
  const format = req.body.format
    ? validateString('format', req.body.format)
    : null;
  const size = req.body.size ? validateInt('size', req.body.size) : null;

  if (!req.file) {
    throw new Error('a file must be include');
  }
  const file = req.file as UploadRequest;

  const details: VideoDetailsInput = {
    detailsType: 'video',
    caption: caption,
    name: name,
    size: size,
    format: format,
    file,
  };

  return details;
};

export const validateNewsletterItemTextCreateRequest = (req: Request) => {
  const link = req.body.link ? validateString('link', req.body.link) : null;
  const description = req.body.description
    ? validateString('description', req.body.description)
    : null;

  const details: TextDetailsInput = {
    detailsType: 'text',
    link,
    description,
    title: req.body.title,
  };

  return details;
};
