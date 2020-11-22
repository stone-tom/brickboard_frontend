export default interface INavigationItem {
  path: string | null,
  text: string,
  icon?: string,
  children?: INavigationItem[]
}
