export default (title: string) => {

  return title.replace(/\s+/g, '-').toLowerCase()
}
