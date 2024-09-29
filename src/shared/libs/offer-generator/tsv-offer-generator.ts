import dayjs from 'dayjs';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../helpers/common.js';
import { OfferGenerator } from '../../interfaces/offer-generator.interface.js';
import { MockServerData } from '../../types/mock-server-data.type.js';

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;
const RATE = {
  min: 1,
  max: 5,
  step: 1,
};
const ROOMS = {
  min: 1,
  max: 5,
};
const GUESTS = {
  min: 1,
  max: 5,
};
const PRICE = {
  min: 100,
  max: 5000,
};
const COMMENT = {
  min: 1,
  max: 10,
};
const COORDINATES = {
  min: 10,
  max: 100,
  step: 1000,
};

export class TsvOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  generate(): string {
    const title = getRandomItem(this.mockData.titles);
    const description = getRandomItem(this.mockData.descriptions);
    const publishDate = dayjs().subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day').toISOString();
    const city = getRandomItem(this.mockData.cities);
    const previewImage = getRandomItem(this.mockData.offerImages);
    const offerImages = getRandomItems(this.mockData.offerImages).join(',');
    const isPremium = getRandomItem([true, false]);
    const isFavorite = getRandomItem([true, false]);
    const rating = generateRandomValue(RATE.min, RATE.max, RATE.step);
    const houseType = getRandomItem(this.mockData.houseTypes);
    const rooms = generateRandomValue(ROOMS.min, ROOMS.max);
    const guests = generateRandomValue(GUESTS.min, GUESTS.max);
    const price = generateRandomValue(PRICE.min, PRICE.max);
    const amenities = getRandomItems(this.mockData.amenities);
    const author = getRandomItem(this.mockData.users);
    const email = getRandomItem(this.mockData.emails);
    const avatar = getRandomItem(this.mockData.avatars);
    const commentsCount = generateRandomValue(COMMENT.min, COMMENT.max);
    const coordinates = generateRandomValue(COORDINATES.min, COORDINATES.max, COORDINATES.step);

    return [
      title,
      description,
      publishDate,
      city,
      previewImage,
      offerImages,
      isPremium,
      isFavorite,
      rating,
      houseType,
      rooms,
      guests,
      price,
      amenities,
      author,
      email,
      avatar,
      commentsCount,
      coordinates
    ].join('\t');
  }
}
