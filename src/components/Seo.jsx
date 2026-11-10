export { constructMetadata, fitSeoTitle, fitSeoDescription } from '../utils/seo';

export function SeoJsonLd({ data }) {
  if (!data) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default SeoJsonLd;

