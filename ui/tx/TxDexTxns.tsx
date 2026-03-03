import { Fragment } from 'react';

import type { TxDetailInfoData } from 'types/api/txDetailInfo';

import useApiQuery from 'lib/api/useApiQuery';
import { Skeleton } from 'toolkit/chakra/skeleton';
import CopyToClipboard from 'ui/shared/CopyToClipboard';
import DataFetchAlert from 'ui/shared/DataFetchAlert';
import * as DetailedInfo from 'ui/shared/DetailedInfo/DetailedInfo';
import HashStringShortenDynamic from 'ui/shared/HashStringShortenDynamic';

interface Props {
  hash: string;
}

const formatLabel = (key: string): string => {
  const result = key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
  return result.trim();
};

const isHashLike = (value: string): boolean => {
  return /^0x[a-fA-F0-9]+$/.test(value);
};

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

  const entries = detailData ? Object.entries(detailData).filter(([ , value ]) => value != null && value !== '') : [];

  const emptyStateContent = isPlaceholderData ? (
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
  );

  return (
    <DetailedInfo.Container templateColumns={{ base: 'minmax(0, 1fr)', lg: 'minmax(215px, auto) minmax(0, 1fr)' }}>
      { entries.length === 0 ? emptyStateContent : (
        entries.map(([ key, value ]) => (
          <Fragment key={ key }>
            <DetailedInfo.ItemLabel hint={ formatLabel(key) } isLoading={ isPlaceholderData }>
              { formatLabel(key) }
            </DetailedInfo.ItemLabel>
            <DetailedInfo.ItemValue>
              <Skeleton loading={ isPlaceholderData } overflow="hidden" whiteSpace="pre-wrap" wordBreak="break-all">
                { typeof value === 'string' && isHashLike(value) ? (
                  <>
                    <HashStringShortenDynamic hash={ value }/>
                    <CopyToClipboard text={ value } isLoading={ isPlaceholderData }/>
                  </>
                ) : (
                  value
                ) }
              </Skeleton>
            </DetailedInfo.ItemValue>
          </Fragment>
        ))
      ) }
    </DetailedInfo.Container>
  );
};

export default TxDexTxns;
