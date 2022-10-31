import React, { useState, useLayoutEffect } from 'react'

interface DisplayProps {
  dataDisplay: Array<string>
}

function Display(props: DisplayProps) {
  let val: string = props.dataDisplay[1] === '' ? props.dataDisplay[0] : props.dataDisplay[1]
  val = val === '' ? '0' : val.replace('.', ',')
  const defaultFontSize = 100
  const [fontSize, setfontSize] = useState(defaultFontSize)

  useLayoutEffect(() => {
    const txtEl = document.getElementById('meashureTxt')
    if (txtEl === null) return
    const txtElWidth = txtEl.getBoundingClientRect().width
    const curenFontSize = parseFloat(txtEl.style.getPropertyValue("font-size").replace('px', ''))
    const maxWidthOfTxt = 416 //416
    
    const newFontSize = curenFontSize / (txtElWidth / maxWidthOfTxt)
    if (txtElWidth > maxWidthOfTxt) {
      setfontSize(newFontSize)
    } else {
      setfontSize(defaultFontSize)
    }
    // console.table([
    //   { val: val },
    //   { valLength: val.length },
    //   { txtElWidth: txtElWidth },
    //   { deltaMaxWidthAndTxtWidth: maxWidthOfTxt - txtElWidth },
    //   { curenFontSize: curenFontSize },
    //   { newFontSize: newFontSize },
    // ])
  }, [val])

  return (
    <div className="display" >
      <span className="displayedValue" id="meashureTxt" style={{ fontSize: fontSize.toString().concat('px') }}>
        {val}
      </span>
    </div>
  )
}

export default Display
