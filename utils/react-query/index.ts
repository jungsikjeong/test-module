import { HydrationBoundary, QueryClient, dehydrate, QueryState, QueryKey } from '@tanstack/react-query'

import { cache } from 'react'
import { isEqual } from './is-equal'

export const getQueryClient = cache(() => new QueryClient())

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T

interface QueryProps<ResponseType = unknown> {
  queryKey: QueryKey
  queryFn: () => Promise<ResponseType>
}

interface DehydratedQueryExtended<TData = unknown, TError = unknown> {
  state: QueryState<TData, TError>
}

export async function getDehydratedQuery<Q extends QueryProps>({ queryKey, queryFn }: Q) {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery({ queryKey, queryFn })
  const { queries } = dehydrate(queryClient)
  const [dehydratedQuery] = queries.filter(query => isEqual(query.queryKey, queryKey))
  return dehydratedQuery as DehydratedQueryExtended<UnwrapPromise<ReturnType<Q['queryFn']>>>
}


export async function getDehydratedQueries<Q extends QueryProps[]>(queries: Q) {
  const queryClient = getQueryClient();
  await Promise.all(
    queries.map(({ queryKey, queryFn }) =>
      queryClient.prefetchQuery({ queryKey, queryFn }),
    ),
  );

  return dehydrate(queryClient).queries as DehydratedQueryExtended<
    UnwrapPromise<ReturnType<Q[number]['queryFn']>>
  >[];
}



export const Hydrate = HydrationBoundary

export default {};