export type Variables = { [key: string]: any }

export interface GQL {
  query: string
  variables?: Variables
}
