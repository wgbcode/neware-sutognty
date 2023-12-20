import type { TableConfig, ColumnsConfig } from './index.vue'
import { type FunctionalComponent } from 'vue'
import { ElCheckbox, ElInput, ElSelect, ElOption, ElDatePicker } from 'element-plus'
import type { CheckboxValueType } from 'element-plus'

let tableData: Record<string, any>[] | undefined

export const addVirTableDefaultConfig = (tableConfig: TableConfig | undefined) => {
  const config = (tableConfig ??= {})
  config.fixed ??= true
  return config
}

export const addVirColumnsDefaultConfig = (
  columnsConfig: ColumnsConfig,
  data: Record<string, any>[] | undefined
) => {
  tableData = data
  return columnsConfig.map((config) => {
    switch (config.key) {
      case 'selection':
        config.width ??= 35
        config.align ??= 'center'
        config.cellRenderer = selectionRender
        config.headerCellRenderer = headerSelectionRender
        break
      case 'index':
        config.title ??= '#'
        config.width ??= 35
        config.align ??= 'center'
        config.cellRenderer = ({ rowIndex }) => rowIndex + 1
        break
      case 'input':
        config.width ??= 140
        config.cellRenderer = inputRender
        break
      case 'select':
        config.width ??= 140
        config.cellRenderer = selectRender
        break
      case 'datePicker':
        config.width ??= 200
        config.cellRenderer = datePickerRender
        break
    }
    return config
  })
}

// 复选框
type SelectionCellProps = {
  value: boolean
  intermediate?: boolean
  onChange: (_value: CheckboxValueType) => void
}
const SelectionCell: FunctionalComponent<SelectionCellProps> = ({
  value,
  intermediate = false,
  onChange
}) => {
  return <ElCheckbox onChange={onChange} modelValue={value} indeterminate={intermediate} />
}
function selectionRender({ rowData }: Record<string, any>) {
  const onChange = (value: CheckboxValueType) => (rowData.checked = value)
  return <SelectionCell value={rowData.checked} onChange={onChange} />
}
function headerSelectionRender() {
  const onChange = (value: CheckboxValueType) =>
    (tableData = tableData?.map((row) => {
      row.checked = value
      return row
    }))
  const allSelected = tableData?.every((row) => row.checked) ?? false
  const containsChecked = tableData?.some((row) => row.checked)
  return (
    <SelectionCell
      value={allSelected}
      intermediate={containsChecked && !allSelected}
      onChange={onChange}
    />
  )
}

// input
function inputRender({ rowData, column, columns }: Record<string, any>) {
  const config = columns.flatMap((i: Record<string, any>) =>
    i.datakey === column.datakey ? i.config ?? {} : []
  )[0]
  const onInput = (value: string) => (rowData[`edit-${column.datakey}`] = value)
  const enterEdit = () => (rowData[`edit-${column.datakey}`] = true)
  const exitEdit = () => (rowData[`edit-${column.datakey}`] = false)
  const exitEdit2 = (e: Event) => {
    if ('code' in e && e.code === 'Enter') {
      rowData[`edit-${column.datakey}`] = false
    }
  }
  const setRef = (el: any) => el && el.focus?.()
  return rowData[`edit-${column.datakey}`] ? (
    <ElInput
      ref={setRef}
      onInput={onInput}
      modelValue={rowData[column.datakey]}
      onBlur={exitEdit}
      onKeydown={exitEdit2}
      placeholder={config?.placeholder ?? '请输入'}
    />
  ) : (
    <div class="c-w100p c-h100p c-flex-ycenter" onClick={enterEdit}>
      {rowData[column.datakey]}
    </div>
  )
}

// select
function selectRender({ rowData, column, columns }: Record<string, any>) {
  const options = columns.flatMap((i: Record<string, any>) =>
    i.datakey === column.datakey ? i.options : []
  )
  const config = columns.flatMap((i: Record<string, any>) =>
    i.datakey === column.datakey ? i.config ?? {} : []
  )[0]
  const enterEdit = () => (rowData[`edit-${column.datakey}`] = true)
  const exitEdit = () => (rowData[`edit-${column.datakey}`] = false)
  const setRef = (el: any) => el && el.focus?.()
  return rowData[`edit-${column.datakey}`] && options.length > 0 ? (
    <ElSelect
      ref={setRef}
      v-model={rowData[column.datakey]}
      onChange={exitEdit}
      onBlur={exitEdit}
      placeholder={config?.placeholder ?? '请选择'}
    >
      {options.map((item: Record<string, any>) => {
        return <ElOption key={item.value} label={item.label} value={item.value} />
      })}
    </ElSelect>
  ) : (
    <div onClick={enterEdit}>{rowData[column.datakey]}</div>
  )
}

// datePicker
function datePickerRender({ rowData, column, columns }: Record<string, any>) {
  const config = columns.flatMap((i: Record<string, any>) =>
    i.datakey === column.datakey ? i.config ?? {} : []
  )[0]
  const placeholder = config.placeholder ?? '请选择'
  const type = config.format ?? 'date'
  let format = config.format
  if (!format) format = type === 'date' ? 'YYYY.MM.DD' : 'YYYY.MM.DD hh:mm:ss'
  const enterEdit = () => (rowData[`edit-${column.datakey}`] = true)
  const exitEdit = () => (rowData[`edit-${column.datakey}`] = false)
  const setRef = (el: any) => el && el.focus?.()
  return rowData[`edit-${column.datakey}`] ? (
    <ElDatePicker
      ref={setRef}
      type={type}
      v-model={rowData[column.datakey]}
      placeholder={placeholder}
      format={format}
      value-format={format}
      // @ts-ignore
      onChange={exitEdit}
      onBlur={exitEdit}
    />
  ) : (
    <div onClick={enterEdit}>{rowData[column.datakey]}</div>
  )
}
