declare module 'paapi5-nodejs-sdk' {
  export class ProductAdvertisingAPIv3 {
    constructor(config: {
      accessKey: string;
      secretKey: string;
      partnerTag: string;
      partnerType: string;
      host: string;
      region: string;
    });

    getItems(request: {
      ItemIds: string[];
      Resources: string[];
      Condition: string;
      PartnerTag: string;
      PartnerType: string;
      Marketplace: string;
    }): Promise<{
      ItemsResult?: {
        Items?: Array<{
          ItemInfo?: {
            Title?: { DisplayValue?: string };
            ByLineInfo?: { Contributors?: Array<{ Name?: string }> };
            ContentInfo?: { PublicationDate?: { Year?: number } };
            Classifications?: { ProductGroup?: { DisplayValue?: string } };
          };
          Images?: {
            Primary?: {
              Large?: { URL?: string };
            };
          };
        }>;
      };
    }>;
  }
}
