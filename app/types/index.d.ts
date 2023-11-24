
declare module 'style-to-object' {
  function StyleToObject(
    style: string,
    iterator?: StyleToObject.Iterator
  ): React.CSSProperties;

  export default StyleToObject
}