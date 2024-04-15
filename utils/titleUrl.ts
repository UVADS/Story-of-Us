export default (title: string) => {

  return title.replace(/\s+/g, '-').replace(/[^\w-]+/g, '').toLowerCase()
}
