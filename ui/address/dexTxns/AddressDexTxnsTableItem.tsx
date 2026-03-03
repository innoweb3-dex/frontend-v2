import React from 'react';

import type { AddressDexTxnsItem } from 'types/api/addressDexTxns';

import { Skeleton } from 'toolkit/chakra/skeleton';
import { TableCell, TableRow } from 'toolkit/chakra/table';
import AddressEntity from 'ui/shared/entities/address/AddressEntity';
import BlockEntity from 'ui/shared/entities/block/BlockEntity';
import TxEntity from 'ui/shared/entities/tx/TxEntity';
import TimeWithTooltip from 'ui/shared/time/TimeWithTooltip';

type Props = AddressDexTxnsItem & {
  page: number;
  isLoading: boolean;
};

const AddressDexTxnsTableItem = (props: Props) => {
  return (
    <TableRow>
      <TableCell>
        <Skeleton loading={ props.isLoading } display="inline-block" fontWeight="500">
          <span>{ props.id }</span>
        </Skeleton>
      </TableCell>
      <TableCell>
        <TimeWithTooltip
          timestamp={ props.txTime }
          enableIncrement={ props.page === 1 }
          isLoading={ props.isLoading }
          color="text.secondary"
          display="inline-block"
        />
      </TableCell>
      <TableCell>
        <AddressEntity
          address={{
            hash: props.userAddress,
            implementations: null,
            name: null,
            is_contract: false,
            is_verified: null,
            ens_domain_name: null,
            private_tags: null,
            watchlist_names: null,
            public_tags: null,
          }}
          isLoading={ props.isLoading }
          noIcon
          textStyle="sm"
          truncation="constant_long"
        />
      </TableCell>
      <TableCell>
        <BlockEntity
          number={ props.blockNumber }
          isLoading={ props.isLoading }
          noIcon
          textStyle="sm"
          fontWeight={ 700 }
        />
      </TableCell>
      <TableCell>
        <BlockEntity
          number={ props.blockHash }
          hash={ props.blockHash }
          isLoading={ props.isLoading }
          noIcon
          textStyle="sm"
          tailLength={ 4 }
          truncation="constant_long"
        />
      </TableCell>
      <TableCell>
        <TxEntity
          hash={ props.txHash }
          isLoading={ props.isLoading }
          noIcon
          textStyle="sm"
          fontWeight={ 700 }
          truncation="constant_long"
        />
      </TableCell>
    </TableRow>
  );
};

export default React.memo(AddressDexTxnsTableItem);
