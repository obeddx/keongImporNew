// types.ts

export interface Product {
    _id: string;
    name: string;
    description: string;
    image: {
      asset: {
        url: string;
      };
    };
    type: string;
    size: string;
    weight: string;
    packaging: string;
    certification: string;
  }
  