export default function (data = []) {
  const rootGroup = data.find((currElem) => !currElem.parentCmapId)
  if (!rootGroup) return

  const cascadePadding = 40
  const groupMargin = 8
  const groupPadding = 3
  const groupWidth = rootGroup.width + groupMargin * 2
  let cascadeWidth = groupWidth,
    cascadeHeight = 0

  function buildCascadeGroup(groupData, parentBottomBorder) {
    const maxioms = []
    const children = []
    const groupMarginBottom = 8
    const lineHeight = 10
    const maxiomPaddingBottom = 3
    const yPos = parentBottomBorder ? parentBottomBorder + groupMarginBottom : cascadePadding

    data.forEach((currElem) => {
      if (currElem.cmapId === groupData.cmapId) {
        const maxiomLines = currElem.maxiom
          .trim()
          .split('^')
          .flatMap((curr) => curr.split('&#xa;').flatMap((c) => c.split('&#xd;')))

        maxioms.push({
          maxiomId: currElem.maxiomId,
          maxiomLines: maxiomLines,
          maxiomLinesLength: maxiomLines.length,
          posinconcept: currElem.posinconcept,
          colors: currElem.colors,
          width: groupData.width - groupPadding * 2,
          height: lineHeight * maxiomLines.length,
          lineHeight: lineHeight,
        })
      }

      if (currElem.parentCmapId === groupData.cmapId && currElem.posinconcept === 1) {
        children.push(currElem)
      }
    })

    maxioms.sort((prevEl, nextEl) => prevEl.posinconcept - nextEl.posinconcept)

    const bottomYPosOfLastMaxiom =
      maxioms.reduce((accumulator, currentValue, index, array) => {
        array[index].yPos = accumulator

        return accumulator + lineHeight * currentValue.maxiomLinesLength + maxiomPaddingBottom
      }, yPos + groupPadding) - maxiomPaddingBottom

    if (children.length > 1) {
      cascadeWidth += groupWidth * (children.length - 1)
    }

    const childGroups = children
      .map((child) => buildCascadeGroup(child, bottomYPosOfLastMaxiom + groupPadding))
      .sort((a, b) => a.initXPos - b.initXPos)

    const bottomYPosOfCurrGroup = bottomYPosOfLastMaxiom + groupPadding
    const groupHeight = bottomYPosOfCurrGroup - yPos

    if (bottomYPosOfCurrGroup > cascadeHeight) {
      cascadeHeight = bottomYPosOfCurrGroup
    }

    return {
      cmapId: groupData.cmapId,
      width: groupData.width,
      height: groupHeight,
      initXPos: groupData.xPos,
      yPos: yPos,
      parentCmapId: groupData.parentCmapId,
      maxioms: maxioms,
      childGroups,
    }
  }

  const formattedCascade = buildCascadeGroup(rootGroup)

  function getBranchWidth(group) {
    let branchWidth = groupWidth

    function getChildrenWidth(currGroup) {
      const childGroupsLength = currGroup.childGroups && currGroup.childGroups.length

      if (childGroupsLength) {
        if (childGroupsLength > 1) {
          branchWidth += groupWidth * (childGroupsLength - 1)
        }

        currGroup.childGroups.forEach((curr) => getChildrenWidth(curr))
      }
    }

    getChildrenWidth(group)

    return branchWidth
  }

  function calcAdditionalProps(group, branchStartPoint, branchWidth) {
    const xPosOfCurrGroup = branchStartPoint + branchWidth / 2 - groupWidth / 2

    group.xPos = xPosOfCurrGroup
    group.maxioms.forEach((curr) => {
      curr.xPos = xPosOfCurrGroup + groupPadding
    })

    if (group.childGroups && group.childGroups.length) {
      let currBranchStartPoint = branchStartPoint

      group.childGroups.forEach((currGroup, idx) => {
        const currBranchWidth = getBranchWidth(currGroup)

        calcAdditionalProps(currGroup, currBranchStartPoint, currBranchWidth)

        currBranchStartPoint += currBranchWidth
      })
    }
  }

  calcAdditionalProps(formattedCascade, cascadePadding + groupMargin + groupPadding, cascadeWidth)
  return [formattedCascade, cascadeWidth + cascadePadding * 2, cascadeHeight + cascadePadding]
}
