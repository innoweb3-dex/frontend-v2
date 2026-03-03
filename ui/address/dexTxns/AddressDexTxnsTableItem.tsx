import React from 'react';

import type { AddressDexTxnsItem } from 'types/api/addressDexTxns';

import { TableCell, TableRow } from 'toolkit/chakra/table';
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
        <TimeWithTooltip
          timestamp={ props.txTime }
          enableIncrement={ props.page === 1 }
          isLoading={ props.isLoading }
          color="text.secondary"
          display="inline-block"
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
