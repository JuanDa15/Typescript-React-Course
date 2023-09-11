type Options = {
  callback?: () => void
  props: Record<string, string | number | undefined>
}
// De esta manera se extiende el objeto window en caso de ser necesario
interface Window {
  plausible: (event:'add_fox' | 'remove_fox', options?: Options ) => void
}
