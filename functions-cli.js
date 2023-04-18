const allLinks = (links) => {
    const all = links.length
    return all
}

const uniqueLinks = (links) => {
    const hipertextR = links.map(link => link.href)
    const uniqueHref = new Set(hipertextR)
    return uniqueHref.size
}

const brokenLinks = (links) => {
    const messageFail = links.filter(link => link.ok === 'fail')
    const uniqueFail = new Set(messageFail)
    return uniqueFail.size
}

module.exports = {
    allLinks,
    uniqueLinks,
    brokenLinks
  };