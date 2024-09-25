import { Request } from 'express';

interface ImageUploadRequest {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

export const validateNewsletterItemPhotoUploadRequest = (req: Request) => {
  const { newsletterId: _newsletterId } = req.params;
  const newsletterId = parseInt(_newsletterId);

  const name = req.body.name ? req.body.name : null;
  const date = req.body.date ? req.body.date : null;
  const title = req.body.title ? req.body.title : null;
  const caption = req.body.caption ? req.body.caption : null;
  const format = req.body.format ? req.body.format : null;
  const size = req.body.size ? parseInt(req.body.size) : null;
  const locationName = req.body.locationName ? req.body.locationName : null;
  const countryCode = req.body.countryCode ? req.body.countryCode : null;
  const longitude = req.body.longitude ? parseFloat(req.body.longitude) : null;
  const lattitude = req.body.lattitude ? parseFloat(req.body.lattitude) : null;

  if (!req.file) {
    throw new Error('a file must be include');
  }
  const file = req.file as ImageUploadRequest;

  return {
    newsletterId: newsletterId,
    newsletterItem: {
      newsletterId: newsletterId,
      title: title,
      date: date,
    },
    newsletterItemPhoto: {
      caption: caption,
      name: name,
      size: size,
      format: format,
    },
    location: {
      name: locationName,
      countryCode: countryCode,
      longitude: longitude,
      lattitude: lattitude,
    },
    file,
  };
};
