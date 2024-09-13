interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

interface Country {
  code: string;
  name: string;
  longitude: number;
  lattitude: number;
}

interface Location {
  id: number;
  name: string;
  countr_code: string;
  longitude: number;
  lattitude: number;
}

interface Newsletter {
  id: number;
  name: string;
  created: string;
  modified: string;
  ownerId: int;
}

interface NewsletterItem {
  id: number;
  title: string;
  created: string;
  modified: string;
}

interface NewsletterItemPhoto {
  id: number;
  newsletterItemId: number;
  name: string;
  caption: string;
  locationId: number;
  format: string;
  size: number;
}

interface NewsletterItemMovieTvReview {
  id: number;
  newsletterItemId: number;
  name: string;
  rating: number;
  notes: string;
  link: string;
  whereToWatch: string[];
}

interface NewsletterItemText {
  id: number;
  newsletterItemId: number;
  title: string;
  description: string;
  link: string;
}

interface NewsletterItemVideo {
  id: number;
  newsletterItemId: number;
  title: string;
  caption: string;
  locationId: number;
  format: string;
  size: number;
}

interface Tag {
  id: number;
  name: string;
}

interface NewsletterItemTag {
  tagId: number;
  newsletterItemId: number;
}
