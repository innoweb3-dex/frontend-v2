export interface TxDetailInfoData {
  id?: string;
  blockNumber?: string;
  blockHash?: string;
  transactionHash?: string;
  data?: string;
  [key: string]: string | undefined;
}

export interface TxDetailInfoResponse {
  code: number;
  data: TxDetailInfoData;
  msg: string;
}
