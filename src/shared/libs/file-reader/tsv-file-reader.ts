import {FileReader} from '../../interfaces/file-reader.interface.js';
import {Offer} from '../../types/offer.type.js';
import {createReadStream, readFileSync} from 'node:fs';
import {City} from '../../types/city.type.js';
import {House} from '../../types/house.type.js';
import {User} from '../../types/author.type.js';
import {Amenity} from '../../types/amenity.type.js';
import {Coordinates} from '../../types/coordinates.type.js';
import {UserType} from '../../types/user-type.type.js';
import { EventEmitter } from 'node:stream';

export class TsvFileReader extends EventEmitter implements FileReader {
  private CHUNK_SIZE = 16384;

  private rawData = '';

  constructor(private readonly filename: string) {
    super();
  }

  private validateRawData(): void {
    if (!this.rawData) {
      throw new Error('Файл не был прочитан');
    }
  }

  private parseRawDataToOffers(): Offer[] {
    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => this.parseLineToOffer(line));
  }

  private parseLineToOffer(line: string): Offer {
    const [
      title,
      description,
      publishDate,
      city,
      previewImage,
      photos,
      isPremium,
      isFavorite,
      rating,
      houseType,
      rooms,
      guests,
      price,
      amenities,
      author,
      commentsCount,
      coordinates
    ] = line.split('\t');

    return {
      title,
      description,
      publishDate: new Date(publishDate),
      city: city as City,
      previewImage,
      photos: this.parsePhotos(photos),
      isPremium: Boolean(isPremium),
      isFavorite: Boolean(isFavorite),
      rating: Number(rating),
      houseType: houseType as House,
      rooms: Number(rooms),
      guests: Number(guests),
      price: Number(price),
      amenities: this.parseAmenities(amenities),
      author: this.parseAuthor(author),
      commentsCount: Number(commentsCount),
      coordinates: this.parseCoordinates(coordinates),
    };
  }

  private parsePhotos(photos: string): string[] {
    return photos.split(',');
  }

  private parseAmenities(amenities: string): Amenity[] {
    return amenities.split(', ').map((name) => (name as Amenity));
  }

  private parseAuthor(author: string): User {
    const [username, email, avatarUrl, password, type] = author.split(';');
    return { username, email, avatarUrl: avatarUrl || undefined, password, type: type as UserType };
  }

  private parseCoordinates(coordinates: string): Coordinates {
    const [latitude, longitude] = coordinates.split(',').map(Number);
    return { latitude, longitude };
  }

  public async read(): Promise<void> {
    const readStream = createReadStream(this.filename, {
      highWaterMark: this.CHUNK_SIZE,
      encoding: 'utf-8',
    });

    let remainingData = '';
    let nextLinePosition = -1;
    let importedRowCount = 0;

    for await (const chunk of readStream) {
      remainingData += chunk.toString();

      while ((nextLinePosition = remainingData.indexOf('\n')) >= 0) {
        const completeRow = remainingData.slice(0, nextLinePosition + 1);
        remainingData = remainingData.slice(++nextLinePosition);
        importedRowCount++;

        const parsedOffer = this.parseLineToOffer(completeRow);
        this.emit('line', parsedOffer);
      }
    }

    this.emit('end', importedRowCount);
  }

  public toArray(): Offer[] {
    this.validateRawData();
    return this.parseRawDataToOffers();
  }
}
