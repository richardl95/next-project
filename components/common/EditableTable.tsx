import { Button, Form, Input, InputNumber, Popconfirm } from 'antd'
import EditSVG from 'assets/images/edit.svg'
import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import Table, { TableProps } from './Table'

interface Item {
  key: string
  name: string
  age: number
  address: string
}

interface EditableCellProps
  extends React.HTMLAttributes<HTMLElement> {
  editing: boolean
  dataIndex: string
  title: any
  inputType: 'number' | 'text'
  record: Item
  index: number
  children: React.ReactNode
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode =
    inputType === 'number' ? <InputNumber /> : <Input />

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}>
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  )
}

const EditableTable = <T extends any>({
  dataSource,
  rowKey = 'id',
  ...restProps
}: TableProps<T>): JSX.Element => {
  const [form] = Form.useForm()
  const [data, setData] = useState(dataSource)
  const [editingKey, setEditingKey] = useState('')

  const isEditing = (record: Item) => record[rowKey] === editingKey

  const edit = (record: Item) => {
    form.setFieldsValue({ ...record })
    setEditingKey(record[rowKey])
  }

  const cancel = () => {
    setEditingKey('')
  }

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Item

      const newData: any = [...data]
      const index = newData.findIndex((item) => key === item[rowKey])
      console.log({ index })

      if (index > -1) {
        const item: any = newData[index]
        newData.splice(index, 1, {
          ...item,
          ...row,
        })
        console.log({ newData })

        setData(newData)
        setEditingKey('')
      } else {
        newData.push(row)
        setData(newData)
        setEditingKey('')
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo)
    }
  }

  const columns = [
    {
      dataIndex: 'image_url',
      key: 'image_url',
      width: 150,
      render: (_: any, record: any) => {
        return (
          <img src={record.image_url} alt={record.display_name} />
        )
      },
    },
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
      width: 150,
      editable: true,
      inputType: 'text',
    },
    {
      title: 'Display Name',
      dataIndex: 'displayName',
      key: 'displayName',
      width: 200,
      editable: true,
      inputType: 'number',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
      editable: true,
      inputType: 'text',
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_: any, record: Item) => {
        const editable = isEditing(record)
        return editable ? (
          <span>
            <a
              href="javascript:;"
              onClick={() => save(record[rowKey])}
              style={{ marginRight: 8 }}>
              Save
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Button
            type="link"
            icon={<img src={EditSVG} alt="edit" />}></Button>

          //   <a
          //     disabled={editingKey !== ''}
          //     onClick={() => edit(record)}>
          //     Edit
          //   </a>
        )
      },
    },
  ]

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: col.inputType,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    }
  })

  const handleAdd = () => {
    const newData: any = [...data]
    newData.unshift({ id: uuidv4() })
    console.log({ newData, data })
    setEditingKey(newData[0].id)
    setData(newData)
  }

  return (
    <Form form={form} component={false}>
      <Button
        onClick={handleAdd}
        type="primary"
        style={{ marginBottom: 16 }}>
        Add a row
      </Button>
      <Table
        {...restProps}
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  )
}

export default EditableTable
