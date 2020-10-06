import { DownOutlined } from '@ant-design/icons'
import { Space } from 'antd'
import { ColumnType } from 'antd/lib/table'
import axios from 'axios'
import { ICategory } from 'interfaces'
import { GetServerSideProps } from 'next'
import React from 'react'
import { QueryCache, useQuery } from 'react-query'
import { dehydrate } from 'react-query/hydration'
import useSWR from 'swr'
import { getCategories } from 'utils/api'

import { EditableTable, Table } from '@/components/common'

interface Props {
  data: any[]
}

const fetcher = (url) => axios.get(url).then((res) => res.data)

const Categories = (props: Props) => {
  const { data } = useSWR('http://0.0.0.0:3333/categories', fetcher, {
    initialData: props.data,
  })

  const columns: ColumnType<ICategory>[] = [
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
      width: 150,
    },
    {
      title: 'Display Name',
      dataIndex: 'displayName',
      key: 'displayName',
      width: 200,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: 'Action',
      key: 'action',
      width: 200,
      render: () => (
        <Space size="middle">
          <a>Delete</a>
          <a className="ant-dropdown-link">
            More actions <DownOutlined />
          </a>
        </Space>
      ),
    },
  ]
  console.log({ data })

  return (
    <div>
      <Table dataSource={data.data} columns={columns} rowKey="id" />
      <EditableTable
        dataSource={data.data}
        columns={columns}
        rowKey="id"
      />
    </div>
  )
}

export default Categories

export const getServerSideProps: GetServerSideProps = async (
  context
) => {
  const categories = await fetcher('http://0.0.0.0:3333/categories')
  return { props: { data: categories } }
}
