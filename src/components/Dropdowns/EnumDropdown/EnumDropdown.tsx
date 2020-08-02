import React, { useMemo } from 'react'
import { DropdownItem } from 'types/dropdown'
import Dropdown from '../Dropdown/Dropdown'

type Props = {
  sourceEnum: { [key: string]: string }
  value: number
  setValue: (index: number) => void
  disabled?: boolean
}

const EnumDropdown: React.FC<Props> = (props: Props) => {
  const dropdownItems: DropdownItem[] = useMemo(() => {
    const items: DropdownItem[] = []
    for (let item in props.sourceEnum) {
      const index = Number(item)
      if (typeof index === 'number' && !isNaN(index)) {
        const category = props.sourceEnum[index]
        items.push({
          label: category,
          callback: () => {
            props.setValue(index)
          },
        })
      }
    }
    return items
  }, [])

  return (
    <Dropdown dropdownTriggerText={props.sourceEnum[props.value]} items={dropdownItems} disabled={props.disabled} />
  )
}

export default EnumDropdown
