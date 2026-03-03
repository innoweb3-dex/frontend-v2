export interface AddressDexTxnsItem {
  id: string;
  createdAt: number;
  updatedAt: number;
  userAddress: string;
  blockNumber: string;
  blockHash: string;
  txHash: string;
  txTime: number;
}

export interface AddressDexTxnsResponse {
  code: number;
  data: {
    list: Array<AddressDexTxnsItem>;
    total: number;
    page: number;
    pageSize: number;
  };
  msg: string;
}
