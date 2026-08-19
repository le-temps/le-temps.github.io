/**
 * Calculate estimated reading time for mixed English and Chinese content.
 */
export function getReadingTime(content: string): string {
  if (!content) return '1 min read';

  const clean = content.replace(/<\/?[^>]+(>|$)/g, '').replace(/[#*`_~[\]()]/g, '');

  // Count Chinese characters
  const chineseChars = (clean.match(/[\u4e00-\u9fa5]/g) || []).length;
  // Count English words
  const englishWords = (clean.replace(/[\u4e00-\u9fa5]/g, ' ').match(/\b\w+\b/g) || []).length;

  // Average reading speed: ~300 Chinese chars/min, ~200 English words/min
  const minutes = Math.ceil(chineseChars / 300 + englishWords / 200);

  return `${Math.max(1, minutes)} min read`;
}
