// src/app/constants/asset-base.ts

export interface Asset {
  Bottle_Code: string;
  Content_Code: string;
  Content_Price: number | string;
  Bottle_Price: number | string;
  Redeem_Good: number | string;
  Redeem_Damaged: number | string;
  Discount_RefillB: number | string;
  Env_Tax_Customer: number | string;
  Env_Tax_Producer: number | string;
  Env_Tax_Retailer: number | string;
  Discard_fine: number | string;
  Current_SelfRefill_Count: number;
  Current_PlantRefill_Count: number;
  Latest_Refill_Date: string;
}

// ✅ Define a base structure to clone dynamically
export const BASE_ASSET: Asset = {
  Bottle_Code: '',
  Content_Code: '',
  Content_Price: 0,
  Bottle_Price: 0,
  Redeem_Good: 0,
  Redeem_Damaged: 0,
  Discount_RefillB: 0,
  Env_Tax_Customer: 0,
  Env_Tax_Producer: 0,
  Env_Tax_Retailer: 0,
  Discard_fine: 0,
  Current_SelfRefill_Count: 0,
  Current_PlantRefill_Count: 0,
  Latest_Refill_Date: ''
};
