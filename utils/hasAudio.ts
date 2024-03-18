export default (section: object) => {
    return section.fields.audio && section.fields.audio.length > 0 ? section.fields.audio[0] : null
}
