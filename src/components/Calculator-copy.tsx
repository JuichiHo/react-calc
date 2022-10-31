import React, { useState } from 'react'
import TopBar from './topBar'
import Display from './display'

interface calcData {
  args: Array<string>
  argPointer: number
  operand: string
}

function Calculator() {
  // console.log(`rendered`)

  const defaultData: calcData = {
    args: ['', ''],
    argPointer: 0,
    operand: '',
  }
  const [calcData, setCalcData] = useState(defaultData)

  const [diffX, setDiffX] = useState(0)
  const [diffY, setDiffY] = useState(0)
  const [isDragging, setIsDragging] = useState(false);
  const [styles, setStyles] = useState({})

  function insertDigitToArg({ args, argPointer, operand }: calcData, insertDigit: string) {
    let result: calcData = JSON.parse(JSON.stringify({ args, argPointer, operand }))
    const pointer: number = result.operand === '' ? 0 : 1

    if ((result.args[pointer] === '' || result.args[pointer] === '0,') && insertDigit === ',') {
      result.args[pointer] = '0,'
    } else if (result.args[pointer] === '0' && insertDigit === '0') {
      result.args[pointer] = '0'
    } else if (result.args[pointer] === '0' && insertDigit !== '0' && insertDigit !== ',') {
      result.args[pointer] = insertDigit
    } else {
      result.args[pointer] = result.args[pointer].concat(insertDigit)
    }

    // console.log(result)
    return result
  }

  function setOperand(qurentCalcData: calcData, operand: string) {
    let result: calcData = JSON.parse(JSON.stringify(qurentCalcData))
    if (result.args[0] === '') {
      result.args[0] = '0'
    }
    result.operand = operand
    result.argPointer = 1
    // console.log(operand)
    // console.log(result)

    changeToggleBtnOperand(operand)

    return result
  }

  function getResult(qurentCalcData: calcData) {
    let result: calcData = JSON.parse(JSON.stringify(qurentCalcData))
    let arg1: number = parseFloat(result.args[0].replace(',', '.'))
    let arg2: number = result.args[1] === '' ? arg1 : parseFloat(result.args[1].replace(',', '.'))
    if (result.operand === '+') {
      result.args = [(arg1 + arg2).toString(), '']
    } else if (result.operand === '-') {
      result.args = [(arg1 - arg2).toString(), '']
    } else if (result.operand === '×') {
      result.args = [(arg1 * arg2).toString(), '']
    } else if (result.operand === '÷') {
      result.args = [(arg1 / arg2).toString(), '']
    }
    result.operand = defaultData.operand
    result.argPointer = defaultData.argPointer
    // console.log(`arg1 ${arg1} | arg2 ${arg2}`)
    // console.log(result)

    changeToggleBtnOperand()
    return result
  }

  function changeSign(qurentCalcData: calcData) {
    let result: calcData = JSON.parse(JSON.stringify(qurentCalcData))
    const pointer: number = result.operand === '' ? 0 : 1

    if (parseFloat(result.args[pointer].replace(',', '.')) !== 0 && result.args[pointer] !== '') {
      result.args[pointer] = result.args[pointer].startsWith('-')
        ? result.args[pointer].replace('-', '')
        : '-'.concat(result.args[pointer])
    } else {
      result.args[pointer] = '0'
    }

    // console.log('changeSign')
    // console.log(result)
    return result
  }

  function getPercentage(qurentCalcData: calcData) {
    let result: calcData = JSON.parse(JSON.stringify(qurentCalcData))
    const pointer: number = result.operand === '' ? 0 : 1
    const val = parseFloat(result.args[pointer].replace(',', '.'))

    if (isNaN(val)) return qurentCalcData

    result.args[pointer] = (val / 100).toString().replace('.', ',')

    // console.log('getPercentage')
    // console.log(result)
    return result
  }

  function changeToggleBtnOperand(operand: string = '') {
    const idOperandBtns: Array<string> = ['keyDivide', 'keyMultiply', 'keyMinus', 'keyPlus']

    idOperandBtns.forEach((ibBtn) => {
      const btn = document.getElementById(ibBtn)
      if (btn === null) return
      btn.style.borderWidth = '1px'
      // console.log(`HEEEEEY`)
    })

    if (operand === '') {
      return
    } else if (operand === '÷') {
      const btn = document.getElementById('keyDivide')
      if (btn === null) return
      btn.style.borderWidth = '2px'
      // console.log(`Divide`)
    } else if (operand === '×') {
      const btn = document.getElementById('keyMultiply')
      if (btn === null) return
      btn.style.borderWidth = '2px'
      // console.log(`Multiply`)
    } else if (operand === '-') {
      const btn = document.getElementById('keyMinus')
      if (btn === null) return
      btn.style.borderWidth = '2px'
      // console.log(`Minus`)
    } else if (operand === '+') {
      const btn = document.getElementById('keyPlus')
      if (btn === null) return
      btn.style.borderWidth = '2px'
      // console.log(`Plus`)
    }

    return
  }

  function allClear(qurentCalcData: calcData) {
    let result: calcData = JSON.parse(JSON.stringify(qurentCalcData))

    if (result.args[0] === '') return result

    if (result.args[1] !== '') {
      result.args[1] = ''
    } else if (result.operand !== '') {
      result.operand = ''
      changeToggleBtnOperand()
    } else if (result.args[0] !== '') {
      result.args[0] = ''
    }

    console.log(result)
    return result
  }

  function handleDragMouseDown(e: React.MouseEvent<HTMLDivElement>) {
    console.log(`mouse down`)
    console.log(e)
    setDiffX(e.screenX - e.currentTarget.getBoundingClientRect().left)
    setDiffY(e.screenY - e.currentTarget.getBoundingClientRect().top)
    setIsDragging(true);
  }

  function handleDragMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if(!isDragging) return 
    console.log(`mouse move`)
    let left = e.screenX - diffX
    let top = e.screenY - diffY
    setStyles({
      left: left,
      top: top,
    })
  }

  function handleDragMouseUp(e: React.MouseEvent<HTMLDivElement>) {
    console.log(`>close element drag`)
    /* stop moving when mouse button is released:*/
    setIsDragging(false);
    console.log(`===================`)
  }

  return (
    <div className="Calculator" style={styles}>
      <div
        className="dragDropWrapper"
        onMouseDown={handleDragMouseDown}
        onMouseMove={handleDragMouseMove}
        onMouseUp={handleDragMouseUp}
      >
        <TopBar />
        <Display dataDisplay={calcData.args} />
      </div>
      <div className="keyboard">
        <div className="keyRow" id="keyRow0">
          <div
            className="btnSmall"
            id="keyAC"
            onClick={() => {
              setCalcData(allClear(calcData))
            }}
          >
            {calcData.args[0] === '' ? 'AC' : 'C'}
          </div>
          <div className="btnSmall" id="keySign" onClick={() => setCalcData(changeSign(calcData))}>
            +/-
          </div>
          <div className="btnSmall" id="keyPercent" onClick={() => setCalcData(getPercentage(calcData))}>
            %
          </div>
          <div className="btnSmall" id="keyDivide" onClick={() => setCalcData(setOperand(calcData, '÷'))}>
            ÷
          </div>
        </div>
        <div className="keyRow" id="keyRow1">
          <div className="btnSmall" id="key10" onClick={() => setCalcData(insertDigitToArg(calcData, '7'))}>
            7
          </div>
          <div className="btnSmall" id="key11" onClick={() => setCalcData(insertDigitToArg(calcData, '8'))}>
            8
          </div>
          <div className="btnSmall" id="key12" onClick={() => setCalcData(insertDigitToArg(calcData, '9'))}>
            9
          </div>
          <div className="btnSmall" id="keyMultiply" onClick={() => setCalcData(setOperand(calcData, '×'))}>
            ×
          </div>
        </div>
        <div className="keyRow" id="keyRow2">
          <div className="btnSmall" id="key20" onClick={() => setCalcData(insertDigitToArg(calcData, '4'))}>
            4
          </div>
          <div className="btnSmall" id="key21" onClick={() => setCalcData(insertDigitToArg(calcData, '5'))}>
            5
          </div>
          <div className="btnSmall" id="key22" onClick={() => setCalcData(insertDigitToArg(calcData, '6'))}>
            6
          </div>
          <div className="btnSmall" id="keyMinus" onClick={() => setCalcData(setOperand(calcData, '-'))}>
            -
          </div>
        </div>
        <div className="keyRow" id="keyRow3">
          <div className="btnSmall" id="key30" onClick={() => setCalcData(insertDigitToArg(calcData, '1'))}>
            1
          </div>
          <div className="btnSmall" id="key31" onClick={() => setCalcData(insertDigitToArg(calcData, '2'))}>
            2
          </div>
          <div className="btnSmall" id="key32" onClick={() => setCalcData(insertDigitToArg(calcData, '3'))}>
            3
          </div>
          <div className="btnSmall" id="keyPlus" onClick={() => setCalcData(setOperand(calcData, '+'))}>
            +
          </div>
        </div>
        <div className="keyRow" id="keyRow4">
          <div className="btnBig" id="key40" onClick={() => setCalcData(insertDigitToArg(calcData, '0'))}>
            0
          </div>
          <div className="btnSmall" id="keyComa" onClick={() => setCalcData(insertDigitToArg(calcData, ','))}>
            ,
          </div>
          <div className="btnSmall" id="keyResult" onClick={() => setCalcData(getResult(calcData))}>
            =
          </div>
        </div>
      </div>
    </div>
  )
}

export default Calculator
