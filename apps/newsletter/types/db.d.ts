interface DBUser {
  id: number;
  firstName?: string;
  lastName?: string;
  email: string;
}

interface DBNewsletter {
  id: number;
  name: string;
  created: string;
  modified: string;
  ownerId: int;
  startDate?: string;
  endDate?: string;
  googleDriveFolderId: string;
}

interface DBUserNewsletter {
  userId: number;
  newsletterId: number;
}

interface DBCountry {
  code: string;
  name: string;
  longitude: number;
  lattitude: number;
}

interface DBLocation {
  id: number;
  name: string;
  country_code?: string;
  longitude?: number;
  lattitude?: number;
}

interface DBNewsletterItem {
  id: number;
  newsletterId: number;
  title: string;
  created: string;
  modified: string;
}

interface DBNewsletterItemPhoto {
  id: number;
  newsletterItemId: number;
  link: string;
  googleDriveFileId: string;
  name: string;
  caption?: string;
  locationId?: number;
  format?: string;
  size?: number;
}

interface DBNewsletterItemMovieTvReview {
  id: number;
  newsletterItemId: number;
  name: string;
  rating: number;
  notes?: string;
  link?: string;
  whereToWatch?: string[];
}

interface DBNewsletterItemText {
  id: number;
  newsletterItemId: number;
  title: string;
  description?: string;
  link?: string;
}

interface DBNewsletterItemVideo {
  id: number;
  newsletterItemId: number;
  title: string;
  caption?: string;
  locationId?: number;
  format?: string;
  size?: number;
}

interface DBTag {
  id: number;
  name: string;
}

interface DBNewsletterItemTag {
  tagId: number;
  newsletterItemId: number;
}

interface DBFederatedCredentials {
  id: number;
  provider: string;
  subjectId: string;
  userId: number;
}
