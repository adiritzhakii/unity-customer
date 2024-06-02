import { emptySplitApi as api } from "./emptyApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    appControllerPublishMessage: build.mutation<
      AppControllerPublishMessageApiResponse,
      AppControllerPublishMessageApiArg
    >({
      query: (queryArg) => ({
        url: `/buy`,
        method: "POST",
        body: queryArg.createPurchaseDto,
      }),
    }),
    appControllerGetAllBuysFromServer: build.query<
      AppControllerGetAllBuysFromServerApiResponse,
      AppControllerGetAllBuysFromServerApiArg
    >({
      query: () => ({ url: `/getAllUserBuys` }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as customerApi };
export type AppControllerPublishMessageApiResponse =
  /** status 201 The purchase sent to the server. */ CreatePurchaseDto;
export type AppControllerPublishMessageApiArg = {
  createPurchaseDto: CreatePurchaseDto;
};
export type AppControllerGetAllBuysFromServerApiResponse =
  /** status 200 Successful response */ CreatePurchaseDto[];
export type AppControllerGetAllBuysFromServerApiArg = void;
export type CreatePurchaseDto = {
  /** The product name */
  productName: string;
  /** The name of the person who made the purchase */
  name: string;
  /** The total amount price of the purchase */
  price: number;
  /** The age of the person who made the purchase */
  age: number;
};
export const {
  useAppControllerPublishMessageMutation,
  useAppControllerGetAllBuysFromServerQuery,
} = injectedRtkApi;
