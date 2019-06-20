import { Queue, SearchableBy, SearchableByKeywords } from '../../src/cms';
import { testContentful } from './contentful.helper';
import { testSchedule } from './schedule.test';

const TEST_QUEUE_ID = '1rrH5vyrCZR2ZzysLmeCXh';

test('TEST: contentful Queue', async () => {
  let queue = await testContentful().queue(TEST_QUEUE_ID);

  let searchableBy = new SearchableBy([
    new SearchableByKeywords('HIGH_PRIO', ['high1', 'high2'], 99),
    new SearchableByKeywords('LOW_PRIO', ['low1', 'low2'], 10)
  ]);
  expect(queue).toEqual(
    new Queue(
      'TEST_QUEUE',
      'Short Text',
      'queueName',
      testSchedule(),
      searchableBy
    )
  );
});
