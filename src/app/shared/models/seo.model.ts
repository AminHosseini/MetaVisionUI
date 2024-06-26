/**
 * مدل سئو
 */
export class SeoModel {
  constructor(
    public slug: string,
    public keywords: string[],
    public metaDescription: string,
  ) {}
}
