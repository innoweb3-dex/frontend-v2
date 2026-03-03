import { useRouter } from 'next/router';
import React from 'react';

import useIsMounted from 'lib/hooks/useIsMounted';
import getQueryParamString from 'lib/router/getQueryParamString';
import { TableBody, TableColumnHeader, TableHeaderSticky, TableRoot, TableRow } from 'toolkit/chakra/table';
import ActionBar, { ACTION_BAR_HEIGHT_DESKTOP } from 'ui/shared/ActionBar';
import DataListDisplay from 'ui/shared/DataListDisplay';
import Pagination from 'ui/shared/pagination/Pagination';
import TimeFormatToggle from 'ui/shared/time/TimeFormatToggle';

import AddressDexTxnsTableItem from './dexTxns/AddressDexTxnsTableItem';
import useAddressDexTxnsQuery from './useAddressDexTxnsQuery';

interface Props {
  shouldRender?: boolean;
  isQueryEnabled?: boolean;
}

const AddressDexTxns = ({ shouldRender = true, isQueryEnabled = true }: Props) => {
  const router = useRouter();
  const isMounted = useIsMounted();
  const address = getQueryParamString(router.query.hash);

  const { data, isError, isPlaceholderData, pagination } = useAddressDexTxnsQuery({
    enabled: isQueryEnabled && Boolean(address),
  });

  if (!isMounted || !shouldRender) {
    return null;
  }

  const content = data && data.length > 0 ? (
    <TableRoot tableLayout="auto" minW="900px">
      <TableHeaderSticky top={ pagination.isVisible ? ACTION_BAR_HEIGHT_DESKTOP : 0 }>
        <TableRow>
          <TableColumnHeader>
            Tx time
            <TimeFormatToggle/>
          </TableColumnHeader>
          <TableColumnHeader>Block</TableColumnHeader>
          <TableColumnHeader>Block hash</TableColumnHeader>
          <TableColumnHeader>Txn hash</TableColumnHeader>
        </TableRow>
      </TableHeaderSticky>
      <TableBody>
        { data.map((item, index) => (
          <AddressDexTxnsTableItem
            key={ item.id + (isPlaceholderData ? String(index) : '') }
            { ...item }
            page={ pagination.page }
            isLoading={ isPlaceholderData }
          />
        )) }
      </TableBody>
    </TableRoot>
  ) : null;

  const actionBar = pagination.isVisible ? (
    <ActionBar mt={ -6 }>
      <Pagination ml="auto" { ...pagination }/>
    </ActionBar>
  ) : null;

  return (
    <DataListDisplay
      isError={ isError }
      itemsNum={ data?.length }
      emptyText="There are no dex transactions for this address."
      actionBar={ actionBar }
    >
      { content }
    </DataListDisplay>
  );
};

export default React.memo(AddressDexTxns);
