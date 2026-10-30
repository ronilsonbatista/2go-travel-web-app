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

if __name__ == '__main__': unittest.main()
