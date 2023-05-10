const route = (path: string) =>
  `/my-base-url/${path}`;

type RouteOptionsMap = {
  main: {};
  invoices: {};
  messages: {
    id: string
  };
  payment: {
    invoice: string;
    returnURL: string;
    paymentType: 'ideal' | 'creditcard' | 'paypal';
  };
  paymentCheck: {};
  paymentConfirmation: {};
};

export const ROUTE_PATHS: Record<keyof RouteOptionsMap, string> = {
  main: route(''),
  invoices: route('/invoices'),
  messages: route('/messages'),
  payment: route('/payment'),
  paymentCheck: route('/payment/check'),
  paymentConfirmation: route('/payment/confirm'),
};

export function buildUrl<T extends keyof RouteOptionsMap>(
  baseUrl: T,
  params?: {
    pathParams?: Record<string, string | number>;
    options?: RouteOptionsMap[T];
  }
): string;
export function buildUrl<T extends keyof RouteOptionsMap>(
  baseUrl: T,
  params?: Record<string, string | number> & {
    [K in keyof RouteOptionsMap[T]]?: RouteOptionsMap[T][K];
  }
): string;

export function buildUrl<T extends keyof RouteOptionsMap>(
  baseUrl: T,
  params?:
    | {
        pathParams?: Record<string, string | number>;
        options?: RouteOptionsMap[T];
      }
    | (Record<string, string | number> & {
        [K in keyof RouteOptionsMap[T]]?: RouteOptionsMap[T][K];
      })
): string {
  let newPath: string = ROUTE_PATHS[baseUrl];
  const queryParts: string[] = [];

  if (params && 'pathParams' in params) {
    for (const [key, value] of Object.entries(params.pathParams)) {
      newPath = newPath.replace(`:${key}`, value.toString());
    }
  }

  const options = params && 'options' in params ? params.options : params;
  if (options) {
    for (const [key, value] of Object.entries(options)) {
      if (!newPath.includes(`:${key}`)) {
        queryParts.push(`${key}=${value}`);
      }
    }
  }

  const query = queryParts.join('&');

  return query ? `${newPath}?${query}` : newPath;
}

