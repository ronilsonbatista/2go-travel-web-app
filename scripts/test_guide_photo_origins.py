"""Regression checks for aliases that filename and binary checks cannot detect."""
import unittest
from guide_photo_origins import origin_photo_id

def info(credit):
    return {'extmetadata': {'Credit': {'value': credit}}}

class OriginTests(unittest.TestCase):
    def test_renamed_commons_files_share_flickr_original(self):
        # Chicago / Chicago from under the Cloud Gate have different Commons
        # filenames but the same credited Flickr original.
        self.assertEqual(origin_photo_id(info('<a href="https://www.flickr.com/photos/123@N00/9694666470/">source</a>')), 'flickr:9694666470')
        self.assertEqual(origin_photo_id(info('<a href="//flickr.com/photos/other/9694666470">source</a>')), 'flickr:9694666470')

    def test_query_link_and_html_entities(self):
        self.assertEqual(origin_photo_id(info('https://flickr.com/photo.gne?foo=1&amp;id=123456789')), 'flickr:123456789')

    def test_ambiguous_credit_is_not_a_proven_id(self):
        self.assertIsNone(origin_photo_id(info('https://flickr.com/photos/a/12345 https://flickr.com/photos/b/67890')))

    def test_generic_numbers_and_other_domains_are_not_photo_ids(self):
        for credit in ['Own work 20251030', 'https://notflickr.com/photos/a/12345', 'https://flickr.com.evil.test/photos/a/12345', 'https://flickr.com/photos/12345/']:
            self.assertIsNone(origin_photo_id(info(credit)))

    def test_unsplash_id_survives_descriptive_slug(self):
        self.assertEqual(origin_photo_id(info('https://unsplash.com/photos/6ieXV38E3h8')), 'unsplash:6ieXV38E3h8')
        self.assertEqual(origin_photo_id(info('https://unsplash.com/photos/blue-water-6ieXV38E3h8')), 'unsplash:6ieXV38E3h8')
        self.assertEqual(origin_photo_id(info('https://unsplash.com/photos/kDsNr-vu7ms')), 'unsplash:kDsNr-vu7ms')
        self.assertIsNone(origin_photo_id(info('https://unsplash.com.evil.test/photos/6ieXV38E3h8')))

    def test_other_credited_providers_and_ambiguity(self):
        self.assertEqual(origin_photo_id(info('https://500px.com/photo/125363205/title')), '500px:125363205')
        self.assertEqual(origin_photo_id(info('https://www.pexels.com/photo/a-beach-123456/')), 'pexels:123456')
        self.assertEqual(origin_photo_id(info('https://pixabay.com/photos/a-beach-123456/')), 'pixabay:123456')
        self.assertIsNone(origin_photo_id(info('https://unsplash.com/photos/6ieXV38E3h8 https://flickr.com/photos/a/12345')))

    def test_archived_and_other_original_photo_ids(self):
        self.assertEqual(origin_photo_id(info('https://web.archive.org/web/2016/http://www.panoramio.com/photo/2800963')), 'panoramio:2800963')
        self.assertEqual(origin_photo_id(info('https://web.archive.org/web/2016/https%3A%2F%2Fwww.panoramio.com%2Fphoto%2F2800963')), 'panoramio:2800963')
        self.assertEqual(origin_photo_id(info('https://www.inaturalist.org/photos/170668294')), 'inaturalist:170668294')
        self.assertEqual(origin_photo_id(info('https://www.dvidshub.net/image/1402256')), 'dvids:1402256')
        self.assertIsNone(origin_photo_id(info('https://panoramio.com.evil.test/photo/2800963')))

if __name__ == '__main__': unittest.main()
