import { omit } from 'es-toolkit';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

import type { PaginationParams } from 'ui/shared/pagination/types';

import useApiQuery from 'lib/api/useApiQuery';
import getQueryParamString from 'lib/router/getQueryParamString';

const PAGE_SIZE = 50;

function getPageFromQuery(query: Record<string, unknown>) {
  const page = query?.page;
  if (page && typeof page === 'string' && !Array.isArray(page)) {
    const num = Number(page);
    return Number.isFinite(num) && num >= 1 ? num : 1;
  }
  return 1;
}

interface Props {
  enabled: boolean;
}

export default function useAddressDexTxnsQuery({ enabled }: Props) {
  const router = useRouter();
  const address = getQueryParamString(router.query.hash);
  const page = getPageFromQuery(router.query);

  const queryResult = useApiQuery('general:address_dex_txns_list', {
    queryOptions: {
      queryKey: [ 'general:address_dex_txns_list', address, page ],
      enabled: enabled && Boolean(address),
    },
    fetchParams: {
      method: 'POST',
      body: { address, page, pageSize: PAGE_SIZE },
    },
  });

  const { data, isError, isPlaceholderData } = queryResult;
  const responseData = data?.code === 0 ? data.data : undefined;
  const list = responseData?.list ?? [];
  const total = responseData?.total ?? 0;

  const hasNextPage = page * PAGE_SIZE < total;
  const canGoBackwards = page > 1;
  const hasPages = page > 1;

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const onNextPageClick = useCallback(() => {
    if (!hasNextPage) return;
    scrollToTop();
    router.push(
      { pathname: router.pathname, query: { ...router.query, page: String(page + 1) } },
      undefined,
      { shallow: true },
    );
  }, [ hasNextPage, page, router, scrollToTop ]);

  const onPrevPageClick = useCallback(() => {
    if (page <= 1) return;
    scrollToTop();
    const nextQuery = page === 2 ? omit(router.query, [ 'page' ]) : { ...router.query, page: String(page - 1) };
    router.push({ pathname: router.pathname, query: nextQuery }, undefined, { shallow: true });
  }, [ page, router, scrollToTop ]);

  const resetPage = useCallback(() => {
    scrollToTop();
    router.push(
      { pathname: router.pathname, query: omit(router.query, [ 'page' ]) },
      undefined,
      { shallow: true },
    );
  }, [ router, scrollToTop ]);

  const pagination: PaginationParams = {
    page,
    onNextPageClick,
    onPrevPageClick,
    resetPage,
    hasPages,
    hasNextPage,
    canGoBackwards,
    isLoading: isPlaceholderData,
    isVisible: hasPages || hasNextPage || total > PAGE_SIZE,
  };

  return {
    data: list,
    total,
    page,
    pageSize: PAGE_SIZE,
    isError,
    isPlaceholderData,
    pagination,
  };
}
