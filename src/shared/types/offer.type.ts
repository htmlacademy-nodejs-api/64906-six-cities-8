import {City} from './city.type.js';
import {House} from './house.type.js';
import {Amenity} from './amenity.type.js';
import {User} from './author.type.js';
import {Coordinates} from './coordinates.type.js';

export type Offer = {
  title: string;
  description: string;
  publishDate: Date;
  city: City;
  previewImage: string;
  photos: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  houseType: House;
  rooms: number;
  guests: number;
  price: number;
  amenities: Amenity[];
  author: User;
  commentsCount?: number;
  coordinates: Coordinates;
};
