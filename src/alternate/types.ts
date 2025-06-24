export interface Resource<TPayload extends Record<string, unknown>> {
  id: string;
  collectionId: string;
  payload: TPayload;
}
