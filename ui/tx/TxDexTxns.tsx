import { Box } from '@chakra-ui/react';

import type { TxDetailInfoData } from 'types/api/txDetailInfo';

import useApiQuery from 'lib/api/useApiQuery';
import { Skeleton } from 'toolkit/chakra/skeleton';
import CopyToClipboard from 'ui/shared/CopyToClipboard';
import DataFetchAlert from 'ui/shared/DataFetchAlert';
import * as DetailedInfo from 'ui/shared/DetailedInfo/DetailedInfo';

interface Props {
  hash: string;
}

const TxDexTxns = ({ hash }: Props) => {
  const { data, isPlaceholderData, isError } = useApiQuery('general:tx_detail_info', {
    pathParams: { hash },
    queryOptions: {
      enabled: Boolean(hash),
    },
  });

  const detailData: TxDetailInfoData | undefined = data?.code === 0 ? data.data : undefined;

  if (isError) {
    return <DataFetchAlert/>;
  }

  const isEmpty = !detailData || (
    !detailData.blockNumber &&
    !detailData.blockHash &&
    !detailData.transactionHash &&
    !detailData.data
  );

  if (isEmpty) {
    return (
      <DetailedInfo.Container templateColumns={{ base: 'minmax(0, 1fr)', lg: 'minmax(215px, auto) minmax(0, 1fr)' }}>
        { isPlaceholderData ? (
          <>
            <DetailedInfo.ItemLabel isLoading>Loading</DetailedInfo.ItemLabel>
            <DetailedInfo.ItemValue>
              <Skeleton loading>Loading...</Skeleton>
            </DetailedInfo.ItemValue>
          </>
        ) : (
          <>
            <DetailedInfo.ItemLabel>No data</DetailedInfo.ItemLabel>
            <DetailedInfo.ItemValue>
              There are no dex tx details for this transaction.
            </DetailedInfo.ItemValue>
          </>
        ) }
      </DetailedInfo.Container>
    );
  }

  return (
    <DetailedInfo.Container templateColumns={{ base: 'minmax(0, 1fr)', lg: 'minmax(215px, auto) minmax(0, 1fr)' }}>
      { detailData.blockNumber && (
        <>
          <DetailedInfo.ItemLabel hint="Block Number" isLoading={ isPlaceholderData }>
            Block Number
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue>
            { detailData.blockNumber }
          </DetailedInfo.ItemValue>
        </>
      ) }

      { detailData.blockHash && (
        <>
          <DetailedInfo.ItemLabel hint="Block Hash" isLoading={ isPlaceholderData }>
            Block Hash
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue>
            <Skeleton loading={ isPlaceholderData } overflow="hidden" whiteSpace="pre-wrap" wordBreak="break-all">
              { detailData.blockHash }
              <CopyToClipboard text={ detailData.blockHash } isLoading={ isPlaceholderData }/>
            </Skeleton>
          </DetailedInfo.ItemValue>
        </>
      ) }

      { detailData.transactionHash && (
        <>
          <DetailedInfo.ItemLabel hint="Transaction Hash" isLoading={ isPlaceholderData }>
            Transaction Hash
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue>
            <Skeleton loading={ isPlaceholderData } overflow="hidden" whiteSpace="pre-wrap" wordBreak="break-all">
              { detailData.transactionHash }
              <CopyToClipboard text={ detailData.transactionHash } isLoading={ isPlaceholderData }/>
            </Skeleton>
          </DetailedInfo.ItemValue>
        </>
      ) }

      { detailData.data && (
        <>
          <DetailedInfo.ItemLabel hint="Data" isLoading={ isPlaceholderData }>
            Data
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue>
            <Skeleton loading={ isPlaceholderData }>
              <Box
                as="pre"
                p={ 4 }
                fontSize="sm"
                borderRadius="md"
                whiteSpace="pre-wrap"
                wordBreak="break-all"
                bgColor={ isPlaceholderData ? undefined : { _light: 'blackAlpha.50', _dark: 'whiteAlpha.50' } }
              >
                { detailData.data }
              </Box>
            </Skeleton>
          </DetailedInfo.ItemValue>
        </>
      ) }
    </DetailedInfo.Container>
  );
};

export default TxDexTxns;
