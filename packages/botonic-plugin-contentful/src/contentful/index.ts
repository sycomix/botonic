import { AssetDelivery } from './asset';
import { DateRangeDelivery } from './date-range';
import { ImageDelivery } from './image';
import { ScheduleDelivery } from './schedule';
import { KeywordsDelivery } from './keywords';
import { FollowUpDelivery } from './follow-up';
import { SearchResult, ModelType, Context } from '../cms';
import { ButtonDelivery } from './button';
import { DeliveryApi } from './delivery-api';
import { CarouselDelivery } from './carousel';
import { TextDelivery } from './text';
import { UrlDelivery } from './url';
import * as cms from '../cms';
import * as time from '../time';
import { QueueDelivery } from './queue';

export default class Contentful implements cms.CMS {
  _delivery: DeliveryApi;
  _carousel: CarouselDelivery;
  _text: TextDelivery;
  _url: UrlDelivery;
  _keywords: KeywordsDelivery;
  _schedule: ScheduleDelivery;
  _dateRange: DateRangeDelivery;
  _image: ImageDelivery;
  _asset: AssetDelivery;
  _queue: QueueDelivery;

  constructor(spaceId: string, accessToken: string, timeoutMs: number = 30000) {
    let delivery = new DeliveryApi(spaceId, accessToken, timeoutMs);
    this._delivery = delivery;
    let button = new ButtonDelivery(delivery);
    this._carousel = new CarouselDelivery(delivery, button);
    this._text = new TextDelivery(delivery, button);
    this._url = new UrlDelivery(delivery);
    this._image = new ImageDelivery(delivery);
    this._asset = new AssetDelivery(delivery);
    this._queue = new QueueDelivery(delivery);
    let followUp = new FollowUpDelivery(
      this._carousel,
      this._text,
      this._image
    );
    [this._text, this._url, this._carousel].forEach(d =>
      d.setFollowUp(followUp)
    );
    this._keywords = new KeywordsDelivery(delivery);
    this._schedule = new ScheduleDelivery(delivery);
    this._dateRange = new DateRangeDelivery(delivery);
  }

  async carousel(
    id: string,
    context: Context = new Context()
  ): Promise<cms.Carousel> {
    return this._carousel.carousel(id, context);
  }

  async text(id: string, context: Context = new Context()): Promise<cms.Text> {
    return this._text.text(id, context);
  }

  async url(id: string): Promise<cms.Url> {
    return this._url.url(id);
  }

  async queue(id: string): Promise<cms.Queue> {
    return this._queue.queue(id);
  }

  async contentsWithKeywords(): Promise<SearchResult[]> {
    return this._keywords.contentsWithKeywords();
  }

  async schedule(id: string): Promise<time.Schedule> {
    return this._schedule.schedule(id);
  }

  image(id: string): Promise<cms.Image> {
    return this._image.image(id);
  }

  chitchat(id: string, context: cms.Context): Promise<cms.Chitchat> {
    return this._text.text(id, context);
  }

  asset(id: string): Promise<cms.Asset> {
    return this._asset.asset(id);
  }

  contents(model: ModelType): Promise<cms.Content[]> {
    return this._delivery.contents(model);
  }

  dateRange(id: string): Promise<time.DateRange> {
    return this._dateRange.dateRange(id);
  }
}

export { DeliveryApi } from './delivery-api';
export { CarouselDelivery } from './carousel';
export { ModelType } from '../cms';